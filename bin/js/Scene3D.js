/**
 * 场景初始化
 */
function SenceInit() {
    iScene = Laya.loader.getRes("model/LayaScene_ArtSence/ArtSence.ls");
    iCamera = iScene.getChildByName("MainCamera");
    iModel = iScene.getChildByName("group_dior");

    //需要隐藏的mesh
    var group_point = iScene.getChildByName('group_point');
    group_point.getChildByName('point12').active = false;

    // iLight = new Laya.PointLight();
    // iLight.color = new Laya.Vector3(1, 1, 1);
    // iLight = new Laya.SpotLight();
    // iLight.color = new Laya.Vector3(1, 1, 1);
    // iLight.direction = new Laya.Vector3(0, 0.5, 0);

    // iScene.addChild(iLight);

    Laya.stage.addChild(iScene);
    floorDotInit();
    CountPointData();
    EventHitInit();
    SenceEventInit();
    CameraMoveInit();
    // CameraMove.startControlEvent(0,true);
    OpenAnime();
}

/**
 * 计算视觉点的位置
 */
function CountPointData() {
    for (var key in PointData) {
        var index = parseInt(key);
        var deg = CHANGE_DEG * index;
        var XY = imath.countCircleRotateXY(deg, ROAD_RADIUS);
        PointData[key].translate.x = XY.x;
        PointData[key].translate.z = XY.y;
        PointData[key].rotateBag.x = deg - 180;
        PointData[key].rotateRoad.x = deg - 90;
        PointData[key].rotatePic.x = deg;
    }
}

/**
 * 地板的点的动画
 */
function floorDotInit() {
    var pointBox = iScene.getChildByName("group_point");

    var maxScale = 1;
    var minScale = 0.7;
    var scaleValue = 0.5;
    var scaleSpeed = 0.0005;
    var scaleDir = 1;
    var scaleDelta = 0;

    var pointAni = function () {
        var i, len = pointBox.numChildren;
        for (i = 0; i < len; i++) {
            var mesh = pointBox.getChildAt(i);

            if (scaleValue > maxScale) {
                scaleDir = -1;
            } else if (scaleValue < minScale) {
                scaleDir = 1;
            }
            scaleValue += scaleSpeed * scaleDir;
            dotScaleVec.x = dotScaleVec.y = dotScaleVec.z = scaleValue;
            mesh.transform.localScale = dotScaleVec;

            var material = mesh.meshRender.sharedMaterial;
            var alpha = scaleValue * 0.5;
            material.albedo = new Laya.Vector4(1.0, 1.0, 1.0, Math.abs(alpha));
            material.renderMode = 5;
        }
    }
    // pointAni();
    Laya.timer.frameLoop(1, this, pointAni);

    // console.log(iScene);
    // console.log(pointBox);
}

/**
 * 事件碰撞检测初始化
 */
function EventHitInit() {
    hitRay = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
    hitPoint = new Laya.Vector2();
    outHitResult = new Array();
    Laya.timer.frameLoop(1, this, checkEventHit);
}

/**
 * 场景事件初始化
 */
function SenceEventInit() {
    Laya.stage.on(Laya.Event.CLICK, this, GetClickThing);

    // document.getElementById("prev").onclick = changePosPrev;
    // document.getElementById("next").onclick = changePosNext;
}

/**
 * 监测3D物体的事件碰撞
 */
function checkEventHit() {
    //从屏幕空间生成射线
    hitPoint.elements[0] = Laya.MouseManager.instance.mouseX;
    hitPoint.elements[1] = Laya.MouseManager.instance.mouseY;
    iCamera.viewportPointToRay(hitPoint, hitRay);

    //射线检测获取所有检测碰撞到的物体
    Laya.Physics.rayCastAll(hitRay, outHitResult, 30, 0);
}

/**
 * 获取碰撞的物体
 */
function GetClickThing() {
    var hitNameArr = []
    // console.log(outHitResult);
    for (var i = 0; i < outHitResult.length; i++) {
        hitNameArr.push(outHitResult[i].sprite3D.name);
    }
    for (var i = 0; i < hitNameArr.length; i++) {
        var ele = hitNameArr[i];
        if (ele.indexOf("point") > -1) ClickPoint(ele);
        else if (ele.indexOf("dianji") > -1) ClickBag(ele);
        else if (ele.indexOf("pic") > -1) ClickPic(ele);
    }
}

/**
 * 点击画
 */
function ClickPic(ele) {
    var index = ele.split("pic")[1];
    if (nowPos == index) {
        var name = picData[index];

        picImg[0].src = "images/pic/" + index + ".jpg";
        picName.html("艺术家：" + name);

        picBox.fadeIn();
    }
}

/**
 * 点击包
 * @param {*} ele 
 */
function ClickBag(ele) {
    var index = ele.split("dianji")[1];
    // console.log(index);
    var bagInfo = BagData[index];
    if (nowPos == bagInfo.pos) {
        bagInfoBox.find(".designer").attr("src", bagInfo.designerImg);
        bagInfoBox.find(".bag").attr("src", "images/bag/" + bagInfo.id + ".jpg");
        starImg[0].src = bagInfo.starImg;
        designerName.html("合作艺术家：" + bagInfo.designerName);
        if (index == "8") {
            designerIntroBox.show();
            designerIntro.hide()
            designerIntro2.html(bagInfo.designerIntro);
        }
        else {
            designerIntroBox.hide();
            designerIntro.show().html(bagInfo.designerIntro);
        }

        starName.html(bagInfo.starName);
        bagName.html(bagInfo.bagName);
        nowAudio = bagInfo.audio;

        bagScroll.scrollTo(0, 0, 10);
        designerSwiper.slideTo(1,0);

        bagInfoBox.fadeIn(500);

        setTimeout(function () {
            bagScroll.refresh();
            if (index == "8") introScroll.refresh();
        }, 600)
    }
}

/**
 * 点中点
 */
function ClickPoint(ele) {
    if (moveSceneFlag) {
        var index = parseInt(ele.split("point")[1]);
        var data = PointData[index];
        // console.log(index);
        if (Math.abs(index - nowPos) > 4 && Math.abs(index - nowPos) < 7) {
            return;
        }
        if (index != nowPos) ChangeViewPos(index, "rotateBag");
    }
}

/**
 * 改变位置
 */
function changePosPrev() {
    if (moveSceneFlag) {
        var pos = nowPos;
        pos -= 1;
        pos = pos > 11 ? 1 : pos;
        pos = pos <= 0 ? 11 : pos;
        ChangeViewPos(pos, "rotateRoad");
    }
}

/**
 * 改变位置
 */
function changePosNext() {
    if (moveSceneFlag) {
        var pos = nowPos;
        pos += 1;
        pos = pos > 11 ? 1 : pos;
        pos = pos <= 0 ? 11 : pos;
        ChangeViewPos(pos, "rotateRoad");
    }
}

/**
 * 改变场景位置
 */
function ChangeViewPos(pos, angel) {
    if (moveSceneFlag) {
        if (nowViewAngle == angel && nowViewAngle != "rotateRoad") return;

        moveSceneFlag = false;
        var data = PointData[pos];
        var tips = false;

        if (peopleState == "stand") {
            peopleState = pos - 4 < 0 ? "right" : "left";
            leftBtn.find(".ar").hide();
            rightBtn.find(".ar").hide();
            rightBtn.find(".btnimg").show();
            leftBtn.find(".btnimg").show();
            if(peopleState == "left") {
                rightBtn.find(".btnimg")[0].src = "images/tips/l4.png";
                leftBtn.find(".btnimg")[0].src = "images/tips/r4.png";
            }
            frontBtn.fadeIn();
            tips = true;
        }

        if (!clickPicFlag && angel == "rotatePic") {
            clickPicFlag = true;
            tips = true;
        }

        var angelX = data[angel].x;
        if (angel == "rotateRoad") angelX = peopleState == "right" ? data[angel].x : data[angel].x - 180
        else if (angel == "rotatePic") angelX = peopleState == "right" ? data[angel].x : data[angel].x - 360;

        var rotation = {
            x: angelX,
            y: data[angel].y
        };

        var transition = {
            x: data.translate.x,
            y: data.translate.y,
            z: data.translate.z
        };

        nowViewAngle = angel;
        CameraMove.cameraMoveAni(transition, rotation, 1000, function () {
            nowPos = pos;
            if (tips) {
                CameraMove.startControlEvent(false, false);
                showHandTips(function () {
                    resetControlEvent(pos);
                })
            }
            else resetControlEvent(pos);
        });
    }
}

/**
 * 重置视角控制器
 */
function resetControlEvent(pos) {
    var data = PointData[pos];
    nowPos = pos;
    moveSceneFlag = true;
    if (peopleState == "right") {
        CameraMove.startControlEvent(true, true, { max: data.rotatePic.x, min: data.rotateBag.x });
    }
    else if (peopleState == "left") {
        CameraMove.startControlEvent(true, true, { max: data.rotateBag.x, min: data.rotatePic.x - 360 });
    }
}

/**
 * 显示手的提示
 */
function showHandTips(callback) {
    handTips.fadeIn();

    setTimeout(function () {
        handTips.fadeOut();
        if (callback) callback();
    }, 2000);
}

/**
 * 开场动画
 */
function OpenAnime() {
    CameraMove.cameraMoveAni(openAniPos.translate, openAniPos.rotate, 5000, function () {
        CameraMove.startControlEvent(true, true);
        rightBtn.fadeIn();
        leftBtn.fadeIn();
    });
}

/**
 * 相机移动初始化
 */
function CameraMoveInit() {
    CameraMove = new CameraMoveScript();
    CameraMove.init(iCamera);
    // Cmove.startControlEvent(false,true);
}
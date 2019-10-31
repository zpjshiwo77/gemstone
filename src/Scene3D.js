/**
 * 场景初始化
 */
function SenceInit() {
    iScene = Laya.loader.getRes("model/LayaScene_ArtSence/ArtSence.ls");
    iCamera = iScene.getChildByName("MainCamera");
    iModel = iScene.getChildByName("group_dior");

    //需要隐藏的mesh
    // var group_point = iScene.getChildByName('group_point');
    // group_point.getChildByName('point12').active = false;

    // iLight = new Laya.PointLight();
    // iLight.color = new Laya.Vector3(1, 1, 1);
    // iLight = new Laya.SpotLight();
    // iLight.color = new Laya.Vector3(1, 1, 1);
    // iLight.direction = new Laya.Vector3(0, 0.5, 0);

    // iScene.addChild(iLight);

    Laya.stage.addChild(iScene);
    EventHitInit();
    SenceEventInit();
    CameraMoveInit();
    OpenAnime();
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
        // if (ele.indexOf("point") > -1) ClickPoint(ele);
        // else if (ele.indexOf("dianji") > -1) ClickBag(ele);
        // else if (ele.indexOf("pic") > -1) ClickPic(ele);
    }
}

/**
 * 开场动画
 */
function OpenAnime() {
    CameraMove.cameraMoveAni(INITIAL_TRANSITION, INITIAL_ROTATION,10);
}

/**
 * 相机移动初始化
 */
function CameraMoveInit() {
    CameraMove = new CameraMoveScript();
    CameraMove.init(iCamera);
    CameraMove.startControlEvent(true,true);
}
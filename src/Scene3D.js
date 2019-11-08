/**
 * 场景初始化
 */
function SenceInit() {
    iScene = Laya.loader.getRes("model/LayaScene_gem/gem.ls");
    iCamera = iScene.getChildByName("MainCamera");

    //需要隐藏的mesh
    // var group_point = iScene.getChildByName('group_point');
    // group_point.getChildByName('point12').active = false;

    iLight = new Laya.DirectionLight();
    iLight.color = new Laya.Vector3(1, 1, 1);
    iLight.direction = new Laya.Vector3(-0.3, -0.3, -0.5);
    // iLight.range = 1000;
    // console.log(iLight);
    iScene.addChild(iLight);

    Laya.stage.addChild(iScene);
    EventHitInit();
    SenceEventInit();
    CameraMoveInit();
    OpenAnime();
    DealMaterialMetal();
    DealMaterialGem();
    getSaveData();
}

/**
 * 处理金属材质
 */
function DealMaterialMetal() {
    var circle = iScene.getChildByName("focal-circle");
    var mesh = circle.getChildAt(0);
    MetalM = mesh.meshRender.sharedMaterial;
    //反射率
    // MetalM.reflectTexture = Laya.Texture2D.load("../bin/images/black.jpg");
    MetalM.diffuseTexture = Laya.Texture2D.load("../bin/images/m4.jpg");
    // MetalM.normalTexture = Laya.Texture2D.load("../bin/images/black.jpg");
    // MetalM.specularTexture = Laya.Texture2D.load("../bin/images/black.jpg");
}

/**
 * 处理宝石材质
 */
function DealMaterialGem() {
    var circle = iScene.getChildByName("gem1");
    var mesh = circle.getChildAt(0);
    GemM = mesh.meshRender.sharedMaterial;
}

/**
 * 获取保存的数据
 */
function getSaveData() {
    var v = localStorage.Material;
    if (v) {
        v = v.split(",");

        for (var i = 0; i < v.length; i++) {
            document.getElementById("m" + (i + 1)).value = v[i];
        }

        changeMaterial(v);
    }
    else getMaterialData();
}

/**
 * 获取材质数据
 */
function getMaterialData() {
    var v = [];

    for (var i = 1; i <= 25; i++) {
        var value = document.getElementById("m" + i).value;
        v.push(value);
    }

    changeMaterial(v);
    localStorage.Material = v.toString();
}

/**
 * 修改材质
 */
function changeMaterial(v) {
    //反射率
    MetalM.albedo = new Laya.Vector4(v[0], v[1], v[2], 1.0);
    //环境光颜色
    MetalM.ambientColor = new Laya.Vector3(v[3], v[4], v[5]);
    //漫反射光颜色
    MetalM.diffuseColor = new Laya.Vector3(v[6], v[7], v[8]);
    //反射颜色
    MetalM.reflectColor = new Laya.Vector3(v[9], v[10], v[11]);
    //反射率
    GemM.albedo = new Laya.Vector4(v[12], v[13], v[14], v[24]);
    //环境光颜色
    GemM.ambientColor = new Laya.Vector3(v[15], v[16], v[17]);
    //漫反射光颜色
    GemM.diffuseColor = new Laya.Vector3(v[18], v[19], v[20]);
    //反射颜色
    GemM.reflectColor = new Laya.Vector3(v[21], v[22], v[23]);
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

    document.getElementById("ok").onclick = getMaterialData;
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
    CameraMove.cameraMoveAni(INITIAL_TRANSITION, INITIAL_ROTATION, 10);
}

/**
 * 相机移动初始化
 */
function CameraMoveInit() {
    CameraMove = new CameraMoveScript();
    CameraMove.init(iCamera);
    CameraMove.startControlEvent(true, true);
}
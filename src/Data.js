// 常量
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Loader = Laya.Loader;
var Stat = Laya.Stat;

var Resources = [
    { url: 'model/LayaScene_ArtSence/ArtSence.ls', type: Laya.Scene }
    // { url: 'images/designer/1.jpg', type: Loader.IMAGE }
    // { url: 'res/atlas/images/fire.atlas', type: Loader.ATLAS }
];

var INITIAL_TRANSITION = {x:0,y:0.08,z:0.6};
var INITIAL_ROTATION = {x:0,y:0};

// 变量
var iScene, iCamera, iModel, iLight;
var CameraMove;

//场景12个点
var dotScaleVec = new Laya.Vector3();

var moveSceneFlag = true;


//射线
var hitRay;

//碰撞
var hitPoint, outHitResult;

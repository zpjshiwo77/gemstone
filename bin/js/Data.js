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

var POINT_NUM = 12;
var CHANGE_DEG = 360 / POINT_NUM;
var ROAD_RADIUS = 0.17;
var INITIAL_TRANSITION = {x:0,y:0.08,z:0.6};
var INITIAL_ROTATION = {x:0,y:0};

// 变量
var iScene, iCamera, iModel, iLight;
var CameraMove;

//场景12个点
var dotScaleVec = new Laya.Vector3();

var moveSceneFlag = true;

var peopleState = "stand";

var bagInfoBox = $("#bagInfoBox");
var designerImg = bagInfoBox.find(".designer");
var designerName = bagInfoBox.find(".name");
var designerIntro = bagInfoBox.find(".intro");
var designerIntro2 = bagInfoBox.find(".introsp");
var designerIntroBox = bagInfoBox.find("#introScroll");
var starImg = bagInfoBox.find(".head");
var starName = bagInfoBox.find(".starName");
var audioState = bagInfoBox.find(".state");
var bagImg = bagInfoBox.find(".bag");
var bagName = bagInfoBox.find(".bagName");
var bagIntro = bagInfoBox.find(".bagIntro");
var backBtn = bagInfoBox.find(".backBtn");
var moreBtn = bagInfoBox.find(".moreBtn");

var handTips = $("#hand");
var frontBtn = $("#frontBtn");
var rightBtn = $("#rightBtn");
var leftBtn = $("#leftBtn");

var picBox = $("#picBox");
var picImg = $("#picBox .pic");
var picName = $("#picBox .name");

var bagScroll = new IScroll('#bagInfoBox', {
    bounce: false,
    click: true,
});
var introScroll = new IScroll('#introScroll', {
    bounce: false,
    click: true,
});
var designerSwiper;

//射线
var hitRay;

//碰撞
var hitPoint, outHitResult;

var nowPos = 0;
var nowViewAngle = "default";
var nowAudio = "";
var playStatus = "stop";
var clickPicFlag = false;

var openAniPos = {
    translate: {
        x: 0,
        y: 0.08,
        z: 0.17
    },
    rotate: {
        x: 0,
        y: 0
    }
}

/**
 * 加载图片
 */
function load_handler() {
    var loader = new PxLoader();
    loader.addImage('images/share.jpg');
    loader.addImage('images/tips/f1.png');
    loader.addImage('images/tips/f2.png');
    loader.addImage('images/tips/f3.png');
    loader.addImage('images/tips/hand.png');
    loader.addImage('images/tips/l1.png');
    loader.addImage('images/tips/l2.png');
    loader.addImage('images/tips/l3.png');
    loader.addImage('images/tips/l4.png');
    loader.addImage('images/tips/r1.png');
    loader.addImage('images/tips/r2.png');
    loader.addImage('images/tips/r3.png');
    loader.addImage('images/tips/r4.png');
    loader.addImage('images/star/1.jpg');
    loader.addImage('images/star/2.jpg');
    loader.addImage('images/pic/1.jpg');
    loader.addImage('images/pic/10.jpg');
    loader.addImage('images/pic/11.jpg');
    loader.addImage('images/pic/2.jpg');
    loader.addImage('images/pic/3.jpg');
    loader.addImage('images/pic/4.jpg');
    loader.addImage('images/pic/5.jpg');
    loader.addImage('images/pic/6.jpg');
    loader.addImage('images/pic/7.jpg');
    loader.addImage('images/pic/8.jpg');
    loader.addImage('images/pic/9.jpg');
    loader.addImage('images/info/btn_1.png');
    loader.addImage('images/info/btn_2.png');
    loader.addImage('images/designer/1.jpg');
    loader.addImage('images/designer/10.jpg');
    loader.addImage('images/designer/11.jpg');
    loader.addImage('images/designer/2.jpg');
    loader.addImage('images/designer/3.jpg');
    loader.addImage('images/designer/4.jpg');
    loader.addImage('images/designer/5.jpg');
    loader.addImage('images/designer/6.jpg');
    loader.addImage('images/designer/7.jpg');
    loader.addImage('images/designer/8.jpg');
    loader.addImage('images/designer/9.jpg');
    loader.addImage('images/common/bg.jpg');
    loader.addImage('images/common/bgm_off.png');
    loader.addImage('images/common/bgm_on.png');
    loader.addImage('images/common/btns.png');
    loader.addImage('images/common/dialog.png');
    loader.addImage('images/common/k.jpg');
    loader.addImage('images/common/logo.png');
    loader.addImage('images/common/pause.png');
    loader.addImage('images/common/play.png');
    loader.addImage('images/bag/1.jpg');
    loader.addImage('images/bag/10.jpg');
    loader.addImage('images/bag/11.jpg');
    loader.addImage('images/bag/2.jpg');
    loader.addImage('images/bag/3.jpg');
    loader.addImage('images/bag/4.jpg');
    loader.addImage('images/bag/5.jpg');
    loader.addImage('images/bag/6.jpg');
    loader.addImage('images/bag/7.jpg');
    loader.addImage('images/bag/8.jpg');
    loader.addImage('images/bag/9.jpg');

    loader.addCompletionListener(function () {
        LayaInit();
        loader = null;
    });
    loader.start();
    sound_handler();
}//end func
load_handler();

function sound_handler() {
    var wsb = window;
    if (wsb.WeixinJSBridge) {
        try {
            wsb.WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
        }
        catch (e) {
            wx.ready(sound_creat);
        }
    }
    else {
        document.addEventListener("WeixinJSBridgeReady", sound_creat, false);
    }
    // sound_creat();
}//edn func

function sound_creat() {
    document.removeEventListener("WeixinJSBridgeReady", sound_creat);
    ibgm.init({ src: 'https://dior.beats-digital.com/ladyart/audio/bgm.mp3', autoplay: true });
}//end func

/**
* laya初始化
*/
function LayaInit() {
    var shareInfo = {
        friend: "DIOR LADY ART #4 —艺术家限量合作系列",
        timeline: "DIOR LADY ART #4 —艺术家限量合作系列"
    }
    wxUser.init({ shareInfo: shareInfo });
    Laya3D.init(0, 0, true);
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
    Laya.stage.bgColor = "0xffffffff";
    Laya.UIConfig.closeDialogOnSide = false;
    Laya.loader.create(Resources, laya.utils.Handler.create(this, loadComplete), null);
}

/**
 * 加载完成
 */
function loadComplete() {
    remUnitConverter(750);
    SenceInit();
    HtmlEventInit();
    swiperInit();
    bagScroll.refresh();
}

/**
 * 事件初始化
 */
function HtmlEventInit() {
    backBtn.on("click", hideBagInfo);
    moreBtn.on("click", showMore);

    leftBtn.on("click", turnLeft)
    rightBtn.on("click", turnRight)
    frontBtn.on("click", goToNextBag);

    bagInfoBox.find(".control").on("click", changeAudioStatus);

    picBox.find(".close").on("click", function () {
        picBox.fadeOut();
    });

    designerIntroBox.on("touchstart", function () {
        bagScroll.disable();
    })
    designerIntroBox.on("touchend", function () {
        bagScroll.enable();
    })
}

/**
 * 滑动初始化
 */
function swiperInit() {
    bagInfoBox.show().css({ opacity: 0 });
    designerSwiper = new Swiper('#designerSwiper', {
        autoplay: false,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        }
    });

    setTimeout(function () {
        bagInfoBox.hide().css({ opacity: 1 });
    }, 100);
}

/**
 * 左转
 */
function turnLeft() {
    if (peopleState == "stand") ChangeViewPos(11, "rotateBag");
    else peopleState == "right" ? ChangeViewPos(nowPos, "rotatePic") : ChangeViewPos(nowPos, "rotateBag");
}

/**
 * 右转
 */
function turnRight() {
    if (peopleState == "stand") ChangeViewPos(1, "rotateBag");
    else peopleState == "right" ? ChangeViewPos(nowPos, "rotateBag") : ChangeViewPos(nowPos, "rotatePic");
}

/**
 * 去下一个包
 */
function goToNextBag() {
    peopleState == "right" ? changePosNext() : changePosPrev();
}

/**
 * 隐藏包的信息
 */
function hideBagInfo() {
    bagInfoBox.fadeOut();
    AudioStop();
}

/**
 * 显示更多
 */
function showMore() {
    location.replace("https://www.dior.cn/zh_cn");
}

/**
 * 改变音频状态
 */
function changeAudioStatus() {
    playStatus == "play" ? AudioStop() : AudioPlay();
}

/**
 * 音频播放
 */
function AudioPlay() {
    audioState[0].src = "images/common/pause.png";
    playStatus = "play";
    if (nowAudio) Laya.SoundManager.playMusic(nowAudio + "?v=" + Math.random());
    if (ibgm) ibgm.pause();
}

/**
 * 音频停止
 */
function AudioStop() {
    audioState[0].src = "images/common/play.png";
    playStatus = "stop";
    Laya.SoundManager.stopAll();
    if (ibgm) ibgm.play();
}

/**
 * rem单位转换
 * @param {*} width			转换的宽度
 */
function remUnitConverter(width) {
    var scale = width / 100;
    var unit = $(window).width() / scale;
    $("html").css('font-size', unit);
}
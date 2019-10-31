
/**
* laya初始化
*/
function LayaInit() {
    Laya3D.init(0, 0, true);
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
    Laya.stage.bgColor = "0xffffffff";
    Laya.UIConfig.closeDialogOnSide = false;
    Laya.loader.create(Resources, laya.utils.Handler.create(this, loadComplete), null);
}
LayaInit();

/**
 * 加载完成
 */
function loadComplete() {
    SenceInit();
}

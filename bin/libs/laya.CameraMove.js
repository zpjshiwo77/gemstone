var CameraMoveScript = function () {
    var icamera;
    var touchStart = { x: 0, y: 0 };
    var rotateSpeed = 0.2;
    var controlX = false, controlY = false, controlFlag = false;
    var onceRotation = INITIAL_ROTATION;
    var onceTransition = INITIAL_TRANSITION;
    var ViewRangX = {max:45,min:-45};
    var ViewRangY = {max:30,min:-20};

    /**
     * 初始化
     */
    this.init = function (camera) {
        icamera = camera;
        eventInit();
    }

    /**
     * 控制事件
     */
    this.startControlEvent = function (x, y, rangX,rangY) {
        controlFlag = true;
        controlX = x;
        controlY = y;
        if(rangX) ViewRangX = rangX;
        if(rangY) ViewRangY = rangY;
    }

    /**
     * 相机移动的动画
     */
    this.cameraMoveAni = function (transition, rotation, time, callback) {
        Laya.Tween.to(onceTransition, {
            x: transition ? transition.x : onceTransition.x,
            y: transition ? transition.y : onceTransition.y,
            z: transition ? transition.z : onceTransition.z,
            update: new Laya.Handler(this, function () {
                moveCamera();
            })
        }, time, Laya.Ease.linearIn);

        if(rotation.x - onceRotation.x > 180){
            onceRotation.x = onceRotation.x + 360;
        } 
        else if(rotation.x - onceRotation.x < -180){
            onceRotation.x = onceRotation.x - 360;
        }
        Laya.Tween.to(onceRotation, {
            x: rotation ? rotation.x : onceRotation.x,
            y: rotation ? rotation.y : onceRotation.y,
            update: new Laya.Handler(this, function () {
                rotateCamera();
            })
        }, time, Laya.Ease.linearIn);

        setTimeout(function () {
            if (callback) callback();
        }, time + 10)
    }

    /**
     * 停止控制
     */
    this.stopControlEvent = function () {
        controlFlag = false;
        return onceRotation;
    }

    /**
     * 事件初始化
     */
    function eventInit() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, recordTouchStart);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, recordTouchMove);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, translateCamera);
    }

    /**
     * 移动相机
     */
    function moveCamera(){
        icamera.transform.position = new Laya.Vector3(onceTransition.x, onceTransition.y, onceTransition.z);
    }

    /**
     * 旋转相机
     */
    function rotateCamera(){
        var x = imath.convertAngle(onceRotation.y)
        var y = imath.convertAngle(onceRotation.x)
        icamera.transform.rotationEuler = new Laya.Vector3(x, y, 0);
    }

    /**
     * 移动相机
     */
    function translateCamera(e) {
        if (controlFlag) {
            var dis = 0.1;
            var key = e.keyCode;

            switch (key) {
                case 68:
                    onceTransition.x = imath.FloatPointAdd(onceTransition.x, dis);
                    moveCamera();
                    break;
                case 65:
                    onceTransition.x = imath.FloatPointAdd(onceTransition.x, -dis);
                    moveCamera();
                    break;
                case 81:
                    onceTransition.y = imath.FloatPointAdd(onceTransition.y, dis);
                    moveCamera();
                    break;
                case 69:
                    onceTransition.y = imath.FloatPointAdd(onceTransition.y, -dis);
                    moveCamera();
                    break;
                case 87:
                    onceTransition.z = imath.FloatPointAdd(onceTransition.z, dis);
                    moveCamera();
                    break;
                case 83:
                    onceTransition.z = imath.FloatPointAdd(onceTransition.z, -dis);
                    moveCamera();
                    break;
            }

            console.log("移动：");
            console.log(onceTransition);
        }
    }

    /**
     * 记录点击的点
     */
    function recordTouchStart(e) {
        if (controlFlag) {
            touchStart.x = e.touches[0].pageX;
            touchStart.y = e.touches[0].pageY;
        }
    }

    /**
     * 记录移动的点
     */
    function recordTouchMove(e) {
        if (controlFlag && e.touches) {
            var touch = { x: 0, y: 0 };

            touch.x = e.touches[0].pageX;
            touch.y = e.touches[0].pageY;

            var diffx = (touch.x - touchStart.x) * rotateSpeed;
            var diffy = (touch.y - touchStart.y) * rotateSpeed;
            // if(diffx < 0) diffx = onceRotation.x > ViewRangX.min ? diffx : 0;
            // else diffx = onceRotation.x < ViewRangX.max ? diffx : 0;
            if(diffy < 0) diffy = onceRotation.y > ViewRangY.min ? diffy : 0;
            else diffy = onceRotation.y < ViewRangY.max ? diffy : 0;
            var x = controlX ? diffx : 0;
            var y = controlY ? diffy : 0;
            // icamera.transform.rotate(new Laya.Vector3(y, x, 0), false);
            onceRotation.x = imath.FloatPointAdd(onceRotation.x, x);
            onceRotation.y = imath.FloatPointAdd(onceRotation.y, y);
            rotateCamera();
            nowViewAngle = "free";

            console.log("旋转：");
            console.log(onceRotation);

            touchStart = touch;
        }
    }
}
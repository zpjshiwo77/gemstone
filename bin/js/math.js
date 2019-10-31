var importantMath = function () {
	var _self = this;

	//获得范围内随机整数
	_self.randomRange = function (min, max) {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	} //end func 

	/**
	 * 字符串截取
	 * @param {*} str			需要截取的字符串
	 * @param {*} len			截取长度
	 */
	_self.setString = function(str, len) {
	    var strlen = 0;
	    var s = "";
	    for (var i = 0; i < str.length; i++) {
	        if (str.charCodeAt(i) > 128) {
	            strlen += 2;
	        } else {
	            strlen++;
	        }
	        s += str.charAt(i);
	        if (strlen >= len) {
	            return s + "...";
	        }
	    }
	    return s;
	} //end func

    /**
     * 根据角度计算圆方程的x,y
     */
    _self.countCircleRotateXY = function(deg,R){
        var XY = {x:0,y:0};
        deg = _self.convertAngle(deg);
        XY.x = R * Math.sin(deg);
        XY.y = R * Math.cos(deg);
        return XY;
    }

	//获得http url参数
	_self.getQueryString = function (name) {
		if (name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		} //end if
		else return null;
	} //end func

	//浮点数的加法
	_self.FloatPointAdd = function (a, b, bit) {
		var digit = bit || 10000;
		return (Math.floor(a * digit) + Math.floor(b * digit)) / digit;
	}//end func

	//角度转换
	_self.convertAngle = function (deg) {
		return Math.PI / 180 * deg;
	}//end func

	//两点间距离
	_self.PointDistance = function (x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}//end func
}

var imath = new importantMath();
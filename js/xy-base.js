
// 1-$ || ready 
function $(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn, false);
	}else{
		document.onreadystatechange=function(){
			if(document.readyState == 'complete'){
				fn();
			}	
		}
	}	
}

// 2-addWheel
function addWheel(obj, fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		obj.addEventListener('DOMMouseScroll', _wheel, false);
	}else{
		obj.onmousewheel=_wheel;
	}
	
	function _wheel(ev){
		var oEvent=ev || event;
		var down=true;
		
		if(oEvent.wheelDelta){
			down=oEvent.wheelDelta>0 ? false : true;
		}else{
			down=oEvent.detail>0 ? true : false;
		}
		fn(down);
		
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}	
}

// 3- getStyle
function getStyle(obj, sName){
	return (obj.currentStyle || getComputedStyle(obj, sName))[sName];	
}

// 4-toDub
function toDub(n){
	return n<10 ? '0'+n : ''+n;	
}

// 5-cookie

function addCookie(name,value,iDay){
	if(iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		
		document.cookie=name+'='+value+';path=/;expires='+oDate.toGMTString();
	}else{
		document.cookie=name+'='+value+';path=/'	
	}
}

function getCookie(name){
	var arr=document.cookie.split('; ');
	
	//[a=1,b=2,name=abc]
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		//arr2[0]  a b name
		//arr2[1]  1 2 abc
		if(name==arr2[0]){
			return arr2[1];
		}
	}
	return '';		
}

function removeCookie(name){
	addCookie(name,'adsfasdf',-100);	
}

//  6******
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var arr=[];
		//var reg=/\bsClass\b/;
		var reg=new RegExp('\\b'+sClass+'\\b');
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0; i<aEle.length; i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
//7*******
function getPos(obj){
	var left=0;
	var top=0;
	
	while(obj){
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		
		obj=obj.offsetParent;
	}	
	return {left:left, top:top}; 
}

//8*****
function addEvent(obj, sEv, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener(sEv, fn, false);
	}
	else
	{
		obj.attachEvent('on'+sEv, fn);
	}
}

// 9***
function moveScroll(target, time){
	var start=document.documentElement.scrollTop || document.body.scrollTop;
	var dis=target-start;
	var count=Math.floor(time/30);
	var n=0;
	var timer=null;
	
	clearInterval(timer);
	timer=setInterval(function (){
		//userScroll=false;
		n++;	
		var cur=start+dis*n/count;
		// 先
		document.body.scrollTop=cur;
		document.documentElement.scrollTop=cur;
		
		if (n == count)
		{
			clearInterval(timer);
		}
	}, 30);
}

//10**
function toDub(n)
{
	return n<10 ? '0'+n : ''+n;
}

// 11
function rnd(n, m)
{
	return Math.floor(Math.random()*(m-n)+n);
}


// last-move-E;  t: 当前时间 b: 初始值 c: 总距离 d: 总时

var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}
		
function move(obj, json, options){
	options=options || {};
	var duration=options.duration || 1000;
	var easing=options.easing || Tween.Linear; 
	var start={};
	var dis={};
	var count=Math.floor(duration/30);
	var n=0;
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var name in json){
			var cur=easing(duration*n/count, start[name], dis[name], duration);
			
			if(name == 'opacity'){
				obj.style[name]=cur;
			}else{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	}, 30);
}



















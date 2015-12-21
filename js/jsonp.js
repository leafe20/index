
function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}	
	return arr.join('&');
}

function jsonp(json){
	json=json || {};  // *****
	if(!json.url)return;  // *******
	json.data=json.data || {}; // **************
	json.cbName=json.cbName || 'cb';  // *********默认百度接口；
	
	var fnName=('jsonp'+Math.random()).replace('.','');  // ****** jsonp_中的下划线有的会被浏览器过滤 -> 出错；
	
	window[fnName]=function(data){
		json.success && json.success(data);  // ******	
		oHead.removeChild(oS); //  ********调用成功后删除；
	};
	
	json.data[json.cbName]=fnName;  //******被调用才执行；
	
	var oS=document.createElement('script');
	oS.src=json.url+'?'+json2url(json.data); //  ******* '?'
	var oHead=document.getElementsByTagName('head')[0];  //****
	oHead.appendChild(oS);
}
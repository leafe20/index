// JavaScript Document

	window.onload=function(){
		var oul=document.getElementById('u');
		var aLi=oul.getElementsByTagName('li');
		var oDiv=document.getElementById('div');
		var aA=oDiv.getElementsByTagName('a');
		for(var i=0;i<aA.length;i++){
			aA[i].index=i;
			aA[i].onmouseover=function(){
				for(var j=0;j<aA.length;j++){
					aA[j].className='';
					aLi[j].className='';
				}
				this.className='show';
				aLi[this.index].className='bgshow';	
			}
		}	
	};

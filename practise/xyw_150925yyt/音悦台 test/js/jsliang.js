// JavaScript Document

	window.onload=function(){
		    var obox=document.getElementById('box');
			var odiv=obox.getElementsByTagName('div');
			var olis=document.getElementById('lis');
			var olist=olis.getElementsByTagName('ul');
			for(var i=0;i<odiv.length;i++){
			    odiv[i].index=i;
				   odiv[i].onclick=function(){
					   for(var i=0;i<odiv.length;i++){
						      odiv[i].className='fl';
							 olist[i].className='';
						   }
						  olist[this.index].className='list clearfix';
					      this.className='active fl';
					   }
				}
			
		}





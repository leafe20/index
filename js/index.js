// JavaScript Document

window.onload=function(){
	var oHnav=document.getElementById('hnav');
	var oWFix=document.getElementById('wFix');
	var _oWFix=document.getElementById('_wFix');
	var aA=oHnav.getElementsByTagName('a');
	var oHcolor=document.getElementById('Hcolor');
	var oFTop=document.getElementById('fTop');	
	var oRmore=document.getElementById('Rmore');
	//布局转化；
	var oWorkB1=document.getElementById('works_box1');
	var oWorkB2=document.getElementById('works_box2');
	var oWorkB3=document.getElementById('works_box3');
	//1
	var oWtop1=oWorkB1.offsetTop;
	var oWleft1=oWorkB1.offsetLeft;
	//2
	var oWtop2=oWorkB2.offsetTop;
	var oWleft2=oWorkB2.offsetLeft;
	//3
	var oWtop3=oWorkB3.offsetTop;
	var oWleft3=oWorkB3.offsetLeft;
	
	oWorkB1.style.position='absolute'
	oWorkB1.style.left=oWleft1+'px';
	oWorkB1.style.top=(oWtop1+400)+'px';
	oWorkB1.style.margin=0;
	
	oWorkB2.style.position='absolute'
	oWorkB2.style.left=(oWleft2+1000)+'px';
	oWorkB2.style.top=oWtop2+'px';
	oWorkB2.style.margin=0;
	oWorkB2.style.zIndex=100000000;
	
	oWorkB3.style.position='absolute'
	oWorkB3.style.left=(oWleft3-1000)+'px';
	oWorkB3.style.top=oWtop3+'px';
	oWorkB3.style.margin=0;
	
	// home
	oHcolor.onclick=oFTop.onclick=function(){
		moveScroll(0, 500);
		for(var i=0; i<aA.length; i++){
			aA[i].className='';
		}	
	};
	// personal works
	addEvent(aA[0],'click',function(){
		moveScroll(600, 500);
	});
	//about me
	addEvent(aA[1],'click',function(){
		moveScroll(2030, 500);
	});
	oRmore.onclick=function(){
		moveScroll(2030, 500);	
	};
	// nav change;
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		document.title=scrollTop;
		
		for(var i=0; i<aA.length; i++){
			if(scrollTop==0){
				oWFix.style.background='#17baef';
				oHcolor.style.color='#fff';
					
				aA[i].className='';
				aA[i].style.color='#555';
				aA[i].onmouseover=function(){
					this.style.color='#222';	
				};
			}
			if(scrollTop>0){
				oWFix.style.position='fixed';
				oWFix.style.background='#fff';
				_oWFix.style.display='block';
				oHcolor.style.color='#17baef';
				
				aA[i].onmouseover=function(){
					this.style.color='#17baef';	
				};
				aA[i].onmouseout=function(){
					this.style.color='#555';	
				};
			}
			if(scrollTop>=200){
				move(oWorkB1,{top:oWtop1,opacity:1},{
					duration:1000,
					easing:Tween.Quad.easeOut
				});
			}
			if(scrollTop>=600){
				aA[0].className='active';
				aA[1].className='';
				
				move(oWorkB2,{left:oWleft2,opacity:1},{
					duration:1000,
					easing:Tween.Quad.easeOut	
				});
			}
			if(scrollTop>=1000){
				move(oWorkB3,{left:oWleft3,opacity:1},{
					duration:1000,
					easing:Tween.Quad.easeOut	
				});
			}
			if(scrollTop>=2030){
				aA[0].className='';
				aA[1].className='active';
			}
		}
	};
	//选项卡
	(function(){
		var oDiv=document.getElementById('playimages');
		var oBtnPrev=getByClass(oDiv, 'prev')[0];	
		var oBtnNext=getByClass(oDiv, 'next')[0];
		var oMarkLeft=getByClass(oDiv, 'mark_left')[0];	
		var oMarkRight=getByClass(oDiv, 'mark_right')[0];		
		var oDivSmall=getByClass(oDiv,'small_pic')[0];
		var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
		var aLiSmall=oDivSmall.getElementsByTagName('li');
		var oUlBig=getByClass(oDiv, 'big_pic')[0];
		var aLiBig=oUlBig.getElementsByTagName('li');
		var alength=getByClass(oDiv,'length')[0];
		
		var nowZindex=2;
		var now=0;
		
		oUlSmall.style.width=aLiSmall.length*aLiSmall[0].offsetWidth+'px';

		oBtnPrev.onmouseover=oMarkLeft.onmouseover=function(){
			move(oBtnPrev,{opacity:1},{
				duration:300	
			});	
		};
		oBtnPrev.onmouseout =oMarkLeft.onmouseout=function(){
			move(oBtnPrev,{opacity:0},{
				duration:300
			});	
		};
		oBtnNext.onmouseover=oMarkRight.onmouseover=function(){
			move(oBtnNext,{opacity:1},{
				duration:300	
			});	
		};
		oBtnNext.onmouseout =oMarkRight.onmouseout=function(){
			move(oBtnNext,{opacity:0},{
				duration:300
			});	
		};
		
		for(var i=0; i<aLiSmall.length; i++){
			aLiSmall[i].index=i;
			aLiSmall[i].onclick=function(){
				if(this.index==now)return;
				now=this.index;
				
				tab();
			}
			
			aLiSmall[i].onmouseover=function(){
				move(this, {opacity:1},{
					duration:100	
				});	
			};
			aLiSmall[i].onmouseout=function(){
				if(this.index!=now){
					move(this, {opacity:0.6},{
						duration:100	
					});	
				}
			};
		}
		
		function tab(){
			aLiBig[now].style.zIndex=nowZindex++;
			
			for(var i=0;i<aLiSmall.length; i++){
				move(aLiSmall[i],{opacity:0.6});
			}
			move(aLiSmall[now],{opacity:1});
			
			aLiBig[now].style.height=0;
			move(aLiBig[now],{height:320},{
				duration:500	
			});
			
			if(now==0){
				move(oUlSmall,{left:0});
			}else if(now==aLiSmall.length-1){
				move(oUlSmall,{left:-(now-2)*aLiSmall[0].offsetWidth});
			}else{
				move(oUlSmall,{left:-(now-1)*aLiSmall[0].offsetWidth});
			}
			alength.innerHTML=(now+1)+'/6';
			//alength.style.text
		}
		
		oBtnPrev.onclick=function(){
			now--;
			if(now==-1){
				now=aLiSmall.length-1;
			}	
			tab();
		};
		
		oBtnNext.onclick=function(){
			now++;
			
			if(now==aLiSmall.length){
				now=0;
			}
			tab();	
		};
		
		var timer=setInterval(oBtnNext.onclick,3000);
		oDiv.onmouseover=function(){
			clearInterval(timer);	
		}
		oDiv.onmouseout=function(){
			timer=setInterval(oBtnNext.onclick,3000);
		}
	})();	
	//时间；
	(function(){
		var oTime=document.getElementById('cbYear');
		tick();
		setInterval(tick, 1000);
		function tick(){
			var oDate=new Date();
			var year=oDate.getFullYear();
			var month=toDub((oDate.getMonth()+1));
			var date=toDub(oDate.getDate());
			var h=toDub(oDate.getHours());
			var m=toDub(oDate.getMinutes());
			var s=toDub(oDate.getSeconds());
			
			oTime.innerHTML=year+'-'+month+'-'+date+' &nbsp;'+h+':'+m+':'+s;
		}
	})();
	//动画   delete
	/*(function(){
		var oImg=document.getElementById('img1');
		var arr1=['images/a.png', 'images/b.png', 'images/c.png'];
		var arr2=['images/fight01.png', 'images/fight02.png', 'images/fight03.png', 'images/fight04.png'];
		var n=1;
		
		setInterval(function (){
			oImg.src=arr1[n++%arr1.length];
		}, 200);
		
		var oDiv=document.getElementById('box1');
		
			oDiv.onclick=function (){
			var timer=setInterval(function (){
				oImg.src=arr2[n++%arr1.length];
				
				setTimeout(function (){
					clearInterval(timer);
				}, 400);
			}, 60);
		};
	})();*/
	//eg1
	(function(){
		var oEg1=document.getElementById('eg1');
		var oUl1=oEg1.children[0];
		var aLi1=oUl1.children;
		var aImg1=oUl1.getElementsByTagName('img');
		
		/*for(var i=0; i<aLi1.length; i++){
			var oSpan=document.createElement('span');
			oSpan.innerHTML=i;
			aLi1[i].appendChild(oSpan);
		}
		var aSpan=oUl1.getElementsByTagName('span');*/
		var divC=oEg1.offsetWidth/2;

		oUl1.style.width=aLi1[0].offsetWidth*aLi1.length+'px';
		
		oUl1.onmousedown=function(ev){
			var oEvent=ev || event;
			var disX=oEvent.clientX-oUl1.offsetLeft;	
			
			document.onmousemove=function(ev){
				var oEvent=ev || event;	
				var left=oEvent.clientX-disX;
				
				if(left>=divC-(1-0.5)*aLi1[0].offsetWidth){
					left=divC-(1-0.5)*aLi1[0].offsetWidth;	
				}
				if(left<=divC-(aLi1.length-0.5)*aLi1[0].offsetWidth){
					left=divC-(aLi1.length-0.5)*aLi1[0].offsetWidth;		
				}

				oUl1.style.left=left+'px';
				change()
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;	
			};
			return false;
		};
		
		oUl1.style.left=divC-(2-0.5)*aLi1[0].offsetWidth+'px';
	
		change();	
		function change(){
			for(var i=0; i<aLi1.length; i++){
				var L=Math.abs(aLi1[i].offsetLeft+oUl1.offsetLeft+aLi1[i].offsetWidth/2-divC);
				var scale=1-L/500;
				scale<0.5 && (scale=0.5);
				// aSpan[i].innerHTML=scale.toFixed(2);
				
				aImg1[i].style.width=400*scale+'px';
				aImg1[i].style.height=280*scale+'px';
				aImg1[i].style.marginLeft=-(aImg1[i].offsetWidth-200)/2+'px';
				aImg1[i].style.marginTop=-(aImg1[i].offsetHeight-140)/2+'px';
				aLi1[i].style.zIndex=scale*1000000;
			}
		}
	})();
	// eg5
	(function(){
		var oEg5=document.getElementById('eg5');
		var aLi5=oEg5.getElementsByTagName('li');
		var aImg5=oEg5.getElementsByTagName('img');
		
		aPos=[];
		var oldW=100;
		var oldH=100;
		
		for(var i=0; i<aImg5.length;i++){
			aPos.push({
				left:aImg5[i].offsetLeft,
				top:aImg5[i].offsetTop
			});
		}
		
		for(var i=0; i<aImg5.length; i++){
			aImg5[i].style.position='absolute';
			aImg5[i].style.left=aPos[i].left+'px';
			aImg5[i].style.top=aPos[i].top+'px';
			aImg5[i].style.margin=0;
		}
		
		for(var i=0;i<aImg5.length; i++){
			(function(index){
				aImg5[i].onmouseover=function(){
					move(this, {
						width:oldW*5/4,	
						height:oldH*5/4, 
						left:aPos[index].left-oldW/8, 
						top:aPos[index].top-oldH/8}, {
							duration:200,
							easing:Tween.Back.easeIn	
					});	
				};
				
				aImg5[i].onmouseout=function(){
					move(this, {
						width:oldW,	
						height:oldH, 
						left:aPos[index].left, 
						top:aPos[index].top}, {
							duration:200,
							easing:Tween.Back.easeOut	
					});	
				};
			})(i);
		}
	})();	
	// eg4
	(function(){
		var oEg4=document.getElementById('eg4');
		var aLi4=oEg4.getElementsByTagName('li');
		var aSpan4=oEg4.getElementsByTagName('span');
		var nLiW=aLi4[0].offsetWidth;
		var nSpanW=aSpan4[0].offsetWidth;
		
		for(var i=0; i<aLi4.length; i++){
			if(i !=0){
				aLi4[i].style.left=nLiW+nSpanW*(i-1)+'px';
			}
			(function(index){
				aSpan4[i].onmouseover=function(){
					for(var i=0; i<aLi4.length; i++){
						if(i<=index){
							var left=i*nSpanW
							move(aLi4[i],{'left':left});
						}else{
							var left=nLiW+nSpanW*(i-1);
							move(aLi4[i],{'left':left});
						}
					}	
				};	
			})(i);
		}
	})();
	// eg3
	(function(){
		var oEg3D=document.getElementById('eg3_1');
		var oEg3I=document.getElementById('eg3_2');
		var aSpan=oEg3D.getElementsByTagName('span');
		
		var R=oEg3D.offsetWidth/2;
		var total=6;
		var aSpan3=[];
		var timer=null;
		
		for(var i=0; i<total; i++){
			var oSpan=document.createElement('span');
			oSpan.className='show'+i;
			oEg3D.appendChild(oSpan);
			aSpan3.push(oSpan);
		}
		
		for(var i=0; i<aSpan.length; i++){
			move1(aSpan[i], i/total*360);
		}
		
		var bFlag=true;
		oEg3I.onclick=function(){
			
			for(var i=0; i<aSpan.length; i++){
				move(oEg3D,{opacity:1},{
					dutation:1500	
				});
				aSpan[i].style.opacity=1;
			}
			
			if(bFlag){
				bFlag=false;
				for(var i=0; i<aSpan.length; i++){
					move1(aSpan[i],0);
					clearInterval(timer);
					timer=setInterval(function(){
						 move(oEg3D,{opacity:0},{
							duration:500	 
						})
					},1000);
				}
			}else{
				clearInterval(timer);
				bFlag=true;
				for(var i=0; i<aSpan.length; i++){
					move1(aSpan[i], i/total*360);
				}
			}	
		};
		
		function move1(obj, target)
		{
			var start=obj.a || 0;
			var dis=target-start;
			var count=Math.floor(1000/30);
			var n=0;
			
			clearInterval(obj.timer);
			obj.timer=setInterval(function (){
				n++;
				
				// 角度
				var cur=start+dis*n/count;
				var x=R+Math.sin(a2d(cur))*R;
				var y=R-Math.cos(a2d(cur))*R;
				obj.style.left=x+'px';
				obj.style.top=y+'px';
				
				if (n == count)
				{
					clearInterval(obj.timer);
					obj.a=cur;
				}
			}, 30);
		}
		
		function a2d(a)
		{
			return a*Math.PI/180;
		}

	})();		
	// eg2    delete
	/*(function(){
		var oEg2box=document.getElementById('eg2box');
		var oEg2=document.getElementById('eg2');	

		var iSpeedX=0;
		var iSpeedY=0;
		var lastX=0;
		var lastY=0;
		var timer=null;
		
		oEg2.onmousedown=function(ev){
			var oEvent=ev || event;
			var disX=oEvent.clientX-oEg2.offsetLeft;
			var disY=oEvent.clientY-oEg2.offsetTop;
			
			document.onmousemove=function(ev){
				var oEvent=ev || event;
				var left=oEvent.clientX-disX;
				var top=oEvent.clientY-disY;
					
				oEg2.style.left=left+'px';
				oEg2.style.top=top+'px';
				
				iSpeedX=oEvent.clientX-lastX;
				iSpeedY=oEvent.clientY-lastY;
				lastX=oEvent.clientX;
				lastY=oEvent.clientY;
			};	
			
			 document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				
				EcMove();
			};

			return false;
		};
		
		 function EcMove(){
                timer=setInterval(function(){
                    iSpeedY+=1;
                    var l=oEg2.offsetLeft+iSpeedX;
                    var t=oEg2.offsetTop+iSpeedY;
					var maxT=oEg2box.offsetHeight-oEg2.offsetHeight;		
					var minL=oEg2box.offsetWidth-oEg2.offsetWidth;
					
                    if(t>=maxT){
                        t=maxT;
                        iSpeedY*=-0.9;
                        iSpeedX*=0.9;
                    }
                    if(t<=0){
                        t=0;
                        iSpeedY*=-0.9;
                        iSpeedX*=0.9;
                    }
                    if(l>=minL){
                        l=minL;
                        iSpeedX*=-0.9;
                        iSpeedY*=0.9;
                    }
                    if(l<=0){
                        l=0;
                        iSpeedX*=-0.9;
                        iSpeedY*=0.9;
                    }

                    oEg2.style.left=l+'px';
                    oEg2.style.top=t+'px';

                    if(Math.abs(iSpeedX)<1)iSpeedX=0;
                    if(Math.abs(iSpeedY)<1)iSpeedY=0;

                    if(iSpeedX==0 && iSpeedY==0 && t==maxT){
                        clearInterval(timer);
                    }
                },30);
            }
	})();	
	// eg2_1  delete
	(function(){
		var oEg21=document.getElementById('eg2_1');
		var aPos=[
			{left:rnd(0, 700), top:rnd(0, 300)},
			{left:rnd(0, 700), top:rnd(0, 300)},
			{left:rnd(0, 700), top:rnd(0, 300)},
			{left:rnd(0, 700), top:rnd(0, 300)}	
		]
		
		var now=0;
		next();

		function next()
		{
			move(oEg21, aPos[now%aPos.length], {
				complete:function (){
					now++;
					next();
				},
				duration:2000
			});
		}

	})();*/
	//footer
	oFTop.onmouseover=function(){
		this.src="images/ft02.jpg"	
	};
	oFTop.onmouseout=function(){
		this.src="images/ft01.jpg"	
	};
};



















/*
	Name:Javascript Follow Plugin
	Link:https://github.com/liutian1937/FollowEffect
	Author:ok8008@yeah.net
*/
(function(){
	var Follow = function(params){
		var _this = this;
		_this.objArr = params.obj;
		_this.arrLen = _this.objArr.length;
		_this.obj = _this.objArr[0];
		_this.bottomHeight = params.bottom;//距离底部的高度
		
		_this.mTop = parseInt(_this.getStyle(_this.obj,'marginTop')); //获取对象的margin-top值
		_this.posX = _this.position(_this.obj)['x'];
		_this.posY = _this.position(_this.obj)['y'];
		
		_this.bodyHeight = document.documentElement.scrollHeight;
		_this.sawHeight = document.documentElement.clientHeight;
		_this.minusHeight = _this.bodyHeight - _this.sawHeight - _this.bottomHeight;
		
		_this.newWrap = null;
		_this.newWrapHeight = null;
		_this.addEventCheck(window,'scroll',function(){_this.action()});
		_this.addEventCheck(window,'resize',function(){_this.reset()});
	};
	Follow.prototype = {
		//事件监听
		addEventCheck:function(obj,evt,fn){
			if (obj.addEventListener){
				obj.addEventListener(evt,fn,false);
			}else if(obj.attachEvent){
				obj.attachEvent('on'+evt,fn);
			}
		},
		position:function(elem){
			//获取对象在页面的位置
			var _this = this;
			return elem.offsetParent?{x:(elem.offsetLeft+_this.position(elem.offsetParent)['x']),y:(elem.offsetTop+_this.position(elem.offsetParent)['y'])}:{x:elem.offsetLeft,y:elem.offsetTop};
		},
		action:function(){
			var _this = this;
			var ScrollTop = document.body.scrollTop+document.documentElement.scrollTop;
			if(ScrollTop + _this.mTop > _this.posY){
				//滚动到对象位置的时候，复制
				_this.fixedFn();
				if(_this.newWrap && ScrollTop+_this.bottomHeight+_this.newWrapHeight > _this.bodyHeight){
					var bottom = ScrollTop + _this.bottomHeight + _this.newWrapHeight - _this.bodyHeight;
					if(_this.sawHeight > _this.newWrapHeight){
						bottom += _this.sawHeight - _this.newWrapHeight;
					}else{
						bottom = 0;
						if(ScrollTop > _this.minusHeight){
							bottom = ScrollTop - _this.minusHeight;
						}
					};
					_this.setStyle(_this.newWrap,{
						'bottom':bottom+'px',
						'top':'auto'
					});
				}
			}else{
				//如果滚动到对象上方，关闭显示
				_this.showObj(_this.objArr);
				if(_this.newWrap){
					_this.hideObj(_this.newWrap);
				}
			}
		},
		fixedFn:function(){
			//滚动条滚动的操作，显示或者添加新元素
			var _this = this;
			if(_this.newWrap){
				//如果存在，直接显示
				_this.setStyle(_this.newWrap,{
					'bottom':'auto',
					'top':'0px'
				});
				_this.hideObj(_this.objArr);
				_this.showObj(_this.newWrap);
			}else{
				//不存在，创建新结点，并复制原来结点
				_this.newWrap = document.createElement('div');
				var objClone = null;
				for(var i=0;i<_this.arrLen;i++){
					objClone = _this.objArr[i].cloneNode(true);
					objClone.setAttribute('id',''); //设置新结点的id为空，或者其他
					_this.newWrap.appendChild(objClone);
				};
				_this.setStyle(_this.newWrap,{
					'position':'fixed',
					'left':_this.posX+'px',
					'top':'0px',
					'bottom':'auto'
				});
				_this.obj.parentNode.appendChild(_this.newWrap);
				_this.newWrapHeight = _this.newWrap.offsetHeight;
			}
		},
		hideObj:function(obj){
			//隐藏结点
			var _this = this;
			if(_this.isArray(obj)){
				var len=obj.length;
				for(var i=0;i<len;i++){
					obj[i].style.display = 'none';
				}
			}else{
				obj.style.display = 'none';
			}
		},
		showObj:function(obj){
			//显示结点
			var _this = this;
			if(_this.isArray(obj)){
				var len=obj.length;
				for(var i=0;i<len;i++){
					obj[i].style.display = 'block';
				}
			}else{
				obj.style.display = 'block';
			}
		},
		isArray:function(obj) { 
			return Object.prototype.toString.call(obj) === '[object Array]'; 
		},
		getStyle:function(obj,attr){
			//获取样式
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			} 
			else{ 
				return document.defaultView.getComputedStyle(obj,null)[attr]; 
			} 
		},
		setStyle:function(obj,val){
			//设置样式
			for(var attr in val){
				obj.style[attr] = val[attr];
			}
		},
		reset:function(){
			//页面改变大小，重置参数
			var _this = this;
			_this.showObj(_this.objArr);
			_this.posX = _this.position(_this.obj)['x'];
			_this.posY = _this.position(_this.obj)['y'];
			
			_this.sawHeight = document.documentElement.clientHeight;
			_this.minusHeight = _this.bodyHeight - _this.sawHeight - _this.bottomHeight;
			if(_this.newWrap){
				_this.setStyle(_this.newWrap,{
					'left':_this.posX+'px'
				});
			}
			_this.action();
		}
	};
	window.Follow = Follow;
}());
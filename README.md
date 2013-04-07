Follow
======

Javascript Follow Plugin

Js 跟随滚动效果插件
支持定义多个跟随ID，采用css fixed属性，不支持ie6，兼容其他主流浏览器。
支持定义滚动到底部的最小高度，不会覆盖底部
页面大小resize后，插件会自动重置参数

=======
Js 跟随滚动效果插件<br/>
<ol>
<li>支持定义多个跟随ID，采用css fixed属性，不支持ie6，兼容其他主流浏览器。</li>
<li>支持定义滚动到底部的最小高度，不会覆盖底部</li>
<li>页面大小resize后，插件会自动重置参数</li>
</ol>


=======

使用方法
<pre>
&lt;script type="text/javascript" src="follow.js"&gt;&lt;/script&gt;

window.onload = function(){
	var followIds = [document.getElementById("follow"),document.getElementById("follow2")];
	new Follow({
		obj:followIds,
		bottom:150
	});
}
</pre>



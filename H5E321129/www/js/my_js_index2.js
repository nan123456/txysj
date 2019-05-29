/*!
 * =====================================================
 * wangka 
 * =====================================================
 */

//创建子页面，首个选项卡页面显示，其它均隐藏；
var subpages = ['my.html', 'team.html', 'attention.html', 'knowledge.html'];
var subpage_style = {
	top: '45px',
	bottom: '51px'
};	
var aniShow = {};	


//左边侧滑导航
var main,menu, mask = mui.createMask(_closeMenu);
var showMenu = false,mode = 'menu-move';

function back() {
	if (showMenu) {
		//菜单处于显示状态，返回键应该先关闭菜单,阻止主窗口执行mui.back逻辑；
		closeMenu();
		return false;
	} else {
		//菜单处于隐藏状态，执行返回时，要先close菜单页面，然后继续执行mui.back逻辑关闭主窗口；
		menu.close('none');
		return true;
	}
}

mui.plusReady(function() {
	//获取传值
	var self = plus.webview.currentWebview();
	var mobile = self.mobile;
	//传值
	var subpage_extras = {
		mobile:mobile
	};	
	setTimeout(function() {
		//关闭等待框
		plus.nativeUI.closeWaiting();
		//显示当前页面
		mui.currentWebview.show();
	}, 500);
	
	//创建子页面，首个选项卡页面显示，其它均隐藏；	
	var self = plus.webview.currentWebview();	// 获取当前窗口的WebviewObject对象
	for (var i = 0; i < 4; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style,subpage_extras);	//创建新的Webview窗口
		if (i > 0) {
			sub.hide();	//隐藏Webview窗口
		}else{
			temp[subpages[i]] = "true";
			mui.extend(aniShow,temp);	//extend(),将两个对象合并成一个对象，新对象aniShow
		}
		self.append(sub);
	}
	
	//防止真机返回键返回到登录页面
	mui.oldBack = mui.back;
	var backButtonPress = 0;
	mui.back = function(event) {
		backButtonPress++;
		if (backButtonPress > 1) {
			plus.runtime.quit();
		} else {
			plus.nativeUI.toast('再按一次退出应用');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};
	
	//自动创建leftmenu窗口；
	main = plus.webview.currentWebview();
	//setTimeout的目的是等待窗体动画结束后，再执行create webview操作，避免资源竞争，导致窗口动画不流畅；
	setTimeout(function () {
		//侧滑菜单默认隐藏，这样可以节省内存；
		menu = mui.preload({
			id: 'leftmenu.html',
			url: 'leftmenu.html',
			styles: {
				left: 0,
				width: '70%',
				zindex: -1
			}
		});
	},300);
	
	//检测服务器是否有新版本
	var thisversion=plus.runtime.version;
	
	keyUpdate="updateCheck",//取消升级键名
	keyAbort="updateAbort",//忽略版本键名
	cvz="";	//用于存放compareVersion函数的判断结果
	//比较版本大小，如果新版本nv大于旧版本ov则cvz=true，否则cvz=false
	function compareVersion( ov, nv ){		
		if ( !ov || !nv || ov=="" || nv=="" ){
			cvz="false";
			return false;			
		}
		var b=false,
		ova = ov.split(".",4);
		nva = nv.split(".",4);
		for ( var i=0; i<ova.length&&i<nva.length; i++ ) {
			var so=ova[i],no=parseInt(so),sn=nva[i],nn=parseInt(sn);
			if ( nn>no || sn.length>so.length  ) {
				cvz="true";
				return true;
			} else if ( nn<no ) {
				cvz="false";
				return false;
			}
		}
		if ( nva.length>ova.length && 0==nv.indexOf(ov) ) {
			cvz="true";
			return true;
		}
	}
	
	//改函数用于下载安装
	var createDownload=function(DownUrl){		
		plus.nativeUI.showWaiting("下载中，请稍等...");
		var dtask = plus.downloader.createDownload( DownUrl, {
			timeout:180
		}, function ( d, status ) {
			plus.nativeUI.closeWaiting();
			if ( status == 200 ) {
				// 下载成功
				var path = d.filename;
				//console.log(d.filename);
				//alert( "下载成功: " + path);
				var btnArray = ['是', '否'];
				mui.confirm('下载成功：'+path+'是否安装？', '同欣易送检', btnArray, function(e) {
					if (e.index == 0) {
						plus.runtime.install(path);  // 安装下载的apk文件
					} else {
						
					}
				});
			} else {
				//下载失败
				alert( "下载失败: " + status );
			}
		});
		
		dtask.start();		
	};
	
	mui.ajax(url+'update.php',{
		data:{
			
		},
		dataType:'json',
		type:'post',
		timeout:10000,
		success:function(data){	
			
			var version=data.version;
			var appurl=data.appurl;
			
			// 判断是否存在忽略版本号,是否设置自动升级
			var vabort = plus.storage.getItem( keyAbort );			
			var zdzcsjState = plus.storage.getItem("zdzcsjState");			
			if ( vabort && version==vabort ) {				
				// 忽略此版本
				return;
			}else{	
				compareVersion(thisversion,version);
				if (cvz=="true" && zdzcsjState=="true") {
					// 提示用户是否升级
					plus.nativeUI.confirm( "有新版本，是否更新？", function(i){
						if ( 0==i.index ) {		
							//alert(appurl);
							createDownload(appurl);
							//plus.runtime.openURL(appurl);
						} else if ( 1==i.index ) {
							plus.storage.setItem( keyAbort, version );
							plus.storage.setItem( keyUpdate, (new Date()).getTime().toString() );
						} else {
							plus.storage.setItem( keyUpdate, (new Date()).getTime().toString() );
						}
					}, "同欣易送检", ["下载新版","跳过该版","取消"] );
				}
				
			}
			
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			alert('ajax错误'+type);
		}
	});
	
	

});


//当前激活选项
var activeTab = subpages[0];
var title = document.getElementById("title");
//选项卡点击事件

mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if (targetTab == activeTab) {
		return;
	}
	//更换标题和右上角图标按钮
	 
	var info=document.getElementById('info');
	var team=document.getElementById('team');
	var attention=document.getElementById('attention');
	title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	if (title.innerHTML== '我的') {
		title.innerHTML = '同欣易送检';
		info.classList.remove('my_none');
		team.classList.add('my_none');
		attention.classList.add('my_none');
	}	
	if (title.innerHTML== '小组') {
		//title.innerHTML = '王卡';		
		info.classList.add('my_none');
		team.classList.add('my_none');
		attention.classList.add('my_none');
	}	
	if (title.innerHTML== '关注') {
		info.classList.add('my_none');
		team.classList.add('my_none');
		attention.classList.remove('my_none');
	}	
	if (title.innerHTML== '知识') {
		info.classList.add('my_none');
		team.classList.add('my_none');
		attention.classList.add('my_none');
	}	
	//显示目标选项卡
	//若为iOS平台或非首次显示，则直接显示
	if(mui.os.ios||aniShow[targetTab]){
		plus.webview.show(targetTab);
	}else{
		//否则，使用fade-in动画，且保存变量
		var temp = {};
		temp[targetTab] = "true";
		mui.extend(aniShow,temp);
		plus.webview.show(targetTab,"fade-in",300);
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});

 //自定义事件，模拟点击“首页选项卡”
document.addEventListener('gohome', function() {
	var defaultTab = document.getElementById("defaultTab");
	//模拟首页点击
	mui.trigger(defaultTab, 'tap');	//mui.trigger()方法可以动态触发特定DOM元素上的事件。
	//切换选项卡高亮
	var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
	if (defaultTab !== current) {
		current.classList.remove('mui-active');
		defaultTab.classList.add('mui-active');
	}
});

//////////////////////////////侧滑菜单////////////////////////////////////////////
//显示菜单菜单
function openMenu() {
	if (!showMenu) {
		//侧滑菜单处于隐藏状态，则立即显示出来；
		//显示完毕后，根据不同动画效果移动窗体；
		menu.show('none', 0, function() {
			switch (mode){
				case 'main-move':
					//主窗体开始侧滑；
					main.setStyle({
						left: '70%',
						transition: {
							duration: 150
						}
					});
					break;
				case 'menu-move':
					menu.setStyle({
						left: '0%',
						transition: {
							duration: 150
						}
					});
					break;
				case 'all-move':
					main.setStyle({
						left: '70%',
						transition: {
							duration: 150
						}
					});
					menu.setStyle({
						left: '0%',
						transition: {
							duration: 150
						}
					});
					break;
			}
		});
		//显示遮罩
		mask.show();
		showMenu = true;
	}
}
//关闭侧滑菜单
function closeMenu () {
	_closeMenu();
	//关闭遮罩
	mask.close();
}
//关闭侧滑菜单（业务部分）
function _closeMenu() {
	if (showMenu) {
		//关闭遮罩；
		switch (mode){
			case 'main-move':
				//主窗体开始侧滑；
				main.setStyle({
					left: '0',
					transition: {
						duration: 150
					}
				});
				break;
			case 'menu-move':
				//主窗体开始侧滑；
				menu.setStyle({
					left: '-70%',
					transition: {
						duration: 150
					}
				});
				break;
			case 'all-move':
				//主窗体开始侧滑；
				main.setStyle({
					left: '0',
					transition: {
						duration: 150
					}
				});
				//menu页面同时移动
				menu.setStyle({
					left: '-70%',
					transition: {
						duration: 150
					}
				});
				break;
		}
		//等窗体动画结束后，隐藏菜单webview，节省资源；
		setTimeout(function() {
			menu.hide();
		}, 200);
		//改变标志位
		showMenu = false;
	}
}

 //点击左上角图标，打开侧滑菜单；
document.querySelector('.mui-icon-bars').addEventListener('tap', openMenu);
//在android4.4中的swipe事件，需要preventDefault一下，否则触发不正常
//故，在dragleft，dragright中preventDefault
window.addEventListener('dragright', function(e) {
	e.detail.gesture.preventDefault();
});
window.addEventListener('dragleft', function(e) {
	e.detail.gesture.preventDefault();
});
//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作；
window.addEventListener("swiperight", openMenu);
//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
window.addEventListener("swipeleft", closeMenu);
//menu页面向左滑动，关闭菜单；
window.addEventListener("menu:swipeleft", closeMenu);
//重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
mui.menu = function() {
	if (showMenu) {
		closeMenu();
	} else {
		openMenu();
	}
}
//////////////////////////////侧滑菜单////////////////////////////////////////////		
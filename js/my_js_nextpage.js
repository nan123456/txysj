/*!
 * =====================================================
 * wangka 
 * =====================================================
 */

mui.init({
	swipeBack:true //启用右滑关闭功能
});
var aniShow = "pop-in";
//只有ios支持的功能需要在Android平台隐藏；
if (mui.os.android) {
	var list = document.querySelectorAll('.ios-only');
	if (list) {
		for (var i = 0; i < list.length; i++) {
			list[i].style.display = 'none';
		}
	}
	//Android平台暂时使用slide-in-right动画
	if(parseFloat(mui.os.version)<4.4){
		aniShow = "slide-in-right";
	}
}
		
var templates = {};
var getTemplate = function(name, header, content) {
	var template = templates[name];
	if (!template) {
		//预加载共用父模板；
		var headerWebview = mui.preload({
			url: header,
			id: name + "-main",
			styles: {
				popGesture: "hide",
			},
			extras: {
				mType: 'main'
			}
		});
		//预加载共用子webview
		var subWebview = mui.preload({
			url: !content ? "" : content,
			id: name + "-sub",
			styles: {
				top: '45px',
				bottom: '0px',
			},
			extras: {
				mType: 'sub'
			}
		});
		subWebview.addEventListener('loaded', function() {
			setTimeout(function() {
				subWebview.show();
			}, 50);
		});
		subWebview.hide();
		headerWebview.append(subWebview);
		//iOS平台支持侧滑关闭，父窗体侧滑隐藏后，同时需要隐藏子窗体；
		if (mui.os.ios) { //5+父窗体隐藏，子窗体还可以看到？不符合逻辑吧？
			headerWebview.addEventListener('hide', function() {
				subWebview.hide("none");
			});
		}
		templates[name] = template = {
			name: name,
			header: headerWebview,
			content: subWebview,
		};
	}
	return template;
};
var initTemplates = function() {
	getTemplate('default', 'template.html');
};

//主列表点击事件 
if (mobile='') {
	mobile='';
}
mui('.my_list').on('tap', 'a', function() {	
	
	var id = this.getAttribute('href');
	var href = this.href;
	//var type = this.getAttribute("open-type");
	//alert(type);	
		var webview_style = {
			popGesture: "close"
		};
		//侧滑菜单需动态控制一下zindex值；
		if (~id.indexOf('offcanvas-')) {
			webview_style.zindex = 9998;
			webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
		}
		//图标界面需要启动硬件加速
		if(~id.indexOf('icons.html')){
			webview_style.hardwareAccelerated = true;
		}
		mui.openWindow({
			id: id,
			url: this.href,
			styles: webview_style,
			extras:{
				zhi:"www",
				mobile:mobile,
				uid:uid
			},
			show: {		
				//autoShow:false,
				aniShow: aniShow
			},
			waiting: {
				autoShow: false,
				title:'请稍等，数据加载中...'
			}
		});
	
});

var index = null; //主页面
function openMenu() {
	!index && (index = mui.currentWebview.parent());
	mui.fire(index, "menu:open");
}
//在android4.4.2中的swipe事件，需要preventDefault一下，否则触发不正常
window.addEventListener('dragstart', function(e) {
	mui.gestures.touch.lockDirection = true; //锁定方向
	mui.gestures.touch.startDirection = e.detail.direction;
});
window.addEventListener('dragright', function(e) {
	if (!mui.isScrolling) {
		e.detail.gesture.preventDefault();
	}
});
 //监听右滑事件，若侧滑菜单未显示，右滑要显示菜单；
window.addEventListener("swiperight", function(e) {
	//默认滑动角度在-45度到45度之间，都会触发右滑菜单，为避免误操作，可自定义限制滑动角度；
	if (Math.abs(e.detail.angle) < 4) {
		openMenu();
	}
});
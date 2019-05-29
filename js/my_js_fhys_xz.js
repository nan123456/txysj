/*!
 * =====================================================
 * wangka 
 * =====================================================
 */
mui.init({
	swipeBack:true //启用右滑关闭功能
	});
	(function($) {
		$('#scroll').scroll({
			indicators: true //是否显示滚动条
			});
	})(mui);
	
	// H5 plus事件处理
	mui.plusReady(function(){
		//接收上一个页面传递的值
		//var self = plus.webview.currentWebview();
		//var name = self.name;
		//alert(name);
		
		//监听pickDateBtn，打开原生日期选择
		var pickDateBtn = document.getElementById("pickDateBtn");
		pickDateBtn.addEventListener('tap', function() {
			var dDate = new Date();
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
				pickDateBtn.value=d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			}, function(e) {
				//alert(e);
				}, {
					title: "请选择日期",
				});
		
		});
		
		//监听upload_camera,打开原生操作列表
		var upload_camera1=document.getElementById('upload_camera1');
		var upload_camera2=document.getElementById('upload_camera2');
		var upload_camera3=document.getElementById('upload_camera3');
		var upload_camera4=document.getElementById('upload_camera4');
		upload_camera1.addEventListener('tap',function () {
			myactionSheet('yszp');
		});	
		upload_camera2.addEventListener('tap',function () {
			myactionSheet('hxpmt');
		});
		upload_camera3.addEventListener('tap',function () {
			myactionSheet('ysjl');
		});
		upload_camera4.addEventListener('tap',function () {
			myactionSheet('bcjl');
		});
		var myactionSheet=function(lx){
			var btnArray = [
			{title:"拍照"},
			//{title:"录像"},录像函数getVideo()
			{title:"相册"}
			];
			plus.nativeUI.actionSheet( {
				title:"操作",
				cancel:"取消",
				buttons:btnArray
			}, function(e){
				var index = e.index;
				var text = "你刚点击了\"";
				switch (index){
					case 0:
						text += "取消";
						break;
					case 1:
						getImage(lx);
						text += "拍照";
						break;
					case 2:
						galleryImg(lx);
						text += "相册";
						break;
				}
				//info.innerHTML = text+"\"按钮";
			} );
		};
		
		
	
	});
/*
document.getElementById('textarea2').addEventListener('tap',function(){
	mui.openWindow({
		url: "my_project_fhys_xz_rm.html",
		id: this.href,
		waiting:{
			autoShow:false
			}
	});
	return;
});
*/
var i=1,gentry=null,w=null;
var hl=null,le=null,de=null,ie=null;
var unv=true;
// H5 plus事件处理
function plusReady_camera(){
	// 获取摄像头目录对象
	plus.io.resolveLocalFileSystemURL( "_doc/", function ( entry ) {
		entry.getDirectory( "camera/fhys", {create:true}, function ( dir ) {
			gentry = dir;
			//updateHistory();
		}, function ( e ) {
			outSet( "Get directory \"camera\fhys\" failed: "+e.message );
		} );
	}, function ( e ) {
		outSet( "Resolve \"_doc/\" failed: "+e.message );
	} );
}
if(window.plus){
	plusReady_camera();
}else{
	document.addEventListener("plusready",plusReady_camera,false);
}
// 监听DOMContentLoaded事件
document.addEventListener("DOMContentLoaded",function(){
	// 获取DOM元素对象
	//验收照片
	hl_yszp=document.getElementById("history_yszp");
	le_yszp=document.getElementById("empty_yszp");	
	//户型平面图
	hl_hxpmt=document.getElementById("history_hxpmt");
	le_hxpmt=document.getElementById("empty_hxpmt");
	//验收记录
	hl_ysjl=document.getElementById("history_ysjl");
	le_ysjl=document.getElementById("empty_ysjl");
	//补充记录
	hl_bcjl=document.getElementById("history_bcjl");
	le_bcjl=document.getElementById("empty_bcjl");
	
	
	de=document.getElementById("display");
	if(ie=document.getElementById("index")){
		ie.onchange=indexChanged;
	}
	// 判断是否支持video标签
	unv=!document.createElement('video').canPlayType;
},false );

//选择前后摄像头
function changeIndex() {
	outSet( "选择摄像头：" );
	ie.focus();
}
function indexChanged() {
	de.innerText = ie.options[ie.selectedIndex].innerText;
	i = parseInt( ie.value );
	outLine( de.innerText );
}

// 拍照函数
function getImage(lx) {
	outSet( "开始拍照：" );
	var cmr = plus.camera.getCamera();	//获取摄像头管理对象	
	//进行拍照操作cmr.captureImage( successCB, errorCB, option );
	cmr.captureImage(function(p){
		outLine( "成功："+p );
		// resolveLocalFileSystemURL(url,succesCB,errorCB )通过URL参数获取目录对象或文件对象
		plus.io.resolveLocalFileSystemURL( p, function ( entry ) {
			createItem( p,entry,lx);
		}, function ( e ) {
			outLine( "读取拍照文件错误："+e.message );
		} );
	}, function ( e ) {
		outLine( "失败："+e.message );
	}, {filename:"_doc/camera/fhys/",index:1} );
}

// 从相册中选择图片
function galleryImg(lx) {
	// 从相册中选择图片
	outSet("从相册中选择图片:");
    plus.gallery.pick( function(path){
    	outLine(path);
    	plus.io.resolveLocalFileSystemURL( path, function ( entry ) {
			createItem(path,entry,lx);
		}, function ( e ) {
			outLine( "读取拍照文件错误："+e.message );
		} );
        //showImg( path );
        //createItem(path);
    }, function ( e ) {
    	outSet( "取消选择图片" );
    }, {filter:"image"} );
}			
// 录像
function getVideo() {
	outSet( "开始录像：" );
	var cmr = plus.camera.getCamera();
	cmr.startVideoCapture( function ( p ) {
		outLine( "成功："+p );
		plus.io.resolveLocalFileSystemURL( p, function( entry) {
			createItem( entry );
		}, function( e ) {
			outLine( "读取录像文件错误："+e.message );
		} );
	}, function( e ){
		outLine( "失败："+e.message );
	}, {filename:"_doc/camera/fhys/",index:i} );
}
			
// 显示文件
function displayFile( li ) {
	if ( w ) {
		outLine( "重复点击！" );
		return;
	}
	if ( !li || !li.entry ) {
		ouSet( "无效的媒体文件" );
		return;
	}
	var name = li.entry.name;
	var suffix = name.substr(name.lastIndexOf('.'));
	var url = "";
	if ( suffix==".mov" || suffix==".3gp" || suffix==".mp4" || suffix==".avi" ){
		//if(unv){plus.runtime.openFile("_doc/camera/"+name);return;}
		url = "camera_video.html";
	} else {
		url = "camera_image.html";
	}
	w=plus.webview.create(url,url,{hardwareAccelerated:true,scrollIndicator:'none',scalable:true,bounce:"all"});
	w.addEventListener( "loaded", function(){
		w.evalJS( "loadMedia('"+li.entry.toLocalURL()+"')" );
		//w.evalJS( "loadMedia(\""+"http://localhost:13131/_doc/camera/"+name+"\")" );
		}, false );
		w.addEventListener( "close", function() {
			w = null;
		}, false );
		w.show( "pop-in" );
}
			
// 添加播放项
var index;
var index_yszp=1;
var index_hxpmt=1;
var index_ysjl=1;
var index_bcjl=1;
function createItem( p,entry,lx ) {
	var li = document.createElement("li");
	li.className = "ditem";
	li.innerHTML = '<span class="iplay"><font class="aname"></font><br/><font class="ainf"></font></span>';
	li.setAttribute( "onclick", "displayFile(this);" );
	if (lx=='yszp') {
		hl=hl_yszp;
		le=le_yszp;
		files_yszp.push({name:"upfile"+index_yszp,path:p});
		index_yszp++;
	}else if (lx=='hxpmt') {
		hl=hl_hxpmt;
		le=le_hxpmt;
		files_hxpmt.push({name:"upfile"+index_hxpmt,path:p});
		index_hxpmt++;
	}else if (lx=='ysjl') {
		hl=hl_ysjl;
		le=le_ysjl;
		files_ysjl.push({name:"upfile"+index_ysjl,path:p});
		index_ysjl++;	
	}else if (lx=='bcjl') {
		hl=hl_bcjl;
		le=le_bcjl;
		files_bcjl.push({name:"upfile"+index_bcjl,path:p});
		index_bcjl++;	
	}else{
		
	}
	hl.insertBefore( li, le.nextSibling );
	li.querySelector(".aname").innerText = entry.name;
	li.querySelector(".ainf").innerText = "...";
	li.entry = entry;
	updateInformation( li );
	// 设置空项不可见
	le.style.display = "none";
}
// 获取录音文件信息
function updateInformation( li ) {
	if ( !li || !li.entry ) {
		return;
	}
	var entry = li.entry;
	entry.getMetadata( function ( metadata ) {
		li.querySelector( ".ainf" ).innerText = dateToStr( metadata.modificationTime );
	}, function ( e ) {
		outLine( "获取文件\""+entry.name+"\"信息失败："+e.message );
	} );
}
// 获取录音历史列表
function updateHistory() {
	if ( !gentry ) {
		return;
	}
	var reader = gentry.createReader();
	reader.readEntries( function ( entries ) {
		for ( var i in entries ) {
			if ( entries[i].isFile ) {
				createItem( entries[i] );
			}
		}
		}, function ( e ) {
			outLine( "读取录音列表失败："+e.message );
		} );
}

// 清除历史记录
function cleanHistory(lx) {	
	var btnArray = ['确定', '取消'];
	mui.confirm('您确定要清空记录吗？', '警告:', btnArray, function(e) {
		if (e.index == 0) {
			if (lx=='yszp') {				
				hl_yszp.innerHTML = '<li id="empty_yszp" class="ditem-empty">无历史记录</li>';
				le_yszp= document.getElementById( "empty_yszp" );
				files_yszp=[];
				index_yszp=1;
			}else if (lx=='hxpmt') {
				hl_hxpmt.innerHTML = '<li id="empty_hxpmt" class="ditem-empty">无历史记录</li>';
				le_hxpmt= document.getElementById( "empty_hxpmt" );
				files_hxpmt=[];
				index_hxpmt=1;
			}else if (lx=='ysjl') {
				hl_ysjl.innerHTML = '<li id="empty_ysjl" class="ditem-empty">无历史记录</li>';
				le_ysjl= document.getElementById( "empty_ysjl" );
				files_ysjl=[];
				index_ysjl=1;
			}else if (lx=='bcjl') {
				hl_bcjl.innerHTML = '<li id="empty_bcjl" class="ditem-empty">无历史记录</li>';
				le_bcjl= document.getElementById( "empty_bcjl" );
				files_bcjl=[];
				index_bcjl=1;
			}else{
				
			}
			
			// 删除音频文件
			outSet( "清空拍照录像历史记录：ok" );
			/*
			gentry.removeRecursively( function () {
				// Success
				outLine( "成功！" );
			}, function ( e ) {
				outLine( "失败："+e.message );
			});
			*/
		} else {
			//info.innerText = '取消';
			return;
		}
	});
}


////////////上传文件/////////////////////////////////////////////
//上传
var server=url+"fileupload.php";
//var server="http://demo.dcloud.net.cn/helloh5/uploader/upload.php";
var files=[];
var files_yszp=[];
var files_hxpmt=[];
var files_ysjl=[];
var files_bcjl=[];
function upload(lx,clean){	
	//alert(typeof(lx));
	if (lx=='yszp') {		
		files=files_yszp;		
	}else if (lx=='hxpmt') {		
		files=files_hxpmt;		
	}else if (lx=='ysjl') {	
		files=files_ysjl;
	}else if (lx=='bcjl') {	
		files=files_bcjl;	
	}else{
		
	}
	if(files.length<=0){
		plus.nativeUI.alert("没有添加上传文件！");
		return;
	}
	outSet("开始上传：")
	var wt=plus.nativeUI.showWaiting();
	var task=plus.uploader.createUpload(server,{method:"POST"},	function(t,status){ 
		//上传完成
		if(status==200){
			outLine("上传成功："+t.responseText);
			wt.close();
			var button_lx=document.getElementById(lx);
			var button_clean=document.getElementById(clean);
			button_lx.disabled=true;
			button_clean.disabled=true;
			button_lx.innerText="上传成功";
				/*
				plus.storage.setItem("uploader",t.responseText);
				var w=plus.webview.create("uploader_ret.html","uploader_ret.html",{scrollIndicator:'none',scalable:false});
				w.addEventListener("loaded",function(){
					wt.close();
					w.show("slide-in-right",300);
				},false);
				*/
		}else{
			outLine("上传失败："+status);
			wt.close();
		}
	});
	task.addData("lx",lx);
	task.addData("uid",getUid());	
	nub=files.length.toString();	
	task.addData("nub",nub);
	task.addData("mchen",mchen());
	for(var i=0;i<files.length;i++){
		var f=files[i];
		task.addFile(f.path,{key:f.name});
	}
	task.start();
	files=[];
}

// 产生一个随机数
function getUid(){
	return Math.floor(Math.random()*100000000+10000000).toString();
}
// 获取栋号房号
function mchen(){
	var dhao=document.getElementById('dhao').value;
	var fhao=document.getElementById('fhao').value;
	return dhao+fhao;
}
////////////上传文件/////////////////////////////////////////////
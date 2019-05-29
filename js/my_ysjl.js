//区域滚动,需手动初始化scroll控件
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
(function($) {
	$('#scroll').scroll({
		indicators: false //是否显示滚动条
	});

})(mui);
//mui.init({
//	swipeBack: true, //启用右滑关闭功能
//	gestureConfig: {
//		doubletap: true, //默认为false
//		longtap: true, //默认为false
//
//	}
//});

mui.plusReady(function() {

	//获取url参数值
	function geturl(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	var xmid = geturl("id");
	var CityName = geturl("CityName");
	var ysbw = geturl("jcbw");//检查部位
	var ysrq = geturl("jcrq");//检查日期
	var mc = geturl("mc");
	var sjc = geturl("timestamp");
	var checkId = geturl("checkId");
	var gcmc = geturl("gcmc");
	//	alert(checkId);
	//      alert(sjc)
	ysbw = decodeURI(ysbw);
	gcmc = decodeURI(gcmc);
	CityName = decodeURI(CityName);//转码成中文
//	alert(CityName)
	mc = decodeURI(mc);
	//				alert(xmid+"  "+mc+"  "+sjc); 
	var a1 = document.getElementById('a1');

	var mc = document.getElementById("mc"); //姓名
	var jcbw = document.getElementById("jcbw"); //检查部位
	var jcrq = document.getElementById("jcrq"); //检查日期
	var jcry = document.getElementById("jcry"); //检查人员
	var sgbz = document.getElementById("sgbz"); //施工班组
	var zzxm = document.getElementById("zzxm"); //组长姓名
	var lxdh = document.getElementById("lxdh"); //联系电话
	var sgrq = document.getElementById("sgrq"); //施工日期
	var gzms = document.getElementById("gzms"); //工作描述

	var save = document.getElementById('save'); //保存按钮
	//	var fjck = document.getElementById('fjck'); //附件查看
	var fjscxg = document.getElementById('fjscxg'); //附件上传/修改

	var myform = document.getElementById('myform'); //基本信息
	var uploader = document.getElementById('uploader'); //上传附件

	var my_popover = document.getElementById('my_popover'); //右上角按钮
	var plsr = document.getElementById('plsr'); //批量按钮
	
	var bhao = document.getElementById('bhao'); //编号
	var cdlx = document.getElementById('cdlx'); //测点类型
	var scz = document.getElementById('scz'); //实测值
	var scgbi = document.getElementById('scgbi'); //关闭
	var scqding = document.getElementById('scqding'); //确定

	var mydiv = document.getElementById('mydiv'); //测点布置图
	var kbbhao = document.getElementById('kbbhao'); //测点编号
	var kbcdlx = document.getElementById('kbcdlx'); //测点类型
	var kbscz = document.getElementById('kbscz'); //实测值
	var kbgbi = document.getElementById('kbgbi'); //关闭
	var kbqding = document.getElementById('kbqding'); //确定

	var xztp = document.getElementById("xztp"); //选择图片
	var qkbz = document.getElementById('qkbz'); //清空布置
	var bcbz = document.getElementById('bcbz'); //保存布置
	var yjbz = document.getElementById('yjbz'); //一键布置
	var out = document.getElementById('out'); //操作
	var jp = document.getElementById("jp"); //截屏布点
	var jccd = new Array();//检测被隐藏的span1
	var zhtj = document.getElementById("zhtj");
	//监听upload_camera,打开原生操作列表
	var upload_camera = document.getElementById('upload_camera');


	
	//基本信息，读数据
	var cdfj = [];
	//右上角按钮监听
	my_popover.addEventListener('tap', function() {
		//		alert(sjc)
		var btnArray = [
            {title:"新增测点"},
            {title:"批量实测"}
            ];
		plus.nativeUI.actionSheet({
			title: "操作",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			switch(index) {
				case 0: //取消								
					break;
				case 1: //新增测点
					//遮罩效果
					ws = null;
					ws = plus.webview.currentWebview();
					// 显示遮罩层
					ws.setStyle({
						mask: "rgba(0,0,0,0.7)"
					});
					// 点击关闭遮罩层
					//					ws.addEventListener("maskClick", function() {
					//						ws.setStyle({
					//							mask: "none"
					//						});
					//					}, false);
					//打开新webview，模仿弹窗
					mui.openWindow({
						url: 'my_project_ysjl_xzcd.html',
						id: 'my_project_ysjl_xzcd',
						styles: {
							width: '80%',
							height: '80%',
							margin: 'auto'
						},
						extras: {
							name: 'w',
							//							xmid: xmid,
							//							gclb: gclb,
							sjc: sjc,
							checkId: checkId
						},
						show: {
							autoShow: true, //页面loaded事件发生后自动显示
							aniShow: 'slide-in-right', //页面显示动画
							duration: '100' //页面动画持续时间
						},
						waiting: {
							autoShow: false, //自动显示等待框
						},
					});
					break;
					case 2: //新增测点
					//遮罩效果
					ws = null;
					ws = plus.webview.currentWebview();
					// 显示遮罩层
					ws.setStyle({
						mask: "rgba(0,0,0,0.7)"
					});
					// 点击关闭遮罩层
					//					ws.addEventListener("maskClick", function() {
					//						ws.setStyle({
					//							mask: "none"
					//						});
					//					}, false);
					//打开新webview，模仿弹窗
					mui.openWindow({
						url: 'my_project_ysjl_yjsr.html',
						id: 'my_project_ysjl_yjsr',
						styles: {
							width: '80%',
							height: '80%',
							margin: 'auto'
						},
						extras: {
							name: 'w',
							//							xmid: xmid,
							//							gclb: gclb,
							sjc: sjc,
							checkId: checkId
						},
						show: {
							autoShow: true, //页面loaded事件发生后自动显示
							aniShow: 'slide-in-right', //页面显示动画
							duration: '100' //页面动画持续时间
						},
						waiting: {
							autoShow: false, //自动显示等待框
						},
					});
					break;
			}
		});
	});
	
	//一键输入按钮监听
//	plsr.addEventListener('tap', function() {
//		//打开新webview，模仿弹窗
//		document.getElementById("scqding").disabled=true;
//					mui.openWindow({
//						url: 'my_project_ysjl_yjsr.html',
//						id: 'my_project_ysjl_yjsr',
//						styles: {
//							
//						},
//						extras: {
//							sjc: sjc,
//							checkId: checkId
//						},
//						show: {
//							autoShow: true, //页面loaded事件发生后自动显示
//							aniShow: 'slide-in-right', //页面显示动画
//							duration: '100' //页面动画持续时间
//						},
//						waiting: {
//							autoShow: false, //自动显示等待框
//						},
//					});});
	//接收值
	window.addEventListener('json_bj', function(event) {
		//关闭遮罩层
		setTimeout(function() {
			ws.setStyle({
				mask: "none"
			});
			ws = null;
		}, 10);
		var flag = event.detail.flag;
		if(flag == 'ok') {
			window.location.reload();
			var newcdlx = event.detail.cdlx;
			var newcdgs = event.detail.cdgs; //测点个数
			var newcdlxbh = event.detail.cdlxbh; //测点编号
			var newqsbh = event.detail.qsbh - 0; //起始编号数字部分
			//			
			for(var i = newqsbh; i < newcdgs - 0 + newqsbh; i++) {
				var newbhao = newcdlxbh + i;
				//				createscsl(newbhao, newcdlx);  
				createkbcd(newbhao, '', '');
			}
		}
	});
	//附件上传修改监听
	fjscxg.addEventListener('tap', function() {
		myform.classList.add('my_none');
		uploader.classList.remove('my_none');
	});

	//a1基本信息监听
	a1.addEventListener('tap', function() {
		myform.classList.remove('my_none');
		uploader.classList.add('my_none');
	});
	var camera = upload_camera.getElementsByClassName('upload_camera');
	//				alert(camera.length);

	//拍照处理
	for(var i = 0; i < camera.length; i++) {
		camera[i].addEventListener('tap', function() {
			myactionSheet('yszp');
		});
	}

	var myactionSheet = function(lx) {
		var btnArray = [{
			title: "拍照"
		}, {
			title: "相册"
		}];
		plus.nativeUI.actionSheet({
			title: "操作",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			var text = "你刚点击了\"";
			switch(index) {
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
		});
	};
//alert(ysbw+"   "+ysrq);
	//获取基本信息
	var ajaxformdata = function() {
		mui.ajax(url + 'my_plus/my_project_xinx.php', {
			data: {
				sjc: sjc
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				//				alert(data);
				//				alert(data[0].检查日期);
				if (data[0].检查日期 !='') {
					var length = data.length;
					for(var i = 0; i < length - 1; i++) {
						mc.value = CityName;
						jcbw.value = ysbw;
						jcrq.value = data[i].检查日期;
						jcry.value = data[i].检查人员;
						sgbz.value = data[i].施工班组;
						zzxm.value = data[i].组长姓名;
						lxdh.value = data[i].联系电话;
						sgrq.value = data[i].施工日期;
						gzms.value = data[i].工作描述;
					}
				} else{
					mc.value = CityName;
					jcbw.value = ysbw;
					jcrq.value = ysrq;
				}
				
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//alert('ajax错误'+type); 
//				return callback('ajax错误' + type + errorThrown);
			}
		});
	};
		
	
	//日期监听
	jcrq.addEventListener('tap', function() {
		plus.nativeUI.pickDate(function(e) {
			d = e.date;
			jcrq.value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		});
	});
	//基本信息保存
	save.addEventListener('tap', function() {
		var mydata = {
			mc: mc.value, //名称
			jcbw: jcbw.value, //检查部位
			jcrq: jcrq.value, //检查日期
			jcry: jcry.value, //检查人员
			sgbz: sgbz.value, //施工班组
			zzxm: zzxm.value, //组长姓名
			lxdh: lxdh.value, //联系电话
			sgrq: sgrq.value, //施工日期
			gzms: gzms.value, //工作描述
			sjc: sjc
		};

		//验证数据，存到数据库
		ajaxform(mydata, function(err) {
			if(err) {
				plus.nativeUI.toast(err);
				return;
			};
			plus.nativeUI.alert('保存成功');
			//					mui.back();
		});

	});

	//验证数据，存到数据库
	var ajaxform = function(mydata, callback) {
		callback = callback || $.noop;
		mydata = mydata || {};
		mydata.mc = mydata.mc || '';
		mydata.jcbw = mydata.jcbw || '';
		mydata.jcrq = mydata.jcrq || '';
		mydata.jcry = mydata.jcry || '';
		mydata.sgbz = mydata.sgbz || '';
		mydata.zzxm = mydata.zzxm || '';
		mydata.lxdh = mydata.lxdh || '';
		mydata.sgrq = mydata.sgrq || '';
		mydata.gzms = mydata.gzms || '';
		mydata.sjc = mydata.sjc || '';
		//		alert(mydata.sjc+'   '+mydata.mc+'   '+mydata.jcbw+'    '+mydata.jcrq+'   '+mydata.jcry+'    '+mydata.sgbz+'   '+mydata.zzxm);
		if(mydata.mc.length < 1) {
			return callback('名称不能为空！');
		}
		if(mydata.jcbw.length < 1) {
			return callback('检查部位不能为空！');
		}
		if(mydata.jcrq.length < 1) {
			return callback('检查日期不能为空！');
		}
//		if(mydata.sgbz.length < 1) {
//			return callback('施工班组不能为空！');
//		}
//		if(mydata.zzxm.length < 1) {
//			return callback('组长姓名不能为空！');
//		}
//		if(mydata.sgrq.length < 1) {
//			return callback('施工日期不能为空！');
//		}
		//		alert(mydata.mc)
		mui.ajax(url + 'my_plus/my_fhys_bj_xie.php', {
			data: {
				sjc: mydata.sjc,
				mc: mydata.mc,
				jcbw: mydata.jcbw,
				jcrq: mydata.jcrq,
				jcry: mydata.jcry,
				sgbz: mydata.sgbz,
				zzxm: mydata.zzxm,
				lxdh: mydata.lxdh,
				sgrq: mydata.sgrq,
				gzms: mydata.gzms
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				//				alert(data); 
				if(data.result == 'success') {
					return callback();
				} else {
					return callback('服务器返回error');
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//alert('ajax错误'+type);
				return callback('ajax错误' + type + errorThrown);
			}
		});
	};

	//在画布中获取图片
	var ajaxformdata2 = function() {
		var sclb;
		mui.ajax(url + 'my_plus/my_project_xinx2.php', {
			data: {
				sjc: sjc,
				//				gclb: gclb,
				sclb: '实测实量'
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				//						alert(data);
				var length = data.length;
				for(var i = 0; i < length - 1; i++) {
					if(i == length - 2) {
						cdfj = data[i].测点附件;
						base64url = url + "upload/" + cdfj;
						var img = base64url;

						function getBase64Image(img) {
							var canvas = document.createElement("canvas");
							canvas.width = img.width;
							canvas.height = img.height;
							var ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0, img.width, img.height);
							var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
							var dataURL = canvas.toDataURL("image/" + ext);
							return dataURL;
						}

						var image = new Image();
						image.src = img;
						image.onload = function() {
							var base64 = getBase64Image(image);
							mydiv.src = base64;
						}//将图片转换为base64格式
					} else continue
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//alert('ajax错误'+type); 
//				return callback('ajax错误' + type + errorThrown);
			}
		});
	}
	//实测实量，获取数据函数 
	var ajaxscsl = function() {
		//				alert(sjc+"  "+cdlx);
		mui.ajax(url + 'my_fhys_bj_scsl.php', {
			data: {
				sjc: sjc
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				//								alert(data); 
				var length = data.length;
				hgl1 = 0; //若测点不合格，hgl1+1 （单个测点类型）
				hgl3 = 0; //每一个测点类型循环的轮数
				hgl5 = 0; //若测点不合格，hgl5+1 （总）
				hgl6 = 0; //所有测点类型循环的轮数
				hgl7 = 0; //综合统计合格率 
				for(var i = 0; i < length - 1; i++) {
					var bhao = data[i].编号;
					var cdlx = data[i].测点类型;
					var scz = data[i].实测值;
					//					var sm = data[i].说明;
					var pageX = data[i].pageX;
					var pageY = data[i].pageY;
					//					var ppbz = data[i].评判标准;
					var j = i + 1;
//															alert(data[i].实测值 );
					if(i >= 0 && i < length - 1) {
						if(data[j].测点类型 != cdlx) {
							var bz = 1;
						} else {
							var bz = '';
						}
					} else {
						var bz = '';
					}
					//					alert(bhao+ "  "+cdlx+ "  "+scz+ "  "+bz+ "  "+length+"  "+i);
					createscsl(bhao, cdlx, scz, bz, length, i);
					createkbcd(bhao, pageX, pageY,i);
				}
				//								alert(length-1+"  "+hgl1); 
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				alert('ajax错误' + type);
				//				return callback('ajax错误' + type + errorThrown);
			}
		});
	};

	//实测实量列表创建函数
	var createscsl = function(bhao, cdlx, scz, bz, length, i) {
//				alert(bhao+ "  "+cdlx+ "  "+scz+ "  "+bz+ "  "+length+"  "+i);
		hgl3 = hgl3 + 1;
		hgl6 = hgl6 + 1;
		hgl7 = ((1 - (hgl5 / hgl6).toFixed(2)) * 100) + '%';
		//				return(hgl7);
		//		alert(hgl3+ "  "+hgl6+ "  "+hgl7);
		if(bz) {
			var hgl2 = hgl1;
			hgl4 = ((1 - (hgl2 / hgl3).toFixed(2)) * 100) + '%';
			//			createtjfx(bhao, cdlx, hgl4);
			hgl1 = 0;
			hgl3 = 0;
		} else {

		}

		//		ppbz1 = ppbz.split("*");
		scz = Number(scz);

		var ul = document.getElementsByClassName('mui-table-view');
		var li = document.createElement("li");
		li.className = "mui-table-view-cell";

		if(scz) {
			li.innerHTML = '<div class="my_table my_td_width30">' + bhao + '</div><div class="my_table my_td_width40">' + cdlx + '</div><div id="sc' + bhao + '" class="my_table my_td_width30"><label style = "color :black;">' + scz + '</label></div>';
		} else {
			hgl1 = hgl1 + 1;
			hgl5 = hgl5 + 1;
			//						alert(hgl1+"  "+scz);
			li.innerHTML = '<div class="my_table my_td_width30">' + bhao + '</div><div class="my_table my_td_width40">' + cdlx + '</div><div id="sc' + bhao + '" class="my_table my_td_width30"><label style = "color :red;">' + scz + '</label></div>';
		}
		ul[0].appendChild(li);
	};

	//创建统计分析
	//	var createtjfx = function(bhao, jcnr, hgl4) {
	//		bhao = bhao.substr(0, 1);
	//		var zhtj = document.getElementById("zhtj");
	//		var ul1 = document.getElementById("tjfx");
	//		var li1 = document.createElement("li");
	//		li1.className = "mui-table-view-cell";
	//		zhtj.innerHTML = hgl7;
	//		li1.innerHTML = '<div class="my_table my_td_width30">' + bhao + '</div><div class="my_table my_td_width40">' + jcnr + '</div><div class="my_table my_td_width30"><label>' + hgl4 + ' </label></div>';
	//		ul1.appendChild(li1);
	////		uploadhgl(hgl7);
	//	};

	//上传综合统计合格率
	//	var uploadhgl = function(hgl7) {
	//		mui.ajax(url + 'my_plus/my_scsl_uploadhgl.php', {
	//			data: {
	//				sjc: sjc,
	//				gcmc: gcmc,
	//				xmid: xmid,
	////				gclb: gclb,
	//				hgl: hgl7,
	//				checkId: checkId,
	//				scgg: "实测实量" 
	//			},
	//			dataType: 'json',
	//			type: 'post',
	//			timeout: 10000,
	//			success: function(data) {
	//
	//			},
	//			error: function(xhr, type, errorThrown) {
	//				//异常处理；
	//				return callback('ajax错误' + type + errorThrown);
	//			}
	//		}); 
	//	}
	//编号设置
	var createkbcd = function(bhao, pageX, pageY,i) {
		var bzcd = document.getElementById("cd");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");//同步span1，用于截图
		span1.id = "cd" + bhao;
		span2.id = "jt" + bhao;
		var firstWord = bhao.substr(0, 1);
		//						根据不同的测点类型不同的颜色
		if(firstWord == 'A') {
			span1.className = "mui-badge mui-badge-yellow";
			span2.className = "mui-badge mui-badge-yellow";
		} else if(firstWord == 'B') {
			span1.className = "mui-badge mui-badge-blue";
			span2.className = "mui-badge mui-badge-blue";
		} else if(firstWord == 'C') {
			span1.className = "mui-badge mui-badge-red";
			span2.className = "mui-badge mui-badge-red";
		} else if(firstWord == 'D') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'E') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		} else if(firstWord == 'F') {
			span1.className = "mui-badge mui-badge-blue";
			span2.className = "mui-badge mui-badge-blue";
		} else if(firstWord == 'G') {
			span1.className = "mui-badge mui-badge-red";
			span2.className = "mui-badge mui-badge-red";
		} else if(firstWord == 'H') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'I') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		} else if(firstWord == 'J') {
			span1.className = "mui-badge mui-badge-blue";
			span2.className = "mui-badge mui-badge-blue";
		} else if(firstWord == 'K') {
			span1.className = "mui-badge mui-badge-red";
			span2.className = "mui-badge mui-badge-red";
		} else if(firstWord == 'L') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'M') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		} else if(firstWord == 'N') {
			span1.className = "mui-badge mui-badge-blue";
			span2.className = "mui-badge mui-badge-blue";
		} else if(firstWord == 'O') {
			span1.className = "mui-badge mui-badge-red";
			span2.className = "mui-badge mui-badge-red";
		} else if(firstWord == 'P') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'Q') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		} else if(firstWord == 'R') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'S') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		} else if(firstWord == 'T') {
			span1.className = "mui-badge mui-badge-blue";
			span2.className = "mui-badge mui-badge-blue";
		} else if(firstWord == 'U') {
			span1.className = "mui-badge mui-badge-red";
			span2.className = "mui-badge mui-badge-red";
		} else if(firstWord == 'V') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'W') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		} else if(firstWord == 'X') {
			span1.className = "mui-badge mui-badge-red";
			span2.className = "mui-badge mui-badge-red";
		} else if(firstWord == 'Y') {
			span1.className = "mui-badge mui-badge-purple";
			span2.className = "mui-badge mui-badge-purple";
		} else if(firstWord == 'Z') {
			span1.className = "mui-badge mui-badge-green";
			span2.className = "mui-badge mui-badge-green";
		}
		span1.innerText = bhao;
		span2.innerText = bhao;
		span2.classList.add('my_none');
		bzcd.appendChild(span1);
		jp.appendChild(span2);
		//		alert(mydiv.lastChild);
		//		alert(bzcd.getChildren());

		if(pageX && pageY) {
			span1.classList.add("myposition");
			span1.style.left = pageX;
			span1.style.top = pageY;
			span2.classList.add("myposition");
			span2.style.left = pageX;
			span2.style.top = pageY;
			span2.classList.remove('my_none');
		}
		window.addEventListener('cdlb', function(event) {
			span1.classList.remove('my_none');
			var cdfc = event.detail.flag;
			var cdbh = cdfc.charAt(0);
			var cdgs = cdfc.charAt(1) + cdfc.charAt(2);
			if(cdbh == "A") {
				if(firstWord !== "A") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "B") {
				if(firstWord !== "B") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "C") {
				if(firstWord !== "C") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "D") {
				if(firstWord !== "D") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "E") {
				if(firstWord !== "E") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "F") {
				if(firstWord !== "F") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "G") {
				if(firstWord !== "G") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "H") {
				if(firstWord !== "H") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "I") {
				if(firstWord !== "I") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "J") {
				if(firstWord !== "J") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "K") {
				if(firstWord !== "K") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "L") {
				if(firstWord !== "L") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "M") {
				if(firstWord !== "M") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "N") {
				if(firstWord !== "N") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "O") {
				if(firstWord !== "O") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "P") {
				if(firstWord !== "P") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "Q") {
				if(firstWord !== "Q") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "R") {
				if(firstWord !== "R") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "S") {
				if(firstWord !== "S") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "T") {
				if(firstWord !== "T") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "U") {
				if(firstWord !== "U") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "V") {
				if(firstWord !== "V") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "W") {
				if(firstWord !== "W") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "X") {
				if(firstWord !== "X") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "Y") {
				if(firstWord !== "Y") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			} else if(cdbh == "Z") {
				if(firstWord !== "Z") {
					jccd[i] = firstWord;
					span1.classList.add('my_none');
					span2.classList.add('my_none');
				}
			}
		})
	};
	//测点分层
	xztp.addEventListener('tap', function() {
		mui.openWindow({
			url: 'my_project_cdfc.html',
			id: 'my_project_cdfc',
			styles: {

			},
			extras: {
				name: 'w',
				xmid: xmid,
				sjc: sjc,
				checkId: checkId
			},
			show: {
				autoShow: true, //页面loaded事件发生后自动显示
				aniShow: 'slide-in-right', //页面显示动画
				duration: '100' //页面动画持续时间
			},
			waiting: {
				autoShow: false, //自动显示等待框
			},
		});
	});

	ajaxformdata();
	ajaxscsl();
	ajaxformdata2();
	//	uploadhgl();

	//附件查看 (未完成)
	//	fjck.addEventListener('tap', function() {
	//
	//		mui.openWindow({
	//			url: 'my_project_fjck.html',
	//			id: 'my_project_fjck.html',
	//			extras: {
	//				sjc: sjc,
	//				cdfj: cdfj,
	//			},
	//			show: {
	//				aniShow: 'slide-in-right', //页面显示动画
	//				duration: '100' //页面动画持续时间
	//			},
	//			waiting: {
	//				autoShow: false, //自动显示等待框
	//			}
	//		});
	//	});

	//实测实量列表监听
	mui('.mui-table-view').on('tap', 'li', function() {
		bhao.value = this.childNodes[0].innerText;
		cdlx.value = this.childNodes[1].innerText;
		scz.value = this.childNodes[2].innerText;
		mui("#middlePopover").popover("toggle");
	});

	//可供布置的测点监听,单击
	var cdbhao = "";
	mui('.bzcd').on('tap', 'span', function() {
		cdbhao = this.innerText;
		//alert(cdbhao);
		//		out.innerHTML = "您【单击】了测点" + cdbhao + "，可进行测点布置。";
		mui.toast("您在给" + cdbhao + "测点布置。", {
			duration: 'long',
			type: 'div'
		});
	});
	//可供布置的测点监听,双击
	mui('.bzcd').on('doubletap', 'span', function() {
		//alert(45);
		var sjbhao = this.innerText;
		kbbhao.value = sjbhao;
		out.innerHTML = "您【双击】了测点" + cdbhao + "，可修改测点基本信息。";
		
		mui.ajax(url + 'my_cdbu_du.php', {
			data: {
				sjc: sjc,
				bhao: sjbhao
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				var length = data.length;
				for(var i = 0; i < length - 1; i++) {
					kbcdlx.value = data[i].测点类别;
					cdscz = data[i].测点实测值; //kbscz.value
					ppbz = data[i].评判标准;
				}
				//判断是否在评判标准内
				ppbz = ppbz.split("*");
				cdscz = Number(cdscz);
				if(cdscz >= ppbz[0] && cdscz <= ppbz[1]) {
					//					alert("合格");
					kbscz.value = cdscz;
					kbscz.style.color = "black";
				} else {
					//					alert("不合格");
					kbscz.value = cdscz;
					kbscz.style.color = "red";
				}

				mui("#cdbzPopover").popover("toggle");
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				//alert('ajax错误'+type);
				return callback('ajax错误' + type + errorThrown);
			}
		});

	});

	//平面图监听
	mydiv.addEventListener('tap', function(e) {
		if(cdbhao) {
			var pageX = e.detail.touches[0].pageX;
			var pageY = e.detail.touches[0].pageY;
			var pageX1 = parseInt((pageX / screen.width) * 100) + '%';
			var pageY1 = parseInt((pageY / (mydiv.offsetHeight)) * 100) + '%';
			//						alert(pageX1+"  "+pageY1); 
			var spanid1 = "cd" + cdbhao;
			var spanid2 = "jt" + cdbhao;
			spanid1 = document.getElementById(spanid1);
			spanid1.classList.add("myposition");
			spanid1.style.left = pageX - 30 + "px";
			spanid1.style.top = pageY - 110 + "px";
			spanid2 = document.getElementById(spanid2)
			spanid2.classList.add("myposition");
			spanid2.style.left = pageX - 30 + "px";
			spanid2.style.top = pageY - 110 + "px";
			spanid2.classList.remove('my_none');
			out.innerHTML = "您在给" + cdbhao + "测点布置。";

			//				alert(cdbhao);
		}
	});

	//实测值输入菜单确定监听
	scqding.addEventListener('tap', function() {
		var xbhao = bhao.value;
		var xscz = scz.value;
		if(xscz.length < 1) {
			plus.nativeUI.toast('实测值不能为空！');
		} else {
			mui.ajax(url + 'my_scsl_xgcd.php', {
				data: {
					sjc: sjc,
					bhao: xbhao,
					scz: xscz
				},
				dataType: 'json',
				type: 'post',
				timeout: 10000,
				success: function(data) {
					if(data.result == "success") {
						var m = "sc" + xbhao;
						var divszc = document.getElementById(m);
						divszc.innerText = xscz;
						plus.nativeUI.toast('修改成功！');
						mui("#middlePopover").popover("toggle");
					} else {
						plus.nativeUI.toast('修改失败！');
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					//alert('ajax错误'+type);
					return callback('ajax错误' + type + errorThrown);
				}
			});
		}

	});
	
	
	//实测实量菜单关闭
	scgbi.addEventListener('tap', function() {
		mui("#middlePopover").popover("toggle");
	});
	kbgbi.addEventListener('tap', function() {
		mui("#cdbzPopover").popover("toggle");
	});
	//测点布置菜单确定监听
	kbqding.addEventListener('tap', function() {
		var xbhao = kbbhao.value;
		var xscz = kbscz.value;
		if(xscz.length < 1) {
			plus.nativeUI.toast('实测值不能为空！');
		} else {
			mui.ajax(url + 'my_scsl_xgcd.php', {
				data: {
					sjc: sjc,
					scz: xscz
				},
				dataType: 'json',
				type: 'post',
				timeout: 10000,
				success: function(data) {
					if(data.result == "success") {
						var m = "sc" + xbhao;
						var divszc = document.getElementById(m);
						divszc.innerText = xscz;
						plus.nativeUI.toast('修改成功！');
						mui("#cdbzPopover").popover("toggle");
					} else {
						plus.nativeUI.toast('修改失败！');
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					//alert('ajax错误'+type);
					return callback('ajax错误' + type + errorThrown);
				}
			});
		}

	});
	//保存布置的监听				
	bcbz.addEventListener('tap', function() {
		var span = document.getElementById("cd").getElementsByTagName("span");
		out.innerHTML = "您点击了【保存布置】，同步云端数据";
		var btnArray = ['是', '否'];
		mui.confirm('确定要保存布置吗？', '原始记录', btnArray, function(e) {
			if(e.index == 0) {
				for(var i = 0; i < span.length; i++) {
					var mbhao = span[i].innerText;
					mbhao = mbhao.toString();
					var left = span[i].style.left;
					var top = span[i].style.top;
					var left1 = left.replace(/[^0-9^.]/ig, "");
					var top1 = top.replace(/[^0-9^.]/ig, "");
					var pageX1 = parseInt((left1 / screen.width) * 100) + '%';
					var pageY1 = parseInt((top1 / (mydiv.offsetHeight)) * 100) + '%';
					//										alert(checkId+" "+sjc+" "+left+" "+top); 
					mui.ajax(url + 'my_plus/save_cdbz.php', {
						data: {
							sjc: sjc,
							bhao: mbhao,
							left: left,
							top: top,
							pageX1: pageX1,
							pageY1: pageY1,
							checkId: checkId,
							//							gclb: gclb
						},
						dataType: 'json',
						type: 'post',
						timeout: 10000,
						success: function(data) {

						},
						error: function(xhr, type, errorThrown) {
							//异常处理； 
							//alert('ajax错误'+type+errorThrown);
							return callback('ajax错误' + type + errorThrown);
						}
					});
				}
				plus.nativeUI.alert('测点布置保存成功！');
				//				window.location.reload();
			} else {

			}
		});
	});

	//一键布置的监听				
	yjbz.addEventListener('tap', function() {
		var span1 = document.getElementById("cd").getElementsByTagName("span");
		var span2 = document.getElementById('jp').getElementsByTagName('span');
		out.innerHTML = "您点击了【一键布置】";
		var btnArray = ['是', '否'];
		mui.confirm('确定要一键布置吗？', '原始记录', btnArray, function(e) {
			if(e.index == 0) {
//				随机X
				for(var i = 0; i < span1.length; i++) {
					var mbhao = span1[i].innerText;
					var firstword = mbhao.charAt(0);
					function GetRandomNum(Min, Max) {
						var Range = Max - Min;
						var Rand = Math.random();
						return(Min + Math.round(Rand * Range));
					}
					var num1 = GetRandomNum(30, 300);
					var numx = num1+"px";
//					alert(numx);
//				随机Y
					function GetRandomNum(Min, Max) {
						var Range = Max - Min;
						var Rand = Math.random();
						return(Min + Math.round(Rand * Range));
					}
					var num2 = GetRandomNum(0, 450);
					var numy = num2+"px";
					//span1被隐藏，则span1和span2都不布点
					if(firstword != jccd[i]){
					    span1[i].classList.add("myposition");
					    span1[i].style.left = numx;
					    span1[i].style.top = numy;
					    span2[i].classList.add("myposition");
					    span2[i].classList.remove('my_none');
					    span2[i].style.left = numx;
					    span2[i].style.top = numy;
					}
//					alert(checkId);
					//										alert(checkId+" "+sjc+" "+left+" "+top); 
//					mui.ajax(url + 'my_plus/yjbz_cdbz.php', {
//						data: {
//							sjc: sjc,
//							bhao: mbhao,
////							left: left,
////							top: top,
//							numx: numx,
//							numy: numy,
////							checkId: checkId,
//							//							gclb: gclb
//						},
//						dataType: 'json',
//						type: 'post',
//						timeout: 10000,
//						success: function(data) {
//
//						},
//						error: function(xhr, type, errorThrown) {
//							//异常处理； 
//							//alert('ajax错误'+type+errorThrown);
//							return callback('ajax错误' + type + errorThrown);
//						}
//					});
				}
//				plus.nativeUI.alert('一键布置保存成功！');
//				window.location.reload();
			} else {

			}
		});
	});

	//清空布置
	qkbz.addEventListener('tap', function() {
		var span1 = document.getElementById("cd").getElementsByTagName("span");
		var span2 = jp.getElementsByTagName("span");
		out.innerHTML = "您点击了【清空布置】，保存后，同步云端数据。";
		var btnArray = ['是', '否'];
		for(var i = 0; i < span1.length; i++) {
		    var bhao = span1[i].innerHTML.charAt(0);
			//若span1已被隐藏，则不清空
			if(bhao != jccd[i]){
			span1[i].classList.remove("myposition");
			span1[i].style.left = "";
			span1[i].style.top = "";
			span2[i].classList.remove("myposition");
			span2[i].style.left = "";
			span2[i].style.top = "";
			span2[i].classList.add('my_none');
			}
		}
		mui.confirm('是否保存？','原始记录',btnArray,function(e) {
			if(e.index == 0) {
				for(var i = 0; i < span1.length; i++) {
					var mbhao = span1[i].innerText;
					mbhao = mbhao.toString();
					var left = span1[i].style.left;
					var top = span1[i].style.top;
					var left1 = left.replace(/[^0-9^.]/ig, "");
					var top1 = top.replace(/[^0-9^.]/ig, "");
					var pageX1 = parseInt((left1 / screen.width) * 100) + '%';
					var pageY1 = parseInt((top1 / (mydiv.offsetHeight)) * 100) + '%';
					//										alert(checkId+" "+sjc+" "+left+" "+top); 
					mui.ajax(url + 'my_plus/save_cdbz.php', {
						data: {
							sjc: sjc,
							bhao: mbhao,
							left: left,
							top: top,
							pageX1: pageX1,
							pageY1: pageY1,
							checkId: checkId,
							//							gclb: gclb
						},
						dataType: 'json',
						type: 'post',
						timeout: 10000,
						success: function(data) {

						},
						error: function(xhr, type, errorThrown) {
							//异常处理； 
							//alert('ajax错误'+type+errorThrown);
							return callback('ajax错误' + type + errorThrown);
						}
					});
				}
				plus.nativeUI.alert('清空布置保存成功！');
				//				window.location.reload();
			} else {

			}
		});
	});
	//清空单个测点
    mui('#cd').on('longtap','span',function(e){
    	var that = this;
    	mui.confirm('是否删除'+that.innerHTML+'测点？','原始记录',['是','否'],function(e){
    		if(e.index == 0){
    			var wt = plus.nativeUI.showWaiting();
    			mui.ajax(url+'my_plus/delete_point.php',{
    				data:{
    					bhao:that.innerHTML,
    					sjc:sjc
    				},
    				type:'post',
    				dataType:'json', 
    				timeout:5000,	
    				success:function(data){
    					wt.close();
//  					plus.nativeUI.alert(data.result);
    					span2 = document.getElementById('jt'+that.innerHTML);
    					document.getElementById('cd').removeChild(that);// 删除测点DOM
    					document.getElementById('jp').removeChild(span2);
    				}, 
    				error:function(xhr, type, errorThrown){
    					wt.close();
      					alert('ajax错误'+type+errorThrown);
//  					return callback('ajax错误' + type + errorThrown);
    				}
    			})
    		}
    		else{
    		}
    	})
    })
});
    
    
//上传文件
var i = 1,
	gentry = null,
	w = null;
var hl = null,
	le = null,
	de = null,
	ie = null;
var unv = true;
// H5 plus事件处理
function plusReady_camera() {
	// 获取摄像头目录对象
	plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
		entry.getDirectory("camera/fhys", {
			create: true
		}, function(dir) {
			gentry = dir;
			//updateHistory();
		}, function(e) {
			outSet("Get directory \"camera\fhys\" failed: " + e.message);
		});
	}, function(e) {
		outSet("Resolve \"_doc/\" failed: " + e.message);
	});
}
if(window.plus) {
	plusReady_camera();
} else {
	document.addEventListener("plusready", plusReady_camera, false);
}
// 监听DOMContentLoaded事件
document.addEventListener("DOMContentLoaded", function() {
	// 获取DOM元素对象
	//验收照片
	hl_yszp = document.getElementById("history_yszp");
	le_yszp = document.getElementById("empty_yszp");

	de = document.getElementById("display");
	if(ie = document.getElementById("index")) {
		ie.onchange = indexChanged;
	}
	// 判断是否支持video标签
	unv = !document.createElement('video').canPlayType;
}, false);

//选择前后摄像头
function changeIndex() {
	outSet("选择摄像头：");
	ie.focus();
}

function indexChanged() {
	de.innerText = ie.options[ie.selectedIndex].innerText;
	i = parseInt(ie.value);
	outLine(de.innerText);
}

// 拍照函数
function getImage(lx) {
	outSet("开始拍照：");
	var cmr = plus.camera.getCamera(); //获取摄像头管理对象	
	//进行拍照操作cmr.captureImage( successCB, errorCB, option );
	cmr.captureImage(function(p) {
		outLine("成功：" + p);
		// resolveLocalFileSystemURL(url,succesCB,errorCB )通过URL参数获取目录对象或文件对象
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			createItem(p, entry, lx);
		}, function(e) {
			outLine("读取拍照文件错误：" + e.message);
		});
	}, function(e) {
		outLine("失败：" + e.message);
	}, {
		filename: "_doc/camera/fhys/",
		index: 1
	});
}

// 从相册中选择图片
function galleryImg(lx) {
	// 从相册中选择图片
	outSet("从相册中选择图片:");
	plus.gallery.pick(function(path) {
		outLine(path);
		plus.io.resolveLocalFileSystemURL(path, function(entry) {
			createItem(path, entry, lx);
		}, function(e) {
			outLine("读取拍照文件错误：" + e.message);
		});
		//showImg( path );
		//createItem(path);
	}, function(e) {
		outSet("取消选择图片");
	}, {
		filter: "image"
	});
}

// 显示文件
function displayFile(li) {
	if(w) {
		outLine("重复点击！");
		return;
	}
	if(!li || !li.entry) {
		ouSet("无效的媒体文件");
		return;
	}
	var name = li.entry.name;
	var suffix = name.substr(name.lastIndexOf('.'));
	var url = "";
	if(suffix == ".mov" || suffix == ".3gp" || suffix == ".mp4" || suffix == ".avi") {
		//if(unv){plus.runtime.openFile("_doc/camera/"+name);return;}
		url = "camera_video.html";
	} else {
		url = "camera_image.html";
	}
	w = plus.webview.create(url, url, {
		hardwareAccelerated: true,
		scrollIndicator: 'none',
		scalable: true,
		bounce: "all"
	});
	w.addEventListener("loaded", function() {
		w.evalJS("loadMedia('" + li.entry.toLocalURL() + "')");
		//w.evalJS( "loadMedia(\""+"http://localhost:13131/_doc/camera/"+name+"\")" );
	}, false);
	w.addEventListener("close", function() {
		w = null;
	}, false);
	w.show("pop-in");
}

// 添加播放项
var index;
var index_yszp = 1;
var index_hxpmt = 1;
var index_ysjl = 1;
var index_bcjl = 1;

function createItem(p, entry, lx) {
	var li = document.createElement("li");
	li.className = "ditem";
	li.innerHTML = '<span class="iplay"><font class="aname"></font><br/><font class="ainf"></font></span>';
	li.setAttribute("onclick", "displayFile(this);");
	if(lx == 'yszp') {
		hl = hl_yszp;
		le = le_yszp;
		files_yszp.push({
			name: "upfile" + index_yszp,
			path: p
		});
		index_yszp++;
	} else {

	}
	hl.insertBefore(li, le.nextSibling);
	//	alert(entry.name);
	li.querySelector(".aname").innerText = entry.name;
	//	alert(entry.name);
	li.querySelector(".ainf").innerText = "...";
	li.entry = entry;
	updateInformation(li);
	// 设置空项不可见
	le.style.display = "none";
}
// 获取录音文件信息
function updateInformation(li) {
	if(!li || !li.entry) {
		return;
	}
	var entry = li.entry;
	entry.getMetadata(function(metadata) {
		li.querySelector(".ainf").innerText = dateToStr(metadata.modificationTime);
	}, function(e) {
		outLine("获取文件\"" + entry.name + "\"信息失败：" + e.message);
	});
}
// 获取录音历史列表
function updateHistory() {
	if(!gentry) {
		return;
	}
	var reader = gentry.createReader();
	reader.readEntries(function(entries) {
		for(var i in entries) {
			if(entries[i].isFile) {
				createItem(entries[i]);
			}
		}
	}, function(e) {
		outLine("读取录音列表失败：" + e.message);
	});
}

// 清除历史记录
function cleanHistory(lx) {
	var btnArray = ['确定', '取消'];
	mui.confirm('您确定要清空记录吗？', '警告:', btnArray, function(e) {
		if(e.index == 0) {
			if(lx == 'yszp') {
				hl_yszp.innerHTML = '<li id="empty_yszp" class="ditem-empty">无历史记录</li>';
				le_yszp = document.getElementById("empty_yszp");
				files_yszp = [];
				index_yszp = 1;
			} else {

			}

			// 删除音频文件
			outSet("清空拍照录像历史记录：ok");
		} else {
			//info.innerText = '取消';
			return;
		}
	});
}

/*----------上传----------*/
var server = url + "fileupload.php";
//var server="http://demo.dcloud.net.cn/helloh5/uploader/upload.php";
var files = [];
var files_yszp = [];

function upload(lx, clean) {
	//获取url参数值
	function geturl(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	var sjc = geturl("timestamp");
	var xmid = geturl("gcid");
	var mc = geturl("mc");
	var gclb = geturl("gclb");
	var checkId = geturl("checkId");
	var sclb;
	gclb = decodeURI(gclb);
	mc = decodeURI(mc);
	//				alert(sjc);
	if(lx == 'yszp') {
		files = files_yszp;
	} else {

	}
	if(files.length <= 0) {
		plus.nativeUI.alert("没有添加上传文件！");
		return;
	}
	outSet("开始上传：")
	var wt = plus.nativeUI.showWaiting(); //显示系统等待对话框
	var task = plus.uploader.createUpload(server, {
		method: "POST"
	}, function(t, status) {
		//上传完成
		if(status == 200) {
			outLine("上传成功：" + t.responseText);
			wt.close();
			var button_lx = document.getElementById(lx);
			var button_clean = document.getElementById(clean);
			//			alert("上传成功!"+t.responseText);
			alert("上传成功!");
		} else {
			outLine("上传失败：" + status);
			wt.close();
		}
		window.location.reload(); //刷新页面
	}); //新建上传任务
	//				alert(sjc);
	//添加上传数据 
	//	task.addData("lx", lx);
	task.addData("uid", getUid());
	nub = files.length.toString();
	task.addData("nub", nub);
	task.addData("sjc", sjc);
	//	task.addData("xmid", xmid);
	//	task.addData("gclb", gclb);
	//	task.addData("mc", mc);
	//	task.addData("checkId", checkId);
	//	task.addData("sclb", '实测实量');
	for(var i = 0; i < files.length; i++) {
		var f = files[i];
		task.addFile(f.path, {
			key: f.name
		}); //添加上传文件 path为路径
	}
	task.start();
	files = [];
}

// 产生一个随机数
function getUid() {
	return Math.floor(Math.random() * 100000000 + 10000000).toString();
}
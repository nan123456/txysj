mui.init({
	swipeBack:true //启用右滑关闭功能
	});
	(function($) {
		$('#scroll').scroll({
			indicators: true //是否显示滚动条
		});
	})(mui);
	
mui.plusReady(function(){
	var self=plus.webview.currentWebview();
	var mobile=self.mobile;
	var uid = self.uid;
	var xmid = self.xmid;
//	alert(xmid);
	
	var my_popover=document.getElementById("my_popover"); //搜索按钮
	var gongchengOne=document.getElementById("gongcheng");
	
	
	my_popover.addEventListener('tap',function(){
		//alert("搜索");
		var bts=["确认","取消"];
		plus.nativeUI.prompt(" ",function(e){
			var i=e.index;
//			alert(e.value);
			if(i==0){
				ajaxDate(e.value,mobile);
				//alert(mobile);
			}
		},"请输入表格名称","内容",bts);
		

	});
	
	//动态创建函数
//	var myproject = function(id,gcmc,dq,xmlb,gczt,i,dqsheng,dqshi){}
	var myproject = function(id, timestamp, bgbh, bgbgmc, ysbw, ysrq) {
					//			alert(ysbw);
					var bgmc = bgbh + " " + bgbgmc;
					//汉字编码，为了get传值
					var Name = encodeURI(encodeURI(bgmc));
					var CityName = encodeURI(encodeURI(bgmc));
//					alert(CityName);
					var ysbwa = '验收部位：';
					var ysrqa = '验收日期：';
					var gongcheng = document.getElementById("gongcheng");
					var div = document.createElement('div');
					div.className = 'mui-card margintop10px';
					gongcheng.appendChild(div);
					var ul = document.createElement('ul');
					ul.id = id;
					ul.timestamp = timestamp;
					ul.className = 'mui-table-view ';
					div.appendChild(ul);
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell mui-media my_backgroundcolor_blue my_color_white';
					ul.appendChild(li);
					var a = document.createElement('a');
					a.href = "my_project_ysjl_ysjl.html?id=" + id + "&CityName=" + CityName + "&Name=" + Name + "&timestamp=" + timestamp;
					li.appendChild(a);
					var div2 = document.createElement('div');
					div2.className = 'mui-media-body';
					a.appendChild(div2);
					var txt = document.createTextNode(bgmc);
					div2.appendChild(txt);
					var p = document.createElement('p');
					p.className = 'mui-ellipsis my_color_white';
					div2.appendChild(p);
					var p2 = document.createElement('p');
					p2.className = 'mui-ellipsis my_underline my_color_white';
					div2.appendChild(p2);
					var li2 = document.createElement('li');
					li2.className = 'mui-table-view-cell mui-media';
					ul.appendChild(li2);
					var a2 = document.createElement('a');
					li2.appendChild(a2);
					var div3 = document.createElement('div');
					div3.className = 'mui-media-body';
					a2.appendChild(div3);
					var span = document.createElement('span');
					span.className = 'mui-icon mui-icon-spinner-cycle mui-pull-left';
					var p3 = document.createElement('p');
					p3.className = 'mui-ellipsis my_fontsize my_paddingleft';
					div3.appendChild(p3);
					var p4 = document.createElement('p');
					p4.className = 'mui-ellipsis my_fontsize my_color_blue my_paddingleft';
					div3.appendChild(p4);
					var txt6 = document.createTextNode(ysbwa + ysbw);
					p4.appendChild(txt6);
					var p5 = document.createElement('p');
					p5.className = 'mui-ellipsis my_fontsize my_color_blue paddingleft34px';
					div3.appendChild(p5);
					var li3 = document.createElement('li');
					li3.className = 'mui-table-view-cell mui-media';
					ul.appendChild(li3);
					var a3 = document.createElement('a');
					li3.appendChild(a3);
					var div4 = document.createElement('div');
					div4.className = 'mui-media-body';
					a3.appendChild(div4);
					var span2 = document.createElement('span');
					span2.className = 'mui-icon mui-icon-info mui-pull-left';
					var button2 = document.createElement('button');
					button2.className = 'mui-btn mui-btn-warning mui-pull-right';
					button2.type = 'button';
					var p6 = document.createElement('p');
					p6.className = 'mui-ellipsis my_fontsize my_paddingleft';
					div4.appendChild(p6);
					var p7 = document.createElement('p');
					p7.className = 'mui-ellipsis my_fontsize my_color_blue my_paddingleft';
					div4.appendChild(p7);
					var txt9 = document.createTextNode(ysrqa + ysrq);
					p7.appendChild(txt9);

				};
	//查看签到结果
	var checkSign=function(gcid,gcmc){};
				
	//判断是否签到
	var qiandaoPd=function(gcid){};
	
	var ajaxDate=function(projectName,mobile){
//		alert(mobile);
		gongchengOne.innerHTML="";
		mui.ajax(url + 'my_plus/message_search.php', {
					data: {
						gcmc:projectName,
                      	mobile: mobile,
                      	xmid:xmid
					},
					dataType: 'json',
					type: 'POST',
					timeout: 10000,
					success: function(data) {
						//				alert(data[0].id+"ppppp");
//						              alert(zlkmc)
						var length = data.length;
						if(length > 1) {
							for(var i = 0; i < length - 1; i++) {
								var id = data[i].id;
								var timestamp = data[i].时间戳;
								var bgbh = data[i].表格编号;
								var bgmc = data[i].表格名称;
								var ysbw = data[i].验收部位;
								var ysrq = data[i].验收日期;
								var kpzt = "已保存";		
								myproject(id, timestamp, bgbh, bgmc, ysbw, ysrq,kpzt);
							}
						} else {
							alert("暂无数据");
						}
					},
					error: function(xhr, type, errorThrown) {
						//alert('ajax错误'+type+'---'+errorThrown);
						return callback('ajax错误'+type+errorThrown);
					}
				});
	};
	
	//获取设备位置信息
	var getPos=function(){};
				
//	//接收值
//	window.addEventListener('json_bj',function(event){
//		//关闭遮罩层
//		setTimeout(function() {
//			ws.setStyle({mask:"none"});
//			ws=null;
//		}, 100);
//	});
});
function geoInf( position ) {}
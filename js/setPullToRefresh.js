/*
 * javascript
 * wangka 
 * 2016-9-26
 *
 */
mui.plusReady(function() {
	
	//下拉刷新功能
	var self = plus.webview.currentWebview();
	var onRefresh=function(){
		setTimeout(function(){
			self.endPullToRefresh();
			self.reload(true);
		},1000);
	};	
	self.setPullToRefresh({
		support:true,
		height:"50px",
		range:"200px",
		contentdown:{
			caption:"下拉可以刷新"
		},
		contentover:{
			caption:"释放立即刷新"
		},
		contentrefresh:{
			caption:"正在刷新..."
		}
		},onRefresh);
		
});
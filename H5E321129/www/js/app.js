/**
 * 程序当前的 “注册/登录” 等操作 
 * 基于服务端Service。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		mui.ajax(url+'login.php',{
			data:{
				account:loginInfo.account,
				password:loginInfo.password
			},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(data){
				//alert(data.result);
				if (data.result=='success') {					
					document.getElementById('shji').value=data.shji;
					document.getElementById("uid").value=data.uid;
					return callback();
				} else{					
					return callback('用户名或密码错误');				
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				//alert('ajax错误'+type+errorThrown);
				return callback('ajax错误'+type+errorThrown);
			}
		});
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};
	
	
	
	/**
	 * 检测账号是否已经被人注册
	 **/
	owner.checkAccount = function(checkAccount, callback) {
		callback = callback || $.noop;
		checkAccount = checkAccount || {};
		checkAccount.account = checkAccount.account || '';		
		if (checkAccount.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}	
		
		mui.ajax(url+'chkAccount.php',{
			data:{
				account:checkAccount.account			
			},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(data){
				//alert(data.result);
				if (data.result=='success') {
					return callback();
				} else{
					//return callback('服务器返回error');
					alert('该账号已经存在。');
					return callback('该账号已经存在');
				
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				//alert('ajax错误'+type);
				return callback('ajax错误'+type);
			}
		});	
		
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		regInfo.shji = regInfo.shji || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}		
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (regInfo.shji.length != 11) {
			return callback('手机号码为11位');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		
		mui.ajax(url+'reg.php',{
			data:{
				account:regInfo.account,
				password:regInfo.password,
				email:regInfo.email,
				shji:regInfo.shji
			},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(data){
				//alert(data.result);
				if (data.result=='success') {
					return callback();
				} else if(data.result=='1'){
					return callback('账号名已存在');
				}else{
					return callback('服务器返回error');
				}
				
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				//alert('ajax错误'+type);
				return callback('ajax错误'+type);
			}
		});	
		
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));
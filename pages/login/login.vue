<template>
	<view>
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
	</view>
</template>
<script>
    var sign = require('../../commons/sign.js')
	
	var _self,session_key,openid,pageOptions;
	export default {
		data() {
			return {
				
			};
		},
        onLoad: function(options) {
			_self = this;
			 pageOptions = options
			 
			 //签名函数
			 sign.sign(_self.apiServer)			 
			 
			//小程序 端微信登录
			uni.login({
				success: (res) => {
					uni.request({
						url:_self.apiServer+'member&m=codeToSession&code='+res.code,
						 success: (sessions) => {
							// 获取 unionId
							session_key = sessions.data.session_key;
							openid      = sessions.data.openid;
						},
					})
				},
			})
				
			//app 端微信登录
			// uni.login({
			// 	success: (res) => {
			// 		uni.getUserInfo({
			// 			success: (info) => {
				             // var sign = uni.getStorageSync('sign')
			// 				// 与服务器交互将数据提交到服务端数据库
			// 				uni.request({
			// 					url: _self.apiServer+'member&m=login',
			// 					method: 'POST',
			// 					header: {'content-type' : "application/x-www-form-urlencoded"},
			// 					data: {
			// 						openid : info.userInfo.openId,
			// 						name   : info.userInfo.nickName,
			// 						face   : info.userInfo.avatarUrl,
			                        // sign   :sign,
			// 					},
			// 					success: res => {
			// 						res = res.data;
			// 						// 登录成功 记录会员信息到本地
			// 						if(res.status == 'ok'){
			// 							uni.showToast({title:"登录成功"});
			// 							uni.setStorageSync('SUID' , res.data.u_id + '');
			// 							uni.setStorageSync('SRAND', res.data.u_random + '');
			// 										uni.setStorageSync('SNAME', res.data.u_name + '');
			// 							uni.setStorageSync('SFACE', res.data.u_face + '');
			// 							// 跳转
			// 							if(options.backtype == 1){
			// 								uni.redirectTo({url:options.backpage});
			// 							}else{
			// 								uni.switchTab({url:options.backpage});
			// 							}
			// 						}else{
			// 							uni.showToast({title:res.data});
			// 						}
			// 					},
			// 					fail: (e) => {
			// 						console.log(JSON.stringify(e));
			// 					}
			// 				});
			// 			},
			// 			fail: () => {
			// 				uni.showToast({title:"微信登录授权失败"});
			// 			}
			// 		})
			// 	},
			// 	fail: () => {
			// 		uni.showToast({title:"微信登录授权失败"});
			// 		uni.hideLoading();
			// 	}
			// })
	    },
		methods: {
			getUserInfo : (info) => {
				info = info.mp.detail.userInfo;
				//获取签名验证
				var sign = uni.getStorageSync('sign')
				// 与服务器交互将数据提交到服务端数据库
				uni.request({
					url: _self.apiServer+'member&m=login',
					method: 'POST',
					header: {'content-type' : "application/x-www-form-urlencoded"},
					data: {
						openid : openid,
						name   : info.nickName,
						face   : info.avatarUrl,
						sign   : sign,
					},
					success: res => {
						res = res.data;
						// 登录成功 记录会员信息到本地
						if(res.status == 'ok'){
							uni.showToast({title:"登录成功"});
							uni.setStorageSync('SUID' , res.data.u_id + '');
							uni.setStorageSync('SRAND', res.data.u_random + '');
							uni.setStorageSync('SNAME', res.data.u_name + '');
							uni.setStorageSync('SFACE', res.data.u_face + '');
							// 跳转
							if(pageOptions.backtype == 1){
								uni.redirectTo({url:pageOptions.backpage});
							}else{
								uni.switchTab({url:pageOptions.backpage});
							}
						}else{
							uni.showToast({title:res.data});
						}
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}   
				});
				
			},
		}
	}
</script>

<style>

</style>

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

/** 登录检查函数 */
//backpage : 登录后返回的页面
//backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
Vue.prototype.checkLogin = function(backpage, backtype){
	var SUID  = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	if(SUID == '' || SRAND == '' || SFACE == ''){
		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return [SUID, SRAND, SNAME, SFACE]; //[用户 id, 用户随机码, 用户昵称, 用户表情]
}

//定义全局api接口及token
var APITOKEN  = 'api2018';
Vue.prototype.apiServer = 'http://192.168.0.100/index.php?token='+APITOKEN+'&c='
Vue.prototype.staticServer = 'http://192.168.0.100/'

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
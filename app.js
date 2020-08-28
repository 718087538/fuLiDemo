//app.js
const WXAPI = require('./wxapi/main')
App({
  APPID: '***',
  AppSecret: '*****',
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({

      success: res => {
        console.log("wxlogin............n", res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code;
        WXAPI.login({
          code: res.code
        }).then(res => {
          console.log("微信openId等", res);
          //把openiD和session_key缓存在本地
          wx.setStorageSync('openid', res.openid);
          wx.setStorageSync('session_key', res.session_key);
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log("登录信息", res)
                console.log("登录信息", JSON.parse(res.rawData))
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                //设置2个参数，判断是否在数据库有个人信息，如果为空可能时未授权，可能是没有值，反正让他登录就对了。
                wx.setStorageSync('nickName', JSON.parse(res.rawData).nickName);
                wx.setStorageSync('gender', JSON.parse(res.rawData).gender);

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      }),
      //清楚优先获取商品的商品id
      wx.removeStorageSync('per_get_goodid')

  },
  globalData: {
    userInfo: null
  }
})
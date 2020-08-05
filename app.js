//app.js
const WXAPI = require('./wxapi/main')
App({
   APPID : '***',
   AppSecret:'*****',
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code;
        console.log("code",code);
        WXAPI.login({code:res.code}).then(res=>{
          console.log("resss",res)
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
              console.lon("登录信息",res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
    WXAPI.register({
      openId:wx.getStorageSync('openid'),
      sex:3
    }).then(res=>{
      console.log("注册的信息",res)
    })
  },
  globalData: {
    userInfo: null
  }
})
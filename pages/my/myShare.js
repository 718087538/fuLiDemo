// pages/my/myShare.js
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      inviteSum:0,
      recentInvite:0,
      shareSum:0
    },
    recentyInvite:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WXAPI.shareInfo({
      openId:wx.getStorageSync('openid')
    }).then(res => {
   
      if(res.code === 200&&res.data){
        this.setData({
          info:res.data
        })
      }
    });
  },
  reInvite(){
    WXAPI.reInvite({
      openId:wx.getStorageSync('openid')
    }).then(res => {
          if(res.code === 200){
            let str = 'info.recentInvite'
            this.setData({
              [str]:0
            })
          }
        });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: getApp().globalData.shareTitle, 
      imageUrl:getApp().globalData.shareImgSrc, 
      path: 'pages/index/index'
    }
  },
})
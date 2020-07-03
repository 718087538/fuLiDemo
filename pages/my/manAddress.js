// pages/my/manAddress.js
// pages/my/adressList.js
const WXAPI = require('../../wxapi/main')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




    console.log(options);
    // console.log(options.fromPage);
    //根据来的页面判断等会点返回的页面
    if (options.fromPage) {
      wx.setStorageSync('fromPage', options.fromPage);
    }

    // console.log("缓存", wx.getStorageSync('fromPage'))

    WXAPI.getAddress({
      openId: wx.getStorageSync('openid')
    }).then(res => {
      console.log("收货地址", res.data)
      this.setData({
        addressList:res.data
      })
    })



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
    if (wx.getStorageSync('fromPage') == 'my') {
      wx.reLaunch({
        url: '/pages/my/my'
      })
    } else if (wx.getStorageSync('fromPage') == 'sureOrder') {
      wx.reLaunch({
        url: '/pages/my/sureOrder'
      })
    }
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
  onShareAppMessage: function () {

  }
})
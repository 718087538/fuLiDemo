// pages/my/sureOrder.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:"http://img4.imgtn.bdimg.com/it/u=2853553659,1775735885&fm=26&gp=0.jpg",
    address:{
      name:"",
      phone:'',
      info:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    WXAPI.getAddress({
      openId: wx.getStorageSync('openid')
    }).then(res => {
      console.log("收货地址", res.data)
      // this.setData({
      //   waitGetList:res.data
      // })
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
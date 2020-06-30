// pages/my/giftStatus.js
const {
  $Toast
} = require('../../dist/base/index');
const WXAPI = require('../../wxapi/main')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    waitGetList:[],//待领取的列表
  },
  //领取商品
  getGift(e){
    console.log(e.target.dataset.giftid);
    let giftId = e.target.dataset.giftid;




  },
  onChange(event) {
    console.log(event.detail)
    wx.showToast({
      title: `切换到标签 ${event.detail}`,
      icon: 'none',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.active);
    if (this.data.active == 0) {
      //请求待领取的商品
      WXAPI.getGood({
        uid: wx.getStorageSync('openid')
      }).then(res => {
        console.log("changeGoodRES", res.data)
        this.setData({
          waitGetList:res.data
        })
      })
    }
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
// pages/my/my.js
const { $Toast } = require('../../dist/base/index');
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headSrc:"../../static/defaultHead.jpg",
    active: 3,
    showAddress:false,
  },

  changeAddress(){
    $Toast({
      content: '暂未开发!'
  });
  },
  //已合成，要领取商品
  getGift(){
    console.log("领取商品")
    $Toast({
      content: '恭喜您,领取成功!',
      type: 'success'
  });
  },
  copyOrderBtn(){
    $Toast({
      content: '已复制到剪贴板',
      type: 'success'
  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //是否显示地址，tiaoGuoShenHe
  WXAPI.showAddress({
    openId: wx.getStorageSync('openid')
  }).then(res => {
    console.log("体力", res)
    if(res.data.status === 1){
      this.setData({
        showAddress:true
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
  onShareAppMessage: function () {

  }
})
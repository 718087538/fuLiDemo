// pages/my/suggeston.js
const {
  $Toast
} = require('../../dist/base/index');
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    callMe:'',
    value1:"1",
    name: String
  },
  onChange(e) {
    console.log("改变")
    this.setData({
      [e.currentTarget.dataset.prop]: e.detail.value
    })
  },
  submit: function () {
    // console.log(this.data.content,this.data.name);
    // return false;
    WXAPI.addSuggestion({
      openId:wx.getStorageSync('openid'),
      content:this.data.content,
      callMe:this.data.callMe
    }).then(res => {
      if (res.code == 200) {
        $Toast({
          content: '提交成功，感谢您的建议',
          type: 'success',
        });

        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my/my',
          })
        }, 600);
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

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
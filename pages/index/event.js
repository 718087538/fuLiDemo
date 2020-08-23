// pages/index/event.js
var Util= require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventList: [{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; //把this对象复制到临时变量that
    const wxreq = wx.request({
      url: 'https://api.orderour.com/api/wxClient/notice',
      success: function (res) {
        // this.userData = res.data; //无效不能实时的渲染到页面
        for (let i of res.data.data) {
          i.createDate =Util.formatTime(new Date(i.createDate));
          // i.createDate = new Date(i.createDate);
        }
        that.setData({
          eventList: res.data.data
        }); //和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res) {

        this.userData = "数据获取失败";
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //预览图片，放大预览
  preview(event) {
    let currentUrl = event.currentTarget.dataset.src;
    let arrindex = event.currentTarget.dataset.outindex;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.eventList[arrindex].noticeImg // 需要预览的图片http链接列表
    })
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
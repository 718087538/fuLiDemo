// pages/index/event.js
var Util = require('../../utils/util.js')
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventList: [{}],
    offset: 0, //翻页的页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotice();
  },
  getNotice() {
    WXAPI.seeNotice({
      offset: this.data.offset,
    }).then(res => {
      for (let i of res.data) {
        i.createDate = Util.formatTime(new Date(i.createDate));
      }
      if(res.data.length>0){
        this.setData({
          eventList:res.data,
          offset: this.data.offset + 1
        });
      }
    })
  },
  pushNotice() {
    WXAPI.seeNotice({
      offset: this.data.offset,
    }).then(res => {
      for (let i of res.data) {
        i.createDate = Util.formatTime(new Date(i.createDate));
      }
      let newArr =this.data.eventList.concat(res.data)
      if(res.data.length>0){
        this.setData({
          eventList:newArr,
          offset: this.data.offset + 1
        });
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
    currentUrl = currentUrl.substring(0,currentUrl.indexOf('?'))
    
    let arrindex = event.currentTarget.dataset.outindex;
    let data = this.data.eventList[arrindex].noticeImg;
    for(let i in data){
      if(data[i].indexOf('?')!=-1){
        data[i] = data[i].substring(0,data[i].indexOf('?'))
      }
    }
    // console.log("预览图片",currentUrl,data)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: data // 需要预览的图片http链接列表
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
  onReachBottom() {
    this.pushNotice();
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
// pages/gift/giftList.js


const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    current_scroll: 'tab1',
    marketList: [],
    startList: [], //已开始列表
    readyStartList: [], //即将开始列表
    overList: [], //已过期列表
    targetTime1: 0,
    myFormat1: ['天', '时', '分', '秒'],
    status: '进行中...',
    clearTimer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {





    var that = this;

    let nowDate = new Date();
    let startList = []; //已开始列表
    let readyStartList = []; //即将开始列表
    let overList = []; //已过期列表
    WXAPI.getGiftList({
      type: 'wx',
      openId:wx.getStorageSync('openid')
    }).then(res => {
      for (let i of res.data) {
        let startDate = new Date(i.startDate);
        let overDate = new Date(i.overDate);
        i.targetTime = new Date(i.startDate).getTime();
        i.overTime = new Date(i.overDate).getTime();
        if (nowDate < startDate.getTime()) {
          //未开始
          let index = readyStartList.length
          readyStartList[index] = i;
        } else if (
          nowDate > startDate.getTime() &&
          nowDate < overDate.getTime()
        ) {
          //已开始
          let index = startList.length
          startList[index] = i;
        } else if (nowDate > overDate.getTime()) {
          //已结束
          let index = overList.length
          overList[index] = i;

        }
      }
      //已开始奖品按新的在前面
      startList.sort(function (a, b) {
        return a.overTime < b.overTime ? -1 : 1;
      });

      //即将开始按最近开始在前面
      readyStartList.sort(function (a, b) {
        return a.startDate < b.startDate ? -1 : 1;
      });


      that.setData({
        startList,
        readyStartList,
        overList,
      });
    })
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },


  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
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
      imageUrl: getApp().globalData.shareImgSrc,
      path: 'pages/index/index'
    }
  },
})
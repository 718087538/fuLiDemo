// pages/gift/giftList.js
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

    const wxreq = wx.request({
      url: 'http://127.0.0.1:7001/api/wxClient/gift?type=wx',
      success: function (res) {
        console.log(res.data);
        for (let i of res.data.data) {
          let startDate = new Date(i.startDate);
          let overDate = new Date(i.overDate);
          console.log("对比结果", nowDate < startDate.getTime())
          if (nowDate < startDate.getTime()) {
            //未开始
            console.log("未开始", i)
            let index = readyStartList.length
            readyStartList[index] = i;
            console.log(readyStartList);
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
        that.setData({
          startList,
          readyStartList,
          overList,
        });

        console.log("进行中", startList)
      },
      fail: function (res) {
        console.log(res.data);
        // this.userData = "数据获取失败";
      }
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
  onShareAppMessage: function () {

  }

})
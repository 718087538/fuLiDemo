// pages/my/ranking.js
const WXAPI = require('../../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WXAPI.getRank({
    }).then(res => {
      console.log("paihang", res)
      for(let i of res.data){
        i.child[0].name =i.child[0].name.substring(0,3)
      }
      if(res.code === 200){
        this.setData({
          list:res.data
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
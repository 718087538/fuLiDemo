// pages/gift/gift.js
const app = getApp()
 
Page({
  data: {
     arr:['全部','零食','粮油','母婴','电器','饰品','箱包',],
     currentTab:0,
    winHeight:'',
    marketList: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}, 
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  },
  onLoad(){
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          winHeight: res.windowHeight-29 //这是减去tab导航的高度
        });
      }
    });
  },
  //第一步先完成导航tab切换样式
  swichNav(e){
    var current = e.currentTarget.dataset.current
    this.setData({
      currentTab: current
    })
  },
  bindChange(e){
    var current = e.detail.current
    this.setData({
      currentTab: current
    })
  }
})

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     array: [{levl:2}, {levl:3},{levl:1},{levl:2},{levl:2}, {levl:1},{levl:2},{levl:1},{levl:2}]
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
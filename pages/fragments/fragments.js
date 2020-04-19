// pages/fragments/fragments.js
Page({
  changeName: function (e) {
    this.setData({
      name: 'MENCRE'
    })
  },
  sel: function (e) {
    let num = e.currentTarget.dataset.hi;
    let src = ""
    if (num == 2) {
      src = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=779748707,3495697773&fm=26&gp=0.jpg";
    } else if (num == 1) {
      src = "https://www.vvfeng.com/data/upload/ueditor/20170414/58f02ea113470.jpg"
    }
    console.log("111",src);
    this.setData({
      imgSrc1: src
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc1: "https://www.vvfeng.com/data/upload/ueditor/20170414/58f02ea113470.jpg",
    name: "1111111",

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
  onShareAppMessage: function () {

  }
})
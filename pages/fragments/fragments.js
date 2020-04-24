// pages/fragments/fragments.js

const order = ['demo1', 'demo2', 'demo3']
Page({
  changeName: function (e) {
    this.setData({
      name: 'MENCRE'
    })
  },
  sel: function (e) {
    console.log("111", this.data.selNum);
 
    if ( this.data.selNum != e.target.dataset.num) {
      this.setData({
        selNum: e.target.dataset.num
      })
    } else {
      console.log("111",  e.target.dataset.num);
      this.setData({
        selNum: 0
      })
    }
  },
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc1: "http://img5.imgtn.bdimg.com/it/u=1040739115,3225906616&fm=26&gp=0.jpg",
    name: "1111111",
    toView: 'green',
    selNum: 0, //要显示第几个赠送
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
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
  onShareAppMessage: function () {

  }
})
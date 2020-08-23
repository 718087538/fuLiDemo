// pages/giftInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  goodsId:"",//本商品的id
  imgList:[],
  readStart:false,//是否是未上架的。
  startTime:'',//准备开始活动的时间
  targetTime1: 0,
  myFormat1: ['天', '时', '分', '秒'],
  status: '进行中...',
  clearTimer: false
  },
  jiaoShuiGet(){
    if(this.data.goodsId){
      wx.setStorageSync('per_get_goodid', this.data.goodsId);
    }
    wx.navigateTo({
      url: `/pages/jiFen/jifen` //从特定商品跳到浇水，设置缓存优先分配该商品。
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.read == 'true'){
      this.setData({
        readStart:true,
        startTime:options.startTime
      })
    }

    var that = this;//把this对象复制到临时变量that
    const wxreq = wx.request({
      url: 'https://api.orderour.com/api/admin/upGoodsList',
      data:{
        goodsId:options.goodsId,
      },
      success: function (res){

        that.setData({
          goodsId:options.goodsId,
        })
        // this.userData = res.data; //无效不能实时的渲染到页面
        that.setData({ imgList: res.data.data[0].imgArray});//和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res){
        this.userData = "数据获取失败";
      }
    })
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
// pages/my/sureOrder.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:"http://img4.imgtn.bdimg.com/it/u=2853553659,1775735885&fm=26&gp=0.jpg",
    address:{
      name:"",
      phone:'',
      info:''
    },
    goods:{

    }
  },
  nowGet:function(){
    console.log(this.data.goods)
    //这里需要继续做
    WXAPI.nowGet({
      openId: wx.getStorageSync('openid'),
      giftId:this.data.giftId,
      getCode:this.data.goods.getCode,
      name:this.data.address.name,
      receivephone:this.data.address.receivephone, 
      provinces:this.data.address.provinces, 
      city:this.data.address.city, 
      county:this.data.address.county, 
      info:this.data.address.info
    }).then(res => {
      console.log("领取商品的结果", res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    WXAPI.getAddress({
      openId: wx.getStorageSync('openid')
    }).then(res => {
      console.log("收货地址", res.data)
      for(let i of res.data){
        if(i.isDefalut === 1){
          this.setData({
            address:i
          })
          break
        }
      }
    })

       //请求待领取的商品
       WXAPI.getGood({
        uid: wx.getStorageSync('openid'),
        giftId:options.giftId
      }).then(res => {
        console.log("changeGoodRES", res.data)
        this.setData({
          goods:res.data[0]
        })
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
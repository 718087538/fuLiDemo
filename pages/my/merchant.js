// pages/my/merchant.js
const WXAPI = require('../../wxapi/main')
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: null,
    showPopup: false,
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WXAPI.getMerchant({}).then(res => {
      this.setData({
        imgSrc: res.data.imgSrc
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showPopup() {
    this.setData({
      showPopup: true
    });
  },

  onClose() {
    this.setData({
      showPopup: false
    });
  },
  addMerchant() {
    console.log(this.data.phone,this.data.value1)

    if(this.data.phone == ""){
      $Toast({
        content: '号码不能为空',
        type: 'error'
      });
      return false
    }
    // this.setData({
    //   showPopup:false,
    //   phone:""
    // })
    WXAPI.addMerchant({
      phone: this.data.phone
    }).then(res => {
      console.log(res)
      if (res.code === 200) {
        this.setData({
          showPopup: false,
          phone: ""
        })

        $Toast({
          content: '提交成功',
          type: 'success'
        });
      }
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
  onShareAppMessage() {
    return {
      title: getApp().globalData.shareTitle,
      imageUrl: getApp().globalData.shareImgSrc,
      path: 'pages/index/index'
    }
  },
})
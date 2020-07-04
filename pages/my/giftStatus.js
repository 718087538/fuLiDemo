// pages/my/giftStatus.js
const {
  $Toast
} = require('../../dist/base/index');
const WXAPI = require('../../wxapi/main')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    waitGetList: [], //待领取的列表
    waitSendList: [],
    sendedList: [], //已发货列表
    sureOrder: [],
  },
  copyOrderBtn() {

    let that = this
    //获取剪切板内容

    wx.setClipboardData({
      data: '11111',
      success(res) {
        // console.log(res);
        //会自动弹出内容已经复制
        // $Toast({
        //   content: '已复制到剪贴板',
        // });
      }
    })
  },
  sureReceveOrder(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    WXAPI.sureOrder({
      id: id
    }).then(res => {
      console.log("确认收货", res)
      if (res.code == 200) {
        $Toast({
          content: '确认收货成功',
          type: 'success',
        });
      }
      this.sureOrder();
      this.setData({
        active: 3,
      })
    })
  },
  //领取商品
  getGift(e) {
    console.log(e.target.dataset.giftid);
    let giftId = e.target.dataset.giftid;
  },
  onChange(event) {
    console.log(event.detail)
    if (event.detail.index == 0) {
      this.getGood();
    } else if (event.detail.index == 1) {
      this.waitSend();
    } else if (event.detail.index == 2) {
      this.sended();
    } else if (event.detail.index == 3) {
      this.sureOrder();
    }
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index}`,
    //   icon: 'none',
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.active);
    if (options.active == 0) {
      this.getGood();
    } else if (options.active == 1) {
      this.waitSend();
      this.setData({
        active: 1
      })
    } else if (options.active == 2) {
      this.sended();
      this.setData({
        active: 2
      })
    } else if (options.active == 3) {
      this.sureOrder();
      this.setData({
        active: 3
      })
    }
  },
  sureOrder: function () {
    //已签收的订单
    WXAPI.waitSend({
      uid: wx.getStorageSync('openid'),
      sendStatus: 2 //2代表已签收
    }).then(res => {
      console.log("已签收", res.data)
      this.setData({
        sureOrder: res.data,
      })
    })
  },
  sended: function () {
    //已发货的列表
    WXAPI.waitSend({
      uid: wx.getStorageSync('openid'),
      sendStatus: 1
    }).then(res => {
      console.log("已发货", res)
      this.setData({
        sendedList: res.data,
      })
    })
  },
  waitSend: function () {
    WXAPI.waitSend({
      uid: wx.getStorageSync('openid')
    }).then(res => {
      console.log("changeGoodRES", res.data)
      this.setData({
        waitSendList: res.data,
        // active: 1
      })
    })
  },
  //获得待领取商品李列表
  getGood: function () {
    console.log("待领取方法");
    WXAPI.getGood({
      uid: wx.getStorageSync('openid')
    }).then(res => {
      console.log("changeGoodRES", res.data)
      this.setData({
        waitGetList: res.data,
        active: 0
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
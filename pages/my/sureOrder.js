// pages/my/sureOrder.js
const WXAPI = require('../../wxapi/main');
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "",
    address: {
      name: "",
      phone: '',
      info: ''
    },
    goods: {

    }
  },
  nowGet: function () {
    console.log(this.data.goods.giftId)
    //这里需要继续做
    WXAPI.nowGet({
      openId: wx.getStorageSync('openid'),
      giftId: this.data.goods.giftId,
      getCode: this.data.goods.getCode,
      name: this.data.address.name,
      receivephone: this.data.address.receivephone,
      provinces: this.data.address.provinces,
      city: this.data.address.city,
      county: this.data.address.county,
      info: this.data.address.info
    }).then(res => {
      console.log("领取商品的结果", res)
      if (res.code == 200) {
        wx.removeStorage({
          key: 'fromPage',
          success (res) {
            console.log('删除缓存成功');
          }
        })
        $Toast({
          content: '领取成功',
          type: 'success',
        });

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/my',
          })
        }, 700);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //如果传了selAddressId 代表是选择了地址，然后回来订单确认界面，则请求单个地址
    if (options.selAddressId) {
      WXAPI.getAddress({
        openId: wx.getStorageSync('openid'),
        addressId: options.selAddressId
      }).then(res => {
        console.log("单个收货地址", res.data)
        this.setData({
          address: res.data[0]
        })
      })
    } else {
      WXAPI.getAddress({
        openId: wx.getStorageSync('openid')
      }).then(res => {
        for (let i of res.data) {
          if (i.isDefalut === 1) {
            this.setData({
              address: i
            })
            break
          }
        }
        //如果循环了一圈也没发现默认地址，则拿第一个地址展示
        if (this.data.address.info == '') {
          this.setData({
            address: res.data[0]
          })
        }
      })
    }

    //请求待领取的商品
    if(options.giftId){
      wx.setStorageSync('giftId', options.giftId);
      wx.setStorageSync('getCode', options.getCode);
    }

    console.log("设置缓存getCode", wx.getStorageSync('getCode'))
    WXAPI.getGood({
      uid: wx.getStorageSync('openid'),
      giftId: wx.getStorageSync('giftId'),
      getCode: wx.getStorageSync('getCode'),
    }).then(res => {
      console.log("changeGoodRES", res.data)
      this.setData({
        goods: res.data[0]
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
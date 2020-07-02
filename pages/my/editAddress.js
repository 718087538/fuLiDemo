// pages/my/editAddress.js
const area = require('../../utils/area');
const WXAPI = require('../../wxapi/main')

const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '请选择', //显示的省市区
    value4: '',
    showArea: false, //是否显示地址选择栏目
    ssq: [], //已选择的省市区
    setDefault: false,
    areaList: area.default.area
  },
  submit: function () {
    //   $Toast({
    //     content: '5秒后自动关闭',
    //     icon: 'prompt',
    //     duration: 0,
    //     mask: false
    // });
    console.log(this.data.ssq)
    // if (this.data.value1 == "") {
    //   $Toast({
    //     content: '请输入姓名',
    //   });
    //   return false;
    // } else if (this.data.value2 == "") {
    //   $Toast({
    //     content: '请输入手机号',
    //   });
    //   return false;
    // } else if (this.data.ssq.length == 0) {
    //   $Toast({
    //     content: '请选择省市区',
    //   });
    //   return false;
    // } else if (this.data.value4 == "") {
    //   $Toast({
    //     content: '请输入输入详细地址',
    //   });
    //   return false;
    // }
    // let isDefalut = 0;
    // if (this.data.setDefault) {
    //   isDefalut = 1
    // }
    // let newAddress = {
    //   openId: wx.getStorageSync('openid'),
    //   phone: '',
    //   name: this.data.value1,
    //   receivephone: this.data.value2,
    //   provinces: this.data.ssq[0].name,
    //   city: this.data.ssq[1].name,
    //   county: this.data.ssq[2].name,
    //   info: this.data.value4,
    //   isDefalut: isDefalut
    // }
    let newAddress = {
      openId: wx.getStorageSync('openid'),
      phone: '',
      name: 'asdasd',
      receivephone: '15989161010',
      provinces: '省份',
      city:  '省份',
      county:  '省份',
      info:  '省份',
      isDefalut: 1
    }
    WXAPI.addAddress(
      newAddress
    ).then(res => {
      console.log("收货地址回应", res)
      if(res.code ==200){
        $Toast({
          content: '保存成功',
          type: 'success',
        });
    
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my/adressList',
          })
        }, 700);
      }
      // this.setData({
      //   addressList: res.data
      // })
    })




  },
  changeStatus: function () {
    this.setData({
      setDefault: !this.data.setDefault
    })
  },
  //选择地址
  selArea: function () {
    console.log("11")

    this.setData({
      showArea: true
    })
  },
  cancel: function () {
    this.setData({
      showArea: false
    })
  },
  confirm: function (value) {
    console.log("e", value.detail)
    let areas = value.detail.values;
    this.setData({
      ssq: areas,
      value3: `${areas[0].name}，${areas[1].name}，${areas[2].name}`,
      showArea: false
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
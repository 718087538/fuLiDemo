//index.js
//获取应用实例
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');
let start_Time, djs_data, sc_time, test;

const WXAPI = require('../../wxapi/main')



Page({


  onShareAppMessage() {
    return {
      title: '免费领好物',
      path: 'pages/index/index'
    }
  },

  data: {
    swiperList:[],
    motto: 'Hello World',
    userInfo: {},
    current: 'homepage',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: [{
      src: "../../static/banner/b1.jpg"
    }, {
      src: "../../static/banner/b2.jpg"
    }, {
      src: "../../static/banner/b3.jpg"
    }],
    giftList: [{
      src: "../../static/banner/b1.jpg"
    }, {
      src: "../../static/banner/b1.jpg"
    }, {
      src: "../../static/banner/b2.jpg"
    }, {
      src: "../../static/banner/b3.jpg"
    }],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    noticeList: [], //首页通知的列表
    playNoticeSpeed: 1600, //通知滚动速度，根据数量来计算，2.5s *n 
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  globalData: {
    appid: '1wqas2342dasaqwe2323424ac23qwe', //appid需自己提供，此处的appid我随机编写
    secret: 'e0dassdadef2424234209bwqqweqw123ccqwa', //secret需自己提供，此处的secret我随机编写

  },
  getSwiper: function () {
    WXAPI.getSwiper({}).then(res => {
      console.log("轮播图", res)
      this.setData({
        swiperList:res.data
      })
    })
  },
  onLoad: function () {
    
    WXAPI.getNotice({
      isUse: 1
    }).then(res => {
      console.log("tongzhi ", res)
      if (res.code == 200) {}
      this.setData({
        noticeList: res.data,
        // playNoticeSpeed:res.data.length * 2500
      })
    })

    this.getSwiper();

    var that = this; //把this对象复制到临时变量that
    const wxreq = wx.request({
      url: 'https://api.orderour.com/api/admin/upGoods',
      success: function (res) {
        console.log(res.data);
        // this.userData = res.data; //无效不能实时的渲染到页面
        that.setData({
          giftList: res.data.data
        }); //和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res) {
        console.log(res.data);
        this.userData = "数据获取失败";
      }
    })
    //获取uuid和code等信息
    // wx.login({
    //   success: function (res) {
    //     console.log('loginCode:', res)
    //   }
    // });


  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // globalData: {
  //   qj: 123
  // }
})
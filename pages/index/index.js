//index.js
//获取应用实例
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');
let start_Time, djs_data, sc_time, test;
const WXAPI = require('../../wxapi/main')
Page({
  getShareInfo() {
    let date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let shareDate = year + month + day;
    WXAPI.getShareInfo({
      upDate: shareDate
    }).then(res => {
      this.setData({
        shareTitle: res.data.title,
        shareImgSrc: res.data.imgSrc
      })
    })
  },
  onShareAppMessage() {
    return {
      title: this.data.shareTitle, // 小程序的名称
      imageUrl: this.data.shareImgSrc, //自定义图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      path: 'pages/index/index'
    }
  },

  data: {
    loading: true, //骨架屏
    swiperList: [],
    motto: 'Hello World',
    userInfo: {},
    current: 'homepage',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: [],
    giftList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    noticeList: '欢迎光临', //首页通知
    playNoticeSpeed: 2000, //通知滚动速度，根据数量来计算，2.5s *n 
    comeBtnBg: '',
    showRead: false,
    showTitle: '新人必看',
    showWanLa: false, //是否显示来晚了，碎片没了
    getPicSuccessful: false,
    getPicSuccImg: "", //得到的碎片的图片地址
    getgiftName: "",
    getPicSuccPicName: "",
    shareTitle: "",
    shareImgSrc: "",
    spinShow:true
  },
  goJiFen() {
    wx.removeStorageSync('per_get_goodid')
    wx.navigateTo({
      url: `/pages/jiFen/jifen` //从特定商品跳到浇水，设置缓存优先分配该商品。
    })
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
      this.setData({
        swiperList: res.data,
        spinShow:false
      })
    })
  },
  onShow: function () {
    this.read();
  },
  closeWanLa() {
    this.setData({
      showWanLa: false
    })
  },
  closeSuccess() {
    this.setData({
      getPicSuccessful: false
    })
  },
  login() {

  },
  onLoad: function (options) {
    this.getSwiper();



    // this.login();
    // console.log("openId==============》", wx.getStorageSync('openid'));
    //查看是否是分享碎片的链接
    if (options.picName) {
      WXAPI.getSharePic({
        openId: options.openId,
        picName: options.picName,
        giftId: options.giftId,
        myOpenId: wx.getStorageSync('openid'),
      }).then(res => {
        console.log(res);

        if (res.code === 201) {
          this.setData({
            showWanLa: true
          })
        } else if (res.code === 200) {
          this.setData({
            getPicSuccessful: true,
            getPicSuccImg: res.data.imgSrc,
            getgiftName: res.data.giftName,
            getPicSuccPicName: res.data.picName
          })
        }
      })
    }
    //查看是否是邀请新人的链接
    if (options.type && options.invitePeopleId) {
      WXAPI.invitePeople({
        type: options.type,
        invitePeopleId: options.invitePeopleId,
        openId: wx.getStorageSync('openid')
        // openId:wx.getStorageSync('openid')
      }).then(res => {
        console.log("邀请人链接的回应", res);
        if (res.code === 200) {
          //尝试注册新用户
          WXAPI.register({
            openId: wx.getStorageSync('openid'),
            sex: 3
          }).then(res => {
            console.log("是新人，注册的信息", res)
          })
        }
      })
    } else {
      //尝试注册新用户
      WXAPI.register({
        openId: wx.getStorageSync('openid'),
        sex: 3
      }).then(res => {
        console.log("注册的信息", res)
      })
    }


    WXAPI.getNotice({
      isUse: 1
    }).then(res => {
      if (res.code == 200) {
        let toString = '';
        for (let i of res.data) {
          toString += i.content;
        }
        this.setData({
          noticeList: toString
        })
      }
    })
    WXAPI.getComeBtn({
      isWx: 1
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          comeBtnBg: res.data[0].imgSrc
          // comeBtnBg:'../../static/testBg.png'
        })
      }
    })


    var that = this; //把this对象复制到临时变量that
    WXAPI.getGoods({
    }).then(res => {
      console.log('022ressss',res);
      if (res.code == 200) {
        this.setData({
            giftList: res.data,
            loading: false
        })
      }
    })
    //获取uuid和code等信息
    // wx.login({
    //   success: function (res) {
    //     console.log('loginCode:', res)
    //   }
    // });
    this.getShareInfo();

  },
  read: function (e) {
    WXAPI.getRead({
      openId: wx.getStorageSync('openid')
    }).then(res => {
      if (res.data != false && res.code === 200) {
        this.setData({
          read: true,
          showTitle: res.data.showTitle
        })
      }
    })
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
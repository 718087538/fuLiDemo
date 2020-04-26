//index.js
//获取应用实例
const app = getApp()
let start_Time, djs_data, sc_time, test;
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    djs_data: 0,
    imgs: [{
        src: "../../static/00.jpg"
      },
      {
        src: "../../static/00.jpg"
      },
      {
        src: "../../static/00.jpg"
      },
      {
        src: "../../static/00.jpg"
      },
    ],
    tl_id: "", //隐藏地鼠定时器
    tl_id: "", //显示地鼠定时器
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  //开始游戏
  startGame() {
    sc_time = 10; //游戏时长10s
    //记录游戏开始时间
    start_Time = new Date();
    //执行倒计时方法
    this.djs();
    //执行地鼠出现的方法
    this.mouse_show();

  },
  mouse_show() {
    //生成随机的数组下标
    var i = parseInt(Math.random() * 4);
    console.log(i);
    //随机改变图片
    this.setData({
      ['imgs[' + i + '].src']: "../../static/01.jpg",
    })
    //复原当前位置
    var that = this;
    //倒计时的计时器

    this.setData({
      tl_id: setTimeout(function () {
        that.mouse_hide(i);
      }, 1000)
    })


    //出现另一只地鼠
    this.setData({
      jg_id: setTimeout(function () {
        that.mouse_show(i);
      }, 1000)
    })


    //出现另一只地鼠
    // var jg_id = setTimeout(function () {
    //   that.mouse_show(i);
    // },  1000);
  },

  //地鼠消失，没打中
  mouse_hide(i) {
    this.setData({
      ['imgs[' + i + '].src']: "../../static/00.jpg",
    })
  },
  //游戏倒计时
  djs() {
    //实时记录游戏时间
    var game_time = new Date();
    //计算并显示倒计时
    djs_data = sc_time - parseInt((game_time - start_Time) / 1000);
    this.setData({
      djs_data: djs_data
    })
    if (djs_data < 1) {
      console.log("游戏结束了");
      clearTimeout(djs_id);
      clearTimeout(this.data.tl_id);
      clearTimeout(this.data.jg_id);
      //地鼠清场
      this.qingchang();
      return;
    }
    var that = this;
    //倒计时的计时器
    var djs_id = setTimeout(function () {
      that.djs();
    }, 1000);

  },
  qingchang() {
    for (var i = 0; i < 4; i++) {
      this.setData({
        ['imgs[' + i + '].src']: "../../static/00.jpg",
      })
    }
  },
  //结束游戏
  // endGame() {
  //   console.log("调用游戏结束");
  //   clearTimeout(djs_id);
  // },
  play(e) {
    var n = e.target.dataset.num;

    //获取图片的名称,判断是否打中地鼠
    var name = this.data.imgs[n].src.substr(14, 1);
    if (name == 1) {
      //切换为打中状态
      this.setData({
        ['imgs[' + n + '].src']: "../../static/02.jpg",
      })
      //打中后还原
      var that = this;
      var play_id = setTimeout(function () {
        that.setData({
          ['imgs[' + n + '].src']: "../../static/00.jpg",
        })
      }, 500);
    }
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
  onLoad: function () {},
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  globalData: {
    qj: 123
  }
})
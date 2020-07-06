// pages/jiFen/jifen.js
const {
  $Toast
} = require('../../dist/base/index');
const WXAPI = require('../../wxapi/main')

let start_Time, djs_data, sc_time, test;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    djs_data: 0,
    energy: 0, //体力要动态获取
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
      {
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
      {
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
      {
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
    results: 0, //打地鼠成绩
    latest: 8, //最少达到指定分数才能获得碎片，后台可控
    beforeI: "", //存储上一次的i,避免出现在相同位置时出现bug
    playOver: true, //是否玩完了这局
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
    duration: 1000
  },

  onShareAppMessage() {
    return {
      title: '活动',
      path: `pages/jiFen/jifen`
    }
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  //开始游戏
  startGame() {
    if (!this.data.playOver) {
      console.log("游戏中")
      return false;
    }
    if (this.data.energy > 0) {
      WXAPI.lowEnergy({
        openId: wx.getStorageSync('openid'),
        dos: 'decrease'
      }).then(res => {
        console.log("减体力成功", res)
        if (res.code == 200) {
          this.setData({
            energy: this.data.energy - 1
          })
        } else if (res.code == 201) {
          console.log("体力不足=========")
        }
      })
    } else if (this.data.energy == 0) {
      $Toast({
        content: '体力不足'
      });
      return false;
    }

    // if (this.data.energy <= 0) {
    //   this.noEnery();
    //   return false;
    // }
    this.setData({
      playOver: false, //设置游戏中
      // energy: this.data.energy - 1, //要发送到服务器保存
    })
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
    var i = parseInt(Math.random() * 16);
    if (i === this.data.beforeI) {
      ++i;
      //如果加完之后超出了，放到第一个位置
      if (i === 16) {
        i = 0
      }
    }
    this.setData({
      beforeI: i
    })

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
  },

  //地鼠消失
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
      this.gameOver();
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
    for (var i = 0; i < 16; i++) {
      this.setData({
        ['imgs[' + i + '].src']: "../../static/00.jpg",
      })
    }
  },
  play(e) {
    var n = e.target.dataset.num;
    //获取图片的名称,判断是否打中地鼠
    var name = this.data.imgs[n].src.substr(14, 1);
    if (name == 1) {
      //切换为打中状态
      this.setData({
        ['imgs[' + n + '].src']: "../../static/02.jpg",
        results: this.data.results + 1
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
  gameOver() {

    if (this.data.results >= this.data.latest) {
      //请求分配碎片
      WXAPI.getFragment({
        uid: wx.getStorageSync('openid')
      }).then(res => {
        console.log("分配碎片结果", res)
        let picName;
        switch (res.data.picName) {
          case 'pic1':
            picName = "碎片1";
            break;
          case 'pic2':
            picName = "碎片2";
            break;
          case 'pic3':
            picName = "碎片3";
            break;
          case 'pic4':
            picName = "碎片4";
            break;
          case 'pic5':
            picName = "碎片5";
            break;
          case 'pic6':
            picName = "碎片6";
            break;
        };
        if (res.code == 200) {
          $Toast({
            content: `恭喜获得${res.data.giftName}${picName}`
          });
        }
      })
    } else {
      //false代表游戏没完成，进行中
      if (!this.data.playOver) {
        $Toast({
          content: '好遗憾，分数不足无碎片'
        });
      }
    }

    this.setData({
      playOver: true //设置游戏完成
    })
  },
  noEnery() {
    $Toast({
      content: '体力不足！'
    });
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
  onLoad: function () {
    //获取体力
    WXAPI.getEnergy({
      openId: wx.getStorageSync('openid')
    }).then(res => {
      console.log("体力", res.data)
      this.setData({
        energy: res.data
      })
    });
    WXAPI.getScore({
    
    }).then(res => {
      console.log("最少赢得", res.data)
      this.setData({
        latest: res.data.score
      })
    });



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
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    //退出本页面，设置为play结束
    // this.gameOver();
    this.setData({
      playOver: true //设置游戏完成
    })
  },

})
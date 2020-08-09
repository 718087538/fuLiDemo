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
    energy: 200, //体力要动态获取
    show: false,
    shouYuDi: false, //展示雨滴效果
    dojiaoshui: false, //是否浇水动画进行中
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  getShuiDi() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  sureGet() {
    wx.navigateTo({
      url: '/pages/gift/fragments?key=value',
    })
    this.setData({
      getedPic: false
    })
  },
  seeGood() {
    this.setData({
      getedPic: false
    })
  },
  //浇水的操作
  do() {
    if (this.data.dojiaoshui) {
      console.log("浇水中了")
      return false
    }
    //展示浇水的水滴动画
    setTimeout(() => {
      this.setData({
        shouYuDi: true
      })
    }, 900)
    //关闭浇水水滴动画
    setTimeout(() => {
      this.setData({
        shouYuDi: false
      })
    }, 2200)
    //判断是否有水滴可以浇水
    if (this.data.energy.energyNum > 0) {
      WXAPI.lowEnergy({
        openId: wx.getStorageSync('openid'),
        dos: 'decrease'
      }).then(res => {
        console.log("减体力成功", res)
        var str = 'energy.energyNum';
        if (res.code == 200) {
          setTimeout(() => {
            this.setData({
              [str]: this.data.energy.energyNum - 10,

            })
          }, 1200)
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
    this.setData({
      dojiaoshui: true,
    })
    //展示浇水得到的碎片，取消浇水中的变量，让水壶克再次点击
    setTimeout(() => {
      this.setData({
        dojiaoshui: false,
        // getedPic: true
      })
    }, 2800)
  },

  addEnergy(e) {
    console.log(e.target.dataset);
    WXAPI.lowEnergy({
      openId: wx.getStorageSync('openid'),
      dos: 'add',
      num: e.target.dataset.num,
      type: e.target.dataset.type
    }).then(res => {
      console.log("加体力成功", res)
      var obj1 = 'energy.energyNum';
      var obj2 = 'energy.todayContinuous';
      var obj3 = 'energy.continuousDay';
      var obj4 = 'energy.todaySignIn';
      if (res.code == 200) {
        if (res.data === "signIn") {
          this.setData({
            [obj1]: this.data.energy.energyNum + Number(e.target.dataset.num),
            [obj4]: true,
          })
        } else {
          this.setData({
            [obj1]: this.data.energy.energyNum + Number(e.target.dataset.num),
            [obj2]: true,
            [obj3]: this.data.energy.continuousDay + 1,
          })
        }
      } else if (res.code == 201) {
        console.log("体力不足=========")
      }
    })
  },

  sharePeople(num,type){
    WXAPI.lowEnergy({
      openId: wx.getStorageSync('openid'),
      dos: 'add',
      num: e.target.dataset.num,
      type: e.target.dataset.type
    }).then(res => {
      console.log("加体力成功", res)
      var obj1 = 'energy.todaySignIn';
      if (res.code == 200) {
          this.setData({
            [obj1]: this.data.energy.todaySignIn + 1,
          })
        }
      })
  },



  // onShareAppMessage() {
  //   return {
  //     title: '0元包邮，家居百货',
  //     path: `pages/index/index`
  //   }
  // },
  onShareAppMessage(options) {
    // 自定义分享内容
    var shareObj = {
      title: "0元包邮，家居百货", // 小程序的名称
      path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '', //自定义图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        console.log("分享成功了！")

        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      fail: function () {
        console.log("分享失败！！！")
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete() {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    }
    // 来自页面内的按钮的转发
    // if (options.from == 'button') {
    //   console.log("来源于button");
    //   // 此处可以修改 shareObj 中的内容
    //   shareObj.path = '/pages/index/index?btn_name=' + eData.name;
    // }
    // 返回shareObj
    // return shareObj;
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
    // var that = this; //把this对象复制到临时变量that
    // const wxreq = wx.request({
    //   url: 'https://api.orderour.com/api/admin/upGoods',
    //   success: function (res) {
    //     console.log(res.data);
    //     // this.userData = res.data; //无效不能实时的渲染到页面
    //     that.setData({
    //       giftList: res.data.data
    //     }); //和页面进行绑定可以动态的渲染到页面
    //   },
    //   fail: function (res) {
    //     console.log(res.data);
    //     this.userData = "数据获取失败";
    //   }
    // })
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
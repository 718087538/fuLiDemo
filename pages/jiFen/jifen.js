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
    getGiftImg: "",
    djs_data: 0,
    energy: 200, //体力要动态获取
    show: false,
    shouYuDi: false, //展示雨滴效果
    dojiaoshui: false, //是否浇水动画进行中
    giftName: "", //本次获得的奖品名
    picName: "", //本次获得的拼图名
    giftId: "", //本次拼图得商品id，不一定对
    getedPic: false,
    scale: false, //展示放大树木
    shareTitle: "",
    shareImgSrc: "",
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  closeGet() {
    this.setData({
      show: false
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
    this.setData({
      getedPic: false
    })
  },
  seeGood() {
    console.log("奖品id", this.data.giftId)
    wx.navigateTo({
      url: `/pages/gift/fragments?giftId=${this.data.giftId}` //实际路径要写全
    })
  },
  //浇水的操作
  do() {
    console.log("浇水")
    if (this.data.dojiaoshui) {
      console.log("浇水中了")
      return false
    }
    //判断是否有水滴可以浇水
    if (this.data.energy.energyNum > 10) {
      this.setData({
        dojiaoshui: true,
      })
      //展示浇水的水滴动画
      setTimeout(() => {
        this.setData({
          shouYuDi: true,
          scale: true,
        })
      }, 900)
      console.log("scale", this.data.scale);
      //关闭浇水水滴动画
      setTimeout(() => {
        this.setData({
          shouYuDi: false,
          scale: false,
        })
      }, 2200)
      WXAPI.lowEnergy({
        openId: wx.getStorageSync('openid'),
        dos: 'decrease'
      }).then(res => {
        console.log("减体力成功", res)
        var str = 'energy.energyNum';
        if (res.code == 200) {
          //展示浇水得到的拼图，取消浇水中的变量，让水壶克再次点击
          setTimeout(() => {
            this.setData({
              dojiaoshui: false,
              getedPic: true
            })
          }, 2800)
          setTimeout(() => {
            this.setData({
              [str]: this.data.energy.energyNum - 10,
            })
          }, 1200)
        } else if (res.code == 201) {
          console.log("体力不足=========")
        }
        this.gameOver(); //抽拼图
      })
    } else if (this.data.energy.energyNum <= 0) {
      $Toast({
        content: '体力不足'
      });
      return false;
    }


  },
  //领体力
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

  sharePeople(num, type) {
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
  getShareInfo() {
    let date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month<10){
      month = "0" + month;
    }
    if(day<10){
      day = "0" + day;
    }
    let shareDate =year+month+day ;
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
      path: `/pages/index/index?type="shareApp"&invitePeopleId=${wx.getStorageSync('openid')}`, // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: this.data.shareImgSrc, //自定义图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      complete() {
        // 转发结束之后的回调（转发成不成功都会执行）
        console.log("分享完成");
        WXAPI.addInvite({
          openId: wx.getStorageSync('openid')
        }).then(res => {
          console.log("增加分享记录", res)
        })
      }
    }
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
    // if (this.data.results >= this.data.latest) {
    //请求分配拼图
    WXAPI.getFragment({
      uid: wx.getStorageSync('openid'),
      goodId: wx.getStorageSync('per_get_goodid') || '',
    }).then(res => {
      console.log("分配拼图结果", res)
      let picName;
      switch (res.data.picName) {
        case 'pic1':
          picName = "拼图1";
          break;
        case 'pic2':
          picName = "拼图2";
          break;
        case 'pic3':
          picName = "拼图3";
          break;
        case 'pic4':
          picName = "拼图4";
          break;
        case 'pic5':
          picName = "拼图5";
          break;
        case 'pic6':
          picName = "拼图6";
          break;
        case 'pic7':
          picName = "拼图7";
          break;
        case 'pic8':
          picName = "拼图8";
          break;
        case 'pic9':
          picName = "拼图9";
          break;
      };
      if (res.code == 200) {
        this.setData({
          giftName: res.data.giftName,
          picName: picName,
          giftId: res.data.giftId,
          getGiftImg: res.data.imgSrc,
        })
        // $Toast({
        //   content: `恭喜获得${res.data.giftName}${picName}`
        // });
      }
    })
    // } else {
    //   //false代表游戏没完成，进行中
    //   if (!this.data.playOver) {
    //     $Toast({
    //       content: '好遗憾，分数不足无拼图'
    //     });
    //   }
    // }

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
      console.log("体力", res)
      this.setData({
        energy: res.data
      })
    });
    this.getShareInfo();
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
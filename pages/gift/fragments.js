// pages/gift/fragments.js
const WXAPI = require('../../wxapi/main')
const {
  $Toast
} = require('../../dist/base/index');
const order = ['demo1', 'demo2', 'demo3']
Page({
  changeName: function (e) {
    this.setData({
      name: 'MENCRE',
    })
  },
  closeShowShare: function (e) {
    this.setData({
      showShare: false
    })
  },
  sel: function (e) {
    let obj = e.currentTarget.dataset;
    if (this.data.over) {
      return false;
    }
    this.setData({
      picName: obj.idx,
      picNum: obj.sum,
      showShare: true
    })
    console.log("ssss", this.data.picName);

  },
  shareAnd() {
    var str = `ttt.b`;
    if (this.data.picNum > 0) {

    }
  },
  //用户点击右上角的分享和送碎片
  onShareAppMessage() {
    // if (this.data.picNum < 1) {
    //   return false;
    // }


    // console.log(`pages/gift/fragments?giftId=${this.data.gift.giftId}&openId=${wx.getStorageSync('openid')}&picName=pic${this.data.picName}&picNum=${this.data.picNum}`)
    let shareN = 0;
    if (this.data.picNum > 0) {
      shareN = 1;
    }
    if (this.data.picNum > 0) {
      WXAPI.addShare({
        giftId: this.data.gift.giftId,
        openId: wx.getStorageSync('openid'),
        picName: `pic${this.data.picName}`,
        picNum: shareN
      }).then(res => {
        console.log("分享回应", res);
        if (res.code === 200) {
          // let str = `this.data.gift.picList[${this.data.picName}].pic`;
          let idx = this.data.picName - 1;
          let str = `gift.picList[${idx}].pic`;
          let picNum2 = this.data.picNum - 1;
          shareN=0
          this.setData({
            [str]: picNum2,
            picNum:picNum2,
            showShare:false,
          })
        }
      })
    }
    return {
      title: this.data.shareTitle, // 小程序的名称
      imageUrl: this.data.shareImgSrc, //自定义图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      path: `pages/index/index?giftId=${this.data.gift.giftId}&openId=${wx.getStorageSync('openid')}&picName=pic${this.data.picName}`
    }
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
      upDate: shareDate,
      giftId:this.data.giftId
    }).then(res => {
      this.setData({
        shareTitle: res.data.title,
        shareImgSrc: res.data.imgSrc
      })
    })
  },
  goShare() {
    this.setData({
      showShare: false
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    ttt: {
      b: "tttttttttt"
    },
    picName: "", //分享那个碎片出去
    picNum: "", //分享该碎片的数量数量
    gift: "",
    imgSrc: "", //商品得图片
    imgSrc1: "../../static/banner/b3.jpg",
    name: "1111111",
    toView: 'green',
    showShare: false,
    selNum: 0, //要显示第几个赠送
    //分享的话要知道3个点，谁分享，那个商品，那个碎片。
    uid: "",
    giftId: "",
    picNum: "",
    over: false, //奖品是否结束
    showShareList: [{
      name: '取消'
    }],
    shareTitle: "",
    shareImgSrc: "",
    giftId:"",//奖品Id，可以传给获取封面时使用
    imgSrc:""
  },
  //合成奖品的操作
  synthetic() {
    //到时候canGet 改成判断每个碎片数量大于1
    if (this.data.gift.canGet) {
      WXAPI.changeGood({
        giftId: this.data.gift.giftId,
        uid: wx.getStorageSync('openid')
      }).then(res => {
        if (res.code === 200) {
          $Toast({
            content: '合成成功，前往 "我的" 页面领奖',
            type: 'success'
          });
        } else if (res.code === 201) {
          $Toast({
            content: '拼图不足',
            type: 'warning'
          });
        }
      })
    } else {
      $Toast({
        content: '拼图不足',
        type: 'warning'
      });
    }
  },
  showShare() {
    this.setData({
      visible1: true
    });
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    // console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.over) {
      this.setData({
        over: true
      })
    }
    this.setData({
      giftId:options.giftId
    })
    var that = this; //把this对象复制到临时变量that
    const wxreq = wx.request({
      url: `https://api.orderour.com/api/wxClient/giftInfo?uid=${wx.getStorageSync('openid')}&giftId=${options.giftId}`,
      success: function (res) {
        if (res.data === "") {
          //证明没有该奖品的记录，所有碎片应为0
          let giftProgress = {
            uid: wx.getStorageSync('openid'),
            giftId: options.giftId,
            picList: [{
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              },
              {
                pic: 0
              }
            ],
            canGet: 0,
            imgSrc: options.imgSrc,
          }
          that.setData({
            gift: giftProgress
          }); //和页面进行绑定可以动态的渲染到页面
        } else if (res.data.data.pro) {
          console.log("拼图进度=====>", res.data.data);
          let resData = res.data.data.pro;
          let canGet = false;
          if (resData.pic1 > 0 && resData.pic2 > 0 && resData.pic3 > 0 && resData.pic4 > 0 && resData.pic5 > 0 && resData.pic6 > 0 && resData.pic7 > 0 && resData.pic8 > 0 && resData.pic9 > 0) {
            canGet = true;
          }
          let giftPro = {
            uid: wx.getStorageSync('openid'),
            giftId: options.giftId,
            picList: [{
                pic: resData.pic1
              },
              {
                pic: resData.pic2
              },
              {
                pic: resData.pic3
              },
              {
                pic: resData.pic4
              },
              {
                pic: resData.pic5
              },
              {
                pic: resData.pic6
              },
              {
                pic: resData.pic7
              },
              {
                pic: resData.pic8
              },
              {
                pic: resData.pic9
              },
            ],

            canGet: canGet,
            imgSrc: res.data.data.imgSrc
          }
          that.setData({
            gift: giftPro
          }); //和页面进行绑定可以动态的渲染到页面
        }
        // this.userData = res.data; //无效不能实时的渲染到页面
        // that.setData({ imgList: res.data.data[0].imgArray});//和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res) {
        console.log(res.data);
        // this.userData = "数据获取失败";
      }
    });
    this.getShareInfo();

  },
  getShareInfo(){
    WXAPI.getFragmentsAd({
    }).then(res => {
      console.log("ressssss",res);
      this.setData({
        imgSrc:res.data[0].imgSrc
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

})
// pages/gift/fragments.js
const WXAPI = require('../../wxapi/main')
const { $Toast } = require('../../dist/base/index');
const order = ['demo1', 'demo2', 'demo3']
Page({
  changeName: function (e) {
    this.setData({
      name: 'MENCRE',
    })
  },
  closeShowShare:function(e){
    this.setData({
      showShare:false
    })
  },
  sel: function (e) {
    this.setData({
      showShare:true
    })
  },
  //用户点击右上角的分享
  onShareAppMessage() {
    // console.log(`pages/gift/fragments?giftId=0000000&uid=11111111111&imgSrc=${this.data.gift.imgSrc}`)
    return {
      title: '拼图进度',
      path: `pages/gift/fragments?giftId=0000000&uid=11111111111&imgSrc=${this.data.gift.imgSrc}`
    }
  },
  goShare(){
  console.log("确定分享");
    this.setData({
      showShare:false
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    gift:"",
    imgSrc:"",//商品得图片
    imgSrc1: "../../static/banner/b3.jpg",
    name: "1111111",
    toView: 'green',
    showShare:false,
    selNum: 0, //要显示第几个赠送
  //分享的话要知道3个点，谁分享，那个商品，那个碎片。
    uid:"",
    giftId:"",
    picNum:"",
    over:false,//奖品是否结束
    showShareList: [
      {
          name: '取消'
      }
  ],
  },
  //合成奖品的操作
  synthetic(){
    //到时候canGet 改成判断每个碎片数量大于1
    if(this.data.gift.canGet){
      WXAPI.changeGood({giftId:this.data.gift.giftId,uid:wx.getStorageSync('openid')}).then(res=>{
        console.log("changeGoodRES",res)
      if(res.code === 200){
        $Toast({
          content: '合成成功，前往 "我的" 页面领奖',
          type: 'success'
      });
      }else if(res.code === 201){
        $Toast({
          content: '拼图不足',
          type: 'warning'
      });
      }
    })
    }else{
      $Toast({
        content: '拼图不足',
        type: 'warning'
    });
    }
  },
  showShare () {
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
    if(options.over){
      this.setData({
        over:true
      })
    }
   
    var that = this;//把this对象复制到临时变量that
    const wxreq = wx.request({
      url: `https://api.orderour.com/api/wxClient/giftInfo?uid=${wx.getStorageSync('openid')}&giftId=${options.giftId}`,
      success: function (res){
        if(res.data === ""){
          //证明没有该奖品的记录，所以碎片应为0
          let giftProgress = {
            uid:wx.getStorageSync('openid'),
            giftId:options.giftId,
            picList:[
              {pic:0},
              {pic:0},
              {pic:0},
              {pic:0},
              {pic:0},
              {pic:0},
              {pic:0},
              {pic:0},
              {pic:0}
            ],
            canGet:0,
            imgSrc:options.imgSrc,
          }
        that.setData({ gift:giftProgress});//和页面进行绑定可以动态的渲染到页面
        }else if(res.data.data.pro){
          console.log("拼图进度=====>",res.data.data);
          let resData = res.data.data.pro;
          let canGet = false;
          if(resData.pic1>0&&resData.pic2>0&&resData.pic3>0&&resData.pic4>0&&resData.pic5>0&&resData.pic6>0&&resData.pic7>0&&resData.pic8>0&&resData.pic9>0){
            canGet = true;
          }
          let giftPro ={
            uid:wx.getStorageSync('openid'),
            giftId:options.giftId,
            picList:[
              {pic:resData.pic1},
              {pic:resData.pic2},
              {pic:resData.pic3},
              {pic:resData.pic4},
              {pic:resData.pic5},
              {pic:resData.pic6},
              {pic:resData.pic7},
              {pic:resData.pic8},
              {pic:resData.pic9},
            ],
           
            canGet:canGet,
            imgSrc:res.data.data.imgSrc
          } 
        that.setData({ gift:giftPro});//和页面进行绑定可以动态的渲染到页面
        }
        // this.userData = res.data; //无效不能实时的渲染到页面
        // that.setData({ imgList: res.data.data[0].imgArray});//和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res){
        console.log(res.data);
        // this.userData = "数据获取失败";
      }
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
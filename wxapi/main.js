// 小程序开发api接口统一配置
// 如果你的域名是： https://www.baidu.com/cn 那么这里只要填写 cn
let subDomain = '/api'  // 子域名,没有就等于''
const API_BASE_URL = 'http://192.168.0.100:7001'  // 主域名 本地
// const API_BASE_URL = 'https://api.orderour.com'  // 主域名 服务器
const request = (url, method, data) => {
  let _url = API_BASE_URL + subDomain  + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}
 
/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}
 
module.exports = {
  request,
  // 首页列表接口
  // getList: data => request('/goods/list','get', data),
  // 详情接口
  // getDetail: (data) => request('/goods/detail','get', data),
  test:(data) => request('/','get','data'),//测试的域名
  register:data => request('/wxClient/register','post',data),//注册的操作
  login:data => request('/wxClient/login','get',data),//登录的操作
  changeGood:data => request('/wxClient/changeGood','post',data),//合成商品的操作
  getGood:data => request('/wxClient/changeGood','get',data),//请求待领取的商品
  getAddress:data => request('/wxClient/addAdress','get',data),//请求收获地址
  addAddress:data => request('/wxClient/addAdress','post',data),//添加收货地址
  nowGet:data => request('/wxClient/nowGetGood','post',data),//我的，合成商品
  delAddress:data => request('/wxClient/addAdress','delete',data),//删除一条收货地址
  updateAddress:data => request('/wxClient/addAdress','put',data),//更新收货地址
  waitSend:data => request('/wxClient/waitSend','get',data),//
  sureOrder:data => request('/wxClient/sureOrder','put',data),//确认收货
  getNotice:data => request('/admin/addHomeNotice','get',data),//获取已发布的通知
  getSwiper:data => request('/admin/swiper','get',data),//接收轮播图
  getEnergy:data => request('/wxClient/getEnergy','get',data),//查询体力
  lowEnergy:data => request('/wxClient/getEnergy','put',data),
  getFragment:data => request('/wxClient/fragment','get',data),//请求分配碎片
  getScore:data => request('/admin/score','get',data),//请求获得碎片最少应当分数
  addSuggestion:data => request('/wxClient/suggestion','post',data),//提交意见
  getComeBtn:data => request('/admin/comeBtn','get',data),//浇水入口背景
  getGiftList:data => request('/wxClient/gift','get',data),//奖品列表
  getRead:data => request('/wxClient/read','get',data),//展示新人指导
  putRead:data => request('/wxClient/read','put',data),//设置新人指导已读
  getHelpImg:data => request('/admin/addImgHelp','get',data),//新人指导图片
  showAddress:data => request('/admin/addressStatus','get',data),//新人指导图片
  invitePeople:data => request('/wxClient/invitePeople','post',data),//判断是否邀请新人成功
  addShare:data => request('/wxClient/addShare','post',data),//分享碎片给人
  getSharePic:data => request('/wxClient/sharepic','get',data),//尝试获取
  getRank:data => request('/wxClient/rankList','get',data),//分享排行榜
  shareInfo:data => request('/wxClient/shareInfo','get',data),//个人分享记录
  addInvite:data => request('/wxClient/addShareList','post',data),//增加邀请新人记录
  reInvite:data => request('/wxClient/reInvite','post',data),//重置邀请新人成功记录
  upMyData:data => request('/wxClient/upMyData','post',data),//上传个人信息


  
}

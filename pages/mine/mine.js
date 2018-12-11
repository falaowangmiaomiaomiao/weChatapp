// pages/mine/mine.js
const app = getApp();
Page({
  resetPassword:function(){
    wx.navigateTo({
      url: '../../pages/resetPassword/resetPassword'
    })
  },
  waterValve:function(){
    wx.navigateTo({
      url:'../../pages/waterValve/waterValve'
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {},
    RealName:null,
    phone:null,
    AreaName:null,
  },
  signOut: function () {
    var Token = wx.getStorageSync("Token");
    wx.showModal({
      title: '退出登录',
      content: '确认退出科左通辽智慧灌区操作平台',
      cancelColor: "#696969",
      confirmColor: "#5490fe",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://weapp.huishuiyun.com/peasant/account/logout',
            data:{},
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + Token
            },
            method:"POST",
            success(res) {
              // console.log(res);
              if(res.data.ret==1){
                wx.clearStorage("Token");
                wx.navigateTo({
                  url: '../logs/logs'
                })
              }else{
                var msg=res.data.msg;
                wx.showToast({
                  title: msg,
                  icon:"none",
                  duration:3000,
                })
              } 
            }
          })
        } else if (res.cancel) {
          console.log("已取消")
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  onLoad: function (options) {
    var that=this;
    var Token=wx.getStorageSync("Token");
    var realName=that.data.realName;
    var phone=that.data.phone;
    var AreaName=that.data.AreaName;
    wx.request({
      url: 'https://weapp.huishuiyun.com/peasant/account/userDetails',
      data:{},
      header:{
        "content-type":"application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + Token
      },
      method:'POST',
      success(res){
        if(res.data.ret==1){
          that.setData({
            realName: res.data.data.RealName,
            phone: res.data.data.MobilePhone,
            AreaName: res.data.data.AreaName
          })
        }else{
          var msg=res.data.msg;
          wx.showToast({
            title: msg,
            icon:"none",
            duration:3000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onShareAppMessage: function () {
    return {
      title: '农户操作平台',
      desc: '我正在使用，快来使用吧',
      path: '/page/index/index'
    }
  }
})
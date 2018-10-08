// pages/mine/mine.js
var App = getApp();
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
    userInfo: {},
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
            url: 'https://weixin.yaoshihe.cn:950/api/users/logout',
            data:{},
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + Token
            },
            method:"POST",
            success(res) {
              console.log(res);
              wx.getStorageSync("Token");
            }
          })
          wx.navigateTo({
            url: '../logs/logs'
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
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo(function(userInfo){
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})
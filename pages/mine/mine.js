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
    wx.showModal({
      title: '退出登录',
      content: '确认退出科左通辽智慧灌区操作平台',
      cancelColor: "#696969",
      confirmColor: "#5490fe",
      success: function (res) {
        if (res.confirm) {
          userInfo: null;
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
    // var userInfoTmp = app.globalData.userInfo;
    // if (userInfoTmp == null) {
    //   wx.navigateTo({
    //     url: '../logs/logs',
    //   })
    // } else {
    //   this.setData({
    //     userInfo: userInfoTmp
    //   })
    // }
    var that=this;
    wx.getUserInfo(function(userInfo){
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
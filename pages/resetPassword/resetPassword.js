// pages/resetPassword/resetPassword.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    var Token = wx.getStorageSync("Token");
    var Name = wx.getStorageSync("Name");
    var Password = wx.getStorageSync("Password");
    var oldpwd=e.detail.value.oldpwd;
    var newpwd=e.detail.value.newpwd;
    var resetpwd=e.detail.value.resetpwd;
    if (oldpwd == '' || newpwd == '' || resetpwd == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000,
      })
    } else if (newpwd.length<6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'none',
        duration: 1000,
      })
    } else if (newpwd.length >20) {
      wx.showToast({
        title: '密码过长',
        icon: 'none',
        duration: 1000,
      })
    } else if (newpwd != resetpwd){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1000,
      })
    }else{
      wx.request({
        url: 'https://weixin.yaoshihe.cn:950/peasant/account/changePwd?oldPassword=' + oldpwd + '&password=' + newpwd,
        data:{},
        header:{
          "content-type":"x-www-form-urlencoded",
          'Authorization': 'Bearer ' + Token
        },
        method:"POST",
        success(res){
          // console.log(res)
          if (res.data.ret==1){
            wx.showToast({
              title: '密码修改成功',
              icon:'success',
              duration:1000
            })
          } else if (res.data.ret == -1){
            wx.showToast({
              title: '旧密码不正确',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
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
    return {
      title: '农户操作平台',
      desc: '我正在使用，快来使用吧',
      path: '/page/index/index'
    }
  },
  return: function () {
    wx.navigateBack({
      delta:2
    })
  }
})
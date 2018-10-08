// pages/resetPassword/resetPassword.js
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
    if (oldpwd == '' || newpwd == '' || newpwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000,
      })
    } else if (newpwd != resetpwd) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1000,
      })
    }else{
      wx.request({
        // url: 'https://weixin.yaoshihe.cn:950/api/users/changePwd?Name='++,

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

  },
  return: function () {
    wx.navigateBack({
      delta:2
    })
  }
})
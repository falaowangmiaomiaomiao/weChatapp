// logs.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    password: null,
  },

  inputName: function (even) {
    this.setData({
      name: even.detail.value
    })
  },

  inputPassword: function (even) {
    this.setData({
      password: even.detail.value
    })
  },

  loginClick: function (even) {
    var nameTmp = this.data.name;
    console.log(nameTmp)
    if (nameTmp == null) {
      wx.showToast({
        title: '请输入帐号',
      })
      return;
    }

    var passwordTmp = this.data.password;
    if (passwordTmp == null) {
      wx.showToast({
        title: '请输入密码',
      })
      return;
    }

    var userInfoTmp = { name: nameTmp, password: passwordTmp };
    console.log(userInfoTmp)
    if (userInfoTmp) {
      app.globalData.userInfo = userInfoTmp;
      wx.redirectTo({
        url: '../index/index',
      })
    }
  }
})
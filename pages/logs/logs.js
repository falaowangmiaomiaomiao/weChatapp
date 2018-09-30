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
  formSubmit: function (e) {
    var that = this;
    // var token = wx.getStorageSync('Token')
    var name = e.detail.value.name;         //获取input初始值
    var password = e.detail.value.password;    //获取input初始值

    wx.request({
      method: 'POST',
      url: 'https://weixin.yaoshihe.cn:950/peasant/account/login?userName=' + name + '&pwd='+password, //接口地址
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var token = res.data.data.Token;
        var Token = wx.setStorageSync('Token',token);
        console.log(token)
        if (res.data.ret==1){
          wx.reLaunch({
             url: '../index/index',
           })
        }
      },
      fail: function (res) {
        console.log('错误' + ':' + res)
      }
    })
  },
})
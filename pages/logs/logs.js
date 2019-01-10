// logs.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    areaName:'',
    mobilePhone:''
  },
  onReady() {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  onLoad:function(options){
    var that=this;
    var Token = wx.getStorageSync("Token");
    if (Token != '') {
      that.bindload();
    }
  },
  bindload() {
    setTimeout(this.goIndex,
      0)
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  inputName: function (even) {
    var account = even.detail.value;
    if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(account))){
      wx.showToast({
        title: '账号格式错误',
        icon:'none',
        duration:2000
      })
    }else{
      this.setData({
        name: even.detail.value
      })
    }
  },
  inputPassword: function (even) {
    var password = even.detail.value;
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
      url: 'https://weapp.huishuiyun.com/peasant/account/login?userName=' + name + '&pwd='+password, //接口地址
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      success: function (res) {
        // console.log(res)
        if (res.data.ret==1){
          var token = res.data.data.Token;
          var Token = wx.setStorageSync('Token', token);
          var name = res.data.data.AccountName;
          var Name = wx.setStorageSync('Name', name);
          var areaName = res.data.data.AreaName;
          var AreaName = wx.setStorageSync('AreaName', areaName);
          var mobilePhone = res.data.data.MobilePhone;
          var MobilePhone = wx.setStorageSync('MobilePhone', mobilePhone);
          wx.reLaunch({
             url: '../index/index',
           })
        } else if (res.data.ret!=1){
          if (password == '') {
            wx.showToast({
              title: '密码不能为空',
              icon: "none",
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '用户名或密码错误',
              icon: "none",
              duration: 2000
            })
          }
        }
      },
    })
  },
  onShareAppMessage: function () {
    return {
      title: '农户操作平台',
      desc: '我正在使用，快来使用吧',
      path: '/page/index/index'
    }
  }
})
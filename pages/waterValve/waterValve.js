// pages/waterValve/waterValve.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list: [
    //   { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897651 }, { error: true }], checked: false, key: 0 },
    ],
    isFormSearch: false,
    checkArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Token = wx.getStorageSync("Token");
    //->跳转页面实现搜索
    if (options && options.searchValue) {
      var value = options.searchValue;
      if (value.length == 0) {
        return;
      }
      this.isFormSearch = true;
      wx.request({
        url: 'https://weixin.yaoshihe.cn:950/peasant/operation/allValveList?name='+value,
        data: {

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+Token
        },
        method: "POST",
        success: (res) => {
          this.setData({
            list: res.data.data
          });
        },
        fail: function (res) {
          console.log('错误' + ':' + res.data.msg)
        }
      })
    }
    //<-

  },
  wxSearchTab:function(){
    wx.redirectTo({
      url: '../search/search'
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
  onShow: function (options) {
    var Token = wx.getStorageSync("Token");//利用小程序的异步存储调用登录标志字段
    if (this.isFormSearch) {
      this.isFormSearch = false;
      return;
    }
    let that = this;
    var list = that.data.list;
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/allValveList',//常用水阀页面接口
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + Token
      },
      method: "POST",
      success(res) {
        var data = res.data.data
        that.setData({
          list: data
        })
      }
    })

  },
  formSubmit:function(e){
    var that=this;
    var Token = wx.getStorageSync("Token");
    var checked=that.data.checkArr;
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/saveCommonUse?valveIds='+checked,//提交地址
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+Token
      },
      data: checked,
      method:'POST',
      success(res){
        console.log(res)
        wx.showToast({
          title: "保存成功",
          icon: 'success',
          duration: 1000
        })
        wx.switchTab ({
          url: '../../pages/operating/operating'
        })
      }
    })
  },
  return: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  checkChange: function (e) {
    var arr = [];
 
    e.detail.value.forEach(current => {
      for (var value of this.data.list) {
        if (current === value.Id) {
          arr.push(value.Id);
          break;
        }
      }
    });
    this.setData({
       checkArr: arr 
    });
  },
  onShareAppMessage: function () {
    return {
      title: '农户操作平台',
      desc: '我正在使用，快来使用吧',
      path: '/page/index/index'
    }
  }
})
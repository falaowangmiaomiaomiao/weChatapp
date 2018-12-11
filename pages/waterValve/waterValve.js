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
        url: 'https://weapp.huishuiyun.com/peasant/operation/allValveList?name='+value,
        data: {

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+Token
        },
        method: "POST",
        success: (res) => {
          // console.log(res)
          if(res.data.ret==1){
            this.setData({
              list: res.data.data
            });
          }else{
            var msg=res.data.msg;
            wx.showToast({
              title: msg,
              icon:'none',
              duration:3000,
            })
          }
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
  onShow: function (options) {
    var Token = wx.getStorageSync("Token");//利用小程序的异步存储调用登录标志字段
    if (this.isFormSearch) {
      this.isFormSearch = false;
      return;
    }
    let that = this;
    var list = that.data.list;
    wx.request({
      url: 'https://weapp.huishuiyun.com/peasant/operation/allValveList',//常用水阀页面接口
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + Token
      },
      method: "POST",
      success(res) {
        // console.log(res)
        if(res.data.ret==1){
          var data = res.data.data
          that.setData({
            list: data
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
  },
  formSubmit:function(e){
    var that=this;
    var Token = wx.getStorageSync("Token");
    var checked=that.data.checkArr;
    var list=that.data.list;
    var array=[];
    for(let i in list){
      if (list[i].IsChecked == true){
        array.push(list[i].Id)
      }
    }
    if(checked==""){
      checked=array;
    }
    if(checked.length>8){
      wx.showToast({
        title: '最多可选8个',
        icon:"none",
        duration:4000
      })
    }else(
      wx.request({
        url: 'https://weapp.huishuiyun.com/peasant/operation/saveCommonUse?valveIds=' + checked,//提交地址
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + Token
        },
        data: checked,
        method: 'POST',
        success(res) {
          // console.log(res)
          if(res.data.ret==1){
            wx.showToast({
              title: "保存成功",
              icon: 'success',
              duration: 1000
            })
            wx.switchTab({
              url: '../../pages/operating/operating'
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
    )
  },
  return: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  checkChange: function (e) {
    //var arr = [];
    // e.detail.value.forEach(current => {
    //   for (var value of this.data.list) {
    //     if (current === value.Id) {
    //       arr.push(value.Id);
    //       break;
    //     }
    //   }
    // });
    // console.log(arr)

    // var that = this;
    // var arr = [];
    // var list = that.data.list;
    // e.detail.value.map(current => {
    //   for (var value in list) {
    //     if (current == list[value].Id) {
    //       arr.push(list[value].Id);
    //       break;
    //     }
    //   }
    // });
    var that=this;
    var arr=[];
    var list=that.data.list;
    var index=e.detail.value;
    for(var i in index){
      for(var j in list){
        if(index[i]==list[j].Id){
          arr.push(list[j].Id)
        }
      }
    }
    that.setData({
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
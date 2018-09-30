// pages/waterValve/waterValve.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: [
    //   { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897651 }, { error: true }], checked: false, key: 0 },
    //   { id: 1, item: [{ nameA: "李四" }, { nameB: "张三" }, { num: 1234567897652 }, { error: false }], checked: false, key: 1 },
    //   { id: 2, item: [{ nameA: "王五" }, { nameB: "赵六" }, { num: 1234567897653 }, { error: false }], checked: false,  key: 2 },
    //   { id: 3, item: [{ nameA: "赵六" }, { nameB: "王五" }, { num: 1234567897654 }, { error: false }], checked: false, key: 3 },
    //   { id: 4, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897655 }, { error: true }], checked: false,  key: 4 },
    //   { id: 5, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897656 }, { error: false }], checked: false,  key: 5 },
    // ]
    list:[],
    isFormSearch: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Token = wx.getStorageSync("Token");
    console.log(Token)
    //->跳转页面实现搜索
    if (options && options.searchValue) {
      var value = options.searchValue;
      console.log(value)
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
    var Token = wx.getStorageSync("Token");
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
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + Token
      },
      method: "POST",
      success(res) {
        // console.log(res.data.data);
        var data = res.data.data
        that.setData({
          list: data
        })
      }
    })

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
  formSubmit:function(e){
    console.log(e.detail.value)

  },
  return: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  checkChange: function (e) {
    var arr = [];
    // console.log(this.data.list)
    e.detail.value.forEach(current => {
      console.log(current)
      for (var value of this.data.list) {
        if (current === value.DeviceNumber) {
          arr.push(value.DeviceNumber);
          console.log(arr)
          break;
        }
      }
    });
    this.setData({
       checkArr: arr 
    });
  }
})
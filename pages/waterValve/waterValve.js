// pages/waterValve/waterValve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897651 }, { error: true }], checked: false, key: 0 },
      { id: 1, item: [{ nameA: "李四" }, { nameB: "张三" }, { num: 1234567897652 }, { error: false }], checked: false, key: 1 },
      { id: 2, item: [{ nameA: "王五" }, { nameB: "赵六" }, { num: 1234567897653 }, { error: false }], checked: false,  key: 2 },
      { id: 3, item: [{ nameA: "赵六" }, { nameB: "王五" }, { num: 1234567897654 }, { error: false }], checked: false, key: 3 },
      { id: 4, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897655 }, { error: true }], checked: false,  key: 4 },
      { id: 5, item: [{ nameA: "张三" }, { nameB: "李四" }, { num: 1234567897656 }, { error: false }], checked: false,  key: 5 }
    ]
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
      delta: 2
    })
  },
  checkChange: function (e) {
    var arr = [];
    e.detail.value.forEach(current => {
      for (var value of this.data.list) {
        if (current === value.name) {
          arr.push(value.value);
          break;
        }
      }
    });
    this.setData({
       checkArr: arr 
    });
  }
})
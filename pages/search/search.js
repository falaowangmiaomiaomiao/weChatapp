// pages/search/search.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
  data: {},

  // 搜索栏
  onLoad: function () {
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['2461', '2462', "2463", "2464", '2465', '2466', "2467", '2468', '2469', '2470', '2481', "2472", "2473", "2474", "2475", "2476", '2477', "2478", "2479", "2480", "2482", "2484"], // 热点搜索推荐，[]表示不使用
      ['2461', '2462', "2463", "2464", '2465', '2466', "2467", '2468', '2469', '2470', '2481', "2472", "2473", "2474", "2475", "2476", '2477', "2478", "2479", "2480", "2482", "2484"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../waterValve/waterValve?searchValue=' + value
    })
  },
  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../waterValve/waterValve'
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
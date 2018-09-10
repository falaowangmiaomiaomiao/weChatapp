var app = getApp()
Page({
  data: {
    obj:[
      { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }], unique: '0'},
      { id: 1, item: [{ nameA: "赵六" }, { nameB: "王五" }], unique: '1'},
      { id: 2, item: [{ nameA: "张三" }, { nameB: "李四" }], unique: '2'},
      { id: 3, item: [{ nameA: "赵六" }, { nameB: "王五" }], unique: '3'},
      { id: 4, item: [{ nameA: "张三" }, { nameB: "李四" }], unique: '4'},
      { id: 5, item: [{ nameA: "赵六" }, { nameB: "王五" }], unique: '5'},
      { id: 6, item: [{ nameA: "张三" }, { nameB: "李四" }], unique: '6'},
      { id: 7, item: [{ nameA: "赵六" }, { nameB: "王五" }], unique: '7'}
    ],
    imgHoverIndex:0,
    currentTab: 0,
    array:[5,10,20,30,60,100],
    objectArrary:[
      {
        id: 0,
        name:'5'
      },
      {
        id: 1,
        name:'10'
      },
      {
        id: 2,
        name:'20'
      },
      {
        id: 3,
        name:'30'
      },
      {
        id: 4,
        name:'60'
      },
      {
        id: 5,
        name:'100'
      }
    ],
    index:0,
    daily:[
      {
        id: 0, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 0, start: "2018-9-6 9:00:00", end: "2018-9-6 10:00:00"},
      {
         id: 1, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 1, start: "2018-9-6 9:00:00", end: "2018-9-6 12:00:00"},
      {
        id: 2, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 2, start: "2018-9-6 9:00:00", end: "2018-9-6 10:00:00"},
      {
         id: 3, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 3, start: "2018-9-6 9:00:00", end: "2018-9-6 12:00:00" },
      {
        id: 4, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 4, start: "2018-9-6 9:00:00", end: "2018-9-6 10:00:00"
      },
      {
        id: 5, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 5, start: "2018-9-6 9:00:00", end: "2018-9-6 12:00:00" }
    ]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  waterValve:function(){
    wx.navigateTo({
      url: '../../pages/waterValve/waterValve'
    })
  },
  actioncnt:function(){
    wx.showActionSheet({
      itemList: ["可以开启","无法开启"],
      itemColor:"#007aff",
      success:function(res){
        if(res.tapIndex==0){
          wx.showModal({
            title:"提前关阀",
            content:"提前关阀，将关闭当前水阀",
            success:function(res){
              if(res.confirm){
                console.log("用户点击确定")
              }else if(res.cancel){
                console.log("用户点击取消")
              }
            }
          })
        }else if(res.tapIndex==1){
          wx.showModal({
            title: '提示',
            content: '李四正在进行操作，请耐心等待，如有急事可电话联系他',
          })
        }
      }
    })
  },
  checked:function(e){
    this.setData({
      imgHoverIndex:e.currentTarget.dataset.index
    })
  },
  check: function (e) {
    this.setData({
      imgHoverIndex: e.currentTarget.dataset.index
    })
  }
})
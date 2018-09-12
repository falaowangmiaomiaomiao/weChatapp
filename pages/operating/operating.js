var app = getApp()

// function countdown(that) {
//   var EndTime = that.data.end_time || [];
//   var NowTime = new Date().getTime();
//   var total_second = EndTime - NowTime || [];
//   console.log('剩余时间：' + total_second);
//   // 渲染倒计时时钟
//   that.setData({
//     clock: dateformat(total_second)
//   });
//   if (total_second <= 0) {
//     that.setData({
//       clock: "已经截止"
//     });
//     //return;
//   }
//   setTimeout(function () {
//     total_second -= 1000;
//     countdown(that);
//   }
//     , 1000)
// }

// // 时间格式化输出，如11:03 25:19 每1s都会调用一次
// function dateformat(second) {
//   // 总秒数
//   var second = Math.floor(second / 1000);
//   // 小时
//   var h = Math.floor(second / 3600 % 24);
//   // 分钟
//   var min = Math.floor(second / 60 % 60);
//   // 秒
//   var sec = Math.floor(second % 60);
//   return  h + "小时" + min + "分钟" + sec + "秒";
// }


Page({
  data: {
    op: [{id: '1',end_time: '',clock: '',phone:"123457678"}],
    obj:[
      { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }], num: [{ list: "1A", ischecked: true }, { list: "1B", ischecked: true }], unique: '0'},
      { id: 1, item: [{ nameA: "赵六" }, { nameB: "王五" }], num: [{ list: "2A", ischecked: true }, { list: "2B", ischecked: true }], unique: '1'},
      { id: 2, item: [{ nameA: "张三" }, { nameB: "李四" }], num: [{ list: "3A", ischecked: true }, { list: "3B", ischecked: true }], unique: '2'},
      { id: 3, item: [{ nameA: "赵六" }, { nameB: "王五" }], num: [{ list: "4A", ischecked: true }, { list: "4B", ischecked: true }], unique: '3'}
    ],
    currentTab: 0,
    array:[5,10,20,30,60,100],
    objectArrary:[
      {id: 0,name:'5'},
      {id: 1,name:'10'},
      {id: 2,name:'20'},
      {id: 3,name:'30'},
      {id: 4,name:'60'},
      {id: 5,name:'100'}
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
  switchA:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;//每一个button的索引
    var item = that.data.obj[index].num[0];//每一个索引对应的内容
    item.ischecked = !item.ischecked;//选中，未选中 两种状态切换
    var up = "obj["+index+"].num["+0+"]";
    that.setData({//更新到data
      [up]: that.data.obj[index].num[0],
    });
  },
  switchB: function (e) {
    console.log(e);
    console.log(this);
    var that = this;
    var index =e.currentTarget.dataset.index;//每一个button的索引
    var item = that.data.obj[index].num[1];//每一个索引对应的内容
    item.ischecked = !item.ischecked;//选中，未选中 两种状态切换
    var down ="obj["+index+"].num["+1+"]";
    that.setData({//更新到data
      [down]: that.data.obj[index].num[1],
    });
  }
})
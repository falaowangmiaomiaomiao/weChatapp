var app = getApp()

function countDown(e, countDownNum) {
  let open=!e.data.open;
  let text = e.data.text;
  text = "开阀";
  let obj = e.data.obj;
  let disabledA = e.data.disabledA;
  let disabledB = e.data.disabledB;
  let timer= e.data.timer;
  let clock =e.data.clock;
  let flag=e.data.flag
  // 渲染倒计时时钟
  e.setData({
    open: open,
    flag: true,
    timer: setInterval(function(){
      countDownNum -= 10;
      e.setData({
        clock: date_format(countDownNum),
        countDownNum: countDownNum,
      })
      
      if (countDownNum == 0) {
        for (var i in obj) {
          for (var j in obj[i].num) {
            obj[i].num[j].ischecked = true;
          }
        }
        clearInterval(e.data.timer);
        e.setData({
          open: !open,
          text: text,
          disabledA: disabledA,
          disabledB: disabledB,
          obj: obj,
          flag:false,
        });
      }
    },10)
  });
}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return hr + ":" + min + ":" + sec + " " + micro_sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}


Page({
  data: {
    open:true,//显示倒计时的开关
    disabledA: true,
    disabledB: true,//开阀按钮能否点击的开关
    disabled: false,
    flag:false,//张三正在操作，剩余时间的开关
    text:"开阀",//按钮的文字
    showView:true,
    obj:[
      // { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }], num: [{ list: "1A", ischecked: true }, { list: "1B", ischecked: true }], unique: '0'},
      // { id: 1, item: [{ nameA: "赵六" }, { nameB: "王五" }], num: [{ list: "2A", ischecked: true }, { list: "2B", ischecked: true }], unique: '1'},
      // { id: 2, item: [{ nameA: "张三" }, { nameB: "李四" }], num: [{ list: "3A", ischecked: true }, { list: "3B", ischecked: true }], unique: '2'},
      // { id: 3, item: [{ nameA: "赵六" }, { nameB: "王五" }], num: [{ list: "4A", ischecked: true }, { list: "4B", ischecked: true }], unique: '3'}
    ],//开关阀的信息
    currentTab: 0,//tab栏切换
    array:[5,10,20,30,60,100],
    objectArrary:[
      {id: 0,name:5},
      {id: 1,name:10},
      {id: 2,name:20},
      {id: 3,name:30},
      {id: 4,name:60},
      {id: 5,name:100}
    ],
    index:0,//picker信息
    timer:"",//倒计时信息
    clock:"",
    daily:[
      //  {
      //    id: 0, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 0, start: "2018-9-6 9:00:00", end: "2018-9-6 10:00:00"},
      //  {
      //     id: 1, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 1, start: "2018-9-6 9:00:00", end: "2018-9-6 12:00:00"}
    ]
  },//操作记录信息
  // picker值
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    var that=this;
    var obj=that.data.obj;
    var flag=that.data.flag;
    var disable=that.data.disable;
    var showView=that.data.showView;
    var text=that.data.text;
    text="提前关阀"
    var Token = wx.getStorageSync("Token");
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/valveHome',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + Token
      },
      data: {},
      method: "POST",
      success(res) {
        console.log(res);
        if(res.data.data.IsClosed==false){
          flag=true;
          if (res.data.data.OperaterIsMyself == true) {
            that.setData({
              flag: flag,
              showView: false,
              disabled: false,
              text: text
            })
          }else{
            that.setData({
              flag: flag,
              showView: false,
              disabled: true,
              text: text
            })
          }
        }else{
          console.log(res.data.data.ValveList)
          that.setData({
            obj: res.data.data.ValveList
          })
        };  
      }
    })
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/operateHistory',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + Token
      },
      data: {},
      method: "POST",
      success(res) {
        console.log(res)
        var daily= res.data.data;
        that.setData({
          daily:daily
        })
      }
    })
  },
  
  onshow:function(){
  
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
  switchA: function (e) {
    var that = this;
    var flags;
    var disabledA = that.data.disabledA;
    var index = e.currentTarget.dataset.index;//每一个button的索引
    var obj = that.data.obj;
    var item = that.data.obj[index].Status;
    console.log(item);
    // var item = that.data.obj[index].num[0];//每一个索引对应的内容
    // item.ischecked = !item.ischecked;//选中，未选中 两种状态切换
    var left = "obj[" + index + "].Status";
    // var right = "obj[" + index + "].num[" + 1 + "]";
    var arr = [];
    // if (that.data.obj[index].num[1].ischecked == false) {
    //   if (that.data.obj[index].num[0].ischecked == false) {
    //     that.data.obj[index].num[1].ischecked = true
    //   }
    // }
    if (that.data.obj[index].Status == 85 || that.data.obj[index].Status == 90){
      that.data.obj[index].Status = 165;
      flags=true
    }
    if (that.data.obj[index].Status == 165){
      that.data.obj[index].Status = 85;
      flags=false
    }
    for(var i in obj){
      arr.push(obj[i].Status);
      var b=arr.every(panduan)
      if(b==true){
        disabledA=true;
      }else{
        disabledA = false;
      }
      function panduan(a){
        return a == 85;
      }   
    }
    that.setData({//更新到data
      disabledA:disabledA,
      [left]: that.data.obj[index].Status,
      // [right]: that.data.obj[index].num[1],
    });
  },
  switchB: function (e) {
    var that = this;
    var flags;
    var disabledB = that.data.disabledB;
    var obj = that.data.obj;
    var index = e.currentTarget.dataset.index;
    var item = that.data.obj[index].Status;
    // var item = that.data.obj[index].num[1];
    // item.ischecked = !item.ischecked;
    var arr= [];
    var right = "obj[" + index + "].Status";
    // var left = "obj[" + index + "].num[" + 0 + "]";
    // if (obj[index].num[0].ischecked == false) {
    //   if (obj[index].num[1].ischecked == false) {
    //     obj[index].num[0].ischecked = true
    //   }
    // }
    if (that.data.obj[index].Status == 165 || that.data.obj[index].Status==85){
      that.data.obj[index].Status=90;
      flags=true;
    }
    if (that.data.obj[index].Status == 90){
      that.data.obj[index].Status=85;
      flags=false;
    }
    for (var i in obj) {
      arr.push(obj[i].Status);
      var b = arr.every(panduan)
      if (b) {
        disabledB = true;
      } else {
        disabledB = false;
      }
      function panduan(a) {
        return a == 85;
      }
    }
    that.setData({
      disabledB: disabledB,
      [right]: that.data.obj[index].Status,
    });
  },
  actioncnt:function(){
    let that = this;
    let text=that.data.text;
    let showView = that.data.showView;
    let disabled=that.data.disabled;
    if (disabled==true){
      disabled=false
    }
    text="提前关阀"
    wx.showModal({
      title: "开启水阀",
      content: "当前球阀已开启，正在灌溉",
      cancelColor: "#696969",
      confirmColor: "#5490fe",
      success: function (res) {
        if (res.confirm) {
          let countDownNums = that.data.array[that.data.index];
          let countDownNum = countDownNums * 60 * 1000;
          countDown(that, countDownNum);
          that.setData({
            text: text,
            showView: false,
            disabled:false
          })
        } else if (res.cancel) {
          console.log("已取消")
        }
      }
    })      
  },//开启球阀及后续操作
  actionc:function(){
    let that=this;
    let disabledA = that.data.disabledA;
    let disabledB = that.data.disabledB;
    disabledA=disabledB=true;
    let flag=that.data.flag;
    let open=that.data.open;
    console.log(open);
    let timer = that.data.timer;
    var text = that.data.text;
    text = "开阀"
    let showView = that.data.showView;
    let obj=this.data.obj;
    for(var i in obj){
      for(var j in obj[i].num){
        obj[i].num[j].ischecked=true;
      }
    }
    wx.showModal({
      title: '提前关闭',
      content: '提前关闭，水阀将停止灌溉',
      cancelColor: "#696969",
      confirmColor: "#5490fe",
      success:function(res){
        if(res.confirm){
          clearInterval(that.data.timer)
          that.setData({
            open:true,
            text: text,
            showView: true,
            obj:obj,
            disabledA:disabledA,
            disabledB:disabledB,
            flag:false
          })
        } else if (res.cancel) {
          console.log("已取消")
        }
      }
    })
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '17835423091', //此号码仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})


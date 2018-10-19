const app = getApp()
function countDown(e, countDownNum) {
  let open=e.data.open;
  let text = e.data.text;
  text = "开阀";
  let obj = e.data.obj;
  let disabledA = e.data.disabledA;
  let disabledB = e.data.disabledB;
  let disabled = e.data.disabled;
  let timer= e.data.timer;
  let clock =e.data.clock;
  let op = e.data.op;
  let showView=e.data.showView;
  for (var i in obj) {
    obj[i].Status = 85;
  }
  // let flag=e.data.flag
  // 渲染倒计时时钟
  e.setData({
    open: false,
    op:true,
    timer: setInterval(function(){
      countDownNum -= 1000;
      e.setData({
        clock: date_format(countDownNum),
        countDownNum: countDownNum,
      })
      if (countDownNum == 0) {
        clearInterval(e.data.timer);
        e.setData({
          open: true,
          text: text,
          disabledA: true,
          disabledB: true,
          obj: obj,
          showView:true,
          disabled:true,
          op:false
        });
      }
    },1000)
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
  return hr + ":" + min + ":" + sec 
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
Page({
  data: {
    Name:'',
    Phone:'',
    op:false,
    Data:[],
    tip:true,//如果没有可操作球阀
    open:true,//显示倒计时的开关
    disabledA: true,
    disabledB: true,//开阀按钮能否点击的开关
    disabled: false,
    flag:false,//张三正在操作，剩余时间的开关
    text:"开阀",//按钮的文字
    showView:true,//显示哪个按钮
    obj:[
      // { Id: "69a9ef29-3ce8-4e89-95de-3f3cac5fc2a5", DeviceNumber: "2463", Name: "3", Status: 165 },
    ],//开关阀的信息
    currentIndex1: true,
    currentIndex2: false,//页面切换
    array: ['5分钟', '10分钟', '30分钟', '1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '9小时', '12小时', '18小时', '24小时', '36小时','48小时'],
    objectArrary:[
      { id: 0, name: '5分钟' },
      { id: 1, name: '10分钟' },
      { id: 2, name: '30分钟' },
      { id: 3, name: '1小时' },
      { id: 4, name: '2小时' },
      { id: 5, name: '3小时' },
      { id: 6, name: '4小时' },
      { id: 7, name: '5小时' },
      { id: 8, name: '6小时' },
      { id: 9, name: '9小时' },
      { id: 10, name: '12小时' },
      { id: 11, name: '18小时' },
      { id: 12, name: '24小时' },
      { id: 13, name: '36小时' },
      { id: 14, name: '48小时' }
    ],
    index:8,//picker信息
    timer:"",//倒计时信息
    clock:"",
    daily:[],//操作记录信息
    countDownNum: "",
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0//二次进入倒计时的信息
  },//操作记录信息
  // picker值
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  onLoad: function (options) {
    var that=this;
    let op = that.data.op;
    var tip=that.data.tip;
    var Name=that.data.Name;
    var Phone=that.data.Phone;
    var obj=that.data.obj;
    var open=that.data.open;
    var flag=that.data.flag;
    var disabled=that.data.disabled;
    var disabledA = that.data.disabledA;
    var disabledB = that.data.disabledB;
    var showView=that.data.showView;
    var text=that.data.text;
    text="提前关阀"
    var Token = wx.getStorageSync("Token");
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/valveHome',//智能球阀首页加载的相关数据
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + Token
      },
      data: {},
      method: "POST",
      success(res) {
        // console.log(res);
        if (res.data.ret==1){
          var Obj = res.data.data.ValveList;
          if (Obj.length != 0) {
            tip = false;
          } else {
            tip = true;
          }
          if (res.data.data.IsClosed == false) {
            //开阀状态
            if (res.data.data.OperaterIsMyself == true) {
              // 本人操作
              var totalSecond = Date.parse(res.data.data.EndTime.replace(/-/g, "/")) - Date.parse(new Date());
              if (totalSecond >= 0) {
                clearInterval(that.data.timer);
                if (res.data.data.IsClosed == false) {//没有提前关阀
                  that.setData({
                    flag: false,
                    open: false,
                    showView: false,//显示下面的按钮
                    disabled: false,//提前关阀按钮可用
                    text: text,
                    obj: Obj,
                    tip: tip,
                    op: true
                  })
                  countDown(that, totalSecond)
                } else {//提前关阀
                  that.setData({
                    open: true,
                    text: '开阀',
                    showView: true,
                    obj: obj,
                    disabledA: disabledA,
                    disabledB: disabledB,
                    flag: false,
                    op: false
                  })
                }
              } else {
                clearInterval(that.data.timer)
                that.setData({
                  open: true,
                  text: '开阀',
                  showView: true,
                  obj: obj,
                  disabledA: disabledA,
                  disabledB: disabledB,
                  flag: false,
                  op: false
                })
              };
            } else {
              //非本人操作
              var name = res.data.data.OperatingUserName;
              var phone = res.data.data.OperatingUerMobile;
              var totalSecond = Date.parse(res.data.data.EndTime.replace(/-/g, "/")) - Date.parse(new Date());
              if (totalSecond >= 0) {
                clearInterval(that.data.timer)
                if (res.data.data.IsClosed == false) {//没有提前关阀
                  that.setData({
                    flag: true,//显示xxx正在操作
                    showView: false,
                    disabled: true,//按钮不可用
                    text: "无法操作，请等候",
                    Name: name,
                    open: true,
                    Phone: phone,
                    obj: Obj,
                    tip: tip,
                    op: true
                  });
                  countDown(that, totalSecond)
                } else {//提前关阀
                  that.setData({
                    open: true,
                    text: "开阀",
                    showView: true,
                    obj: obj,
                    disabledA: disabledA,
                    disabledB: disabledB,
                    flag: false,
                    op: false,
                    tip: tip,
                  })
                }
              } else {
                clearInterval(that.data.timer)
                that.setData({
                  open: true,
                  text: "开阀",
                  showView: true,
                  obj: obj,
                  disabledA: disabledA,
                  disabledB: disabledB,
                  flag: false,
                  op: false,
                  tip: tip,
                })
              }
            }
          } else {
            //无人操作
            clearInterval(that.data.timer)
            that.setData({
              flag: false,
              showView: true,
              open: true,
              obj: Obj,
              tip: tip,
              op: false,
              text: '开阀'
            })
          };
        }else{
          wx.showToast({
            title: '当前有人在操作',
            icon:"none",
            duration:3000
          })
        }  
      }
    })
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/operateHistory',//操作记录
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + Token
      },
      data: {},
      method: "POST",
      success(res) {
        // console.log(res)
        if(res.data.ret==1){
          var daily = res.data.data;
          that.setData({
            daily: daily,
          })
        }else{
          var msg =res.data.msg;
          wx.showToast({
            title: msg,
            icon:"none",
            duration:3000
          })
        }
      }
    })
  },
  onShow:function(){
   this.onLoad();
  },
  onReady() {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  waterValve:function(){
    wx.navigateTo({
      url: '../../pages/waterValve/waterValve'
    })
  },
  switchA: function (e) {
    var that = this;
    var disabledA = that.data.disabledA;
    var disabledB = that.data.disabledB;
    var index = e.currentTarget.dataset.index;//每一个button的索引
    var obj = that.data.obj;
    var item = that.data.obj[index].Status;//每一个Status的索引
    var left = "obj[" + index + "].Status";
    var arr = [];
    if (item == 85 || item == 90) {
      item = 165;
    } else {
      item = 85
    }
    that.setData({//更新到data
      [left]: item,
    });
     //遍历选中的开关如果全为85即让disabledA为true
    for (var i in obj) {
      arr.push(obj[i].Status);
    }
    var b = arr.every(panduan)
    var c = arr.some(pd)
    var d = arr.some(PD)
    function panduan(a) {
      return a == 85;
    }
    function pd(a) {
      return a == 90
    }
    function PD(a) {
      return a == 165
    }
    if (b == true||d==false) {
      disabledA = true;
    } else {
      disabledA = false;
    }
    if (c == true) {
      disabledB = false
    } else {
      disabledB = true;
    }
    that.setData({//更新到data
      disabledA: disabledA,
      disabledB: disabledB,
      [left]: item,
    });
  },
  switchB: function (e) {
    var that = this;
    var disabledA = that.data.disabledA;
    var disabledB = that.data.disabledB;
    var obj = that.data.obj;
    var index = e.currentTarget.dataset.index;
    var item = that.data.obj[index].Status;
    var arr= [];
    var right = "obj[" + index + "].Status";
    if (item == 85 || item == 165){
      item=90;
    }else{
      item = 85;
    }
    that.setData({
      [right]: item,
    });
    for (var i in obj) {
      //遍历选中的开关如果全为85即让disabledB为true
      arr.push(obj[i].Status);
    }
    var b = arr.every(panduan);
    var c = arr.some(pd)
    var d = arr.some(PD)
    function pd(aa) {
      return aa == 165
    }
    function PD(a) {
      return a == 90
    }
    if (b==true||d==false) {
      disabledB = true;
    } else {
      disabledB = false;
    }
    if (c == true) {
      disabledA = false
    } else {
      disabledA = true;
    }
    function panduan(a) {
      return a == 85;
    }

    that.setData({
      disabledA: disabledA,
      disabledB: disabledB,
      [right]: item,
    });
  },
  //开阀提交
  actioncnt:function(){
    let that = this;
    let index = that.data.index
    let text = that.data.text;
    let showView = that.data.showView;
    let disabled = that.data.disabled;
    let op = that.data.op;
    if (disabled == true) {
      disabled = false
    }
    text = "提前关阀"
    let countDownNums = that.data.array[that.data.index];
    let countDownNum = ""
    if (countDownNums.indexOf("分钟") == 1) {
      countDownNum = countDownNums.slice(0, 1) * 60 * 1000;
    } else if (countDownNums.indexOf("分钟") == 2){
      countDownNum = countDownNums.slice(0, 2) * 60 * 1000;
    } else if (countDownNums.indexOf("小时") == 1){
      countDownNum = countDownNums.slice(0, 1) * 60 * 60 * 1000;
    } else if (countDownNums.indexOf("小时") == 2) {
      countDownNum = countDownNums.slice(0, 2) * 60 * 60 * 1000;
    }
    var Token = wx.getStorageSync("Token");
    var array = that.data.array;
    var obj = that.data.obj;
    var info = '';
    var arr = [], arr1 = [];
    var Time = array[index];
    if (Time.indexOf("分钟") == 1) {
      Time = Time.slice(0, 1)
    } else if (Time.indexOf("分钟") == 2){
      Time = Time.slice(0, 2)
    } else if (Time.indexOf("小时") == 1){
      Time = Time.slice(0, 1) * 60
    } else if (Time.indexOf("小时") == 2) {
      Time = Time.slice(0, 2) * 60
    }
    for (var i in obj) {
      if (obj[i].Status != 85) {
        arr.push(obj[i])
      }
    }
    arr.map(v => {
      arr1.push({ Id: v.Id, Status: v.Status })
    });
    info = {
      "Valves": arr1,
      "TimeoutMinute": Time
    };
    wx.showLoading({
      title: '正在通信中',
    })
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/openValves',
      data: info,
      header: {
        "content-type": "application/json",
        'Authorization': 'Bearer ' + Token
      },
      method: "POST",
      success(res) {
        // console.log(res.data.msg);
        if(res.data.ret==1){
          var msg = res.data.msg;
          msg = msg.slice(0, 1);
          wx.hideLoading();
          wx.showToast({
            title: msg + "个阀开启成功",
          })
          countDown(that, countDownNum);
          that.setData({
            text: text,
            showView: false,
            disabled: false,
            index: index,
            op: true
          })
        }else{
          var msgs = res.data.msg;
          wx.showToast({
            title: msgs,
            icon:"none",
            duration:3000
          })
        }
      }
    })   
  },//开启球阀及后续操作
  actionc:function(){
    let that=this;
    let disabledA = that.data.disabledA;
    let disabledB = that.data.disabledB;
    disabledA=disabledB=true;
    var Token = wx.getStorageSync("Token");
    let flag=that.data.flag;
    let open=that.data.open;
    let timer = that.data.timer;
    var text = that.data.text;
    text = "开阀"
    let op = that.data.op;
    let showView = that.data.showView;
    let obj=that.data.obj;
    for(var i in obj){
      obj[i].Status=85;
    }
    wx.showModal({
      title: '提前关闭',
      content: '提前关闭，水阀将停止灌溉',
      cancelColor: "#696969",
      confirmColor: "#5490fe",
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '正在关闭水阀',
          })
          wx.request({
            url: 'https://weixin.yaoshihe.cn:950/peasant/operation/closeValves',
            data:{},
            header:{
              "content-type":"application/x-www-form-urlencoded",
              'Authorization': 'Bearer ' + Token
            },
            method:"POST",
            success(res){
              if(res.data.ret==1){
                wx.hideLoading();
                wx.showToast({
                  title: '关阀成功',
                  icon: "success",
                  duration: 2000
                })
              }else{
                wx.hideLoading();
                var msg=res.data.msg;
                wx.showToast({
                  title: msg,
                  icon: "none",
                  duration: 3000
                })
              }
              
            }
          })
          clearInterval(that.data.timer)
          that.setData({
            open:true,
            text: text,
            showView: true,
            obj:obj,
            disabledA:disabledA,
            disabledB:disabledB,
            flag:false,
            op:false
          })
        } else if (res.cancel) {
          console.log("已取消")
        }
      }
    })
  },
  call:function(){
    var that=this;
    var Phone=that.data.Phone;
    wx.makePhoneCall({
      phoneNumber: Phone, //此号码仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '农户操作平台',
      desc: '我正在使用，快来使用吧',
      path: '/page/index/index'
    }
  },
  currentIndex1: function (e) {
    this.setData({
      currentIndex1: true,
      currentIndex2: false,
    });
    this.onLoad();
  },
  currentIndex2: function (e) {
    this.setData({
      currentIndex1: false,
      currentIndex2: true,
    });
    this.onLoad();
  },
})
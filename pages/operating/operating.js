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
    Name:'',
    Phone:'',
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
    daily:[]
  },//操作记录信息
  // picker值
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    var that=this;
    var Name=that.data.Name;
    var Phone=that.data.Phone;
    var obj=that.data.obj;
    var open=that.data.open;
    var flag=that.data.flag;
    var disable=that.data.disable;
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
        console.log(res);
        if(res.data.data.IsClosed==false){
          //开阀状态
          if (res.data.data.OperaterIsMyself == true) {
            //本人操作
            that.setData({
              open: false,
              showView: false,//显示下面的按钮
              disabled: false,//提前关阀按钮可用
              text: text,
              obj: res.data.data.ValveList
            })
          }else{
            //非本人操作
            var name = res.data.data.OperatingUserName;
            var phone = res.data.data.OperatingUerMobile;
            that.setData({
              flag: true,//显示xxx正在操作
              showView: false,
              disabled: true,//按钮不可用
              text: text,
              Name:name,
              Phone:phone,
              obj: res.data.data.ValveList
            })
          }
        }else{
          //无人操作
          that.setData({
            flag:false,
            showView:true,
            open:true,
            obj: res.data.data.ValveList
          })
        };  
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
        var daily= res.data.data;
        that.setData({
          daily:daily
        })
      }
    })
  },
  onshow:function(){
  
  },
  //开阀提交
  formSubmit:function(){
    var that=this;
    var Token = wx.getStorageSync("Token");
    var index=that.data.index;//开阀时间
    var obj=that.data.obj;
    var info='';
    var arr = [];
    obj.map(v => {
      arr.push({ Id: v.Id, Status: v.Status })
    });
    info={
      "Valves": arr,
      "TimeoutMinute": index
    };
    wx.request({
      url: 'https://weixin.yaoshihe.cn:950/peasant/operation/openValves',
      data:info,
      header:{
        "content-type":"application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + Token
      },
      method:"POST",
      success(res){
        console.log(res);
      }
    })
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
    console.log("a")
    var that = this;
    var disabledA = that.data.disabledA;
    var disabledB = that.data.disabledB;
    console.log(disabledA)
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

    // if (item == 85) {
    //   item = 165;
    // } else if (item == 90) {
    //   item = 165;
    //   if (c == true) {
    //     disabledB = false
    //   } else {
    //     disabledB = true;
    //   }
    // } else {
    //   item = 85
    //   if (d == true) {
    //     disabledA = false
    //   } else {
    //     disabledA = true;
    //   }
    // }
    for (var i in obj) {
      //遍历选中的开关如果全为85即让disabledA为true
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
    if (b == true) {
      disabledA = true;
    } else {
      disabledA = false;
    }
   
    that.setData({//更新到data
      disabledA: disabledA,
      disabledB: disabledB,
      [left]: item,
    });
    console.log(disabledA)
  },
  switchB: function (e) {
    console.log("b")
    var that = this;
    var disabledA = that.data.disabledA;
    var disabledB = that.data.disabledB;
    console.log(disabledB)
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
    // if (item == 85) {
    //   item = 90;
    // } else if (item == 165) {
    //   item = 90;
    //   if (c == true) {
    //     disabledA = false
    //   } else {
    //     disabledA = true;
    //   }
    // } else {
    //   item = 85;
    //   if (d == true) {
    //     disabledB = false
    //   } else {
    //     disabledB = true;
    //   }
    // }
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
    if (b) {
      disabledB = true;
    } else {
      disabledB = false;
    }
    function panduan(a) {
      return a == 85;
    }

    that.setData({
      disabledA: disabledA,
      disabledB: disabledB,
      [right]: item,
    });
    console.log(disabledB)
  },
  actioncnt:function(){
    let that = this;
    let index=that.data.index
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
          formSubmit();
          let countDownNums = that.data.array[that.data.index];
          let countDownNum = countDownNums * 60 * 1000;
          countDown(that, countDownNum);
          that.setData({
            text: text,
            showView: false,
            disabled: false,
            index: index,
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
    var Token = wx.getStorageSync("Token");
    let flag=that.data.flag;
    let open=that.data.open;
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
          wx.request({
            url: 'https://weixin.yaoshihe.cn:950/peasant/operation/closeValves',
            data:{},
            header:{
              "content-type":"application/x-www-form-urlencoded",
              'Authorization': 'Bearer ' + Token
            },
            method:"POST",
            success(res){
              wx.showToast({
                title: '关阀成功',
                icon:"success",
                duration:1000
              })
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


var app = getApp()

Page({
  data: {
    open:true,//显示倒计时的开关
    // disabledA:false,
    // disabledB: false,//开阀按钮能否点击的开关
    disabled:false,
    flag:false,//张三正在操作，剩余时间的开关
    text:"开阀",//按钮的文字
    obj:[
      { id: 0, item: [{ nameA: "张三" }, { nameB: "李四" }], num: [{ list: "1A", ischecked: true }, { list: "1B", ischecked: true }], unique: '0'},
      { id: 1, item: [{ nameA: "赵六" }, { nameB: "王五" }], num: [{ list: "2A", ischecked: true }, { list: "2B", ischecked: true }], unique: '1'},
      { id: 2, item: [{ nameA: "张三" }, { nameB: "李四" }], num: [{ list: "3A", ischecked: true }, { list: "3B", ischecked: true }], unique: '2'},
      { id: 3, item: [{ nameA: "赵六" }, { nameB: "王五" }], num: [{ list: "4A", ischecked: true }, { list: "4B", ischecked: true }], unique: '3'}
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
    daily:[
       {
         id: 0, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 0, start: "2018-9-6 9:00:00", end: "2018-9-6 10:00:00"},
       {
          id: 1, item: [{ nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }, { nameA: "张三", nameB: "李四" }], key: 1, start: "2018-9-6 9:00:00", end: "2018-9-6 12:00:00"}
     ]
  },//操作记录信息
  // picker值
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
    console.log(e);
    // var disabledA=that.data.disabledA;
    var index = e.currentTarget.dataset.index;//每一个button的索引
    var item = that.data.obj[index].num[0];//每一个索引对应的内容
    item.ischecked = !item.ischecked;//选中，未选中 两种状态切换
    // disabledA=item.ischecked;
    var up = "obj[" + index + "].num[" + 0 + "]";
    that.setData({//更新到data
      // disabledA:disabledA,
      [up]: that.data.obj[index].num[0],
    });
  },
  switchB: function (e) {
    var that = this;
    // var disabledB = that.data.disabledB;
    var index = e.currentTarget.dataset.index;
    var item = that.data.obj[index].num[1];
    item.ischecked = !item.ischecked;
    // disabledB = item.ischecked;
    var down = "obj[" + index + "].num[" + 1 + "]";
    that.setData({
      // disabledB: disabledB,
      [down]: that.data.obj[index].num[1],
    });
  },
  actioncnt:function(){
    let that = this;
    let text=that.data.text;
    text="排队中，请耐心等候"
    let disabled=that.data.disabled;
    wx.showActionSheet({
      itemList: ["可以开启","无法开启"],
      itemColor:"#007aff",
      success:function(res){
        if(res.tapIndex==0){
          wx.showModal({
            title:"开启水阀",
            content:"当前球阀已开启，正在灌溉",
            success:function(res){
              if(res.confirm){
                that.countDown();
                that.setData({
                  text:text,
                  disabled:!disabled
                })
              }else if(res.cancel){
                console.log("已取消")
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
  },//开启球阀及后续操作
  countDown: function () {
    let that=this;
    let open=!that.data.open;
    let text=that.data.text;
    text="开阀";
    let obj=that.data.obj;
    let disabled=that.data.disabled;
    let countDownNum = that.data.array[that.data.index];//获取倒计时初始值
    //  如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      open: open,
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          for (var i in obj) {
            for (var j in obj[i].num) {
              obj[i].num[j].ischecked = true;
            }
          }
          clearInterval(that.data.timer);
          that.setData({
            open:!open,
            text:text,
            disabled:disabled,
            obj:obj 
          })
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
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


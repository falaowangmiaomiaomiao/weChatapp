//index.js
var wxCharts = require('../../utils/wxcharts.js');
//获取应用实例
const app = getApp();
var lineChart1 = null;
var lineChart2 = null;
var lineChart3 = null;
var lineChart4 = null;
//->高德地图天气相关
// var amapFile = require('../../utils/amap-wx.js');
// var config = require('../../utils/config.js');
//<-
//->百度地图天气
var bmap = require('../../utils/bmap-wx.min.js');
//<-
// var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// var qqmapsdk;
Page({
  data: {
    //->高德天气相关
    // city:"",
    // province:"",
    // weather:"",
    // temperature:"",
    //<-
    // province: '',
    // city: '',
    // district:'',
    // latitude: '',
    // longitude: '',

    //百度地图天气->
    currentCity: '',
    pm:"",
    temperature:"",
    weatherDesc:"",
    date:"",
    condition:"",
    originalData:[],
    urlIcon1: "",
    urlIcon2: "",
    url: "",
    flag:"",
    //<-
    //swiper位置配置
    winWidth: 0,
    winHeight: 0,
    //页面切换
    currentTab: 0,
  },
  //绘制图表相关-》1,2,3,4
  plot1: function (e) {
    console.log(lineChart1.getCurrentDataIndex(e));
    lineChart1.showToolTip(e, {
      background: '#7cb5ec',//点击显示文字的背景色
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  plot2: function (e) {
    console.log(lineChart2.getCurrentDataIndex(e));
    lineChart2.showToolTip(e, {
      background: '#7cb5ec',//点击显示文字的背景色
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  plot3: function (e) {
    console.log(lineChart3.getCurrentDataIndex(e));
    lineChart3.showToolTip(e, {
      background: '#7cb5ec',//点击显示文字的背景色
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  plot4: function (e) {
    console.log(lineChart4.getCurrentDataIndex(e));
    lineChart4.showToolTip(e, {
      background: '#7cb5ec',//点击显示文字的背景色
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 13; i++) {
      categories.push(i + 1);
    }
    // data[4] = null;
    return {
      categories: categories,
      // data: data
    }
  },
  //<-绘制图表相关1,2,3,4
  onLoad: function (options) {
    // qqmapsdk = new QQMapWX({
    //   key: 'O2XBZ-M4EYG-C3CQZ-IP7PQ-B7NGS-YWFUU' //这里自己的key秘钥进行填充
    // });
    //->高德地图天气相关
    // var that = this;
    // var key = config.Config.key;
    // var myAmapFun = new amapFile.AMapWX({ key: key });
    // myAmapFun.getWeather({
    //   success: function (data) {
    //     if(data.city){
    //       that.setData({
    //         province: data.liveData.province,
    //         city:data.liveData.city,
    //         weather:data.weather.data,
    //         temperature:data.temperature.data
    //       });
    //     }
    //   },
    //   fail: function (info) {
    //     // wx.showModal({title:info.errMsg})
    //   }
    // })
    //<-
    //百度地图天气->
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'FQ0hekDSrd9c2zhO2HKeoOmjGAKj3KwW'
    });
    var fail = function (data) {
      console.log('fail!!!!')
    };
    var success = function (data) {
      var flag=that.data.flag;
      var weatherData = data.currentWeather[0];
      var originalData = data.originalData.results[0].weather_data;
      var urlIcon1,urlIcon2,url;
      if (weatherData.weatherDesc.indexOf("暴雨")>=0){
        url = "./image/baoyu.png"
      } else if (weatherData.weatherDesc.indexOf("沙尘暴") >= 0) {
        url = "./image/shachenbao.png"
      } else if (weatherData.weatherDesc.indexOf("雾") >= 0) {
        url = "./image/wu.png"
      } else if (weatherData.weatherDesc.indexOf("阵雨") >= 0){
        url = "./image/dyzzy.png"
      } else if (weatherData.weatherDesc.indexOf("小雨") >= 0) {
        url = "./image/xiaoyu.png"
      } else if (weatherData.weatherDesc.indexOf("中雨") >= 0) {
        url = "./image/xiaoyu.png"
      } else if (weatherData.weatherDesc.indexOf("大雨") >= 0) {
        url = "./image/xiaoyu.png"
      } else if (weatherData.weatherDesc.indexOf("雨夹雪") >= 0) {
        url = "./image/xiaoxue.png"
      } else if (weatherData.weatherDesc.indexOf("小雪") >= 0) {
        url = "./image/xiaoxue.png"
      } else if (weatherData.weatherDesc.indexOf("中雪") >= 0) {
        url = "./image/xiaoxue.png"
      } else if (weatherData.weatherDesc.indexOf("大雪") >= 0) {
        url = "./image/xiaoxue.png"
      } else if (weatherData.weatherDesc.indexOf("多云") >= 0) {
        url = "./image/qingtian.png"
      } else if (weatherData.weatherDesc.indexOf("阴") >= 0) {
        url = "./image/yin.png"
      } else if (weatherData.weatherDesc.indexOf("晴") >= 0) {
        url = "./image/qingtian2.png"
      }

      if (originalData[1].weather.indexOf("暴雨")>=0){
        urlIcon1="./image/baoyuIcon.png"
      } else if (originalData[1].weather.indexOf("阵雨") >= 0){
        urlIcon1 = "./image/zhenyuIcon.png"
      } else if (originalData[1].weather.indexOf("小雨") >= 0) {
        urlIcon1 = "./image/xiaoyuIcon.png"
      } else if (originalData[1].weather.indexOf("中雨") >= 0) {
        urlIcon1 = "./image/xiaoyuIcon.png"
      } else if (originalData[1].weather.indexOf("大雨") >= 0) {
        urlIcon1 = "./image/xiaoyuIcon.png"
      } else if (originalData[1].weather.indexOf("雨夹雪") >= 0) {
        urlIcon1 = "./image/xiaoxueIcon.png"
      } else if (originalData[1].weather.indexOf("小雪") >= 0) {
        urlIcon1 = "./image/xiaoxueIcon.png"
      } else if (originalData[1].weather.indexOf("中雪") >= 0) {
        urlIcon1 = "./image/xiaoxueIcon.png"
      } else if (originalData[1].weather.indexOf("大雪") >= 0) {
        urlIcon1 = "./image/xiaoxueIcon.png"
      } else if (originalData[1].weather.indexOf("多云") >= 0) {
        urlIcon1 = "./image/duoyunIcon.png"
      } else if (originalData[1].weather.indexOf("阴") >= 0) {
        urlIcon1 = "./image/yinIcon.png"
      } else if (originalData[1].weather.indexOf("晴") >= 0) {
        urlIcon1 = "./image/qingIcon.png"
      }
      if (originalData[2].weather.indexOf("暴雨") >= 0) {
        urlIcon2 = "./image/baoyuIcon.png"
      } else if (originalData[2].weather.indexOf("阵雨") >= 0) {
        urlIcon2 = "./image/zhenyuIcon.png"
      } else if (originalData[2].weather.indexOf("小雨") >= 0) {
        urlIcon2 = "./image/xiaoyuIcon.png"
      } else if (originalData[2].weather.indexOf("中雨") >= 0) {
        urlIcon2 = "./image/xiaoyuIcon.png"
      } else if (originalData[2].weather.indexOf("大雨") >= 0) {
        urlIcon2 = "./image/xiaoyuIcon.png"
      } else if (originalData[2].weather.indexOf("雨夹雪") >= 0) {
        urlIcon2 = "./image/xiaoxueIcon.png"
      } else if (originalData[2].weather.indexOf("小雪") >= 0) {
        urlIcon2 = "./image/xiaoxueIcon.png"
      } else if (originalData[2].weather.indexOf("中雪") >= 0) {
        urlIcon2 = "./image/xiaoxueIcon.png"
      } else if (originalData[2].weather.indexOf("大雪") >= 0) {
        urlIcon2 = "./image/xiaoxueIcon.png"
      } else if (originalData[2].weather.indexOf("多云") >= 0) {
        urlIcon2 = "./image/duoyunIcon.png"
      } else if (originalData[2].weather.indexOf("阴") >= 0) {
        urlIcon2 = "./image/yinIcon.png"
      } else if (originalData[2].weather.indexOf("晴") >= 0) {
        urlIcon2 = "./image/qingIcon.png"
      }
      var dates=weatherData.date.slice(-4,-2);
      var pm25 = weatherData.pm25;
      var condition
      if(pm25<=50){
        condition="优"
      }else if(50<pm25<=100){
        condition= "良"
      } else if (100 < pm25 <= 150){
        condition="轻度污染"
      } else if (150 < pm25 <= 200) {
        condition = "中度污染"
      } else if (200 < pm25 <= 250) {
        condition = "重度污染"
      } else if (250 < pm25 <= 300) {
        condition = "严重污染"
      }
      that.setData({
        currentCity: weatherData.currentCity,
        date: dates,
        temperature: weatherData.temperature,
        weatherDesc: weatherData.weatherDesc,
        pm: pm25,
        condition: condition,
        originalData: originalData,
        urlIcon1: urlIcon1,
        urlIcon2: urlIcon2,
        url:url
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
    //<-
    //tab页切换-》
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });//《-tab页切换


    //->绘制图表相关1
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart1 = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      // background:"#ff5400",
      categories: simulationData.categories,
      animation: true,
      dataLabel: true,
      legend:false,
      // color:"#000",
      series: [{
        name: '降雨量',
        data: [200, 500, 900,100, 150, 400, 1000, 300, 220, 800,600,900],
        format: function (val, name) {
          return val.toFixed(0) + 'mm';
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor:"#fff"
      },
      yAxis: {
        // title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 150,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });//《-绘制图表相关1
     //->绘制图表相关2
    var simulationData2 = this.createSimulationData();
    lineChart2 = new wxCharts({
      canvasId: 'lineCanvas1',
      type: 'line',
      // background: "#000",
      categories: simulationData2.categories,
      animation: true,
      legend: false,
      // color:"#000",
      series: [{
        name: '蒸发量',
        data: [500, 400, 480, 600, 450, 400, 500, 400, 420, 500, 650, 500],
        format: function (val, name) {
          return val.toFixed(0);
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor: "#fff"
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 150,
      dataLabel: true,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });//《-绘制图表相关2
    //->绘制图表相关3
    var simulationData3 = this.createSimulationData();
    lineChart3 = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'line',
      background: "#000",
      categories: simulationData3.categories,
      animation: true,
      dataLabel: true,
      legend: false,
      // color:"#000",
      series: [{
        name: '光照度',
        data: [300, 400, 480, 400, 450, 400, 500, 300, 420, 500, 300, 500],
        format: function (val, name) {
          return val.toFixed(0) + 'lux';
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor: "#fff"
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 150,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });//《-绘制图表相关3
    //->绘制图表相关4
    var simulationData4 = this.createSimulationData();
    lineChart4 = new wxCharts({
      canvasId: 'lineCanvas3',
      type: 'line',
      background: "#000",
      categories: simulationData4.categories,
      animation: true,
      dataLabel: true,
      legend: false,
      // color:"#000",
      series: [{
        name: '温度',
        data: [30, 38, 39, 34, 32, 40, 37, 38, 35, 36, 32, 37],
        format: function (val, name) {
          return val.toFixed(0) + '℃';
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor: "#fff"
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 150,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });//《-绘制图表相关4
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // onShow: function () {
  //   let vm = this;
  //   vm.getUserLocation();
  // },
  // getUserLocation: function () {
  //   let vm = this;
  //   wx.getSetting({
  //     success: (res) => {
  //       console.log(JSON.stringify(res))
  //       // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
  //       // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
  //       // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
  //       if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
  //         wx.showModal({
  //           title: '请求授权当前位置',
  //           content: '需要获取您的地理位置，请确认授权',
  //           success: function (res) {
  //             if (res.cancel) {
  //               wx.showToast({
  //                 title: '拒绝授权',
  //                 icon: 'none',
  //                 duration: 1000
  //               })
  //             } else if (res.confirm) {
  //               wx.openSetting({
  //                 success: function (dataAu) {
  //                   if (dataAu.authSetting["scope.userLocation"] == true) {
  //                     wx.showToast({
  //                       title: '授权成功',
  //                       icon: 'success',
  //                       duration: 1000
  //                     })
  //                     //再次授权，调用wx.getLocation的API
  //                     vm.getLocation();
  //                   } else {
  //                     wx.showToast({
  //                       title: '授权失败',
  //                       icon: 'none',
  //                       duration: 1000
  //                     })
  //                   }
  //                 }
  //               })
  //             }
  //           }
  //         })
  //       } else if (res.authSetting['scope.userLocation'] == undefined) {
  //         //调用wx.getLocation的API
  //         vm.getLocation();
  //       }
  //       else {
  //         //调用wx.getLocation的API
  //         vm.getLocation();
  //       }
  //     }
  //   })
  // },
  // // 微信获得经纬度
  // getLocation: function () {
  //   let vm = this;
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function (res) {
  //       console.log(JSON.stringify(res))
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       var speed = res.speed
  //       var accuracy = res.accuracy;
  //       vm.getLocal(latitude, longitude)
  //     },
  //     fail: function (res) {
  //       console.log('fail' + JSON.stringify(res))
  //     }
  //   })
  // },
  // // 获取当前地理位置
  // getLocal: function (latitude, longitude) {
  //   let vm = this;
  //   qqmapsdk.reverseGeocoder({
  //     location: {
  //       latitude: latitude,
  //       longitude: longitude
  //     },
  //     success: function (res) {
  //       console.log(JSON.stringify(res));
  //       let province = res.result.ad_info.province
  //       let city = res.result.ad_info.city
  //       let district = res.result.ad_info.district
  //       vm.setData({
  //         province: province,
  //         city: city,
  //         district: district,
  //         latitude: latitude,
  //         longitude: longitude
  //       })

  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       // console.log(res);
  //     }
  //   });
  // }
})

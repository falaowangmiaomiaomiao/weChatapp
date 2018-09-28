//index.js
var wxCharts = require('../../utils/wxcharts.js');
//获取应用实例
const app = getApp();
var lineChart1 = null;
var lineChart2 = null;
var lineChart3 = null;
var lineChart4 = null;
//->百度地图天气
var bmap = require('../../utils/bmap-wx.min.js');
//<-

Page({
  data: {
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
    flag:["wea1","wea2","wea3"],
    flags:["flags1","flags2","flags3"],
    //<-
    //swiper位置配置
    winWidth: 0,
    winHeight: 0,
    //页面切换
    currentIndex1: true,
    currentIndex2: false,
    currentIndex3: false,
    currentIndex4: false
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
    var categories = [1,2,3,4,5,6,7,8];
    var data = [];
    
    // data[4] = null;
    return {
      categories: categories,
      // data: data
    }
  },
  //<-绘制图表相关1,2,3,4
  onLoad: function (options) {
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
      var flag=that.data.flag;
      var flags = that.data.flags;
      var urlIcon1,urlIcon2,url;
      if (weatherData.weatherDesc.indexOf("暴雨")>=0){
        url = "./image/baoyu.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("沙尘暴") >= 0) {
        url = "./image/shachenbao.png";
        flag = "wea2";
        flags = "flags2";
      } else if (weatherData.weatherDesc.indexOf("雾") >= 0) {
        url = "./image/wu.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("阵雨") >= 0){
        url = "./image/dyzzy.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("小雨") >= 0) {
        url = "./image/xiaoyu.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("中雨") >= 0) {
        url = "./image/xiaoyu.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("大雨") >= 0) {
        url = "./image/xiaoyu.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("雨夹雪") >= 0) {
        url = "./image/xiaoxue.png"; 
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("小雪") >= 0) {
        url = "./image/xiaoxue.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("中雪") >= 0) {
        url = "./image/xiaoxue.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("大雪") >= 0) {
        url = "./image/xiaoxue.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("多云") >= 0) {
        url = "./image/qingtian.png";
        flag = "wea1";
        flags = "flags1";
      } else if (weatherData.weatherDesc.indexOf("阴") >= 0) {
        url = "./image/yin.png";
        flag = "wea3";
        flags = "flags3";
      } else if (weatherData.weatherDesc.indexOf("晴") >= 0) {
        url = "./image/qingtian2.png";
        flag = "wea1";
        flags = "flags1";
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
        url:url,
        flag:flag,
        flags:flags
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

    var simulationData = that.createSimulationData();
    lineChart1 = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'area',
      categories: simulationData.categories,
      animation: true,
      dataLabel: true,
      legend:false,
      series: [{
        name: '降雨量',
        data: [200, 500, 900,100, 150, 400, 1000],
        format: function (val, name) {
          return val.toFixed(2) + 'mm';
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor:"#ffffff"
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
        lineStyle: 'straight'
      }
    });//《-绘制图表相关1
     //->绘制图表相关2
    var simulationData2 = that.createSimulationData();
    lineChart2 = new wxCharts({
      canvasId: 'lineCanvas1',
      type: 'area',
      // background: "#000",
      categories: simulationData2.categories,
      animation: true,
      legend: false,
      // color:"#000",
      series: [{
        name: '蒸发量',
        data: [500, 400, 480, 600.45, 450, 400, 500],
        format: function (val, name) {
          return val.toFixed(2)+"kg";
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
        lineStyle: 'straight'
      }
    });//《-绘制图表相关2
    //->绘制图表相关3
    var simulationData3 = that.createSimulationData();
    lineChart3 = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'area',
      categories: simulationData3.categories,
      animation: true,
      legend: false,
      // color:"#000",
      series: [{
        name: '光照度',
        data: [300, 400, 480, 400, 450, 400, 500],
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
        lineStyle: 'straight'
      }
    });//《-绘制图表相关3
    //->绘制图表相关4
    var simulationData4 = that.createSimulationData();
    lineChart4 = new wxCharts({
      canvasId: 'lineCanvas3',
      type: 'area',
      background: "#000",
      categories: simulationData4.categories,
      animation: true,
      legend: false,
      // color:"#000",
      series: [{
        name: '温度',
        data: [30, 38, 39, 34, 32, 40, 37],
        format: function (val, name) {
          return val.toFixed(1) + '℃';
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
        lineStyle: 'straight'
      }
    });//《-绘制图表相关4
  },
  // clickTap: function (e) {

  //   var that = this;
  //   console.log(e.target.dataset.current)
  //   if (this.data.currentTab === e.target.dataset.current) {
  //     return false;
  //   } else {
  //     that.setData({
  //       currentTab: e.target.dataset.current,
  //     })
  //   }
  // },
  // bindChanges: function (e) {
  //   var that = this;
  //   that.setData({ currentTab: e.detail.current });
  // },
  currentIndex1: function (e) {
    this.setData({
      currentIndex1: true,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex4: false
    })
  },
  currentIndex2: function (e) {
    this.setData({
      currentIndex1: false,
      currentIndex2: true,
      currentIndex3: false,
      currentIndex4: false
    })
  },
  currentIndex3: function (e) {
    this.setData({
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: true,
      currentIndex4: false
    })
  },
  currentIndex4: function (e) {
    this.setData({
      currentIndex1: false,
      currentIndex2: false,
      currentIndex3: false,
      currentIndex4: true
    })
  },
})

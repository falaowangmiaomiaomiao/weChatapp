// pages/texts/texts.js
// var countDownNum = 5*60 * 1000;

/* 毫秒级倒计时 */
//  function countDown(that) {
//    // 渲染倒计时时钟
//    that.setData({
//      clock: date_format(countDownNum)
//    });

//    if (countDownNum <= 0) {
//      that.setData({
//        clock: "已经截止"
//      });
//      // timeout则跳出递归
//      return;
//    }
//    setTimeout(function () {
//      // 放在最后--
//      countDownNum -= 10;
//      countDown(that);
//    }
//      , 10)
//  }

//  // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
//  function date_format(micro_second) {
//    // 秒数
//    var second = Math.floor(micro_second / 1000);
//    // 小时位
//    var hr = Math.floor(second / 3600);
//    // 分钟位
//    var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//    // 秒位
//   var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
//    // 毫秒位，保留2位
//    var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

//    return hr + ":" + min + ":" + sec + " " + micro_sec;
//  }

//  // 位数不足补零
//  function fill_zero_prefix(num) {
//    return num < 10 ? "0" + num : num
//  }

Page({
  data: {
    clock: '',
    timer:"",
  },
  onLoad: function () {
    this.setData({
      timer: setInterval(function(){
        var countDownNum = 5 * 60 * 1000;
        function countDown(that) {
          // 渲染倒计时时钟
          that.setData({
            clock: date_format(countDownNum)
          });

          if (countDownNum <= 0) {
            that.setData({
              clock: "已经截止"
            });
            // timeout则跳出递归
            return;
          }
          setTimeout(function () {
            // 放在最后--
            countDownNum -= 10;
            countDown(that);
          }
            , 10)
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
      })
    })
  
  }

//   countDown:function () {
//     let that=this;
//     var countDownNum = 5 * 60 * 1000;
//     // 渲染倒计时时钟
//     that.setData({
//       clock: that.date_format(countDownNum)
//     });

//     if(countDownNum <= 0) {
//   that.setData({
//     clock: "已经截止"
//   });
//   // timeout则跳出递归
//   return;
// }
// timer:setTimeout(function () {
//   // 放在最后--
//   countDownNum -= 10;
//   that.countDown();
// }
//   , 10)
// },

// // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
//   date_format: function (countDownNum) {
//   let that=this;
//   // 秒数
//     var second = Math.floor(countDownNum / 1000);
//   // 小时位
//   var hr = Math.floor(second / 3600);
//   // 分钟位
//   var min = that.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//   // 秒位
//   var sec = that.fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
//   // 毫秒位，保留2位
//     var micro_sec = that.fill_zero_prefix(Math.floor((countDownNum % 1000) / 10));

//   return hr + ":" + min + ":" + sec + " " + micro_sec;
// },

// // 位数不足补零
//  fill_zero_prefix:function(num) {
//   let that=this;
//   return num < 10 ? "0" + num : num
// }
});
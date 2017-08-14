
var BASE_URL = 'https://api.bqmart.cn/';

function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, message, success, fail) {
  console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: BASE_URL + url,
    data: addCommonParams(params),
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}
function addCommonParams(params) {
    params.p1 = '4.2.0-debug',
    params.p10 = 'android',
    params.p9 = 'app',
    params.p4 = 'SM-C5000',
    params.p5 = '4',
    params.p2 = '420',
    params.device_id = '14c591ead900363885401752506b4a6f',
    params.p7 = '6.0.1',
    params.p6 = '1080*1920',
    params.ip = '192.168.0.214',
    params.p3 = 'dev',
    params.p8 = '23'
    return params;
}

module.exports = {
  request: request,
  requestLoading: requestLoading
}
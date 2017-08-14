// home.js
var network = require('../../../utils/network.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topBanner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    currentPage: 1,
    skuLoading: false, //加载数据中..默认false，隐藏
    skuLoadingCompleted: false, //没有数据 默认false，隐藏
    windowHeight: 1000,
    location:"请选择地址",

    services: [],
    servicePageCount: 0,

    secondArr: new Array(),
    //首页推荐商品
    skuRecommend: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        windowHeight: res.screenHeight;
      },
    })

    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // })

    var that = this;
    // wx.request({
    //   url: 'https://api.bqmart.cn/stores/homePage.json',
    //   method: 'POST',
    //   data: {
    //     'store_id': '148382',
    //     'p1': '4.2.0-debug',
    //     'p10': 'android',
    //     'p9': 'app',
    //     'p4': 'SM-C5000',
    //     'p5': '4',
    //     'p2': '420',
    //     'device_id': '14c591ead900363885401752506b4a6f',
    //     'p7': '6.0.1',
    //     'p6': '1080*1920',
    //     'ip': '192.168.0.214',
    //     'p3': 'dev',
    //     'p8': '23'
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
        // console.log(res.data)
        // that.setData({
        //   topBanner: res.data.result.banners,
        //   services: res.data.result.services,
        //   secondArr: that.changeArray(res.data.result.services)
        // })
        // that.getSkuRecommend()
    //   }
    // })
    var params = new Object();
    params.store_id = '148382';
    network.requestLoading('stores/homePage.json', params, '测试网络请求封装',
      function(res){
        console.log('res:' + res.result)
        that.setData({
          topBanner: res.result.banners,
          services: res.result.services,
          secondArr: that.changeArray(res.result.services)
        })
        that.getSkuRecommend()
      },
      function(res){
        console.log('fail:' + res)
      }
    )
  },

  getSkuRecommend: function () {
    var that = this;
    that.data.skuLoading = false;
    wx.request({
      url: 'https://api.bqmart.cn/goods/skuRecommend',
      method: 'GET',
      data: {
        'store_string': '148382',
        'p1': '4.2.0-debug',
        'p10': 'android',
        'p9': 'app',
        'p4': 'SM-C5000',
        'p5': '4',
        'p2': '420',
        'device_id': '14c591ead900363885401752506b4a6f',
        'p7': '6.0.1',
        'p6': '1080*1920',
        'ip': '192.168.0.214',
        'p3': 'dev',
        'p8': '23',
        'page': that.data.currentPage,
        'limit': '18',
        'type': 'selected',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let dateList = [];
        that.data.currentPage == 1 ? dateList = res.data.result : dateList = that.data.skuRecommend.concat(res.data.result);
        if (res.data.result.length == 18) {
          that.data.currentPage++;
          that.setData({
            skuRecommend: dateList,
            skuLoading: true,
          })
        } else {
          that.setData({
            skuLoadingCompleted: true,
            skuLoading: false,
          })
        }
      },
      fail: function () {
        that.data.skuLoading = false,
          wx.showToast({
            title: '请求失败',
          })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  changeArray: function (arr) {
    var aa = new Array();
    for (var i = 0; i < arr.length / 8; i++) {
      aa[i] = new Array(); //将每一个子元素又定义为数组 
      for (var n = 0; n < 8; n++) {
        aa[i][n] = arr[i * 8 + n]; //此时aa[i][n]可以看作是一个二级数组 
      }
    }
    return aa;
  },

  serviceGoTo: function (item) {
    // wx.navigateTo({
    //   url: '',
    // })
    console.log(item)
    wx.showToast({
      // title: "hahaha",
      title: "" + item.currentTarget.dataset.item.title
    })
  },

  doProduct: function () {
    wx.showToast({
      title: '别乱点!!!',
    })
  },

  doScan: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },

  doSearch: function () {
    wx.showToast({
      title: '点击搜索',
    })
  },

  scrolltolower: function () {
    var that = this;
    if (that.data.skuLoading) {
      wx.showToast({
        title: '当前页码' + that.data.currentPage,
      })
      that.getSkuRecommend()
    }
  },
})
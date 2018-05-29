//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    userOpenID:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickMe:function(){
    this.setData({motto:"3333"});
  },

  testSubmit: function (e) {
    var self = this;
    let _access_token = '10_KpTN5ba0iXKFNRuA3mNRRAyNvBy6jpMs3ai2azJU1dxJ8hGIxTWnI2pw56WSYiVLxpgYBJy8cD--ZZ2IBcLN4uLziXoD2cFtBwJSfHwyE9kYFBnKqz6fwQvCqe7XWYD9JkKQVd5X4yg9iXDbYVGgAHAHEP';
    let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token

      ; 
    console.log("e.detail.formId: " + e.detail.formId);
      let _jsonData = {
        access_token: _access_token,
        touser: 'orsUR0fn2kGG8UdvfW8jLl6z5vWc',
        template_id: 'tvYE1nsU_oOrJoZRRJD5AhDRFuxGBC7Cc0SuEjY9XGo',
        form_id: e.detail.formId,
        page: "pages/index/index",
        data: {
          "keyword1": { "value": "测试数据一", "color": "#173177" },
          "keyword2": { "value": "测试数据二", "color": "#173177" },
        }
      }
    wx.request({
      url: url,
      data: _jsonData,
      method: 'POST',
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }

    })
    },

  onLoad: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

    // 查看是否授权
    wx.getSetting({
      withCredentials:true,
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
            }
          })
        }
      }
    })

    console.log('load');
    if (app.globalData.userInfo) {
      console.log('1:'+app.globalData.userInfo.nickName);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log('2:' + app.globalData.userInfo);
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log('2:' + app.globalData.userInfo.nickName);
        console.log('2:' + app.globalData.userInfo.openId);
      }
    } else {
      console.log('load3');
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      userOpenID:e.detail.userInfo.openId,
      hasUserInfo: true
    })
  }
})

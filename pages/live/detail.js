import {
  api,
  wxtkBind
} from '../../utils/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    paddingTop: 0,
    heightTop: 32,
    triggered: false,
    live: {},
    steps: [
      '点击【去直播间】',
      '点击直播间右下角⤴转发给朋友或者朋友圈',
      '好友下单，您可拿到对应商品佣金'
    ],
    canvas_data: {},
    canvas_image: '',
    img: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/68230573000487ca01d9d20ceaf61715000000a100004f50',
    is_bind_wxtk: 0,
    visible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const rect = wx.getMenuButtonBoundingClientRect()
    console.log(options, rect)
    let id = options.id
    this.setData({
      id,
      paddingTop: rect.top,
      heightTop: rect.height + 5
    })
    this.getData()
  },
  async getData() {
    let id = this.data.id
    let res = await api.get('/index/live/detail', {
      id
    })
    const data = res.data
    data.share = data.share_text.split('\n')
    let steps = this.data.steps
    // data.live_status = 0
    if (data.type != '1') {
      steps = [
        '点击【分享预约海报】',
        '海报转发好友或者保存发朋友圈',
        '好友预约，开播后进入直播间下单，您可拿到对应商品佣金'
      ]
    }
    this.setData({
      live: data,
      steps,
      is_bind_wxtk: data.is_bind_wxtk
    })
    if (data.is_bind_wxtk == 1) {
      this.createCanvas()
    }
  },
  copy() {
    wx.setClipboardData({
      data: this.data.live.share_text,
      success: function (res) {
        wx.hideToast();
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getData()
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async getPhoneNumber(e) {
    let code = e.detail?.code || ''
    if (code == '') return true
    let res = await api.post('/index/login/mobile', {
      code
    })
    if (res.code = 200) {
      this.setData({
        visible: false
      })
      this.bindTuike()
    }
  },
  bindTuike() {
    let that = this
    wxtkBind(function (res) {
      that.setData({
        visible: false
      })
      that.getData()
      // wx.showToast({
      //   title: '绑定成功！',
      // })
    })
  },
  buy() {
    this.setData({
      visible: true
    })
  },
  notice() {
    const live = this.data.live
    wx.reserveChannelsLive({
      "noticeId": live.live_id,
      "promoterShareLink": live.promoter_share_link,
      success(res) {},
      fail(res) {
        wx.showToast({
          title: '预约失败，请与客服联系！',
          duration: 1000
        })
      }
    })
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    })
  },
  share() {
    if (this.data.is_bind_wxtk != 1) {
      this.setData({
        visible: true
      })
      return true
    }
    if (this.data.canvas_image == '') {
      wx.showToast({
        title: '海报生成中,请稍候再点击...',
        duration: 1000
      })
      return true
    } else {
      let path = this.data.canvas_image
      wx.showShareImageMenu({
        path: path,
        success(e) {},
        fail(err) {}
      })
    }
  },
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      canvas_image: this.imagePath,
    })
  },
  createCanvas() {
    let live = this.data.live
    console.log(live)
    let qrTop = 'calc(hs.bottom + 400rpx)'
    if (live.goods_list.length > 0) {
      qrTop = 'calc(hs.bottom + 780rpx)'
    }
    let data = {
      width: "1500rpx",
      height: '2668rpx',
      views: [{
          type: "image",
          url: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/682ae0ef000e8dc302baed836f3b1f15000000a100004f50',
          css: {
            width: '1500rpx',
            height: '2668rpx',
            borderRadius: '40rpx',
          }
        }, {
          id: "pic",
          type: "image",
          url: live.thumb,
          css: {
            top: "160rpx",
            left: "100rpx",
            width: '300rpx',
            height: '300rpx',
            borderRadius: '150rpx',
            borderWidth: '8rpx',
            borderColor: '#FC335F',
          }
        }, this._showStatus(),
        {
          id: "title",
          type: "text",
          text: live.title,
          css: {
            width: "1000rpx",
            left: "440rpx",
            top: "160rpx",
            fontSize: "32px"
          }
        }, {
          id: "price",
          type: "text",
          text: '最高返 ' + live.commission_rate,
          css: {
            width: "400rpx",
            left: "460rpx",
            top: "calc(title.bottom + 60rpx)",
            fontSize: "24px",
            color: "#FFFFFF",
            borderWidth: '2rpx',
            borderColor: '#FC335F',
            padding: "20rpx 40rpx",
            background: "#FC335F"
          }
        }, {
          type: "text",
          text: live.invite_desc,
          css: {
            width: "1000rpx",
            left: "440rpx",
            top: "calc(price.bottom + 30rpx)",
            fontSize: "24px",
            color: "#333",
            lineHeight: "60rpx",
            maxLines: 2
          }
        }, {
          id: "hs",
          type: "text",
          text: live.share_text,
          css: {
            width: "1340rpx",
            left: "180rpx",
            top: "calc(pic.bottom + 240rpx)",
            fontSize: "28px",
            lineHeight: "100rpx",
            background: "#FFFFFF",
            padding: "260rpx 80rpx 4rpx 120rpx",
            borderRadius: "40rpx",
            color: "#666",
            maxLines: 6
          }
        }, {
          id: "share",
          type: "image",
          url: "https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/682311d90009964b24fe84b6483f0315000000a100004f50",
          css: {
            width: "400rpx",
            left: "80rpx",
            top: "calc(pic.bottom + 106rpx)",
          }
        },
        this._showTime(),
        ...this._showPic(),
        {
          id: "qr",
          type: "image",
          url: live.qrcode_url,
          css: {
            top: qrTop,
            left: "500rpx",
            width: '500rpx',
            height: '500rpx',
            background: "#FFFFFF",
          }
        }, {
          type: "text",
          text: live.type == 1 ? '长按扫码，进入直播间' : '长按扫码，预约直播',
          css: {
            top: "calc(qr.bottom)",
            left: "470rpx",
            fontSize: "28px",
            color: "#666",
          }
        }
      ]
    }
    this.setData({
      canvas_data: data
    })
  },
  _showTime() {
    let time = this.data.live.start_time || ''
    if (time != '') {
      let res = {
        type: "text",
        text: time,
        css: {
          top: "calc(pic.bottom + 130rpx)",
          left: "780rpx",
          color: '#FC335F',
          fontSize: "30px"
        }
      }
      return res
    }
  },
  _showStatus() {
    let live = this.data.live
    let status = '直播中'
    let color = '#FFFFFF'
    let background = '#FC335F'
    if (live.type != '1') {
      status = '预约中'
      color = '#FC335F'
      background = '#FEE4EB'
    }
    let res = {
      type: "text",
      text: status,
      css: {
        top: "calc(pic.bottom - 40rpx)",
        left: "180rpx",
        color: color,
        fontSize: "24px",
        padding: "10rpx 20rpx",
        borderRadius: '80rpx',
        background: background
      }
    }
    return res
  },
  _showPic() {
    let goods = this.data.live.goods_list
    let res = []
    let length = goods.length
    if (length > 0) {
      length = length > 3 ? 3 : length
      let goodsTitle = {
        id: "goods_title",
        type: "image",
        url: "https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/6823130c00004c6f04dce284acf31715000000a100004f50",
        css: {
          width: "700rpx",
          left: "400rpx",
          top: "calc(hs.bottom + 200rpx)",
        }
      }
      res.push(goodsTitle)
      let rect = {
        type: 'rect',
        css: {
          top: "calc(goods_title.bottom + 40rpx)",
          width: '1400rpx',
          height: '460rpx',
          left: "60rpx",
          color: '#ffffff',
          borderRadius: "40rpx",
        },
      }
      res.push(rect)
      goods = goods.slice(0, length)
      for (var i = 0; i < length; i++) {
        let left = 80 + (40 + 420) * i
        let pic = {
          type: "image",
          url: goods[i].thumb,
          css: {
            top: "calc(goods_title.bottom + 60rpx)",
            left: left + "rpx",
            width: '420rpx',
            height: '420rpx',
            borderRadius: "20rpx",
          }
        }
        res.push(pic)
      }
    }
    return res
  }
})
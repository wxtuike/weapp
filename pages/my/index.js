import {
  GestureState
} from '../../utils/util'

import {
  api,
  wxtkBind
} from '../../utils/api'

const {
  shared
} = wx.worklet

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: wx.getStorageSync('showcommission') || false,
    commission: {},
    eye: 'browse', //browse-off
    visible: false,
    renderer: '',
    loading: false,
    triggered: false,
    new_img: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/6816e7220006392e183ce01defe11b15000000a100004f50',
    ds_img: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/6816e709000bcdff20d28ea74580bc1e000000a100004f50',
    service: [],
    other: [],
    user_info: {},
    mobile_bind: true,
    tk_bind: true,
    first: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      renderer: this.renderer
    })
    this.x = shared(0);
    this.y = shared(0);
    let that = this
    if (app.globalData.login) {
      that.getData()
    } else {
      app.checkLoginReadyCallback = res => {
        that.getData()
      }
    }
  },
  other(e) {
    let link = e.currentTarget.dataset.item.link
    console.log(link)
    let page = ''
    switch (link) {
      case 'cooperate':
        page = '/pages/work/contact'
        break;
      case 'verified':
        wx.showToast({
          title: '您已经是推客啦',
        })
        break;
    }
    if (page != '') {
      wx.navigateTo({
        url: page,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.applyAnimatedStyle('.circle', () => {
      'worklet';
      return {
        transform: `translate(${this.x.value}px, ${this.y.value}px)`,
      };
    });
  },

  withdraw() {
    wx.navigateTo({
      url: '/pages/income/index',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this
    if (app.globalData.login) {
      that.getData()
    } else {
      app.checkLoginReadyCallback = res => {
        that.getData()
      }
    }
  },

  async getData() {
    if (this.data.first) {
      console.log('正在加载中。')
      return true
    }
    this.setData({
      first: true
    })
    let res = await api.post('/index/user/index', {})
    if (res.code == 200) {
      let service = res.data.service
      let other = res.data.other
      let commission = {
        commission: res.data.commission,
        total_commission: res.data.total_commission,
        wait_commission: res.data.wait_commission
      }
      let show = wx.getStorageSync('showcommission') || false
      let eye = show ? 'browse' : 'browse-off'
      if (!show) {
        commission = {
          commission: '****',
          total_commission: '****',
          wait_commission: '****'
        }
      }
      let mobile_bind = res.data.mobile_bind == 1 ? true : false
      let tk_bind = res.data.tk_bind == 1 ? true : false
      this.setData({
        service,
        other,
        eye,
        commission,
        user_info: res.data,
        mobile_bind,
        tk_bind,
        first: false
      })
      console.log(this.data)
    }
  },

  async onRefresh(e) {
    console.info('@@@ onRefresh', e)
    // 自己定义刷新事件
    var self = this
    // 自己定义刷新事件
    self.setData({
      triggered: true, // 将triggered属性设置为true，表示下拉刷新已经被触发
    })
    self.getData()
    self.setData({
      triggered: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return app.shareMessage('个人中心')
  },
  onShareTimeline() {
    return app.shareTimeLine('个人中心')
  },
  onEyeTap() {
    let show = wx.getStorageSync('showcommission') || false
    let eye = 'browse' //browse-off
    let commission = {
      commission: this.data?.user_info?.commission || 0,
      total_commission: this.data?.user_info?.total_commission || 0,
      wait_commission: this.data?.user_info?.wait_commission || 0,
    }
    console.log(commission)
    if (show) {
      //当前是显示时隐藏
      commission = {
        commission: '****',
        total_commission: '****',
        wait_commission: '****'
      }
      show = false
      eye = 'browse-off'
    } else {
      show = true
      eye = 'browse'
    }
    wx.setStorageSync('showcommission', show)
    this.setData({
      commission,
      show,
      eye
    })
  },
  async handlePopup(e) {
    let res = await api.post('/index/user/share', {})
    if (res.code == 200) {
      let share = res.data
      this.setData({
        visible: true,
        share
      })
    }
  },
  call(e) {
    let mobile = e.currentTarget.dataset.mobile || ''
    if (mobile != '') {
      wx.makePhoneCall({
        phoneNumber: mobile,
      })
    }
  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  onClose() {
    this.setData({
      visible: false,
    });
  },
  handleGesture(evt) {
    'worklet';
    if (evt.state === GestureState.ACTIVE) {
      if (evt.focalY > 200 && evt.focalY < 700) {
        this.y.value += evt.focalDeltaY;
      }
    }
  },

  bindTuike() {
    let that = this
    wxtkBind(function (res) {
      that.getData()
    })
  },
  async getPhoneNumber(e) {
    let code = e.detail?.code || ''
    if (code == '') return true
    let res = await api.post('/index/login/mobile', {
      code
    })
    if (res.code = 200) {
      this.bindTuike()
    }
  }
})
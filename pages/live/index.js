import {
  api
} from '../../utils/api'
const app = getApp()
const {
  shared
} = wx.worklet

Page({
  data: {
    loading: false,
    page: 0,
    page_count: 0,
    triggered: false,
    pageBg: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/6826cf840003ea8d2436fa97cf34b00b000000a100004f50',
    list: [],
    cate: 0,
    tabList: [{
        text: '全部',
        key: 0,
      },
      {
        text: '达人',
        key: 1,
      },
      {
        text: '店播',
        key: 2,
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 背景图片的高度和缩放
    this.bgimgTop = shared(0)
    this.bgimgSca = shared(1)
    // 顶部点单栏透明度
    this.topfunOp = shared(0)
    this.getData()
  },
  async getData() {
    let {
      page,
      list,
      cate
    } = this.data
    if (page == 0) {
      list = []
    }
    page = ++page
    let params = {
      page,
      cate
    }
    this.setData({
      loading: true
    })
    let res = await api.post('/index/live/index', params)
    let new_list = list
    if (res.data.length > 0) {
      new_list = list.concat(res.data)
    }
    this.setData({
      loading: false,
      page,
      list: new_list,
    })
  },
  tabChangeHandle(e) {
    console.log(e)
    let cate = e.detail.value
    this.setData({
      cate,
      page: 0
    })
    this.getData()
  },

  onRefresh(e) {
    // 自己定义刷新事件
    var self = this
    // 自己定义刷新事件
    self.setData({
      page: 0,
      triggered: true, // 将triggered属性设置为true，表示下拉刷新已经被触发
    })
    this.getData()
    self.setData({
      triggered: false
    })
  },
  loadMore(e) {
    const {
      loading,
    } = this.data
    if (!loading) {
      this.getData()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 背景图片动画监听
    this.applyAnimatedStyle('.bgimg', () => {
      'worklet'
      return {
        top: `${this.bgimgTop.value}px`,
        transform: `scale(${this.bgimgSca.value},${this.bgimgSca.value})`
      }
    })
    /*
    // 顶部点单栏动画监听
    this.applyAnimatedStyle('.top', () => {
      'worklet'
      return {
        opacity: `${this.topfunOp.value}`
      }
    })
    */
  },
  go(e) {
    let live = e.currentTarget.dataset.item;
    console.log(live)
    wx.navigateTo({
      url: '/pages/live/detail?id=' + live.talent_appid,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    let params = app.shareMessage('海量热推直播间')
    return params
  },
  scrolling(e) {
    "worklet"
    let scrollTop = e.detail.scrollTop
    if (scrollTop <= 0) {
      //向下滚动
      this.bgimgTop.value = 0
      this.bgimgSca.value = 1 + (-scrollTop / 200)
      // this.topfunOp.value = 0
    } else {
      //向上滑动
      // this.bgimgTop.value = -scrollTop
      this.bgimgSca.value = 1
      let opTemp = (scrollTop / 200)
      // this.topfunOp.value = opTemp >= 1 ? 1 : opTemp
    }
  },
})
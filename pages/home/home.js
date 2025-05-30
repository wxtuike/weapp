import {
  api
} from '../../utils/api'

const app = getApp()
Page({
  data: {
    loading: false,
    page: 0,
    page_count: 0,
    triggered: false,
    list: [],
    lives: [],
    imgSrcs: [],
    banner: [],
    tabList: [],
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots-bar'
    },
    swiperImageProps: {
      mode: 'scaleToFill'
    },
    paddingTop: 0,
    cate_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const rect = wx.getMenuButtonBoundingClientRect()
    this.setData({
      paddingTop: rect.top,
    })
    this.getCate()
    this.init()
    console.log(app.getCurrentPagePath())
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
  navToActivityDetail(e) {
    let index = e.detail.index
    let id = this.data.banner[index].id
    wx.navigateTo({
      url: '/pages/goods/detail?id=' + id,
    })
  },
  search() {
    wx.navigateTo({
      url: '/pages/goods/search',
    })
  },
  moreLive() {
    wx.switchTab({
      url: '/pages/live/index',
    })
  },
  async getCate() {
    let cateData = await api.get('/index/goods/home', {})
    this.setData({
      tabList: cateData.data.cate,
      lives: cateData.data.lives,
      banner: cateData.data.banner
    })
  },

  async init() {
    let {
      cate_id,
      page,
      list,
      page_count
    } = this.data
    if (page == 0) {
      list = []
    }
    if (page_count > 0 && page + 1 > page_count) {
      console.log('到最大页数了 ')
      return true
    }
    let params = {
      cate_id,
      page: ++page
    }
    this.setData({
      loading: true
    })
    let data = await api.get('/index/goods/list', params)
    const new_list = list.concat(data.data.data)
    this.setData({
      loading: false,
      page,
      list: new_list,
      page_count: data.data?.last_page || 1
    })
    console.log(new_list)
  },

  tabChangeHandle(e) {
    let type = e.detail.value
    this.setData({
      cate_id: type,
      page: 0,
      page_count: 0
    })
    this.init()
  },
  async onRefresh(e) {
    console.info('@@@ onRefresh', e)
    // 自己定义刷新事件
    var self = this
    // 自己定义刷新事件
    self.setData({
      page: 0,
      triggered: true, // 将triggered属性设置为true，表示下拉刷新已经被触发
    })
    this.getCate()
    this.init()
    self.setData({
      triggered: false
    })
  },
  loadMore(e) {
    const {
      loading,
    } = this.data
    if (!loading) {
      this.init()
    }
  },

  onShareAppMessage() {
    let params = app.shareMessage('微信小店推客')
    return params
  },
  onShareTimeline() {
    let params = app.shareTimeLine('微信小店推客')
    return params
  },
  detail(e) {
    console.log(e)
    const {
      goods_id,
      title
    } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/goods/detail?id=' + goods_id,
    })
  },
  goLive(e) {
    let live = e.currentTarget.dataset.item
    console.log(live)
    wx.navigateTo({
      url: '/pages/live/detail?id=' + live.talent_appid,
    })
  }
})
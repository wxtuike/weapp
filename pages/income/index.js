import {
  api
} from '../../utils/api'
Page({
  data: {
    commission: 0,
    page: 0,
    loading: false,
    list: [],
    type: 0,
    title: '我的收益',
    triggered: false,
    tabList: [{
        text: '结算记录',
        key: 0,
      },
      {
        text: '提现记录',
        key: 1,
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCommission()
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
    this.getList()
  },

  onRefresh(e) {
    var self = this
    self.setData({
      page: 0,
      triggered: true, // 将triggered属性设置为true，表示下拉刷新已经被触发
    })
    this.getCommission()
    this.getList()
    self.setData({
      triggered: false
    })
  },
  loadMore(e) {
    const {
      loading,
    } = this.data
    if (!loading) {
      this.getList()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onscroll(e) {
    console.log(e)
    let rate = e.detail.scrollTop / 100
    rate = rate > 1 ? 1 : rate
    let navbar_background = `rgba(7, 193, 96, ${rate})`
    let title = ''
    if (e.detail.scrollTop > 100) {
      title = '我的收益'
    } else {
      if (navbar_background != '') {
        navbar_background = ''
        title = ''
      }
    }
    this.setData({
      navbar_background,
      title
    })
  },
  onTabsChange(e) {
    let type = e.detail.value
    let that = this
    that.setData({
      type,
      page: 0,
      loading: true,
    })
    that.getList()
  },
  async getCommission() {
    let res = await api.post('/index/user/commissionInfo', {})
    if (res.code == 200) {
      let commission = res.data?.commission || 0
      this.setData({
        commission
      })
    }
  },

  async getList() {
    let {
      page,
      type,
      list
    } = this.data
    if (page == 0) {
      list = []
    }
    let params = {
      page: ++page,
      type
    }
    let res = await api.post('/index/user/commissionList', params)
    if (res.code == 200) {
      const data = res.data
      const new_list = list.concat(data?.data || [])
      this.setData({
        page: page,
        list: new_list,
        loading: false
      })
      console.log(this.data)
    }
  }
})
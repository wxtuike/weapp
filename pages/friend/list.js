import {
  api
} from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '我的好友',
    page: 0,
    loading: false,
    list: [],
    count: 0,
    count1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCount()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      page: 0,
      loading: true,
    })
    this.getList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      page: 0,
      loading: true,
    })
    // 更新数据
    this.getList()
    this.getCount()
    setTimeout(() => {
      // 停止下拉刷新动画
      wx.stopPullDownRefresh()
    }, 100)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.loading) {
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async getCount() {
    let res = await api.post('/index/user/fans', {})
    if (res.code == 200) {
      this.setData({
        count: res.data?.count || 0,
        count1: res.data?.count1 || 0
      })
    }
  },
  async getList() {
    let {
      page,
      list
    } = this.data
    if (page == 0) {
      list = []
    }
    let params = {
      page: ++page
    }
    let res = await api.post('/index/user/fansList', params)
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
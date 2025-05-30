import {
  api
} from '../../utils/api'
Page({
  data: {
    page: 0,
    loading: true,
    list: [],
    status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getList()
  },

  goodsInfo(e) {
    let productId = e.currentTarget.dataset.id || ''
    console.log(productId)
    if (productId != '') {
      wx.navigateTo({
        url: '/pages/goods/detail?id=' + productId,
      })
    }
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

  onTabsChange(e) {
    let status = e.detail.value
    let that = this
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 100,
      success(e) {
        console.log(e)
        that.setData({
          status,
          page: 0,
          loading: true,
        })
        that.getList()
      }
    })
  },
  async getList() {
    let {
      page,
      status,
      list
    } = this.data
    console.log(this.data)
    if (page == 0) {
      list = []
    }
    let params = {
      page: ++page,
      status
    }
    let res = await api.post('/index/order/list', params)
    if (res.code == 200) {
      const data = res.data
      const new_list = list.concat(data.data)
      this.setData({
        page: page,
        list: new_list,
        loading: false
      })
    }
  }
})
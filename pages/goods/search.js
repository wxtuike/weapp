import {
  api
} from '../../utils/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    actionText: '',
    loading: false,
    page: 0,
    page_count: 0,
    triggered: false,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  detail(e) {
    const {
      goods_id
    } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/goods/detail?id=' + goods_id,
    })
  },
  submit(e) {
    const {
      value
    } = e.detail
    this.setData({
      value,
      list: [],
      page: 0,
      page_count: 0
    })
    this.search()
  },
  loadMore(e) {
    const {
      loading,
    } = this.data
    if (!loading) {
      this.search()
    }
  },
  async search() {
    let keyword = this.data.value
    if (keyword == '') {
      return true
    }
    let {
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
      page: ++page,
      keyword
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
  changeHandle(e) {
    console.log(e)
    const {
      value
    } = e.detail;
    this.setData({
      value,
    });
  },

  focusHandle() {
    this.setData({
      actionText: '取消',
    });
  },

  blurHandle() {
    this.setData({
      actionText: '',
    });
  },

  actionHandle() {
    this.setData({
      value: '',
      actionText: '',
    });
  },
})
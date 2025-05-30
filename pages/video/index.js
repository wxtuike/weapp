import {
  api
} from '../../utils/api'
const app = getApp()

Page({
  data: {
    pageBg: 'https://store.mp.video.tencent-cloud.com/161/20304/snscosdownload/SH/reserved/6826cf64000b7d4114c9db9db9478e0b000000a100004f50',
    loading: false,
    page: 0,
    page_count: 0,
    triggered: false,
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
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    let params = app.shareMessage('热门带货短视频')
    return params
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
  tabChangeHandle(e) {
    console.log(e)
    let cate = e.detail.value
    this.setData({
      cate,
      page: 0
    })
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
    let res = await api.post('/index/live/video', params)
    let new_list = list
    if (res.data.data.length > 0) {
      new_list = list.concat(res.data.data)
    }
    this.setData({
      loading: false,
      page,
      list: new_list,
    })
  }
})
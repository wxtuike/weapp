Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: 'black'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barTop: '48',
    barLeft: '7',
    barHeight: '32'
  },
  attached() {
    const rect = wx.getMenuButtonBoundingClientRect()
    const windowInfo = wx.getWindowInfo()
    console.log(rect, windowInfo)
    this.setData({
      barTop: rect.top,
      barHeight: rect.height,
      barLeft: windowInfo.screenWidth - rect.right,
      bgHeight: rect.bottom + 2
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      let pages = getCurrentPages()
      console.log(pages)
      if (pages.length === 1) { // 当只有一个页面时
        this.goHome()
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    },
    goHome() {
      wx.switchTab({
        url: '/pages/home/home',
      })
    },
  }
})
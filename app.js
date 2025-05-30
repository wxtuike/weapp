import updateManager from './utils/updateManager'
import {
  getWxCode
} from './utils/getPermission'
import {
  api
} from './utils/api'

App({
  onLaunch(options) {
    console.log('onLaunch', options)
    updateManager()
  },
  async onShow({
    scene,
    query
  }) {
    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
    if (scene) {
      this.globalData.scene = scene
    }
    let mid = query?.mid || 0 //他人的分享码
    if (mid == 0 && query.scene) {
      let sceneStr = decodeURIComponent(query.scene)
      let urlParams = this.parseQueryString(sceneStr)
      console.log(urlParams)
      mid = urlParams?.mid || 0
    }
    let myCode = wx.getStorageSync('code') || ''
    console.log(mid, myCode)
    if (mid && mid !== myCode) {
      wx.setStorageSync('share_code', mid)
    }
    this.login(mid)
    // getPermission({ code: 'scope.address', name: '通讯地址' }).then(() => {
  },
  parseQueryString(str) {
    const result = {}
    str.split('&').forEach(pair => {
      const [key, value] = pair.split('=')
      if (key) result[key] = value || ''
    });
    return result
  },
  async login(mid) {
    let _this = this
    let token = wx.getStorageSync('token') || ''
    if (!token) {
      let code = await getWxCode()
      if (code) {
        try {
          let res = await api.post('/index/login/index', {
            code,
            mid
          })
          token = res.data.token
          _this.globalData.login = true
          wx.setStorageSync('token', token)
          wx.setStorageSync('code', res.data.code)
          wx.setStorageSync('is_have_tid', res.data.tid) //是否绑定上级
          if (_this.checkLoginReadyCallback) {
            _this.checkLoginReadyCallback(res)
          }
        } catch (err) {
          if (_this.checkLoginReadyCallback) {
            _this.checkLoginReadyCallback(err)
          }
          console.log(err)
        }
      }
    } else {
      //已经登录
      _this.globalData.login = true
      let tid = wx.getStorageSync('is_have_tid')
      if (tid == 0 && mid != 0) {
        //没有上级并且有邀请码的
        try {
          let res = await api.post('/index/login/bind', {
            uid: mid
          })
          wx.setStorageSync('is_have_tid', res.data.tid || 0)
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  //全局常量
  globalData: {
    login: false,
    scene: 1000
  },
  /** 当前页面 path ，必须是以 / 开头的完整路径（分享给好友） */
  getCurrentPagePath() {
    const pages = getCurrentPages()
    const current = pages[pages.length - 1] || null
    const path = `/${current.route}`
    const params = current.options
    const code = wx.getStorageSync('code')
    if (code != '') {
      params.mid = code
    }
    const query = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
    let url = `${path}?${query}`
    return url
  },
  /** 获取页面路径中携带的参数（分享朋友圈） */
  getCurrentPageQuery() {
    const pages = getCurrentPages()
    const current = pages[pages.length - 1] || null
    const params = current.options
    const code = wx.getStorageSync('code')
    if (code != '') {
      params.mid = code
    }
    const query = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
    return query
  },
  /**
   * 分享给好友 path取当前path+锁粉
   * @param {*} title  标题
   * @param {*} imageUrl 图片，为空使用默认截图
   */
  shareMessage(title, imageUrl = '') {
    let path = this.getCurrentPagePath()
    if (imageUrl != '') {
      let res = {
        title,
        path,
        imageUrl
      }
      console.log(res)
      return res
    }
    return {
      title,
      path
    }
  },
  shareTimeLine(title, imageUrl = '') {
    let query = this.getCurrentPageQuery()
    if (imageUrl != '') {
      return {
        title,
        query,
        imageUrl
      }
    }
    return {
      title,
      query
    }
  }
})
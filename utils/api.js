import {
  apiUrl,
  appid,
} from '../project.config'
import utilMd5 from 'md5'

const api = {
  get(url, data = {}) {
    return request(url, data, 'GET')
  },
  post(url, data = {}) {
    return request(url, data, 'POST')
  }
}

const request = (url, data = {}, method = 'GET', showLoading = false) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    const sign = getSign(url)
    showLoading && wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      timeout: 3000,
      enableHttp2: true,
      url: apiUrl + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Client-Type': 'weapp',
        'Authorization': token,
        'sign': sign
      },
      success: (res) => {
        showLoading && wx.hideLoading()
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            wx.showToast({
              title: res.data.info,
              icon: 'none'
            });
            reject(new Error(res.data.info))
          }
        } else {
          reject(new Error('请求失败，状态码：' + res.statusCode))
        }
      },
      fail: (err) => {
        showLoading && wx.hideLoading()
        reject(new Error('网络请求失败：' + err.errMsg))
      },
      complete: () => {
        // request_loading = 0
      }
    })
  })
}

const getSign = (url) => {
  let noncestr = getRandomString(8)
  let timestamp = Math.round(new Date().getTime() / 1000)
  let str = `noncestr=${noncestr}&s=${url}&timestamp=${timestamp}tk-20250510`
  let sign = utilMd5.hexMD5(str)
  return `${noncestr}-${timestamp}-${sign}`
}

const getRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({
    length
  }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
//微信推客绑定
const wxtkBind = (callback) => {
  wx.openBusinessView({
    businessType: 'CreatorApplyments',
    queryString: 'redirect_url=%2Fauth%2Fpages%2Fauthorization%2Findex&is_simple_register=1&is_from_promoter=1',
    extraData: {
      commissionType: 1,
      commissionRatio: 0,
      headSupplierAppid: appid,
    },
    complete(res) {
      //服务端拉取授权信息
      api.post('/index/user/bindtk').then(res => {
        //静默处理
        setTimeout(() => {
          callback && callback(res)
        }, 200)
      })
    }
  })
}

module.exports = {
  api,
  wxtkBind
}
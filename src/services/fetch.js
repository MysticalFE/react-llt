const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const contentTypes = {
  'application/json': 'json',
  'text/html': 'text',
  'Blob/File': 'blob',
  'FormData': 'formData',
  'ArrayBuffer': 'arrayBuffer'
}
//fetch返回的回调也是promise对象,判断返回的content-type
function dealResponse(response) {
  const contentType = response.headers.get('content-type');
  let resType = 'json'; //返回的数据流格式
  for(let key in contentTypes) {
    if(contentType.indexOf(key) > -1) {
      resType = contentTypes[key]
    }
  }
  return response[resType]().then(data => {
    if(response.ok) {
      return data
    } else {
      return reject(`${response.status}---${response.statusText}`)
    }
  })
}

//timeout处理
function promiseTimeout(time, callback) {
  let timer = null;  
  let timeout_promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      reject('请求超时')
    }, time)
  })

  Promise.race([callback, timeout_promise]).then(() => {
    window.clearTimeout(timer)
  })
}

/**
 * timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间；
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已s；
 */
function Fetch(url, opt) {
  if(!opt) opt = {};
  if(!opt.timeout) opt.timeout = 10000;
  if(url && typeof url !== 'string') return;
  if(opt.method && !methods.some(m => m == method.toUpperCase())) return;
  if (opt.data) {
    //post 设置headers,body
    if(method.toUpperCase() == 'POST') {
      if(opt.data instanceof FormData) {
        opt.headers['Content-Type'] = 'multipart/form-data;'
      } else if(opt.data instanceof Object) {
        opt.body = JSON.stringify(opt.data)
      } else {
        opt.headers['Content-Type'] = 'application:/x-www-form-urlencoded:charset=UTF-8'
      }
    } else {
      const searchParam = url.indexOf('?') > -1 ? '' : '?';
      url += searchParam + Object.keys(opt.data).map(key => `${key}=${encodeURIComponent(options.data[key])}`).join('&');
    }
    delete opt.data;
  }

  //fetch外封装一层promise
  return new Promise((resolve, reject) => {
    let baseParams = {
      method: 'get',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    let reqParams = Object.assign(baseParams, opt)
    const fecth_promise = fetch(url, reqParams).then(dealResponse).then(data => {
      if(data.errorcode == 0) {
        resolve(data.data)
        console.log(data.data)
      } else {
        reject('请求出错')
      }
    })
    //设置请求超时
    promiseTimeout(opt.timeout, fecth_promise)
  })
}

export default Fetch
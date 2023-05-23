import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from './auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY + import.meta.env.VITE_API_URL,
  timeout: 60000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['token'] = getToken()
    config.headers['Timestamp'] = new Date().getTime()
    config.headers['tenant-id'] = import.meta.env.VITE_TENANT_ID
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 网络请求埋点
    try {
      const { data, status } = response
      const _logdata = {
        errorCode: data?.code ?? -1,
        httpCode: status,
        header: response?.config?.headers,
        requestMethod: response?.config?.method,
        requestUrl: response?.request?.responseURL,
        params: response?.config?.data || response?.config?.params,
        responseObject: JSON.parse(response?.request?.response),
        platformType: 'h5',
        keyword: 'networkTimingData',
        version: 'grey'
      }
      // eslint-disable-next-line no-empty
    } catch (error: any) {
      throw new Error(error)
    }

    if (response.status === 200) {
      if (response.data.code != 0) {
        console.error('接口报错,code不为0', response.data)
      }
      return response.data
    } else if (response.data.code === 401) {
      // token为空或失效
      console.error('登录失败', response)
    } else {
      console.error('非200', response)
      return {
        error: '接口错误,非200',
        data: null,
        msg: response.statusText
      }
    }
  },
  (error) => {
    console.error('请求时候报错', error.response)
    const response = error.response
    if (response.status === 401) {
      console.error('登录失败', response)
    } else {
      return {
        ...response.data,
        code: 'offline'
      }
    }
  }
)

function get(url: string, data = {}, ...args: any) {
  return service(
    Object.assign(
      {
        url,
        method: 'get',
        params: data
      },
      ...args
    )
  )
}

function post(url: string, data = {}, ...args: any) {
  return service(
    Object.assign(
      {
        url,
        method: 'post',
        data
      },
      ...args
    )
  )
}

export default {
  get,
  post
}

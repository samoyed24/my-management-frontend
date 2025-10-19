import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface APIResponse<T = any> {
  code: number
  message: string
  data: T | null
}

const request = {
  async get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return axios.get<APIResponse<T>>(url, { params, ...config })
      .then((res: AxiosResponse<APIResponse<T>>) => {
        const response = res.data
        if (!String(response.code).startsWith('2')) {
          throw new Error(response.message)
        }
        return response
      })
  },

  async post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return axios.post<APIResponse<T>>(url, data, config)
      .then((res: AxiosResponse<APIResponse<T>>) => {
        const response = res.data
        if (!String(response.code).startsWith('2')) {
          throw new Error(response.message)
        }
        return response
      })
  },
}

export default request
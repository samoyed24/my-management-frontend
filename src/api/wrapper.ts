import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

export interface APIResponse<T = any> {
  code: number
  message: string
  data: T | null
}

export interface APIError {
  errCode?: number
  errMsg: string
}

const request = {
  async get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return axios.get<APIResponse<T>>(url, { params, ...config })
      .then((res: AxiosResponse<APIResponse<T>>) => {
        const response = res.data
        if (!String(response.code).startsWith('2')) {
          const err: APIError = {
            errCode: response.code,
            errMsg: response.message,
          }
          throw err
        }
        return response
      })
      .catch((err: AxiosError) => {
          const apiErr: APIError = {
            errCode: err.response?.status,
            errMsg: err.message,
          }
          throw apiErr
      })
      .catch((err: APIError) => {
        ElMessage.error(`Errcode: ${err.errCode} ${err.errMsg}`)
        throw err
      })
  },

  async post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return axios.post<APIResponse<T>>(url, data, config)
      .then((res: AxiosResponse<APIResponse<T>>) => {
        const response = res.data
        if (!String(response.code).startsWith('2')) {
          const err: APIError = {
            errCode: response.code,
            errMsg: response.message,
          }
          throw err
        }
        return response
      })
      .catch((err: AxiosError) => {
          const apiErr: APIError = {
            errCode: err.response?.status,
            errMsg: err.message,
          }
          throw apiErr
      })
      .catch((err: APIError) => {
        ElMessage.error(`Errcode: ${err.errCode} ${err.errMsg}`)
        throw err
      })
  },
}

export default request
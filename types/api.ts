interface APIResponse<T = any> {
  code: number
  message: string
  data: T | null
}
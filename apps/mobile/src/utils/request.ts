import Taro from '@tarojs/taro'
import type { ApiResponse } from '@tuxin-gym/shared'

const BASE_URL = 'http://localhost:3000/api'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
}

export async function request<T>({
  url,
  method = 'GET',
  data,
}: RequestOptions): Promise<T> {
  const response = await Taro.request<ApiResponse<T>>({
    url: `${BASE_URL}${url}`,
    method,
    data,
    header: {
      'Content-Type': 'application/json',
    },
  })

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.data.data
  }

  throw new Error(`请求失败: ${response.statusCode}`)
}

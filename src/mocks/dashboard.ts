import { MockMethod } from 'vite-plugin-mock';
import mockResponse from '@/mocks/wrapper';
import { SignUpData } from 'types/dashboard';

export default [
  {
    url: '/api/signUp',
    method: 'post',
    response: () => {
      return mockResponse<SignUpData>(
        20000,
        {
            rank: 7,
        },
        "签到成功"
      )
    },
  },
] as MockMethod[];

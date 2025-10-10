import { MockMethod } from 'vite-plugin-mock';
import mockResponse from '@/mock/wrapper';
import Mock from 'mockjs';
import { ProjectRequestParams } from 'types/project';

export default [
  {
    url: '/api/project',
    method: 'get',
    response: ({ query }: { query: ProjectRequestParams }) => {
      const data = Mock.mock({
        'list|10': [
          {
            name: '@cword(7, 12)',
            client: '@cword(15, 20)',
            amount: '@integer(100000, 10000000)',
            startDate: '@datetime',
            status: () => Mock.Random.pick(['End', 'Process', 'Quality']),
            description: '@cword(20, 50)'
          },
        ],
        total: 50
      })
      return mockResponse(
        20000,
        data,
        'OK'
      )
    }
  },
] as MockMethod[];

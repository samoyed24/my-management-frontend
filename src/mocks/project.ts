import { MockMethod } from 'vite-plugin-mock';
import mockResponse from '@/mocks/wrapper';
import Mock from 'mockjs';
import { ProjectRequestParams } from 'types/project';

export default [
  {
    url: '/api/project',
    method: 'get',
    response: ({ query }: { query: ProjectRequestParams }) => {
      const data = Mock.mock({
        'list|8': [
          {
            name: '@cword(7, 12)',
            client: '@cword(15, 20)',
            amount: '@float(100000, 10000000, 2, 2)',
            startDate: '@datetime',
            status: () => Mock.Random.pick(['End', 'Process', 'Quality']),
            description: '@cword(20, 50)'
          },
        ],
        total: 56
      })
      return mockResponse(
        20000,
        data,
        'OK'
      )
    }
  },
] as MockMethod[];

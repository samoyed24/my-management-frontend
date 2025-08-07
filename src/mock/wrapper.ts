export default function mockResponse<T = any>(code: number, data: T | null, message: string): APIResponse<T> {
    return {
        code,
        data,
        message
    }
}
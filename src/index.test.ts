import { fnRateLimiter } from './index'

describe('fnRateLimiter', () => {
  jest.useFakeTimers()

  test('call 1 of 5', async () => {
    const cb = jest.fn(() => Promise.resolve())
    const err = jest.fn()
    const fn = fnRateLimiter(cb, 1, 1000)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    expect(cb).toBeCalledTimes(1)
    expect(err).toBeCalledTimes(0)
  })

  test('call 3 of 5', async () => {
    const cb = jest.fn(() => Promise.resolve())
    const err = jest.fn()
    const fn = fnRateLimiter(cb, 3, 1000)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    expect(cb).toBeCalledTimes(3)
    expect(err).toBeCalledTimes(0)
  })

  test('call 3 + 3 + 2', async () => {
    const cb = jest.fn(() => Promise.resolve(1))
    const err = jest.fn()
    const fn = fnRateLimiter(cb, 3, 1000)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    jest.advanceTimersByTime(1000)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    fn().catch(err)
    expect(cb).toBeCalledTimes(6)
    expect(err).toBeCalledTimes(0)
    jest.advanceTimersByTime(1000)

    expect(cb).toBeCalledTimes(8)
    expect(err).toBeCalledTimes(0)
  })

  test('resolve / reject', async () => {
    const cb = jest.fn((n: number) => n === 1 ? Promise.resolve(1) : Promise.reject(n))
    const err = jest.fn()
    const fn = fnRateLimiter(cb, 2, 1000)
    await fn(1).catch(err)
    await fn(2).catch(err)
    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith(1)
    expect(err).toBeCalledTimes(1)
    expect(err).toBeCalledWith(2)
  })
})
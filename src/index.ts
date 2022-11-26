type TPromiseFn<R> = (...args: any[]) => Promise<R>
type TQueueItem<R> = { args: any[], resolve: (result: R) => void, reject: () => void }

export const fnRateLimiter = <F extends TPromiseFn<R>, R>(fn: F, ratePerInterval: number, intervalMs: number): F => {
  let callsLimit = ratePerInterval
  const queue: TQueueItem<R>[] = []

  setInterval(() => {
    const items = queue.splice(0, ratePerInterval)
    callsLimit = ratePerInterval - items.length
    items.forEach(({ args, resolve, reject }) => {
      fn(...args).then(resolve).catch(reject)
    })
  }, intervalMs)

  return ((...args: any[]) => {
    return new Promise((resolve, reject) => {
      if (callsLimit) {
        callsLimit--
        fn(...args).then(resolve).catch(reject)
      } else {
        queue.push({ args, resolve, reject })
      }
    })
  }) as F
}

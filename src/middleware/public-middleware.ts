import { z } from 'zod/v4'
import createHttpError from 'http-errors'
import { Middleware } from 'express-zod-api'

export const publicMiddleware = new Middleware({
  handler: async ({ input, request, logger }) => {
    // Get the IP address from the request
    const ip =
      request?.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
      request.socket?.remoteAddress ||
      request.ip ||
      'unknown'

    logger.debug(`Checking the key and token for IP: ${ip}`)

    //rate limit
    // const rateLimit = new RateLimit({
    //   windowMs: 15 * 60 * 1000, // 15 minutes
    //   max: 100, // limit each IP to 100 requests per windowMs
    // })

    // if (rateLimit.has(ip)) {
    //   throw createHttpError(429, 'Too many requests')
    // }

    return { ip }
  },
})

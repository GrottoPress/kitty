import { env } from '$env/dynamic/private'

export const secretKey = env.SECRET_KEY || ''

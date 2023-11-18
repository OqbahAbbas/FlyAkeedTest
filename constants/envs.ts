/* eslint-disable import/prefer-default-export */
export const HOSTNAME = process.env.NEXT_PUBLIC_HOST
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const STAGE = process.env.NEXT_PUBLIC_STAGE ?? 'dev'
export const isProd = STAGE === 'prod'
export const UNHID_HOSTNAME = process.env.NEXT_PUBLIC_API_URL

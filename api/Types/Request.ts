/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTPMethods from '@api/Types/HTTPMethods'
import { GetServerSidePropsContext, NextPageContext } from 'next'

export interface RequestOptions {
	method: string
	headers: HeadersInit
	body?: string | FormData
}

export interface GetServerSidePropsContextWithSession extends GetServerSidePropsContext {
	session?: any | null
}

export interface GetInitialPropsContextWithSession extends NextPageContext {
	session?: any | null
}

export interface RequestProps<T> {
	/**
	 * Return non-cropped response
	 */
	returnBody?: boolean
	formattedResponse?: boolean
	form?: boolean
	authorization?: boolean
	method?: HTTPMethods
	data?: T
	locale?: string
}

export interface RequestResponse<T> {
	result?: T
	success?: boolean
	error?: number
}

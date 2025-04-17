import request from '~/utils/request'

import { ProductResponse } from '../types/types'

export const product = async (): Promise<ProductResponse | undefined> => {
  try {
    const res = await request.get(
      'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=8322&page=1&urlKey=nha-sach-tiki'
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const getEnglishBooks = async (): Promise<ProductResponse | undefined> => {
  try {
    const res = await request.get(
      'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=320&page=1&urlKey=sach-tieng-anh'
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const getVietnameseBooks = async (): Promise<ProductResponse | undefined> => {
  try {
    const res = await request.get(
      'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=316&page=1&urlKey=sach-truyen-tieng-viet'
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const getStationery = async (): Promise<ProductResponse | undefined> => {
  try {
    const res = await request.get(
      'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=18328&page=1&urlKey=qua-luu-niem'
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const getSouvenirs = async (): Promise<ProductResponse | undefined> => {
  try {
    const res = await request.get(
      'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=18328&page=1&urlKey=qua-luu-niem'
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const supplier = async (id: number): Promise<ProductResponse | undefined> => {
  try {
    const res = await request.get(
      `personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=8322&page=1&seller=${id}&urlKey=nha-sach-tiki`
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}


export const getProducts = async (): Promise<ProductResponse> => {
  return {
    data: [] 
  }
}
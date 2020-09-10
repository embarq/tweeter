import {atom} from 'recoil'

export const atomFactory = (topic = 'global') =>
  (key, value = null) => atom({ key: topic + '_' + key, default: value })

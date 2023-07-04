import { DATAALL } from './types'
import { data } from '../data'

export function getData() {
  return async (dispatch) => {
    try {
      const jsonData = data

      setTimeout(() => {
        dispatch({
          type: DATAALL,
          data: jsonData,
        })
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  }
}

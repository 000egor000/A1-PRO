import { DATAALL } from './types'

const intialState = {
  loading: false,
  error: null,
  data: [],
}

export const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case DATAALL:
      return {
        ...state,
        data: action.data,
      }

    default:
      return state
  }
}

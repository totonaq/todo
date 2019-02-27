import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  data: {
    title: '',
    id: 0,
    isCompleted: false,
  },
  list: [],
};

export default reducer(initState, {

  [types.CHANGE]: (state, action) => {
    return {
      ...state,
      data: action.payload
    };
  },

  [types.CLEAR_DATA]: (state, action) => {
    return {
      ...state,
      data: {...initState.data}
    };
  },

  [types.CREATE]: (state, action) => {
    return {
      ...state,
      list: [...state.list, action.payload],
      data: {...initState.data}
    };
  },

  [types.UPDATE]: (state) => {
    const data = state.data;
    const list = state.list.map(item => {
      if (item.id === data.id) {
        return {...item, ...data}
      } else {
        return item;
      }
    })
    return {
      ...state,
      list,
      data: {...initState.data}
    };
  },

  [types.TOGGLE]: (state, action) => {
    const list = state.list.map(item => {
      if (item.id === action.id) {
        return {...item, isCompleted: !item.isCompleted}
      } else {
        return item;
      }
    })
    return {
      ...state,
      list,
      data: {...state.data}
    };
  },

  [types.GET_LIST]: (state, action) => {
    return {
      ...state,
      list: action.payload,
    };
  },

  [types.DELETE]: (state, action) => {
    const list = state.list.filter(item => {
      return item.id !== action.id;
    })
    return {
      ...state,
      list,
    };
  },

});

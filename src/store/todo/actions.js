export const types = {
  CHANGE: Symbol('CHANGE'),
  CLEAR_DATA: Symbol('CLEAR_DATA'),
  GET_LIST: Symbol('GET_LIST'),
  CREATE: Symbol('CREATE'),
  UPDATE: Symbol('UPDATE'),
  TOGGLE: Symbol('TOGGLE'),
  DELETE: Symbol('DELETE'),
};

export default {
  change: data => dispatch => {
    dispatch({
      type: types.CHANGE,
      payload: data,
    });
  },
  clearData: () => dispatch => {
    dispatch({
      type: types.CLEAR_DATA,
    });
  },
  getList: () => dispatch => {
    const result = localStorage.getItem('list');
    dispatch({
      type: types.GET_LIST,
      payload: JSON.parse(result),
    });
  },
  create: data => async dispatch => {
    dispatch({
      type: types.CREATE,
      payload: data,
    });
  },
  toggleCheck: id => async dispatch => {
    dispatch({
      type: types.TOGGLE,
      id,
    });
  },
  update: () => async dispatch => {
    dispatch({
      type: types.UPDATE,
    });
  },
  delete: id => async dispatch => {
    dispatch({
      type: types.DELETE,
      id,
    });
  },
}
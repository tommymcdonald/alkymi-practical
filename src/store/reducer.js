const initialState = {
  rows: [],
  deletedRows: [],
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ROWS':
      return {
        ...state,
        rows: action.payload,
      }
    case 'SET_DELETED_ROWS':
      return {
        ...state,
        deletedRows: [...state.deletedRows, ...action.payload] // keep deleted rows that exist, and append others
      }
    case 'RESTORE_DELETED_ROWS':
      return {
        ...state,
        rows: {
          fields: [...state.rows.fields],
          results: [...state.rows.results, ...state.deletedRows]
        },
        deletedRows: []
      }
    case 'CLEAR_DELETED_ROWS':
      return {
        ...state,
        deletedRows: [],
      }
    default:
      return {
        ...state,
      }
  }
}

export default rootReducer;
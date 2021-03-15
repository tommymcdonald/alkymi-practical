import rootReducer from './reducer';

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      rows: [],
      deletedRows: [],
    })
  })

  it('should handle SET_ROWS', () => {
    expect(
      rootReducer([], {
        type: "SET_ROWS",
        payload: [
          {
            demo: 'demo',
            test: 'test',
          }
        ]
      })
    ).toEqual({
      rows: [
        {
          demo: 'demo',
          test: 'test',
        }
      ]
    })
  })
  // ... rest of the actions...
})
import { formatDate, isValidDate } from './utils';

// Just some happy-path testing
describe('Utils', () => {
  it('formatDate should format a valid date', () => {
    expect(formatDate(new Date('1995, 11, 17'))).toEqual('November 17, 1995')
  })

  it('isValidDate should check if a date is valid', () => {
    expect(isValidDate('2020-05-13')).toEqual(true); 
  })

  it('isValidDate should fail if a date is invalid', () => {
    expect(isValidDate('11-11-1111')).toEqual(false)
  })
})
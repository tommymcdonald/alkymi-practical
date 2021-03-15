import moment from "moment";

/**
 * 
 * @param {string} date 
 * @returns string - new formatted date (ex: July 4, 1776)
 */
export const formatDate = (date) => {
  let newDate = moment(date).format('MMMM D, YYYY')
  return newDate;
}


/**
 * 
 * @param {string} date - date string 
 * @returns boolean - returns if a date string matches "YYYY-MM-DD"
 */
export const isValidDate = (date) => {
  const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const isValid = date.match(pattern);
  return !!isValid;
}
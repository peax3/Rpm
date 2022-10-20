export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

export const checkIfProductIsNew = (date)=>{
  var productCreated = moment(date);
  //any product older than 7 days isnt considered new
  return moment().diff(productCreated, 'days') <= 7;
}
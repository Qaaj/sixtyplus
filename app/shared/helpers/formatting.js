

export function round(number, decimals = 2){
  let delta = Math.pow(10,decimals);
  return Math.round((number) * delta) / delta;
}

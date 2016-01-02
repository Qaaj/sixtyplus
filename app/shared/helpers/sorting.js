

export function sortByKey(array,key,reverse){

  let srtr = 1;
  if(reverse) srtr = -1;

  array = array.sort((a,b)=> {
    if (a.performanceWithDividends[key] > b.performanceWithDividends[key]) {
      return srtr;
    }
    if (a.performanceWithDividends[key] < b.performanceWithDividends[key]) {
      return -srtr;
    }

    return 0;
  });

  return array;
}

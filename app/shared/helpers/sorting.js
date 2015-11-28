

export function sortByKey(array,key,reverse){

  let srtr = 1;
  if(reverse) srtr = -1;

  array = array.sort((a,b)=> {
    if (a[key] > b[key]) {
      return srtr;
    }
    if (a[key] < b[key]) {
      return -srtr;
    }

    return 0;
  });

  return array;
}

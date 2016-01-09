

export function sortByKey({array,key,reverse,subProp}){

  let srtr = 1;
  if(reverse) srtr = -1;

  array = array.sort((a,b)=> {
    if(subProp){
      a = a[subProp];
      b = b[subProp];
    }
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

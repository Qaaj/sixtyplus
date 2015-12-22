export default (param) => {
  let stacks = new Error().stack.split('\n').map((line,i) =>{
    if(i < 2) return null;
    let end = line.indexOf("(eval");
    let functionName = line.substring(7,end);
    if(functionName.toUpperCase().indexOf("REACT") !== -1 || functionName.toUpperCase().indexOf("WRAPPER") !== -1) return null;
    return functionName;
  })

  stacks.reverse();
  stacks = stacks.filter(a => a);
  console.log('%c ' + param + ' >> %c ' + stacks.join("> "),  'color:green','color: blue');
};

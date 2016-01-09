//let lastTimeout = 0;
//
//export default (fx,timeout) => {
//  clearTimeout(lastTimeout);
//  lastTimeout = setTimeout(()=> {
//    fx();
//  }, timeout);
//}
//
//

class noSpam {

  constructor() {
   this.lastTimeout = 0;
  }

  go(fx,timeout){
    clearTimeout(this.lastTimeout);
    this.lastTimeout = setTimeout(()=> {
      fx();
    }, timeout);
  }
}

export default noSpam;


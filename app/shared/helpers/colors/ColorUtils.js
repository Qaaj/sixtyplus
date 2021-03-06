
export function getUniqueColor(string){

    let energyColor = 2 *string.split("").reduce((prev, curr, i) => {
        prev += curr.charCodeAt(0);
        return prev;
      }, 0);

    let percent = energyColor / 1000.0;

    let hue=((.9-percent) * 100).toString(10);

    let color = ["hsl(",hue,",65%,80%)"].join("");


    return color
}


export function getClassBySector(sector){
    sector = sector.toLowerCase();
    if(sector === 'n/a' || !sector) return 'na';
    sector = sector.replace(" ","");
    sector = sector.replace("-","");
    sector = sector.replace("/","");
    return sector;
}

export function getProfitLossClassname(isProfit){
    if(isProfit) return 'profitColor';
    return 'lossColor';
}

export class DirtyNumber implements DirtyNumberConfiguration {
  public denominator: string = null;
  public separator: string = null;
  public regexNumbers = new RegExp( /[^-0-9.,]+/g);

  constructor(config: DirtyNumberConfiguration = {}) {
    if(config.denominator) {
      this.denominator = config.denominator;
    }
    if(config.separator) {
      this.separator = config.separator;
    }
  }

  public parse(strNumber: string) {
    
    let result: string;
    let parsed = strNumber;

    if (this.denominator) {
      // user defined world goes here
      // 3#14 -> 3.14
      parsed = strNumber.split(this.denominator).join('.');
    }

    if (this.separator) {
      // 1/000/000 -> 1000000
      parsed = strNumber.split(this.separator).join('');
    }

    const simpleParse = parsed.replace(this.regexNumbers, '');
    const hasDefaultDenominator = (simpleParse.match(/\./g) || []).length;
    const hasDefault2Denominator = (simpleParse.match(/\,/g) || []).length;

    if (hasDefaultDenominator === 1) {
      // classic case '3.14'
      result = simpleParse;
    } else if (hasDefaultDenominator > 1) {
      // check for ' 1.000.000' which should be '1000000'
      result = simpleParse.replace(/\./g, '');
    } 
    
    if(hasDefault2Denominator > 0) {
      
      if(hasDefaultDenominator) {
        result = simpleParse.replace(/\,/g, '');
      } else {
        // assuming '.' is replaced by ','
        if (hasDefault2Denominator === 1) {
          // 3,14 -> 3.14
          result = simpleParse.replace(',', '.');
        } else if(hasDefault2Denominator > 1) {
          result = simpleParse.replace(/\,/g, '');
        }
      }
    } 

    if(!hasDefaultDenominator && !hasDefault2Denominator) {
      result = simpleParse;
    }

    return parseFloat(result);
  }
}

export interface DirtyNumberConfiguration {
  denominator?: string;
  separator?: string;
}
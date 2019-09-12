import 'jasmine';
import { DirtyNumber } from './dirty-number';

const piFixed2 = 3.14;
const piNegativeFixed2 = -3.14;
const omitDelimiter = 1331414;
const omitNegativeDelimiter = -1331414;
const omitNegativeDelimiterWithFraction = -1331414.314;
const bigNumFraction = 1000331.414;
const bigNumNegativeFraction = -1000331.414;


describe('simple string to number with default config', () => {
  const dNumber = new DirtyNumber();
  it('should parse stringified decimal value to type number', () => {
    const num1 = dNumber.parse('3.14');
    const num2 = dNumber.parse('3,14');
    const num3 = dNumber.parse('3,140.142');
    const num4 = dNumber.parse('Price: 3.14 USD');
    expect(num1).toEqual(piFixed2);
    expect(num2).toEqual(piFixed2);
    expect(num3).toEqual(3140.142);
    expect(num4).toEqual(piFixed2);
  });
  it('should parse multiple . delimeter', () => {
    const num1 = dNumber.parse('1.331.414');
    const num2 = dNumber.parse('1,331,414');
    expect(num1).toEqual(omitDelimiter);
    expect(num2).toEqual(omitDelimiter);
  });
  it('should parse stringified negative decimal value to type negative number', () => {
    const num1 = dNumber.parse('-3.14');
    const num2 = dNumber.parse('-1.331.414');
    const num3 = dNumber.parse('-1,331,414');
    expect(num1).toEqual(piNegativeFixed2);
    expect(num2).toEqual(omitNegativeDelimiter);
    expect(num3).toEqual(omitNegativeDelimiter);
  });
});

describe('string to number with use custom denominator configuration', () => {
  const dNumber = new DirtyNumber({
    denominator: '#'
  });
  it('should parse "3#14" to type number', () => {
    const num1 = dNumber.parse('3#14');
    const num2 = dNumber.parse('3.14');
    const num3 = dNumber.parse('3,14');
    const num4 = dNumber.parse('-3#14');
    const num5 = dNumber.parse('-1#331#414');
    const num6 = dNumber.parse('1,000,331#414');
    const num7 = dNumber.parse('-1,000,331#414');
    expect(num1).toEqual(piFixed2);
    expect(num2).toEqual(piFixed2);
    expect(num3).toEqual(piFixed2);
    expect(num4).toEqual(piNegativeFixed2);
    expect(num5).toEqual(omitNegativeDelimiter);
    expect(num6).toEqual(bigNumFraction);
    expect(num7).toEqual(bigNumNegativeFraction);
  });
});

describe('string to number with use custom Separator configuration', () => {
  const dNumber = new DirtyNumber({
    separator: '/'
  });
  const testNumber = 314;
  const minusTestNumber = -314;
  it('should parse string to correct type number 314', () => {
    const num1 = dNumber.parse('3/14');
    const num2 = dNumber.parse('-3/14');
    const num3 = dNumber.parse('3.14');
    const num4 = dNumber.parse('3,14');
    const num5 = dNumber.parse('-1/331/414');
    const num6 = dNumber.parse('-1/331/414.314');
    expect(num1).toEqual(testNumber);
    expect(num2).toEqual(minusTestNumber);
    expect(num3).toEqual(piFixed2);
    expect(num4).toEqual(piFixed2);
    expect(num5).toEqual(omitNegativeDelimiter);
    expect(num6).toEqual(omitNegativeDelimiterWithFraction);
  });
});

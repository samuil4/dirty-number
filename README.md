# dirty-number
Extract correct number from dirty string like `-100,000 00 . 00`.

# Usage

Install the library:

```bash
npm install @samuil4/dirty-number
```

Then, in the file where you want to use it:
```typescript
//ES6 / TypeScript

import { DirtyNumber } from '@samuil4/dirty-number';

//...
const numberParser = new DirtyNumber();
numberParser.parse('1,000,000.45') // => 1000000.45 as Number
```

```javascript
//node.js

const DirtyNumber = require('@samuil4/dirty-number/node').default;

//...
const numberParser = new DirtyNumber();
numberParser.parse('1,000,000.45') // => 1000000.45 as Number
```

## Default configuration works as follows

```typescript
// 1. strip any non numerical characters excluding +-.,
// 2. Assuming denominator is . character
// 3. Assimung separator is , character
const numberParser = new DirtyNumber();

numberParse.parse('3.14'); // => 3.14
numberParse.parse('3,14'); // => 314
numberParse.parse('3,140.142'); // => 3140.142
numberParse.parse('3,000,140.142'); // => 3000140.142
numberParse.parse('3 , 000 , 140.142'); // => 3000140.142

// 4. Note: When denominator is matched multiple times, denominator becomes separator
numberParse.parse('3.140.142'); // => 3140142

// 5. Use on any dirty strings, like crawled prices
numberParse.parse('3.14 USD'); // => 3.14
numberParse.parse('Price: 3.14 USD'); // => 3.14
```

## Configurable options

Configure the denominator symbol
```typescript
//ES6 / TypeScript
// Denominator

import { DirtyNumber } from '@samuil4/dirty-number';

//...
const numberParser = new DirtyNumber({
  denominator: '#'
});
numberParser.parse('1,000,000#45') // => 1000000.45 as Number
```

Configure separator symbol
```typescript
//ES6 / TypeScript
// Separator

import { DirtyNumber } from '@samuil4/dirty-number';

//...
const numberParser = new DirtyNumber({
  separator: '#'
});
numberParser.parse('1#000#000.45') // => 1000000.45 as Number
```

## Weird examples
```typescript
//ES6 / TypeScript
// Denominator ,

import { DirtyNumber } from '@samuil4/dirty-number';

const numberParser = new DirtyNumber({
  denominator: ','
});

const num = numberParser.parse('3,14'); // => 3.14
```


## Local Development
1. Fork the project and clone it locally
2. `npm install` to install the library dependencies
3. `npm install -g typescript` to install TypeScript globally
4. `npm test` to run tests
5. `npm run build` to build for production
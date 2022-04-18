const fs = require('fs');
const { excludeZeroTotalOrderValue, processSingleLine } = require('./logic');

describe('we need exclude order records with 0 total order value', () => {
    it('should exclude empty line', () => {
        const line = '';

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(false);
    });

    it('should exclude whitespace only line', () => {
        const line = '           '; // spaces only line

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(false);
    });

    it('should exclude order without any items', () => {
        const line = fs.readFileSync('./test/transaction-samples/13-transaction-without-any-items.json');

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(false);
    });

    it('should exclude order with big DOLLAR discount', () => {
        const line = fs.readFileSync('./test/transaction-samples/14-transaction-with-total-0-001-dollar.json');

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(false);
    });

    it('should include order with at total order value bigger than 0.001 sample #1', () => {
        const line = fs.readFileSync('./test/transaction-samples/01-no-discount.json');

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(true);
    });

    it('should include order with at total order value bigger than 0.001 sample #2', () => {
        const line = fs.readFileSync('./test/transaction-samples/04-dollar-discount.json');

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(true);
    });

    it('should include order with at total order value bigger than 0.001 sample #3', () => {
        const line = fs.readFileSync('./test/transaction-samples/07-percentage-discount.json');

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(true);
    });
    
    it('should include order with at total order value bigger than 0.001 sample #4', () => {
        const line = fs.readFileSync('./test/transaction-samples/10-dollar-and-percentage-discount.json');

        const result = excludeZeroTotalOrderValue(line);

        expect(result).toBe(true);
    });
});

describe('for transactions without any discounts', () => {
  it('should able to process sample #1 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/01-no-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1001,
      orderDateTime: '2019-03-08T12:13:29+0000',
      totalOrderValue: 359.78,
      averageUnitPrice: 59.96333333333333,
      distinctUnitCount: 2,
      totalUnitsCount: 6,
      customerState: 'VICTORIA',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #2 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/02-no-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1002,
      orderDateTime: '2019-03-08T01:45:01+0000',
      totalOrderValue: 102.93,
      averageUnitPrice: 14.704285714285716,
      distinctUnitCount: 3,
      totalUnitsCount: 7,
      customerState: 'NEW SOUTH WALES',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #3 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/03-no-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1003,
      orderDateTime: '2019-03-08T02:57:31+0000',
      totalOrderValue: 680.61,
      averageUnitPrice: 32.410000000000004,
      distinctUnitCount: 4,
      totalUnitsCount: 21,
      customerState: 'VICTORIA',
    };

    expect(result).toEqual(expected);
  });
});

describe('for transactions with DOLLAR discount type', () => {
  it('should able to process sample #1 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/04-dollar-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1004,
      orderDateTime: '2019-03-08T05:34:30+0000',
      totalOrderValue: 344.87,
      averageUnitPrice: 26.52846153846154,
      distinctUnitCount: 6,
      totalUnitsCount: 13,
      customerState: 'VICTORIA',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #2 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/05-dollar-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1005,
      orderDateTime: '2019-03-08T07:03:05+0000',
      totalOrderValue: 292.85,
      averageUnitPrice: 19.523333333333333,
      distinctUnitCount: 5,
      totalUnitsCount: 15,
      customerState: 'WESTERN AUSTRALIA',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #3 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/06-dollar-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1006,
      orderDateTime: '2019-03-08T08:22:51+0000',
      totalOrderValue: 1931.8600000000001,
      averageUnitPrice: 68.995,
      distinctUnitCount: 10,
      totalUnitsCount: 28,
      customerState: 'NEW SOUTH WALES',
    };

    expect(result).toEqual(expected);
  });
});

describe('for transactions with PERCENTAGE discount type', () => {
  it('should able to process sample #1 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/07-percentage-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1007,
      orderDateTime: '2019-03-08T10:00:26+0000',
      totalOrderValue: 465.86,
      averageUnitPrice: 27.40352941176471,
      distinctUnitCount: 9,
      totalUnitsCount: 17,
      customerState: 'NEW SOUTH WALES',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #2 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/08-percentage-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1008,
      orderDateTime: '2019-03-08T11:55:30+0000',
      totalOrderValue: 529.87,
      averageUnitPrice: 44.155833333333334,
      distinctUnitCount: 6,
      totalUnitsCount: 12,
      customerState: 'SOUTH AUSTRALIA',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #3 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/09-percentage-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1009,
      orderDateTime: '2019-03-09T12:21:12+0000',
      totalOrderValue: 49.99,
      averageUnitPrice: 49.99,
      distinctUnitCount: 1,
      totalUnitsCount: 1,
      customerState: 'VICTORIA',
    };

    expect(result).toEqual(expected);
  });
});

describe('for transactions with DOLLAR and PERCENTAGE discount type', () => {
  it('should able to process sample #1 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/10-dollar-and-percentage-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1010,
      orderDateTime: '2019-03-09T12:59:40+0000',
      totalOrderValue: 967.093,
      averageUnitPrice: 46.05204761904762,
      distinctUnitCount: 7,
      totalUnitsCount: 21,
      customerState: 'NEW SOUTH WALES',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #2 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/11-dollar-and-percentage-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1011,
      orderDateTime: '2019-03-09T01:08:06+0000',
      totalOrderValue: 47.386,
      averageUnitPrice: 7.897666666666667,
      distinctUnitCount: 1,
      totalUnitsCount: 6,
      customerState: 'NEW SOUTH WALES',
    };

    expect(result).toEqual(expected);
  });

  it('should able to process sample #3 with valid output', () => {
    const line = fs.readFileSync('./test/transaction-samples/12-dollar-and-percentage-discount.json');

    const result = processSingleLine(line, 'object');

    const expected = {
      orderId: 1012,
      orderDateTime: '2019-03-09T03:28:29+0000',
      totalOrderValue: 436.29282,
      averageUnitPrice: 36.357735,
      distinctUnitCount: 2,
      totalUnitsCount: 12,
      customerState: 'WESTERN AUSTRALIA',
    };

    expect(result).toEqual(expected);
  });
});

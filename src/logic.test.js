'use strict';

const fs = require('fs');
const { processSingleLine } = require('./logic');

describe('for transactions without any discounts', () => {
    it('should able to process sample #1 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/01-no-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1001,
            order_datetime: 'Fri, 08 Mar 2019 12:13:29 +0000',
            total_order_value: 359.78,
            average_unit_price: 59.96333333333333,
            distinct_unit_count: 2,
            total_units_count: 6,
            customer_state: 'VICTORIA',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #2 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/02-no-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1002,
            order_datetime: 'Fri, 08 Mar 2019 13:45:01 +0000',
            total_order_value: 102.93,
            average_unit_price: 14.704285714285716,
            distinct_unit_count: 3,
            total_units_count: 7,
            customer_state: 'NEW SOUTH WALES',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #3 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/03-no-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1003,
            order_datetime: 'Fri, 08 Mar 2019 14:57:31 +0000',
            total_order_value: 680.61,
            average_unit_price: 32.410000000000004,
            distinct_unit_count: 4,
            total_units_count: 21,
            customer_state: 'VICTORIA',
        }

        expect(result).toEqual(expected);
    });
});

describe('for transactions with DOLLAR discount type', () => {
    it('should able to process sample #1 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/04-dollar-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1004,
            order_datetime: 'Fri, 08 Mar 2019 17:34:30 +0000',
            total_order_value: 344.87,
            average_unit_price: 26.52846153846154,
            distinct_unit_count: 6,
            total_units_count: 13,
            customer_state: 'VICTORIA',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #2 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/05-dollar-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1005,
            order_datetime: 'Fri, 08 Mar 2019 19:03:05 +0000',
            total_order_value: 292.85,
            average_unit_price: 19.523333333333333,
            distinct_unit_count: 5,
            total_units_count: 15,
            customer_state: 'WESTERN AUSTRALIA',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #3 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/06-dollar-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1006,
            order_datetime: 'Fri, 08 Mar 2019 20:22:51 +0000',
            total_order_value: 1931.8600000000001,
            average_unit_price: 68.995,
            distinct_unit_count: 10,
            total_units_count: 28,
            customer_state: 'NEW SOUTH WALES',
        }

        expect(result).toEqual(expected);
    });
});

describe('for transactions with PERCENTAGE discount type', () => {
    it('should able to process sample #1 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/07-percentage-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1007,
            order_datetime: 'Fri, 08 Mar 2019 22:00:26 +0000',
            total_order_value: 465.86,
            average_unit_price: 27.40352941176471,
            distinct_unit_count: 9,
            total_units_count: 17,
            customer_state: 'NEW SOUTH WALES',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #2 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/08-percentage-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1008,
            order_datetime: 'Fri, 08 Mar 2019 23:55:30 +0000',
            total_order_value: 529.87,
            average_unit_price: 44.155833333333334,
            distinct_unit_count: 6,
            total_units_count: 12,
            customer_state: 'SOUTH AUSTRALIA',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #3 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/09-percentage-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1009,
            order_datetime: 'Sat, 09 Mar 2019 00:21:12 +0000',
            total_order_value: 49.99,
            average_unit_price: 49.99,
            distinct_unit_count: 1,
            total_units_count: 1,
            customer_state: 'VICTORIA',
        }

        expect(result).toEqual(expected);
    });
});

describe('for transactions with DOLLAR and PERCENTAGE discount type', () => {
    it('should able to process sample #1 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/10-dollar-and-percentage-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1010,
            order_datetime: 'Sat, 09 Mar 2019 00:59:40 +0000',
            total_order_value: 967.093,
            average_unit_price: 46.05204761904762,
            distinct_unit_count: 7,
            total_units_count: 21,
            customer_state: 'NEW SOUTH WALES',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #2 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/11-dollar-and-percentage-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1011,
            order_datetime: 'Sat, 09 Mar 2019 01:08:06 +0000',
            total_order_value: 47.386,
            average_unit_price: 7.897666666666667,
            distinct_unit_count: 1,
            total_units_count: 6,
            customer_state: 'NEW SOUTH WALES',
        }

        expect(result).toEqual(expected);
    });

    it('should able to process sample #3 with valid output', () => {
        const line = fs.readFileSync('./test/transaction-samples/12-dollar-and-percentage-discount.json');

        const result = processSingleLine(line, 'object');

        const expected = {
            order_id: 1012,
            order_datetime: 'Sat, 09 Mar 2019 03:28:29 +0000',
            total_order_value: 436.29282,
            average_unit_price: 36.357735,
            distinct_unit_count: 2,
            total_units_count: 12,
            customer_state: 'WESTERN AUSTRALIA',
        }

        expect(result).toEqual(expected);
    });
});

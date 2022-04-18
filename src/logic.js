const moment = require('moment');

/**
 * Order records with 0 total order value should be excluded from the summary output
 * @param {string} line
 * @returns boolean
 */
function excludeZeroTotalOrderValue(line) {
  if (! line) {
    return false;
  }

  if (Buffer.isBuffer(line)) {
    const lineString = line.toString();
    const trimmed = lineString.trim();
    if (trimmed.length === 0) {
      return false;
    }
  } else {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      return false;
    }
  }

  const trx = JSON.parse(line);

  if (trx.items.length === 0) {
    return false;
  }

  let totalOrderValuePreDiscount = 0;

  trx.items.forEach((item) => {
    totalOrderValuePreDiscount += item.quantity * item.unit_price;
  });

  // Calculate discount
  // Assumption:
  // 1. discount calculation is executed in order (priority #1, then priority #2, etc)
  // 2. discount objects from the JSONL are stored in ascending order
  //    (priority #1, priority #2, etc)
  let totalOrderValue = totalOrderValuePreDiscount;
  trx.discounts.forEach((discount) => {
    if (discount.type === 'DOLLAR') {
      totalOrderValue -= discount.value;
    } else if (discount.type === 'PERCENTAGE') {
      totalOrderValue -= totalOrderValue * (discount.value / 100);
    }
  });

  // Assumption:
  // exclude total order value equal or lower than 0.001
  if (totalOrderValue <= 0.001) {
    return false;
  }

  return true;
}

/**
 * Process single line from JSONL
 * @param {string} line 
 * @returns Object
 */
function processSingleLine(line) {
  const trx = JSON.parse(line);

  const orderId = trx.order_id;
  const orderDateTime = moment(trx.order_date).utc().format('YYYY-MM-DDThh:mm:ssZZ');

  let totalOrderValuePreDiscount = 0;
  let distinctUnitCount = 0;
  let totalUnitsCount = 0;

  trx.items.forEach((item) => {
    totalOrderValuePreDiscount += item.quantity * item.unit_price;
    distinctUnitCount += 1;
    totalUnitsCount += item.quantity;
  });

  // Calculate discount
  // Assumption:
  // 1. discount calculation is executed in order (priority #1, then priority #2, etc)
  // 2. discount objects from the JSONL are stored in ascending order
  //    (priority #1, priority #2, etc)
  let totalOrderValue = totalOrderValuePreDiscount;
  trx.discounts.forEach((discount) => {
    if (discount.type === 'DOLLAR') {
      totalOrderValue -= discount.value;
    } else if (discount.type === 'PERCENTAGE') {
      totalOrderValue -= totalOrderValue * (discount.value / 100);
    }
  });

  const averageUnitPrice = totalOrderValue / totalUnitsCount;

  const customerState = trx.customer.shipping_address.state;

  const result = {
    orderId,
    orderDateTime,
    totalOrderValue,
    averageUnitPrice,
    distinctUnitCount,
    totalUnitsCount,
    customerState,
  };

  return result;
}

/**
 * Wrapper of the processSingleLine function, and return as a CSV line
 * @param {String} line 
 * @returns Buffer
 */
function processSingleLineReturnBuffer(line) {
  // Return output as a CSV line

  const result = processSingleLine(line);
  const values = [];

  Object.values(result).forEach((value) => {
    values.push(value);
  });
  return Buffer.from(`${values.join(',')}\n`);
}

module.exports = {
  excludeZeroTotalOrderValue,
  processSingleLine,
  processSingleLineReturnBuffer,
};

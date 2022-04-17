const moment = require('moment');

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
  processSingleLine,
  processSingleLineReturnBuffer,
};

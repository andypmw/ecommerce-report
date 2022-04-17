const processSingleLine = (line, outputFormat) => {
    // Check for NULL line
    if (! line) return;

    const trx = JSON.parse(line);

    const order_id = trx.order_id;
    const order_datetime = trx.order_date;

    let total_order_value_pre_discount = 0;
    let distinct_unit_count = 0;
    let total_units_count = 0;

    trx.items.forEach(item => {
        total_order_value_pre_discount += item.quantity * item.unit_price;
        distinct_unit_count++;
        total_units_count += item.quantity;
    });

    // Calculate discount
    // Assumption:
    // 1. discount calculation is executed in order (priority #1, then priority #2, etc)
    // 2. discount objects from the JSONL are stored in ascending order (priority #1, priority #2, etc)
    let total_order_value = total_order_value_pre_discount;
    trx.discounts.forEach(discount => {
        if (discount.type === 'DOLLAR') {
            total_order_value -= discount.value;
        } else if (discount.type === 'PERCENTAGE') {
            total_order_value -= total_order_value * discount.value / 100;
        }
    });

    const average_unit_price = total_order_value / total_units_count;
    
    const customer_state = trx.customer.shipping_address.state;

    const result = {
        order_id,
        order_datetime,
        total_order_value,
        average_unit_price,
        distinct_unit_count,
        total_units_count,
        customer_state,
    };

    if (outputFormat && outputFormat == 'object') {
        // To be called from unit-tests
        return result;
    } else {
        // Return output as a CSV line
        let values = [];

        Object.values(result).forEach(value => {
            values.push(value);
        });
        return Buffer.from(values.join(',') + "\n");
    }
}


module.exports = {
    processSingleLine
};

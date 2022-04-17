const fs = require('fs');
const eventStream = require('event-stream');

// get line count for file
let lineCount = 0;

const s = fs
    .createReadStream('./test.jsonl')
    .pipe(eventStream.split())
    .pipe(
        eventStream
            .mapSync(line => {
                // Check for NULL line
                if (! line) return;

                lineCount++;

                const trx = JSON.parse(line);

                const order_id = trx.order_id;
                const order_datetime = trx.order_date;

                const discount = 0.5;
                let total_order_value_pre_discount = 0;
                let distinct_unit_count = 0;
                let total_units_count = 0;

                trx.items.forEach(item => {
                    total_order_value_pre_discount += item.quantity * item.unit_price * discount;
                    distinct_unit_count++;
                    total_units_count += item.quantity;
                });

                // Calculate after discount
                let total_order_value = 0;
                if (trx.discounts.length === 0) {
                    total_order_value = total_order_value_pre_discount;
                } else {
                    trx.discounts.length.forEach(discount => {
                        if (discount.type === 'DOLLAR') {
                            total_order_value -= discount.value;
                        } else /* discount.type === 'PERCENTAGE' */ {
                            total_order_value = total_order_value - total_order_value * discount.value;
                        }
                    });
                }

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
                console.log(result);
            })
            .on('error', err => {
                console.error('Error while reading file: ', err);
            })
            .on('end', () => {
                console.log('Done. Total lines: ' + lineCount);
            })
    );

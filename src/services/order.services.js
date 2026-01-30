import pool from '../database/index.js'
import { throwError } from '../utils/errorhandler.js'

export const createOrder = async ({ id, paymentMethod, items }) => {

  if (!paymentMethod || !items || items.length === 0) {
    throwError("Missing data", 400);
  }

  // ✅ correctly get client
  const client = await pool.connect();

  try {
    // 🔒 start transaction
    await client.query('BEGIN');

    let totalAmount = 0;

    // 🔁 check products + stock
    for (const item of items) {

      const productResult = await client.query(
        'SELECT price, stock FROM products WHERE id = $1',
        [item.productId]
      );

      if (productResult.rows.length === 0) {
        throwError(`Product with ID ${item.productId} not found`, 404);
      }

      const product = productResult.rows[0];

      if (product.stock < item.quantity) {
        throwError(`Insufficient stock for product ID ${item.productId}`, 400);
      }

      totalAmount += product.price * item.quantity;
    }

    // 🧾 insert order
    const orderResult = await client.query(
      `
      INSERT INTO orders (user_id, payment_method, total_amount)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [id || null, paymentMethod, totalAmount]
    );

    const orderId = orderResult.rows[0].id;

    // 🧩 insert order items + update stock
    for (const item of items) {

      const productResult = await client.query(
        'SELECT price FROM products WHERE id = $1',
        [item.productId]
      );

      const price = productResult.rows[0].price;

      await client.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [orderId, item.productId, item.quantity, price]
      );

      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.productId]
      );
    }

    // ✅ commit transaction
    await client.query('COMMIT');

    return orderResult.rows[0];

  } catch (error) {

    // ❌ rollback on failure
    await client.query('ROLLBACK');
    throwError(error.message, error.statusCode || 500);

  } finally {
    // 🔄 release client
    client.release();
  }
};

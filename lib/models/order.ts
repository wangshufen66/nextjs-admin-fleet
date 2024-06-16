// CREATE TABLE orders (
//   order_id SERIAL PRIMARY KEY,
//   customer_id INT NOT NULL,
//   customer_name VARCHAR(100) NOT NULL,
//   order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   ship_time TIMESTAMP,
//   order_amount DECIMAL(10, 2) NOT NULL,
//   payment_method VARCHAR(50),
//   order_status VARCHAR(50),
//   creator VARCHAR(50)
// );
import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
  numeric
} from 'drizzle-orm/pg-core';
import { db } from '../db';
import { ilike, and } from 'drizzle-orm';

const orders = pgTable('orders', {
  orderId: serial('order_id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  customerName: varchar('customer_name', { length: 100 }).notNull(),
  orderTime: timestamp('order_time', { mode: 'date' }).defaultNow().notNull(),
  updateTime: timestamp('update_time', { mode: 'date' }).defaultNow().notNull(),
  shipTime: timestamp('ship_time', { mode: 'date' }),
  orderAmount: numeric('order_amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }),
  orderStatus: varchar('order_status', { length: 50 }),
  creator: varchar('creator', { length: 50 })
});

export type SelectOrder = typeof orders.$inferSelect;

export async function getOrders(
  name: string,
  method: string
): Promise<{
  orders: SelectOrder[];
  count?: number;
}> {
  // Always search the full table, not per page
  if (name || method) {
    console.log('name || method: ', name, method);
    const searchorders = await db
      .select()
      .from(orders)
      .where(
        and(
          ilike(orders.customerName, `%${name}%`),
          ilike(orders.paymentMethod, `%${method}%`)
        )
      );
    return {
      orders: searchorders,
      count: searchorders.length
    };
  }

  const moreOrders = await db.select().from(orders);
  return { orders: moreOrders, count: moreOrders.length };
}

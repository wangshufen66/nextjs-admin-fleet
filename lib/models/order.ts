import moment from 'moment';
import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
  numeric
} from 'drizzle-orm/pg-core';
import { db } from '../db';
import { ilike, and, eq } from 'drizzle-orm';

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
  customerName: string,
  method: string,
  status: string
): Promise<{
  orders: SelectOrder[];
  count?: number;
}> {
  // Always search the full table, not per page
  if (customerName || method || status) {
    console.log('000618 name || method: ', customerName, method, status);
    const searchorders = await db
      .select()
      .from(orders)
      .where(and(ilike(orders.customerName, `%${customerName}%`)));
    return {
      orders: handleTime(searchorders),
      count: searchorders.length
    };
  }

  const moreOrders = await db.select().from(orders);
  return { orders: handleTime(moreOrders), count: moreOrders.length };
}

function handleTime(data: Array<any>) {
  data.forEach((item) => {
    item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss');
    item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss');
    item.shipTime = moment(item.shipTime).format('YYYY-MM-DD HH:mm:ss');
  });
  return data;
}

export async function deleteUserById(id: number) {
  await db.delete(orders).where(eq(orders.orderId, id));
}

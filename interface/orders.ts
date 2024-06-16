import { http } from '@/lib/request';
import { IQueryList, IResponse } from '@/interface/index.type';

export const getOrderList = (params: IQueryList) => {
  console.log('params: ', params);
  return http.get<IResponse>(`/api/orders`, { params });
};

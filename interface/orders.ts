import { http } from '@/lib/request';
import { IQueryList, IResponse } from '@/interface/index.type';

export const getOrderList = (params: IQueryList) => {
  return http.get<IResponse>(`/api/orders`, { params });
};

/**
 * 删除信息
 * @param data
 * @returns
 */
export const deleteInfo = (params: IQueryList) => {
  return http.delete<IResponse>(`/api/orders`, { params });
};

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

/**
 * 添加信息
 * @param data
 * @returns
 */
export const addInfo = (data: IQueryList) => {
  return http.post<IResponse>(`/api/orders`, data);
};

/**
 * 更新信息
 * @param data
 * @returns
 */
export const updateInfo = (data: IQueryList) => {
  return http.put<IResponse>(`/api/orders`, data);
};

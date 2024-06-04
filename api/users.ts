import { http } from 'app/lib/request';
import { IQueryList, IResponse } from '@/api/index.type';

export const remoteList = (params: IQueryList) => {
  console.log('params: ', params);
  return http.get<IResponse>(`/api/users`, { params });
};

/**
 * 添加信息
 * @param data
 * @returns
 */
export const addInfo = (data: IQueryList) => {
  return http.post<IResponse>(`/api/users`, data);
};

/**
 * 更新信息
 * @param data
 * @returns
 */
export const updateInfo = (data: IQueryList) => {
  return http.put<IResponse>(`/api/users`, data);
};

/**
 * 删除信息
 * @param data
 * @returns
 */
export const deleteInfo = (params: IQueryList) => {
  return http.delete<IResponse>(`/api/users`, { params });
};

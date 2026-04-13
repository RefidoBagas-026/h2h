import { MasterHS } from "../../../views/Dashboard";
import { dlSupportApi } from "../../api.instances";

export interface MasterHS {
    HSNo: string;
    HSRemark: string;
}
export interface ApiResponse<T> {
  apiVersion: string;
  data: T;
  info: any;
  message: string;
  statusCode: number;
}

export const masterHsService = {
    getHs: (
      page?: number,
      size?: number,
      keyword?: string | null,
      filter?: string | null,
      order?: string | null
    ) =>
    dlSupportApi.get<ApiResponse<MasterHS[]>>(
        `hs?page=${page}&size=${size}&keyword=${keyword ?? ""}&filter=${filter ?? ""}&order=${order ?? ""}`
    ),
    postHS: (data: MasterHS) =>
      dlSupportApi.post<ApiResponse<any>>("hs", data),

    putHS : (id: number, data: MasterHS) =>
      dlSupportApi.put<ApiResponse<any>>(`hs/${id}`, data),
    
    deleteHS: (id: number) =>
      dlSupportApi.delete<ApiResponse<any>>(`hs/${id}`),

    getByIdHS: (id: number) =>
      dlSupportApi.get<ApiResponse<MasterHS>>(`hs/${id}`),
};

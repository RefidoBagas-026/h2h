import { ceisaApi } from "../../api.instances";
import type { TPB } from "../TPB/BC23/AccessBC23";

export interface Ceisa {
  id: number;
  ajuNo: string;
}
export interface ApiResponse<T> {
  apiVersion: string;
  data: T;
  info: any;
  message: string;
  statusCode: number;
}

export const ceisaService = {
    getLoginCeisa: () =>
       ceisaApi.get<any>("/login"),

    getRefreshToken: () =>
        ceisaApi.get<number>("/refresh-token"),

    getRate: (kode: string) =>
        ceisaApi.get<ApiResponse<any[]>>(`/getRate?kode=${kode}`),

    getLartas: (id: number) =>
        ceisaApi.get<ApiResponse<any>>(`/getLartas/${id}`),

    getManifes: (kodeKantor: string, nomorHostBl: string, tglManifes: string, namaImport: string) =>
        ceisaApi.get<ApiResponse<any>>(`/getManifes?kodeKantor=${kodeKantor}&noHostBl=${nomorHostBl}&tglHostBl=${tglManifes}&nama=${namaImport}`),

    getPelabuhan: (kode: string) =>
        ceisaApi.get<ApiResponse<any[]>>(`/getPelabuhan/${kode}`),

    getTarifHS: (kode: string) =>
        ceisaApi.get<ApiResponse<any[]>>(`/getTarifHS/${kode}`),

    getBCPEB: (id: number) =>
        ceisaApi.get<ApiResponse<any>>(`/GetBC-PEB/${id}`),

    getBCTPB: (id: number) =>
        ceisaApi.get<ApiResponse<any>>(`/GetBC-TPB/${id}`),

    postingCeisa: (data: any) =>
        ceisaApi.post<ApiResponse<any>>(`/PostingCeisa`, data),

    printExcelTPB: (nomorAju: string) =>
        ceisaApi.getEXCEL(`/tpb/download?noAju=${nomorAju}`).then((response : any) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${nomorAju}.xlsx`);
            document.body.appendChild(link);
            link.click();
        }),

    syncNoDaftar: (id: number) =>
        ceisaApi.post<ApiResponse<any>>(`/SyncNoDaftar?id=${id}`)
};

import service from "../../instance";
import { CompanyRequestPayload, CompanyResponsePayload } from "./types";

export const createCompany = async(payload: CompanyRequestPayload) => 
    await service.post("api/company", payload)

export const getAllCompany = async() => 
    await service.get("api/company")

export const updateCompany = async(payload: CompanyResponsePayload) =>
    await service.put(`api/company/${payload._id}`, payload)

export const deleteCompany = async(id: string) =>
    await service.delete(`api/company/${id}`)



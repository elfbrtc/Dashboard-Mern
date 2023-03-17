import service from "../instance";
import { CompanyRequestPayload, CompanyResponsePayload } from "./types";

export const createCompany = async(payload: CompanyRequestPayload) => 
    await service.post("api/companies", payload)

export const getAllCompany = async() => 
    await service.get("api/companies")

export const updateCompany = async(payload: CompanyRequestPayload) =>
    await service.put("api/companies", payload)

export const deleteCompany = async(id: string) =>
    await service.delete(`api/companies/${id}`)



import service from "../../instance";
import { ProductRequestPayload, ProductResponseType } from "./types";

export const getAllProducts = async () => 
    await service.get("api/product");

export const createProduct = async (payload: ProductRequestPayload) =>
    await service.post("api/product", payload);

export const updateProduct = async (payload: ProductResponseType) =>
    await service.put(`api/product/${payload._id}`, payload);

export const deleteProduct = async (id: string) =>
    await service.delete(`api/product/${id}`);




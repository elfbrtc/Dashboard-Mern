export type ProductRequestPayload = {
    productName: string,
    productCategory: string,
    productAmount: number,
    productAmountUnit: string,
    prouctCompany: string
}

export type ProductResponseType = {
    productName: string,
    productCategory: string,
    productAmount: number,
    productAmountUnit: string,
    prouctCompany: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}


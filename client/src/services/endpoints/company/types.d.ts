export type CompanyRequestPayload = {
    companyName: string,
    companyLegalNumber: string,
    companyCountry: string,
    companyWebsite: string
}

export type CompanyResponsePayload = {
    companyName: string,
    companyLegalNumber: string,
    companyCountry: string,
    companyWebsite: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}



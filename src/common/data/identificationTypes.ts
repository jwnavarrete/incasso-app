export const identificationOptions = [
    // Persona Natural
    { value: "sedula", label: "Cédula" },
    { value: "passport", label: "Pasaporte" },
    { value: "residence_permit", label: "Residencia" },
    { value: "foreign_id", label: "Extranjería" },

    // Empresa
    { value: "kvk_number", label: "Registro KVK" },
    { value: "tax_id", label: "NIF" },
    { value: "business_registry", label: "Mercantil" },
];

export const personTypeOptions = [
    { value: "individual", label: "Persona Natural" },
    { value: "company", label: "Empresa" },
];

export const filterIdentificationOptionsByPersonType = (personType: string) => {
    if (personType === "individual") {
        return identificationOptions.filter((item) =>
            ["sedula", "passport", "residence_permit", "foreign_id"].includes(item.value)
        );
    } else if (personType === "company") {
        return identificationOptions.filter((item) =>
            ["kvk_number", "tax_id", "business_registry"].includes(item.value)
        );
    }
    return [];
};

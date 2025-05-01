export const typeOfIdentificationList = [
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

export const tipoPersona = [
  { value: "individual", label: "Persona Natural" },
  { value: "company", label: "company" },
];

export const filterTypeOfIdentification = (tipoPersona: string) => {
  if (tipoPersona === "individual") {
    return typeOfIdentificationList.filter((item) =>
      ["sedula", "passport", "residence_permit", "foreign_id"].includes(
        item.value
      )
    );
  } else if (tipoPersona === "company") {
    return typeOfIdentificationList.filter((item) =>
      ["kvk_number", "tax_id", "business_registry"].includes(item.value)
    );
  }
  return [];
};

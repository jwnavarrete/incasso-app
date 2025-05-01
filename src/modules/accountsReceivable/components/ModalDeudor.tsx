import React, { useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  filterTypeOfIdentification,
  tipoPersona,
} from "@/common/utils/catalogo/TypeOfIdentificationList";
import api from "@/common/lib/axiosInstance";
import { ErrorHandler } from "@/common/lib/errors";

interface IDebtor {
  id?: string;
  identificationType: string;
  identification: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  personType: string;
}

interface ModalDeudorProps {
  open: boolean;
  id?: string;
  onPersonaSelect: (persona: IDebtor | null) => void;
  onClose: () => void;
}

const ModalDeudor: React.FC<ModalDeudorProps> = ({
  open,
  id,
  onPersonaSelect,
  onClose,
}) => {
  // Initialize the form with default values
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IDebtor>({
    defaultValues: {
      id: "",
      identificationType: "",
      identification: "",
      fullname: "",
      email: "",
      phone: "",
      address: "",
      personType: "",
    },
  });

  const personType = watch("personType");

  useEffect(() => {
    // Reset the form when the modal is closed
    if (!open) {
      reset();
    }

    // Fetch the debtor data if the modal is open and an ID is provided
    if (id) {
      getDebtorById(id)
        .then((debtor) => {
          console.log("Debtor fetched successfully:", debtor);
          setValue("id", debtor.id);
          setValue("personType", debtor.personType);
          setValue("identificationType", debtor.identificationType);
          setValue("identification", debtor.identification);
          setValue("fullname", debtor.fullname);
          setValue("email", debtor.email);
          setValue("phone", debtor.phone);
          setValue("address", debtor.address);
        })
        .catch((error) => {
          console.error("Error fetching debtor:", error);
        });
    }
  }, [open, id, reset]);

  const getDebtorById = async (id: string) => {
    try {
      const response = await api.get(`/debtors/${id}`);
      console.log("Debtor fetched successfully:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching debtor:", error);
      throw error;
    }
  };

  const handleCreateDebtor = async (debtor: IDebtor) => {
    try {
      const response = await api.post("/debtors", debtor);
      console.log("Debtor created successfully:", response.data);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      //   throw error;
    }
  };

  const handleUpdateDebtor = async (debtor: IDebtor) => {
    try {
      const response = await api.patch(`/debtors/${debtor.id}`, debtor);
      console.log("Debtor updated successfully:", response.data);
      return response.data;
    } catch (error) {
      //   throw error;
      ErrorHandler.handle(error);
    }
  };

  const onSubmit = async (data: IDebtor) => {
    try {
      if (!id) {
        // Create new debtor
        await handleCreateDebtor(data)
          .then((newDebtor) => {
            console.log("New debtor created successfully:", newDebtor);
            onPersonaSelect(newDebtor); // Pass the new persona to the parent
          })
          .catch((error) => {
            ErrorHandler.showError(error, true);
          });
      } else {
        // Update existing debtor
        await handleUpdateDebtor(data)
          .then((updatedDebtor) => {
            console.log("Debtor updated successfully:", updatedDebtor);
            onPersonaSelect(updatedDebtor); // Pass the new persona to the parent
          })
          .catch((error) => {
            ErrorHandler.showError(error, true);
          });
      }
    } catch (error) {
      ErrorHandler.showError(error, true);
    }

    reset(); // Reset the form
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Nuevo Deudor</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={0.5}>
            <Grid item xs={3}>
              <Controller
                name="personType"
                control={control}
                rules={{ required: "El tipo de persona es obligatorio" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Tipo"
                    size="small"
                    fullWidth
                    error={!!errors.personType}
                    helperText={errors.personType?.message}
                  >
                    {tipoPersona.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                name="identificationType"
                control={control}
                rules={{ required: "El tipo de identificación es obligatorio" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Tipo Identificación"
                    size="small"
                    fullWidth
                    error={!!errors.identificationType}
                    helperText={errors.identificationType?.message}
                  >
                    {filterTypeOfIdentification(personType).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="identification"
                control={control}
                rules={{ required: "La identificación es obligatoria" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Identificación"
                    size="small"
                    fullWidth
                    error={!!errors.identification}
                    helperText={errors.identification?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: "El nombre completo es obligatorio" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre Completo"
                    size="small"
                    fullWidth
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El email no es válido",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    size="small"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "El teléfono es obligatorio" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Teléfono"
                    size="small"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={9}>
              <Controller
                name="address"
                control={control}
                rules={{ required: "La dirección es obligatoria" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dirección"
                    size="small"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                fullWidth
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeudor;

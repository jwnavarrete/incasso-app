import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { InvitationCompany } from "@/common/types/invite-company/invite";
import { CountryList } from "@/common/data/countryList";
import api from "@/lib/axiosInstance";
// import LoadingUI from "@/components/ui/LoadingUI";

interface ModalNewProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  invite?: InvitationCompany;
}

const initialFormValues = {
  invitedCompany: "",
  invitedEmail: "",
  country: "",
};

const initialErrors = {
  invitedCompany: "",
  invitedEmail: "",
  country: "",
};

const ModalNew: React.FC<ModalNewProps> = ({ open, onClose, onSave }) => {
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [errors, setErrors] = React.useState(initialErrors);
  const [loading, setLoading] = React.useState(false);


  const handleClean = () => {
    setFormValues(initialFormValues);
    setErrors(initialErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...initialErrors };

    if (!formValues.invitedCompany) {
      newErrors.invitedCompany = "Campo requerido";
      valid = false;
    }
    if (!formValues.country) {
      newErrors.country = "Campo requerido";
      valid = false;
    }
    if (!formValues.invitedEmail) {
      newErrors.invitedEmail = "Campo requerido";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.invitedEmail)) {
      newErrors.invitedEmail = "Correo electrónico no válido";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!handleValidation()) return;

    setLoading(true);

    api.post("/company/invite", formValues)
      .then((response) => {
        console.log("Invitación enviada:", response.data);
        handleClean();
        onSave();
      })
      .catch((error) => {
        console.error("Error al invitar empresa:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Invitar Empresa</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={8}>
              <TextField
                label="Nombre Empresa"
                variant="outlined"
                fullWidth
                size="small"
                name="invitedCompany"
                onChange={handleInputChange}
                value={formValues.invitedCompany}
                error={!!errors.invitedCompany}
                helperText={errors.invitedCompany}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                label="País Empresa"
                variant="outlined"
                size="small"
                fullWidth
                name="country"
                onChange={handleInputChange}
                value={formValues.country}
                error={!!errors.country}
                helperText={errors.country}
              >
                {CountryList.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            <Grid item xs={12}>
              <TextField
                label="Email Empresa"
                variant="outlined"
                fullWidth
                size="small"
                name="invitedEmail"
                onChange={handleInputChange}
                value={formValues.invitedEmail}
                error={!!errors.invitedEmail}
                helperText={errors.invitedEmail}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" size="small">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          size="small"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Invitar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNew;

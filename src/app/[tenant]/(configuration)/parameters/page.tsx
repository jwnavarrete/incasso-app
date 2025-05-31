"use client";

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
  Alert
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { useEffect, useState } from "react";
import DynamicOutlinedInput from "@/components/ui/OutlinedInput";
import api from "@/lib/axiosInstance";



type GlobalParams = {
  porcCobranza: number;
  porcAbb: number;
  diasPlazoEmpresaAanmaning: number;
  diasPlazoConsumidorAanmaning: number;
  diasPlazoEmpresaSommatie: number;
  diasPlazoConsumidorSommatie: number;
  precioEmpresaPequena: number;
  contribucionEmpresaPequenaPfc: number;
  precioEmpresaGrande: number;
  contribucionEmpresaGrandePfc: number;
  multaAanmaningEmpresa: number;
  multaAanmaningNatural: number;
  multaSommatieEmpresa: number;
  multaSommatieNatural: number;
  limiteDiasReaccionEmpresa: number;
  multaNoReaccionEmpresa: number;
  multaNoReaccionNatural: number;
  multaAcuerdoPagoEmpresa: number;
  multaAcuerdoPagoNatural: number;
};

const ParametrosComponent: React.FC = () => {
  const { control, register, setValue, handleSubmit, formState: { errors }, } = useForm<GlobalParams>();
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const cargarDatos = (data: Partial<GlobalParams>) => {
    if (data) {
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof GlobalParams];
        setValue(key as keyof GlobalParams, value ?? 0);
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const response = await api.get(`/parameters/67f55fa0-8598-4ec9-9d5e-2fe980d82e6d`);
        console.log("response:", response)
        cargarDatos(response.data);

      } catch (error) {
        console.error("Error loading parameters", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParams();
  }, [setValue]);


  const onSubmit = async (data: GlobalParams) => {
    try {
      // Convertir todos los valores a número
      const parsedData: GlobalParams = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, Number(value)])
      ) as GlobalParams;

      const response = await api.patch(
        `/parameters/67f55fa0-8598-4ec9-9d5e-2fe980d82e6d`,
        parsedData
      );
      cargarDatos(response.data);
      setOpenSnackbar(true)

    } catch (error) {
      console.error("Error saving data:", error);
    }
  };





  if (loading) return <p>Loading...</p>;
  // if ("1"==="1") return <p>No data available</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {/* Prices and Contributions */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>💰 Prices & Contributions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="precioEmpresaPequena"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Small Company Price"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.precioEmpresaPequena}
                          helperText={errors.precioEmpresaPequena?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="contribucionEmpresaPequenaPfc"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Small Company PFC"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.contribucionEmpresaPequenaPfc}
                          helperText={errors.contribucionEmpresaPequenaPfc?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="precioEmpresaGrande"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Large Company Price"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.precioEmpresaGrande}
                          helperText={errors.precioEmpresaGrande?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="contribucionEmpresaGrandePfc"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Large Company PFC"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.contribucionEmpresaGrandePfc}
                          helperText={errors.contribucionEmpresaGrandePfc?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>


          {/* Deadlines */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>⏳ Deadlines</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="diasPlazoEmpresaAanmaning"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 365) return "Cannot be greater than 365";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company (Aanmaning)"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">days</InputAdornment>,
                          }}
                          error={!!errors.diasPlazoEmpresaAanmaning}
                          helperText={errors.diasPlazoEmpresaAanmaning?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="diasPlazoConsumidorAanmaning"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 365) return "Cannot be greater than 365";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Consumer (Aanmaning)"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">days</InputAdornment>,
                          }}
                          error={!!errors.diasPlazoConsumidorAanmaning}
                          helperText={errors.diasPlazoConsumidorAanmaning?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="diasPlazoEmpresaSommatie"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 365) return "Cannot be greater than 365";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company (Sommatie)"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">days</InputAdornment>,
                          }}
                          error={!!errors.diasPlazoEmpresaSommatie}
                          helperText={errors.diasPlazoEmpresaSommatie?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="diasPlazoConsumidorSommatie"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 365) return "Cannot be greater than 365";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Consumer (Sommatie)"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">days</InputAdornment>,
                          }}
                          error={!!errors.diasPlazoConsumidorSommatie}
                          helperText={errors.diasPlazoConsumidorSommatie?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Percentages */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>📊 Percentages</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      name="porcCobranza"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 100) return "Cannot be greater than 100";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="% Collection"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                          }}
                          error={!!errors.porcCobranza}
                          helperText={errors.porcCobranza?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="porcAbb"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 100) return "Cannot be greater than 100";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="% ABB"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                          }}
                          error={!!errors.porcAbb}
                          helperText={errors.porcAbb?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Reaction Limit */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>⏱ Reaction Time Limit</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      name="limiteDiasReaccionEmpresa"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value => {
                          const number = Number(value);
                          if (isNaN(number)) return "Must be a valid number";
                          if (number < 0) return "Cannot be less than 0";
                          if (number > 365) return "Cannot be greater than 365";
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Reaction Days"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">days</InputAdornment>,
                          }}
                          error={!!errors.limiteDiasReaccionEmpresa}
                          helperText={errors.limiteDiasReaccionEmpresa?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>

            </Card>
          </Grid>

          {/* Fines - Aanmaning */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>📈 Fines - Aanmaning</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaAanmaningEmpresa"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaAanmaningEmpresa}
                          helperText={errors.multaAanmaningEmpresa?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaAanmaningNatural"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Individual Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaAanmaningNatural}
                          helperText={errors.multaAanmaningNatural?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Fines - Sommatie */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>📈 Fines - Sommatie</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaSommatieEmpresa"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaSommatieEmpresa}
                          helperText={errors.multaSommatieEmpresa?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaSommatieNatural"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Individual Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaSommatieNatural}
                          helperText={errors.multaSommatieNatural?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>



          {/* Fines for No Reaction */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>📉 Fines for No Reaction</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaNoReaccionEmpresa"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaNoReaccionEmpresa}
                          helperText={errors.multaNoReaccionEmpresa?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaNoReaccionNatural"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Individual Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaNoReaccionNatural}
                          helperText={errors.multaNoReaccionNatural?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>

            </Card>
          </Grid>

          {/* Fines - Payment Agreement */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>📑 Fines - Payment Agreement</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaAcuerdoPagoEmpresa"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaAcuerdoPagoEmpresa}
                          helperText={errors.multaAcuerdoPagoEmpresa?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="multaAcuerdoPagoNatural"
                      control={control}
                      rules={{
                        required: "This field is required",
                        validate: value =>
                          !isNaN(Number(value)) || "Must be a valid number"
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Individual Fine"
                          size="small"
                          fullWidth
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          error={!!errors.multaAcuerdoPagoNatural}
                          helperText={errors.multaAcuerdoPagoNatural?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Save Button */}

        <Box mt={4} textAlign="right">
          <Button type="submit" variant="contained" color="primary" size="large">
            Save
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Parameters saved successfully.
        </Alert>
      </Snackbar>
    </form>


  );
};

export default ParametrosComponent;

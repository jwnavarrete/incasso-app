"use client";
import { IContribution, IPartialCompanyContribution } from "@/common/types/debtor/contribution";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { ErrorHandler } from "@/lib/errors";
import { ApiGetAllContributions, ApiSaveContributions } from "./functions";
import { IQueryParams } from "@/common/types/debtor/contribution";
import { Button, TextField, Typography, Grid, MenuItem, Container, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { TfiReload } from "react-icons/tfi";
import DynamicTableUI from "@/components/ui/DynamicTableUI";
import { useForm, Controller } from "react-hook-form";

const CollectionContributionComponent: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IContribution[]>([]);
    const [query, setQuery] = useState<IQueryParams>({ status: "pending" });
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm<IPartialCompanyContribution>({
        defaultValues: {
            companyName: "",
            companyContact: "",
            companyEmail: "",
            companyPhone: "",
            extraInfo: "",
        },
    });


    // Modal state
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    // Nuevo estado para filtro avanzado
    const [filtro, setFiltro] = useState<{ contributionId?: string; fullname?: string }>({});

    const statusOptions = [
        { value: "pending", description: "Pending" },
        { value: "verified", description: "Verified" },
        { value: "rejected", description: "Rejected" },
        { value: "contributed", description: "Contributed" },
        { value: "accepted", description: "Accepted" },
    ];

    useEffect(() => {
        if (!filtro.contributionId) {
            const searchParams = new URLSearchParams(window.location.search);
            const _debtorId = searchParams.get("id");

            if (_debtorId) {
                setFiltro({ ...filtro, contributionId: _debtorId });
            }
        }

        getAllContributions();
    }, [query, filtro.contributionId]);


    useEffect(() => {
        if (filtro.fullname) {
            const filteredData = data.filter((item) => item.debtor.fullname === filtro.fullname);
            setData(filteredData);
        } else {
            getAllContributions();
        }
    }, [filtro.fullname]);

    const getAllContributions = async () => {
        try {
            setLoading(true);
            const response = await ApiGetAllContributions(query);
            if (response) {
                if (filtro.contributionId) {
                    const filteredData = response.filter((item) => item.id === filtro.contributionId);
                    setData(filteredData);
                } else {
                    setData(response);
                }
            }
        } catch (error) {
            ErrorHandler.handle(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (row: IContribution) => {
        setSelectedId(row.id);
        reset();
        setValue("companyName", row?.companyName || "");
        setValue("companyContact", row?.companyContact || "");
        setValue("companyEmail", row?.companyEmail || "");
        setValue("companyPhone", row?.companyPhone || "");
        setValue("extraInfo", row?.extraInfo || "");

        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedId(null);
    };

    const onSubmit = async (data: IPartialCompanyContribution) => {
        try {
            if (!selectedId) {
                throw new Error("No contribution selected");
            }
            const contribution = await ApiSaveContributions(selectedId as string, data);

            if (!contribution) {
                throw new Error("Error saving contribution");
            }

            await getAllContributions();

            handleCloseModal();
        } catch (error) {
            ErrorHandler.showError(error, true);
        }
    }
    // const onSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Aquí puedes hacer la petición para contribuir con más información
    //     // Por ejemplo: await ApiContributeMoreInfo(selectedRow.id, formValues)
    //     handleCloseModal();
    // };

    const actions = (row: any) => {
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            handleOpenModal(row.row);
        };

        return (
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ textTransform: 'none' }}
                onClick={handleClick}
            >
                Contribute Information
            </Button>
        );
    };

    return (
        <Container component="main" maxWidth={false}>
            <Grid container spacing={2} mt={0.5} gap={2} >
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" align="inherit" gutterBottom>
                        Contribuciones colectivas
                    </Typography>
                </Grid>

                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={9} md={6} lg={3}>
                        <TextField
                            select
                            fullWidth
                            label="Filtro de estado"
                            variant="outlined"
                            size="small"
                            value={query.status || ""}
                            onChange={(e) => {
                                try {
                                    setQuery((prev) => ({
                                        ...prev,
                                        status: e.target.value as IQueryParams["status"],
                                    }));
                                } catch (error) {
                                    ErrorHandler.showError(error, true);
                                }
                            }}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.description}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={3} md={6} lg={3}>
                        <TextField
                            fullWidth
                            label="Filter by Name"
                            variant="outlined"
                            size="small"
                            value={filtro.fullname || ""}
                            onChange={(e) => {
                                try {
                                    setFiltro((prev) => ({
                                        ...prev,
                                        fullname: e.target.value,
                                    }));
                                } catch (error) {
                                    ErrorHandler.showError(error, true);
                                }
                            }}
                        />

                    </Grid>

                    <Grid item xs={3} md={6} lg={3}>
                        <Button
                            variant="text"
                            color="primary"
                            size="small"
                            onClick={getAllContributions}
                            startIcon={<TfiReload />}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    {loading ? (
                        <Typography variant="body2" align="inherit" gutterBottom>
                            Loading...
                        </Typography>
                    ) : (
                        <DynamicTableUI columns={columns} data={data} actions={actions} />
                    )}
                </Grid>
            </Grid>

            {/* Modal para contribuir información */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>Contribuir información</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 2 }}>
                        Tu contribución es invaluable. Al compartir información, ayudas a fortalecer la transparencia y colaboración en nuestra comunidad. ¡Gracias por ser parte del cambio!
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                name="companyName"
                                control={control}
                                rules={{ required: "Company name is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Company Name"
                                        size="small"
                                        fullWidth
                                        error={!!errors.companyName}
                                        helperText={errors.companyName?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="companyContact"
                                control={control}
                                // rules={{ required: "Company contact is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Company Contact"
                                        size="small"
                                        fullWidth
                                        error={!!errors.companyContact}
                                        helperText={errors.companyContact?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="companyEmail"
                                control={control}
                                // rules={{ required: "Company email is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Company Email"
                                        size="small"
                                        fullWidth
                                        error={!!errors.companyEmail}
                                        helperText={errors.companyEmail?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="companyPhone"
                                control={control}
                                // rules={{ required: "Company phone is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Company Phone"
                                        size="small"
                                        fullWidth
                                        error={!!errors.companyPhone}
                                        helperText={errors.companyPhone?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="extraInfo"
                                control={control}
                                // rules={{ required: "Extra information is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Extra Information"
                                        size="small"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={!!errors.extraInfo}
                                        helperText={errors.extraInfo?.message}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                        Contribuir
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CollectionContributionComponent;
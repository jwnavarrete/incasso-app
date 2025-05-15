"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { columns } from "./Columns";
import CustomizedDataGridUI from "@/components/ui/CustomizedDataGridUI";
import api from "@/lib/axiosInstance";
import { useEffect } from "react";
import ModalNew from "./ModalNew";
import { AccountsReceivable, ICollectionParameters } from "./types";
import { TfiReload } from "react-icons/tfi";
import ModalImport from "./ModalImport";

const InvoiceComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [invoicesData, setInvoicesData] = useState<AccountsReceivable[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<AccountsReceivable>();
  const [tenantParameter, setTenantParameter] =
    useState<ICollectionParameters>();

  const PARAMETER_ID = process.env.NEXT_PUBLIC_PARAMETER_ID || "";

  useEffect(() => {
    handleGetAllInvoices();
    getTenantParameter();
  }, []);

  const handleOpenImportModal = () => {
    setOpenImport(true);
  };
  const handleCloseImportModal = () => {
    setOpenImport(false);
  };

  const getTenantParameter = () => {
    api
      .get(`/parameters/${PARAMETER_ID}`)
      .then((response) => {
        const _tenantParameter: ICollectionParameters = response.data;
        console.log(`_tenantParameter`, _tenantParameter);
        setTenantParameter(_tenantParameter);
        // console.log("Tenant parameter fetched successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching tenant parameter:", error);
      });
  };

  const handleGetAllInvoices = () => {
    console.log("Fetching invoices...");
    api
      .get("/accounts-receivable")
      .then((response) => {
        console.log("Invoices fetched successfully:", response.data);
        setInvoicesData(response.data.invoices);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  const handleOpenNewInvoiceModal = () => {
    setCurrentInvoice(undefined);    
    setOpen(true);
  };

  const handleCloseModal = () => {
    handleGetAllInvoices();
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <h2 style={{ display: "inline", marginRight: "10px" }}>
            Cuentas por Cobrar
          </h2>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={handleGetAllInvoices}
            startIcon={<TfiReload />}
          ></Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleOpenImportModal}
          >
            Importar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpenNewInvoiceModal}
            sx={{ ml: 1 }}
          >
            Nueva Cuenta por Cobrar
          </Button>
        </Box>
      </Box>
      {/* {JSON.stringify(PARAMETER_ID)} */}
      {/* Modal */}
      <ModalImport
        open={openImport}
        onClose={handleCloseImportModal}
        onSave={handleCloseImportModal}
      />

      <ModalNew
        open={open}
        onClose={handleCloseModal}
        onSave={handleCloseModal}
        invoice={currentInvoice} // Pass the current invoice if available
        tenantParameter={tenantParameter} // Pass the tenant parameter
      />

      <Grid sx={{ mt: 2 }}>
        <CustomizedDataGridUI
          rows={invoicesData}
          columns={columns}
          pageSize={10}
          rowHeight={70}
          // onRowSelectionChange={(selectedRows) => {
          //   console.log("Selected rows:", selectedRows);
          //   const selectedInvoice = invoicesData.find(
          //     (row) => row.id === selectedRows[0]
          //   );
          //   console.log(selectedInvoice);
          //   setCurrentInvoice(selectedInvoice);
          //   setOpen(true);
          // }}
          onPageChange={(data) => {
            console.log(data);
          }}
        />
      </Grid>
    </Box>
  );
};

export default InvoiceComponent;

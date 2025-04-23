import React, { useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import api from "@/common/lib/axiosInstance";
import { ErrorHandler } from "@/common/lib/errors";

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AccountsReceivable, AccountsReceivableImport } from "./types";

interface ModalImportProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any[]) => void;
}

const ModalImport: React.FC<ModalImportProps> = ({ open, onClose, onSave }) => {
  const [fileData, setFileData] = useState<any[]>([]);
  const [excelImport, setExcelImport] = useState<AccountsReceivableImport[]>(
    []
  );

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<AccountsReceivableImport[]>(sheet, {
        header: 1,
      });

      const formattedData = data
        .slice(1)
        .map((row: any[]) => ({
          debtorFullname: row[0] as string,
          debtorEmail: row[1] as string,
          debtorPhone: row[2] as string,
          debtorAddress: row[3] as string,
          invoiceNumber: row[4] as string,
          invoiceAmount: row[5] as number,
          issueDate: row[6] as string,
          dueDate: row[7] as string,
          identification: row[8] as string,
        }))
        .filter((row) =>
          Object.values(row).some(
            (value) => value !== null && value !== undefined && value !== ""
          )
        ); // Filtrar filas vacías
      setExcelImport(formattedData);
      setFileData(data.slice(0, 10)); // Preview first 10 rows
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  const handleSave = () => {
    api
      .post("/accounts-receivable/import-invoices", excelImport)
      .then((response) => {
        console.log("Invoices fetched successfully:", response.data);
        onSave(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const errorDetails = Object.entries(error.response.data.errors)
            .map(([row, messages]) => {
              const messageArray = Array.isArray(messages) ? messages : [];
              return `Row ${row}: ${messageArray.join(", ")}`;
            })
            .join("\n");
          ErrorHandler.showError(
            `${error.response.data.message}\n\nDetails:\n${errorDetails}`,
            false
          );
        } else {
          ErrorHandler.showError(error, false);
        }
        console.error("Error fetching invoices:", error);
      });

    // onSave(fileData);
    setFileData([]);
    onClose();
  };

  const handleCancel = () => {
    setFileData([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Import Excel File</Typography>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            mb: 2,
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            Drag and drop an Excel file here, or click to select one
          </Typography>
        </Box>
        {fileData.length > 0 && (
          <Paper sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}>
            <Table size="small" sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  {fileData[0].map((header: string, index: number) => (
                    <TableCell key={index} sx={{ whiteSpace: "nowrap" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fileData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <TableCell key={cellIndex} sx={{ whiteSpace: "nowrap" }}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {/* {JSON.stringify(excelImport)} */}
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={fileData.length === 0}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalImport;

"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridPaginationModel,
} from "@mui/x-data-grid";

interface CustomizedDataGridUIProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  disableColumnResize?: boolean;
  rowHeight?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  [key: string]: any;
}

const CustomizedDataGridUI: React.FC<CustomizedDataGridUIProps> = ({
  rows,
  columns,
  pageSize = 20,
  pageSizeOptions = [10, 20, 50],
  checkboxSelection = false,
  disableColumnResize = true,
  rowHeight = 50,
  onPageChange,
  ...props
}) => {
  const handlePageChange = (paginationModel: GridPaginationModel) => {
    if (onPageChange) {
      onPageChange(paginationModel.page, paginationModel.pageSize);
    }
  };

  return (
    <DataGrid
      checkboxSelection={checkboxSelection}
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize } },
      }}
      pageSizeOptions={pageSizeOptions}
      onPaginationModelChange={handlePageChange}
      disableColumnResize={disableColumnResize}
      rowHeight={rowHeight}
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto", order: 1 },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomizedDataGridUI;

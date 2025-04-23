import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox } from "@mui/material";

const COBRANZA_RATE = 0.15;
const ABB_RATE = 0.06;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable() {
  const [rows, setRows] = React.useState<Row[]>([
    { desc: "Paperclips (Box)", qty: 2, unit: 100, price: 200 },
  ]);
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleRowChange = (
    index: number,
    field: keyof Row,
    value: string | number
  ) => {
    const updatedRows = [...rows];
    const updatedRow = { ...updatedRows[index], [field]: value };

    if (field === "qty" || field === "unit") {
      updatedRow.price = priceRow(
        Number(updatedRow.qty),
        Number(updatedRow.unit)
      );
    }

    updatedRows[index] = updatedRow;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { desc: "New Item", qty: 0, unit: 0, price: 0 }, // Valores predeterminados
    ]);
  };

  const handleSelect = (index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const deleteSelected = () => {
    const updatedRows = rows.filter((_, index) => !selected.includes(index));
    setRows(updatedRows);
    setSelected([]);
  };

  const invoiceSubtotal = subtotal(rows);
  const invoiceCobranza = COBRANZA_RATE * invoiceSubtotal;
  const invoiceABB = ABB_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceCobranza + invoiceABB + invoiceSubtotal;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
        <Button
          variant="text"
          color="primary"
          onClick={addRow}
          size="small"
          sx={{ mt: 2 }}
        >
          New item
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={deleteSelected}
          size="small"
          sx={{ mt: 2 }}
          disabled={selected.length === 0}
        >
          <DeleteIcon />
          Delete Selected
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={() => {
                    if (selected.length === rows.length) {
                      setSelected([]);
                    } else {
                      setSelected(rows.map((_, index) => index));
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={{ width: "40%" }}>Desc</TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                Qty.
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                Price
              </TableCell>
              <TableCell align="right" sx={{ width: "20%" }}>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(index) !== -1}
                    onChange={() => handleSelect(index)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.desc}
                    onChange={(e) =>
                      handleRowChange(index, "desc", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={row.qty}
                    onChange={(e) =>
                      handleRowChange(index, "qty", Number(e.target.value))
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={row.unit}
                    onChange={(e) =>
                      handleRowChange(index, "unit", Number(e.target.value))
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Cobranza %</TableCell>
              <TableCell align="right">{`${(COBRANZA_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceCobranza)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />

              <TableCell>ABB %</TableCell>
              <TableCell align="right">{`${(ABB_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceABB)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import { MdOutlineAdd, MdOutlineSearch } from "react-icons/md";
import SearchIcon from "@mui/icons-material/Search";
import ModalDeudor from "./ModalDeudor";
import api from "@/common/lib/axiosInstance";
import { MdModeEdit } from "react-icons/md";

interface IDebtor {
  id?: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
}

interface PersonaProps {
  onPersonaSelect: (persona: IDebtor | null) => void;
  currectDebtor?: IDebtor | null;
}

const initialPersona: IDebtor = {
  identification: "",
  fullname: "",
  id: "",
  phone: "",
  address: "",
  email: "",
};

const InputPersona: React.FC<PersonaProps> = ({
  onPersonaSelect,
  currectDebtor,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<IDebtor | null>(null);
  const [open, setOpen] = useState(false);
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [debtors, setDebtors] = useState<IDebtor[]>([]);
  const [selectedDebtorId, setSelectedDebtorId] = useState<string | null>(null);

  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;

  const filteredPersonas = debtors.filter(
    (p) =>
      p.fullname.toLowerCase().includes(filter.toLowerCase()) ||
      p.identification.includes(filter) ||
      p.email.toLowerCase().includes(filter.toLowerCase()) ||
      p.phone.includes(filter) ||
      p.address.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedPersonas = filteredPersonas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getAllDebtors = async () => {
    try {
      const response = await api.get("/debtors");
      const data = response.data;
      setDebtors(data);
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    getAllDebtors();
    // en caso de que el currectDebtor cambie, se actualiza el selectedPersona
    if (currectDebtor) {
      console.log("currectDebtor", currectDebtor);
      setSelectedPersona(currectDebtor);
      setInputValue(
        `${currectDebtor.identification} - ${currectDebtor.fullname}`
      );
    }
  }, [currectDebtor]);

  const handleSelectPersona = (persona: IDebtor | null) => {
    if (persona) {
      onPersonaSelect(persona);
      setSelectedPersona(persona);
      //   setInputValue(`${persona.identification} - ${persona.fullname}`);
      setInputValue(""); // 👈 limpia el input después de seleccionar
    } else {
      onPersonaSelect(initialPersona);
      setSelectedPersona(null);
      setInputValue("");
    }
  };

  const handleSelectFromModal = (persona: IDebtor) => {
    handleSelectPersona(persona);
    setOpen(false);
  };

  const handleClicNewDebtor = () => {
    setSelectedDebtorId(null);
    setOpenNewDialog(true);
  };

  const handleCloseNewDebtor = () => {
    setOpenNewDialog(false);
    setSelectedDebtorId(null);
    getAllDebtors();
  };

  const handleClickEditDebtor = (id: string) => {
    setSelectedDebtorId(id);
    setOpenNewDialog(true);
  };

  const handleOpenModalBuscar = () => {
    setOpen(true);
    getAllDebtors();
  };

  const handleCloseModalBuscar = () => {
    setOpen(false);
    setFilter("");
    setPage(0);
  };

  return (
    <>
      <Autocomplete
        options={debtors}
        getOptionLabel={(option) =>
          `${option.identification} - ${option.fullname}`
        }
        onChange={(event, value) => {
          handleSelectPersona(value);
        }}
        inputValue={inputValue}
        value={selectedPersona}
        fullWidth
        size="small"
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        filterOptions={(options, state) => {
          // Solo muestra resultados si hay texto en el input
          if (!state.inputValue || state.inputValue.trim() === "") {
            return [];
          }
          const input = state.inputValue.toLowerCase();
          return options.filter((option) =>
            `${option.identification} ${option.fullname}`
              .toLowerCase()
              .includes(input)
          );
        }}
        open={!!inputValue && !selectedPersona}
        renderInput={(params) => (
          <TextField {...params} label="Persona" variant="outlined" fullWidth />
        )}
      />

      <Box ml={1} display="flex" alignItems="center">
        <Button
          size="small"
          variant="outlined"
          color="primary"
          style={{ minWidth: "auto", padding: "10px", marginLeft: "5px" }}
          onClick={handleOpenModalBuscar}
        >
          <MdOutlineSearch />
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          style={{ minWidth: "auto", padding: "10px", marginLeft: "5px" }}
          onClick={handleClicNewDebtor}
        >
          <MdOutlineAdd />
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleCloseModalBuscar}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Buscar Persona</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar aquí..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0); // resetear paginación al buscar
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "1rem" }}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ padding: "0px" }}>Identificación</TableCell>
                <TableCell style={{ padding: "0px" }}>Nombre</TableCell>
                <TableCell style={{ padding: "0px" }}>Email</TableCell>
                {/* <TableCell style={{ padding: "0px" }}>Direccion</TableCell> */}
                <TableCell style={{ padding: "0px" }}>Teléfono</TableCell>
                <TableCell style={{ padding: "0px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPersonas.map((persona) => (
                <TableRow
                  key={persona.id}
                  style={{ height: "40px" }} // Ajustar la altura de las filas
                >
                  <TableCell style={{ padding: "0px" }}>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleSelectFromModal(persona)}
                    >
                      {persona.identification}
                    </Button>
                  </TableCell>
                  <TableCell style={{ padding: "0px" }}>
                    {persona.fullname}
                  </TableCell>
                  <TableCell style={{ padding: "0px" }}>
                    {persona.email}
                  </TableCell>
                  {/* <TableCell style={{ padding: "0px" }}>
                    {persona.address}
                  </TableCell> */}
                  <TableCell style={{ padding: "0px" }}>
                    {persona.phone}
                  </TableCell>
                  <TableCell style={{ padding: "0px" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ minWidth: "auto", padding: "5px" }}
                      color="primary"
                      onClick={() => {
                        if (persona.id) {
                          handleClickEditDebtor(persona.id);
                          //   setSelectedDebtorId(persona.id);
                          console.log(`Edit persona: ${persona.id}`);
                        }
                      }}
                    >
                      <MdModeEdit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredPersonas.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </DialogContent>
      </Dialog>

      <ModalDeudor
        open={openNewDialog}
        id={selectedDebtorId || ""}
        onPersonaSelect={(debtor) => {
          if (!selectedDebtorId) {
            handleSelectPersona(debtor);
          } else {
            if (selectedPersona?.id === debtor?.id) {
              handleSelectPersona(debtor);
            }
          }
        }}
        onClose={() => {
          handleCloseNewDebtor();
        }}
      />
    </>
  );
};

export default InputPersona;

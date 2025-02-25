import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoMdSearch } from "react-icons/io";
import { useUserContext } from "@/modules/users/context/userContext";

const Search: React.FC = () => {
  const { setSearch, query } = useUserContext();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <>
      <TextField
        label="Search user name / email"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "50ch" }}
        placeholder="Search user name / email"
        value={query.search}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IoMdSearch />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default Search;

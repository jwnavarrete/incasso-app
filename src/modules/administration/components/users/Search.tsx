import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoMdSearch } from 'react-icons/io';

const Search: React.FC = () => {
    return (
        <TextField
            label="Search user name / email"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "50ch" }}
            placeholder="Search user name / email"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IoMdSearch />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default Search;
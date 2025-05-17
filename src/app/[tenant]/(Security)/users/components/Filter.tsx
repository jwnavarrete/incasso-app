import React from 'react';
import Button from '@mui/material/Button';
import { TfiFilter } from 'react-icons/tfi';

const FilterButton: React.FC = () => (
    <Button
        variant="text"
        size="small"
        color="secondary"
        startIcon={<TfiFilter />}
        sx={{ textTransform: "none" }}
    >
        Filter
    </Button>
);

export default FilterButton;
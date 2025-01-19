import React from 'react';
import { TextField } from '@mui/material';

interface SearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, searchQuery }) => {
  return (
    <TextField
      label="Search Profiles"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)} 
      sx={{
        backgroundColor: 'white',
         width: '300px',
      }}
    />
  );
};

export default Search;

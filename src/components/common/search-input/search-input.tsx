import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.black, 0.15),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        // backgroundColor: theme.palette.background.paper, 0.85),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    color: theme.palette.common.black,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '36ch',
            '&:focus': {
            width: '60ch',
            },
        },
    },
}));

interface SearchInputProps {
    placeholder: string
    onSubmit: (value: any) => void
}

const SearchInput = ({ placeholder, onSubmit }: SearchInputProps) => {

    const [searchFieldValue, setSearchFieldValue] = React.useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFieldValue(event.target.value);
    };

    const clearField = (event: any) => {
        setSearchFieldValue('');
    }

    const sendSearchValue = (event: any) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon color='primary'/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                value={searchFieldValue}
                onKeyDown={sendSearchValue}
                onBlur={clearField}
            />
        </Search>
    )
}

export default SearchInput;
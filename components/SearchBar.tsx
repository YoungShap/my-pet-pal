import React, { useContext, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { GeneralContext } from 'pages';

export const search = (searchWord: string, ...values: (string | undefined)[]) => {
    const str = values.filter(value => value !== undefined).join('').toLowerCase();
    const word = searchWord ? searchWord.toLowerCase() : '';

    return str.includes(word);
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#EDEADE',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 12, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '10ch',
            '&:focus': {
                width: '10ch',
            },
        },
    },
}));

const Searchbar: React.FC = () => {
    const { searchWord, setSearchWord } = useContext(GeneralContext);

    useEffect(() => {
        setSearchWord('');
    }, [setSearchWord]);

    const handleSearchChange = (value: string) => {
        setSearchWord(value);
    }

    return (
        <Box>
            <Toolbar>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchWord}
                        onChange={(ev) => handleSearchChange(ev.target.value)}
                    />
                </Search>
            </Toolbar>
        </Box>
    );
}

export default Searchbar;

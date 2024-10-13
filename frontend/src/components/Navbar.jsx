import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge'; // Import Badge for cart count

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import logo from "../../public/assets/logo.webp"; // Make sure the logo path is correct

import { ShopContext } from '../context/ShopContext'; // Assuming you're using ShopContext

const navigation = [
  { name: 'HOME', href: '/', current: true },
  { name: 'ABOUT', href: '/ABOUT', current: false },
  { name: 'COLLECTION', href: '/COLLECTION', current: false },
  { name: 'TEAM', href: '/team', current: false },
  { name: 'CONTACT', href: '/CONTACT', current: false },
];

export default function Navbar() {
  const { cartItems } = useContext(ShopContext); // Access cart items from context
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) {
      setSearchInput('');
      setSearchResults([]);
      setSearchError('');
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await fetch(`/api/search?query=${searchInput}`);
        const data = await response.json();
        
        if (data.length > 0) {
          setSearchResults(data);
          setSearchError('');
        } else {
          setSearchResults([]);
          setSearchError('Item cannot be found');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchError('An error occurred while searching');
      }
      setSearchInput('');
      toggleSearch();
    }
  };

  // Calculate the total number of items in the cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#FF5733',
        color: 'white',
        width: '100%',
        boxShadow: 'none',
        padding: isMobile ? 0 : '0 20px',
        overflowX: 'hidden',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: isMobile ? '0 8px' : '0' }}>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ textAlign: 'center', flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img alt="Your Company" src={logo} style={{ height: '40px', marginRight: '10px' }} />
          </Link>
        </Typography>

        {!isMobile && (
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              centered
              textColor="inherit"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: 'white',
                  height: '4px',
                },
              }}
            >
              {navigation.map((item) => (
                <Tab
                  key={item.name}
                  label={item.name}
                  component={Link}
                  to={item.href}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&.Mui-selected': {
                      color: 'yellow',
                    },
                    '&:hover': {
                      bgcolor: "tomato",
                      color: '#FFD700',
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
        )}

        <IconButton color="inherit" onClick={toggleSearch} sx={{ mr: 2 }}>
          <SearchIcon />
        </IconButton>

        {searchOpen && (
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', width: '300px' }}>
            <InputBase
              placeholder="Search…"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              sx={{
                bgcolor: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                color: 'black',
                boxShadow: theme.shadows[3],
                width: '100%',
              }}
            />
            <IconButton onClick={toggleSearch} sx={{ position: 'absolute', right: '5px' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Link to="/cart" style={{ color: 'inherit' }}>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={totalCartItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>

        <IconButton edge="end" color="inherit" onClick={handleOpenUserMenu}>
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleCloseUserMenu}>Your Profile</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Sign out</MenuItem>
        </Menu>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            width: isTablet || isMobile ? '100%' : '250px',
            maxHeight: '100vh',
            overflowY: 'auto',
          },
        }}
      >
        <List sx={{ paddingTop: 2 }}>
          {navigation.map((item) => (
            <ListItem key={item.name} disablePadding>
              <Link to={item.href} style={{ width: '100%', textDecoration: 'none' }}>
                <MenuItem
                  onClick={() => toggleDrawer(false)}
                  sx={{
                    padding: '10px 20px',
                    color: 'black',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#FFD700',
                      color: '#FFFFFF',
                    },
                  }}
                >
                  {item.name}
                </MenuItem>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Badge,
  Stack,
  useMediaQuery,
  useTheme,
  InputBase,
  Paper,
  Box,
  Button,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";

import { selectUserInfo } from "../../user/UserSlice";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";

import {
  selectProducts,
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down("sm"));
  const is900 = useMediaQuery(theme.breakpoints.down("md"));

  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);

  const products = useSelector(selectProducts);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const product = products.find((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (product) {
      navigate(`/product-details/${product._id}`);
      setSearchTerm("");
    } else {
      alert("Product not found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredProducts =
    searchTerm.length > 0
      ? products.filter((item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const settings = [
    { name: "Home", to: "/" },
    {
      name: "Profile",
      to: loggedInUser?.isAdmin ? "/admin/dashboard" : "/profile",
    },
    {
      name: loggedInUser?.isAdmin ? "Orders" : "My Orders",
      to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { name: "Logout", to: "/logout" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* LOGO */}

        <Typography
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
            fontSize: "1.2rem",
          }}
        >
          NOVA SPHERE
        </Typography>

        {/* SEARCH BAR */}

        {!is900 && (
          <Box sx={{ position: "relative", width: "400px" }}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                borderRadius: "30px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <InputBase
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Paper>

            {filteredProducts.length > 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "55px",
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {filteredProducts.slice(0, 8).map((product) => (
                  <MenuItem
                    key={product._id}
                    onClick={() => {
                      navigate(`/product-details/${product._id}`);
                      setSearchTerm("");
                    }}
                  >
                    {product.title}
                  </MenuItem>
                ))}
              </Paper>
            )}
          </Box>
        )}

        {/* RIGHT SIDE */}

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">
            {is480
              ? userInfo?.name?.split(" ")[0]
              : `Hey 👋, ${userInfo?.name || ""}`}
          </Typography>

          {/* CART */}

          <Badge badgeContent={cartItems?.length || 0} color="error">
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Badge>

          {/* WISHLIST */}

          {!loggedInUser?.isAdmin && (
            <Badge badgeContent={wishlistItems?.length || 0} color="error">
              <IconButton onClick={() => navigate("/wishlist")}>
                <FavoriteBorderIcon />
              </IconButton>
            </Badge>
          )}

          {/* FILTER */}

          {isProductList && (
            <IconButton onClick={handleToggleFilters}>
              <TuneIcon
                sx={{
                  color: isProductFilterOpen ? "#1976d2" : "inherit",
                }}
              />
            </IconButton>
          )}

          {/* ADMIN */}

          {loggedInUser?.isAdmin && (
            <Button variant="contained">Admin</Button>
          )}

          {/* PROFILE */}

          <Tooltip title="Account">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={userInfo?.name} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInUser?.isAdmin && (
              <MenuItem
                component={Link}
                to="/admin/add-product"
                onClick={handleCloseUserMenu}
              >
                Add Product
              </MenuItem>
            )}

            {settings.map((setting) => (
              <MenuItem
                key={setting.name}
                component={Link}
                to={setting.to}
                onClick={handleCloseUserMenu}
              >
                {setting.name}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
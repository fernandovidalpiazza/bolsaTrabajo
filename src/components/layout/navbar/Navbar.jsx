import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuItems } from "../../../router/navigation";
import { logout } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from '@mui/icons-material/Dashboard';
const drawerWidth = 200;

function Navbar(props) {
  const { logoutContext, user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <Link key={id} to={path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon sx={{ color: "whitesmoke" }} />
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ color: "whitesmoke" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}

        {user.rol === rolAdmin &&
          <Link to={"/dashboard"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} sx={{ color: "whitesmoke" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        }

        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Cerrar sesion"}
              sx={{ color: "whitesmoke" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor={"right"}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976d2",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <AppBar position="fixed" sx={{ width: "100%", right: 0 }}>
          <Toolbar sx={{ justifyContent: "flex-center" }}>
            <Button color="inherit" onClick={handleDrawerToggle}>Presione aquí</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;
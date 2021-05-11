import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import SideMenuArea from "./templates/SideMenuArea";

const drawerWidth = 240;

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Daichi Hoshina"}
    </Typography>
  );
};

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [sideMenuWidth, setSideMenuWidth] = useState(0);

  const handleDrawerOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (sideMenuRef.current !== null) {
      setSideMenuWidth(sideMenuRef.current.clientWidth);
    }
  });

  return (
    <div className="min-h-screen bg-blue-50 pt-10">
      <CssBaseline />
      <AppBar style={{ zIndex: 1201 }} position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className="flex-grow">
            管理画面
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          paddingLeft:
            isOpen && !router.pathname.includes("/login") ? sideMenuWidth : 0,
        }}
      >
        <div className="p-7">
          <Typography component="h2" variant="h6" color="inherit">
            {title}
          </Typography>
          {children}
        </div>
      </div>
      <Box className="pt-8">
        <Copyright />
      </Box>
      <Drawer open={isOpen} variant="persistent" anchor="left">
        <div ref={sideMenuRef} />
        <SideMenuArea />
      </Drawer>
    </div>
  );
};

export default Layout;

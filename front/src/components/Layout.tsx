import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Footer from "./organisms/common/Footer";
import { colors, createMuiTheme, Link, ThemeProvider } from "@material-ui/core";

const drawerWidth = 240;

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#4252B6",
    },
    secondary: {
      main: "#c2185b",
    },
    type: "dark",
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <div className="min-h-screen pt-10">
        <CssBaseline />
        <AppBar
          style={{ zIndex: 1201 }}
          position="fixed"
          style={{ color: "#e0f2f1", backgroundColor: "#000000" }}
        >
          <Toolbar variant="dense">
            <Link href="/" color="inherit" underline="none">
              <Typography variant="h6" color="inherit" className="flex-grow">
                Repgram
              </Typography>
            </Link>
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
          <Footer />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Layout;

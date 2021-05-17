import React, { useEffect, useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Footer from "./organisms/common/Footer";
import { Link } from "@material-ui/core";
import { TUser } from "../modules/User";
import HeaderUserIcon from "../components/atoms/share/HeaderUserIcon";
export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user: TUser =
      localStorage && JSON.parse(localStorage.getItem("token") ?? '""');
    setIsLogin(!!user);
    return () => {
      // cleanup
    };
  }, [router.pathname]);

  return (
    <div className="min-h-screen pt-10">
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ zIndex: 1201, color: "#FFFFFF", backgroundColor: "#000000" }}
      >
        <Toolbar variant="dense">
          <Link href="/" color="inherit" underline="none">
            <Typography variant="h6" color="inherit" className="flex-grow">
              Repgram
            </Typography>
          </Link>
        </Toolbar>
        {isLogin && <HeaderUserIcon />}
      </AppBar>
      <div className="p-7">
        <Typography component="h2" variant="h6" color="inherit">
          {title}
        </Typography>
        {children}
      </div>
      <Box className="pt-8">
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;

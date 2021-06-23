import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Footer from "./organisms/common/Footer";
import { Link } from "@material-ui/core";
import { TUser } from "../modules/User";
import HeaderUserIcon from "../components/atoms/share/HeaderUserIcon";
import { loginConfirm } from "../services/User";
import { useDispatch } from "react-redux";
import LoginIcon from "./atoms/share/LoginIcon";
export interface LayoutProps {
  children?: React.ReactNode;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  // ログイン中か確認する
  const userLoginConfirm = async () => {
    const result: any = await dispatch(loginConfirm());
    const user: TUser = result.payload.data;
    setIsLogin(!!user);
  };

  useEffect(() => {
    userLoginConfirm();
  }, []);

  return (
    <div className="min-h-screen pt-10">
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ zIndex: 1201, color: "#FFFFFF", backgroundColor: "#000000" }}
      >
        <div className="flex">
          <div className="mt-2">
            <Toolbar variant="dense">
              <Link href="/presentations" color="inherit" underline="none">
                {/* タイトルロゴ */}
                <Typography variant="h6" color="inherit" className="flex-grow">
                  Repgram
                </Typography>
              </Link>
            </Toolbar>
          </div>
          {/* 右上のアイコン */}
          <div className="ml-auto mt-2 mr-2">
            {isLogin ? <HeaderUserIcon /> : <LoginIcon />}
          </div>
        </div>
      </AppBar>
      <div className="p-7 mt-3">
        <Typography component="h2" variant="h6" color="inherit">
          {title}
        </Typography>
        <div>{children}</div>
      </div>
      <Box className="pt-8">
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;

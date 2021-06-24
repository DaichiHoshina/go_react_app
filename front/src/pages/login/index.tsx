import { FC } from "react";
import LoginFormTemplate from "../../components/templates/LoginFormTemplate";
import Layout from "../../components/Layout";

const LoginPage: FC = () => {
  return (
    <Layout title="">
      <LoginFormTemplate />
    </Layout>
  );
};

export default LoginPage;

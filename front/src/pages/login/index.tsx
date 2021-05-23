import React, { FC } from "react";
import LoginFormTemplate from "../../components/templates/LoginFormTemplate";
import Layout from "../../components/Layout";

// interface Props {
//   id: number;
// }

const LoginPage: FC = () => {
  return (
    <Layout title="">
      <LoginFormTemplate />
    </Layout>
  );
};

export default LoginPage;

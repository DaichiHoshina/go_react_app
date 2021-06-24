import { FC } from "react";
import Layout from "../../components/Layout";
import SignUpTemplate from "../../components/templates/SignUpFormTemplata";

const SignUpPage: FC = () => {
  return (
    <Layout title="">
      <SignUpTemplate />
    </Layout>
  );
};

export default SignUpPage;

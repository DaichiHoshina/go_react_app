import React from "react";
import PageReturnButton from "../../components/atoms/share/PageReturnButton";
import SeparateHr from "../../components/atoms/share/SeparateHr";
import Layout from "../../components/Layout";
import UserFormCard from "../../components/organisms/user/UserFormCard";

const AuthAccountCreatePage: React.FC = () => {
  return (
    <Layout title="Sign Up">
      <div className="flex justify-center m-5">
        <UserFormCard isEditPage={false} />
      </div>

      <SeparateHr />
      <PageReturnButton />
    </Layout>
  );
};

export default AuthAccountCreatePage;

import React from "react";
import PageReturnButton from "../../../components/atoms/share/PageReturnButton";
import SeparateHr from "../../../components/atoms/share/SeparateHr";
import Layout from "../../../components/Layout";
import UserFormCard from "../../../components/organisms/user/UserFormCard";

const UserEditArea: React.FC = () => {
  return (
    <Layout title="User Edit">
      <div className="flex justify-center m-5">
        <UserFormCard isEditPage={true} accountInfo={{}} />
      </div>

      <SeparateHr />
      <PageReturnButton />
    </Layout>
  );
};

export default UserEditArea;

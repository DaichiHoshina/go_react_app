import Layout from "../../components/Layout";
import PageReturnButton from "../../components/atoms/share/PageReturnButton";
import SeparateHr from "../../components/atoms/share/SeparateHr";
import UserDetailCard from "../../components/organisms/user/UserDetailCard";
import React from "react";

const UserDetail: React.FC = () => {
  return (
    <Layout title="User Detail">
      <>
        <div className="flex justify-center mt-3">
          <UserDetailCard />
        </div>

        <SeparateHr />
        <PageReturnButton />
      </>
    </Layout>
  );
};

export default UserDetail;

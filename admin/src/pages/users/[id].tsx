import Layout from "../../components/Layout";
import PageReturnButton from "../../components/atoms/share/PageReturnButton";
import RecordAddLinkButton from "../../components/atoms/share/RecordAddLinkButton";
import SeparateHr from "../../components/atoms/share/SeparateHr";
import UserDetailCard from "../../components/organisms/auth-account/UserDetailCard";

const UserDetail: React.FC = () => {
  return (
    <Layout title="ユーザー詳細">
      <>
        <div className="flex justify-end mb-5">
          <RecordAddLinkButton pathString="auth-accounts" />
        </div>

        <div className="flex justify-center">
          <UserDetailCard />
        </div>

        <SeparateHr />
        <PageReturnButton />
      </>
    </Layout>
  );
};

export default UserDetail;

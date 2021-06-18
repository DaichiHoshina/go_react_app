import { FC } from "react";
import LoginForm from "../organisms/login/LoginForm";

const LoginFormTemplate: FC = () => {
  return (
    <>
      <div className="flex justify-center p-24">
        <LoginForm isSubmit={false} />
      </div>
    </>
  );
};
export default LoginFormTemplate;

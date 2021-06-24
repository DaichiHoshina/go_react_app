import { FC } from "react";
import SignUpForm from "../organisms/signup/SignUpForm";

const SignUpTemplate: FC = () => {
  return (
    <>
      <div className="flex justify-center p-24">
        <SignUpForm isSubmit={false} />
      </div>
    </>
  );
};
export default SignUpTemplate;

import { Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LoginIcon: React.FC = () => {
  const router = useRouter();

  const clickSignIn = () => {
    router.push(`/login`);
  };

  const clickSignUp = () => {
    router.push(`/signup`);
  };

  return (
    <>
      <div className="flex">
        <div className="mr-2">
          <Button onClick={clickSignIn}>Sign In</Button>
        </div>
        <div>
          <Button onClick={clickSignUp}>Sign Up</Button>
        </div>
      </div>
    </>
  );
};

export default LoginIcon;
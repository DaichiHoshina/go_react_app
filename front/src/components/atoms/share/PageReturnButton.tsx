import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

const PageReturnButton: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => router.back()}>
        BACK
      </Button>
    </>
  );
};

export default PageReturnButton;

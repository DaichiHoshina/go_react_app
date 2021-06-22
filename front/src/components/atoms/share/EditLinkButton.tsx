import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

interface Props {
  // urlにidがあるページでは設定不要。
  id?: number;
}

const EditLinkButton: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const editPath = router.asPath.split("?")[0] + (id ? `/${id}` : "") + "/edit";

  return (
    <>
      <Link href={editPath}>
        <Button variant="contained" color="primary">
          EDIT
        </Button>
      </Link>
    </>
  );
};

export default EditLinkButton;

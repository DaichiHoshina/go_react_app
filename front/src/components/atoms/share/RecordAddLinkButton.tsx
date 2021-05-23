import { Fab, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Link from "next/link";
import React from "react";
interface Props {
  pathString: string;
}

const RecordAddLinkButton: React.FC<Props> = ({ pathString = "" }) => {
  return (
    <Link href={"/" + pathString + "/new"}>
      <Fab color="primary" aria-label="add">
        <Add />
      </Fab>
    </Link>
  );
};

export default RecordAddLinkButton;

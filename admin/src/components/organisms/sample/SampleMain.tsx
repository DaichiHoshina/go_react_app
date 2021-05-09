import * as React from "react";
import { TUser } from "../../../modules/User";

const SampleMain = (props: { user?: TUser | null }): JSX.Element => (
  <div>{props.user ? props.user.name : "データ未受信"}</div>
);

export default SampleMain;

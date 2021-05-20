import { Card } from "@material-ui/core";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { TUser, TUserState } from "../../../modules/User";
import { deleteUser, fetchUser } from "../../../services/User";
import DeleteButton from "../../atoms/share/DeleteButton";
import EditLinkButton from "../../atoms/share/EditLinkButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import KeyValuePair from "../common/KeyValuePair";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { idText } from "typescript";

interface Props {
  user?: TUser;
}

const UserDetailCard: React.FC<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchUser({ id: id }));
  }, [router.query]);

  return (
    <>
      <Card className="p-5 w-full">
        <ul className="flex flex-col space-y-2">
          <KeyValuePair
            keyName="ユーザーID"
            value={state.userState?.user?.id}
          />
          <KeyValuePair keyName="氏名" value={state.userState?.user?.name} />
          {/* <KeyValuePair
            keyName="かな"
            value={joinName(user.kana1, user.kana2)}
          />
          <KeyValuePair
            keyName="登録日時"
            value={returnDatetimeString(user.created_at)}
          />
          <KeyValuePair
            keyName="更新日時"
            value={returnDatetimeString(user.updated_at)}
          /> */}
        </ul>
        <SeparateHr />
        <div className="flex justify-end">
          <div className="ml-5">
            <EditLinkButton />
          </div>
        </div>
      </Card>
    </>
  );
};

export default UserDetailCard;

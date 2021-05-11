import { Card } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { TUser, TUserState } from "../../../modules/User";
import { deleteUser, fetchUser } from "../../../services/User";
import DeleteButton from "../../atoms/share/DeleteButton";
import EditLinkButton from "../../atoms/share/EditLinkButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import KeyValuePair from "../common/KeyValuePair";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  isUserSettingPage?: boolean;
}

const UserDetailCard: React.FC<Props> = ({ isUserSettingPage = false }) => {
  const router = useRouter();
  const { id } = router.query;
  // const [user, setUser] = useState<TUser>({});
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(
      fetchUser({
        id: id,
      })
    );
  }, [router.query]);

  const clickDelete = () => {
    router.push("");
  };
  return (
    <>
      <Card className="p-5 w-full">
        <ul className="flex flex-col space-y-2">
          {!isUserSettingPage && (
            <KeyValuePair
              keyName="ユーザーID"
              value={state.userState?.user?.id}
            />
          )}
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
          {/* TODO: 自分のアカウントは消せないように。アカウント管理から消せる。下記のコードでユーザー設定(アカウント設定)からは消せないようになっている。 */}
          {/* {!isUserSettingPage && (
            <DeleteButton
              deleteFunc={async () => {
                const response = await deleteUser(user.id);
                if (response) {
                  enqueueSnackbar("削除しました。", { variant: "success" });

                  router.push("/auth-accounts");
                }
              }}
            />
          )} */}
          <div className="ml-5">
            <EditLinkButton />
          </div>
        </div>
      </Card>
    </>
  );
};

export default UserDetailCard;

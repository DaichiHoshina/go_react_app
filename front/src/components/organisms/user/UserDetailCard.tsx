import { Card } from "@material-ui/core";
import { useRouter } from "next/router";
import { TUser, TUserState } from "../../../modules/User";
import { fetchUser, loginConfirm } from "../../../services/User";
import EditLinkButton from "../../atoms/share/EditLinkButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import KeyValuePair from "../common/KeyValuePair";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { returnDatetimeString } from "../../../utils/DateUtil";
import { useEffect } from "react";
import React from "react";

interface Props {
  user?: TUser;
}

const UserDetailCard: React.FC<Props> = () => {
  const router = useRouter();
  const { id } = router?.query || {};
  const { enqueueSnackbar } = useSnackbar() || {};
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);

  // アクセス制限
  const userLoginConfirm = async () => {
    await dispatch(fetchUser({ id: id }));
    const result: any = await dispatch(loginConfirm());
    if (id != result.payload?.data.id) {
      router.push("/presentations");
      enqueueSnackbar("権限のないページにアクセスしました", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    userLoginConfirm();
  }, [id]);

  return (
    <>
      <Card className="p-5 w-full">
        <ul className="flex flex-col space-y-2">
          <KeyValuePair keyName="id" value={state.userState?.user?.id} />
          <KeyValuePair keyName="name" value={state.userState?.user?.name} />
          <KeyValuePair keyName="email" value={state.userState?.user?.email} />
          <KeyValuePair
            keyName="created_at"
            value={returnDatetimeString(state.userState?.user?.created_at)}
          />
          <KeyValuePair
            keyName="user_image"
            value={state.userState.user?.image ? "設定済み" : "未設定"}
          />
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

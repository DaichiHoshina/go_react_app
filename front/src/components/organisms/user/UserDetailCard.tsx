import { Card } from "@material-ui/core";
import Router, { useRouter } from "next/router";
import { TUser, TUserState } from "../../../modules/User";
import { fetchUser, loginConfirm } from "../../../services/User";
import EditLinkButton from "../../atoms/share/EditLinkButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import KeyValuePair from "../common/KeyValuePair";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { returnDatetimeString } from "../../../utils/DateUtil";
import { useEffect } from "react";

interface Props {
  user?: TUser;
}

const UserDetailCard: React.FC<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);
  const { enqueueSnackbar } = useSnackbar();

  // アクセス制限
  const userLoginConfirm = async () => {
    await dispatch(fetchUser({ id: id }));
    const result = await dispatch(loginConfirm());
    if (id != result.payload?.data.id) {
      router.push("/posts");
      enqueueSnackbar("権限のないページにアクセスしました", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    userLoginConfirm();
  }, []);

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
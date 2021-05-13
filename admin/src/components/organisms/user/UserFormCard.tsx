import { Card } from "@material-ui/core";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TUser, TUserState } from "../../../modules/User";
import { createUser, fetchUser, updateUser } from "../../../services/User";
import CreateOrEditButton from "../../atoms/share/CreateOrEditButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import TextFieldParts from "../../atoms/share/TextFieldParts";
import { useFormik } from "formik";
import KeyValuePair from "../common/KeyValuePair";

interface Props {
  isEditPage: boolean;
  accountInfo?: any;
  isUserSettingPage?: boolean;
}

const UserFormCard: React.FC<Props> = ({
  isEditPage = false,
  isUserSettingPage = false,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);

  useEffect(() => {
    dispatch(fetchUser({ id: id }));
    if (state?.userState?.user) {
      formik.setValues(state?.userState?.user!);
    }
  }, [router.query]);

  useEffect(() => {}, []);

  interface tempPassword {
    password2?: string;
  }
  const formik = useFormik<TUser & tempPassword>({
    initialValues: {},
    onSubmit: async (values) => {
      const response = (await isEditPage)
        ? dispatch(updateUser({ user: values, id: id }))
        : dispatch(createUser({ user: values }));
      if (response.arg) {
        enqueueSnackbar(isEditPage ? "更新しました。" : "登録しました。", {
          variant: "success",
        });
        router.push(isUserSettingPage ? `/users/${id}` : "/users");
      } else {
        enqueueSnackbar(
          isEditPage ? "更新に失敗しました。" : "登録に失敗しました。",
          {
            variant: "error",
          }
        );
      }
    },
  });

  return (
    <>
      <Card className="p-5 w-4/5">
        <ul className="flex flex-col space-y-2">
          <KeyValuePair
            keyName="氏名"
            value={
              <div className="flex">
                <TextFieldParts name="name" formik={formik} />
              </div>
            }
          />
        </ul>
        <SeparateHr />
        <div className="flex justify-end">
          <CreateOrEditButton isEditPage={isEditPage} formik={formik} />
        </div>
      </Card>
    </>
  );
};

export default UserFormCard;

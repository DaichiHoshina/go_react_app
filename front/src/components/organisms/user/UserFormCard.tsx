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
import { UserSettingUpdateSchema } from "../../../const/validation";
import { DropzoneArea } from "material-ui-dropzone";
import { fetchPresentations } from "../../../services/Presentation";

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
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);
  const { id } = router?.query || {};
  const { enqueueSnackbar } = useSnackbar() || {};

  useEffect(() => {
    dispatch(fetchUser({ id: id }));
  }, [id]);

  useEffect(() => {
    if (state?.userState?.user) {
      formik.setValues(state?.userState?.user!);
    }
  }, [state?.userState?.user]);

  const formik = useFormik<TUser>({
    initialValues: {},
    validationSchema: UserSettingUpdateSchema,
    onSubmit: async (values) => {
      const response: any = (await isEditPage)
        ? dispatch(updateUser({ user: values, id: id }))
        : dispatch(createUser({ user: values }));
      if (response.arg) {
        enqueueSnackbar("データを送信中", {
          variant: "success",
        });
        // 画像が保存されるまでタイムラグがあるため、○秒後に実行するようにしている
        setTimeout(function () {
          enqueueSnackbar(isEditPage ? "Update!!" : "Create!!", {
            variant: "success",
          });
          dispatch(
            fetchPresentations({
              page: 1,
              per: 1,
            })
          );
          router.push(isUserSettingPage ? `/users/${id}` : "/presentations");
        }, 2000);
      } else {
        enqueueSnackbar("Failure...", {
          variant: "error",
        });
      }
    },
  });

  return (
    <>
      <Card className="p-5 w-4/5">
        <ul className="flex flex-col space-y-2">
          <div className="mb-3">
            <KeyValuePair
              keyName="image"
              value={
                <>
                  <DropzoneArea
                    dropzoneText={
                      "ここにファイルをドロップ\nまたはファイルを選択"
                    }
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    showFileNamesInPreview={true}
                    getFileAddedMessage={(fileName: string) =>
                      `${fileName}を選択しました。`
                    }
                    getFileRemovedMessage={(fileName: string) =>
                      `${fileName}を削除しました。`
                    }
                    filesLimit={1}
                    previewText="アップロードファイル"
                    onChange={(files) => {
                      formik.setFieldValue("image", files);
                    }}
                  />
                  {(formik.values?.image ?? []).length === 0 && (
                    <p className="pl-3 pt-2 text-white text-xs">
                      select image.
                    </p>
                  )}
                </>
              }
            />
          </div>
          <KeyValuePair
            keyName="name"
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

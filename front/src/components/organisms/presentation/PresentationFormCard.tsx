import { Card } from "@material-ui/core";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TPresentation,
  TPresentationState,
} from "../../../modules/Presentation";
import {
  createPresentation,
  fetchPresentation,
  fetchPresentations,
  updatePresentation,
} from "../../../services/Presentation";
import CreateOrEditButton from "../../atoms/share/CreateOrEditButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import TextFieldParts from "../../atoms/share/TextFieldParts";
import { useFormik } from "formik";
import KeyValuePair from "../common/KeyValuePair";
import { PresentationCreateSchema } from "../../../const/validation";
import { TUserState } from "../../../modules/User";
import { loginConfirm } from "../../../services/User";
import { DropzoneArea } from "material-ui-dropzone";

interface Props {
  isEditPage: boolean;
  accountInfo?: any;
  isPresentationSettingPage?: boolean;
}

const PresentationFormCard: React.FC<Props> = ({ isEditPage = false }) => {
  const router = useRouter();
  const { id } = router?.query || {};
  const { enqueueSnackbar } = useSnackbar() || {};
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { presentationState: TPresentationState; userState: TUserState }) =>
      state
  );

  useEffect(() => {
    dispatch(loginConfirm());
  }, [state?.userState?.user?.id]);

  useEffect(() => {
    dispatch(fetchPresentation({ id: id }));
    if (state?.presentationState?.presentation) {
      formik.setValues(state?.presentationState?.presentation!);
    }
  }, [state?.presentationState?.presentation?.id]);

  const setTime = isEditPage ? 0 : 2000;

  const formik = useFormik<TPresentation>({
    initialValues: {
      user_id: isEditPage
        ? state.presentationState?.presentation?.user_id
        : state.userState?.user?.id,
    },
    validationSchema: PresentationCreateSchema,
    onSubmit: async (values) => {
      if (!isEditPage && (formik.values?.image ?? []).length === 0) {
        enqueueSnackbar("画像を添付してください", {
          variant: "error",
        });
        return;
      }
      const response: any = (await isEditPage)
        ? dispatch(updatePresentation({ presentation: values, id: id }))
        : dispatch(
            createPresentation({
              presentation: values,
              user_id: state.userState?.user?.id!,
            })
          );
      if (response.arg) {
        // 画像が保存されるまでタイムラグがあるため、○秒後に実行するようにしている
        !isEditPage &&
          enqueueSnackbar("データを送信中", {
            variant: "success",
          });
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
          router.push("/presentations");
        }, setTime);
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
          {!isEditPage && (
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
                      <p className="pl-3 pt-2 text-red-500 text-xs">
                        select image.
                      </p>
                    )}
                  </>
                }
              />
            </div>
          )}
          <KeyValuePair
            keyName="discription"
            value={
              <div className="flex">
                <TextFieldParts name="discription" formik={formik} />
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

export default PresentationFormCard;

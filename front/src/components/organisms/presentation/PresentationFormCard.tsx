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
  updatePresentation,
} from "../../../services/Presentation";
import CreateOrEditButton from "../../atoms/share/CreateOrEditButton";
import SeparateHr from "../../atoms/share/SeparateHr";
import TextFieldParts from "../../atoms/share/TextFieldParts";
import { useFormik } from "formik";
import KeyValuePair from "../common/KeyValuePair";
import { PresentationCreateSchema } from "../../../const/validation";

interface Props {
  isEditPage: boolean;
  accountInfo?: any;
  isPresentationSettingPage?: boolean;
}

const PresentationFormCard: React.FC<Props> = ({
  isEditPage = false,
  isPresentationSettingPage = false,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { presentationState: TPresentationState }) => state
  );

  useEffect(() => {
    dispatch(fetchPresentation({ id: id }));
  }, [router.query]);

  useEffect(() => {
    if (state?.presentationState?.presentation) {
      formik.setValues(state?.presentationState?.presentation!);
    }
  }, [state?.presentationState?.presentation]);

  const formik = useFormik<TPresentation>({
    initialValues: { user_id: 1 },
    validationSchema: PresentationCreateSchema,
    onSubmit: async (values) => {
      const response = (await isEditPage)
        ? dispatch(updatePresentation({ presentation: values, id: id }))
        : dispatch(createPresentation({ presentation: values }));
      if (response.arg) {
        enqueueSnackbar(isEditPage ? "Update!!" : "Create!!", {
          variant: "success",
        });
        router.push(
          isPresentationSettingPage ? `/presentations/${id}` : "/presentations"
        );
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
          <KeyValuePair
            keyName="title"
            value={
              <div className="flex">
                <TextFieldParts name="title" formik={formik} />
              </div>
            }
          />
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

import { Button, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../services/User";
import TextFieldParts from "../../atoms/share/TextFieldParts";
import { useRouter } from "next/router";
import KeyValueColonPair from "../common/KeyValueColonPair";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { TUser } from "../../../modules/User";
import { loginSchema } from "../../../const/validation";
import { FC } from "react";
interface Props {
  isSubmit: boolean;
}

const LoginForm: FC<Props> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar() || {};

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result: any = await dispatch(loginUser({ loginForm: values }));
      if (result.payload?.status === 200) {
        router.push("/presentations");
        enqueueSnackbar(`Welcome!!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failure...", {
          variant: "error",
        });
      }
    },
  });

  const testValues: TUser = {
    email: "test@test.jp",
    password: "test1234",
  };

  const testUserLogin = async () => {
    const result: any = await dispatch(loginUser({ loginForm: testValues }));
    if (result.payload?.status === 200) {
      router.push("/presentations");
      enqueueSnackbar("Welcome!!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Failure...", {
        variant: "error",
      });
    }
  };

  return (
    <Card
      className="flex-item flex flex-col px-8 py-12 w-1/2 max-w-5xl"
      style={{ color: "#ffffff", backgroundColor: "#242323" }}
    >
      <h1 className="pb-8 text-center text-xl">Sign In</h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <ul className="pb-10 space-y-3">
          <KeyValueColonPair
            keyName="email"
            value={<TextFieldParts name="email" formik={formik} />}
          />
          <KeyValueColonPair
            keyName="password"
            value={
              <TextFieldParts
                name="password"
                isPasswordForm={true}
                formik={formik}
              />
            }
          />
        </ul>
        <Button
          data-testid="form"
          disabled={!formik.values.email || !formik.values.password}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="border-none ring-transparent"
        >
          Login
        </Button>
        <div className="mt-5">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className="border-none ring-transparent"
            onClick={testUserLogin}
          >
            Login Test User!!
          </Button>
        </div>
        <div>※ポートフォリオ閲覧用です</div>
      </form>
    </Card>
  );
};
export default LoginForm;

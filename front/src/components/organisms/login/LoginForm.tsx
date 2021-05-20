import { Button, Card } from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../services/User";
import TextFieldParts from "../../atoms/share/TextFieldParts";
import { useRouter } from "next/router";
import KeyValueColonPair from "../common/KeyValueColonPair";
import { useFormik } from "formik";
import { loginSchema } from "../../../const/validation";
interface Props {
  isSubmit: boolean;
}

const LoginForm: FC<Props> = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    // validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await dispatch(loginUser({ loginForm: values }));
      if (result.payload.status === 200) {
        console.log("ログイン成功");
        console.log(result.payload.data);
        // クッキーに保存
        // result.cookie("token", result.payload.data, { httpOnly: true });
        router.push("/posts");
      } else {
        // 認証失敗
        console.log("ログイン失敗");
        console.log(result.payload.data);
        //handleToastOpen('error');
      }
    },
  });

  return (
    <Card
      className="flex-item flex flex-col px-8 py-12 w-1/2 max-w-5xl"
      style={{ color: "#ffffff", backgroundColor: "#242323" }}
    >
      <h1 className="pb-8 text-center text-xl">ログイン</h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <ul className="pb-10 space-y-3">
          <KeyValueColonPair
            keyName="メールアドレス"
            value={<TextFieldParts name="email" formik={formik} />}
          />
          <KeyValueColonPair
            keyName="パスワード"
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
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="border-none ring-transparent"
        >
          ログイン
        </Button>
      </form>
    </Card>
  );
};
export default LoginForm;

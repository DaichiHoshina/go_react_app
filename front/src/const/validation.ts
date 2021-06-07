import * as Yup from "yup";

const validate = {
  // 重複定義を防ぐため「ValidMessage」を頭に設定
  ValidMessageOnlyBig: "は全角文字のみ",
  ValidMessageNoFeature: "には、未来の日付は入力できません。",
  ValidMessageMiniNum: "は半角数字",
  ValidMessageMiniEngNum: "は半額英数字のみ",
  ValidMessageEmail: "に正しいメールアドレス",
  ValidMessageFormat: "の形式に誤りがあります",
  ValidMessagePassword: "パスワードは4～30桁の半角英数字で入力してください。",
  ValidMessageRequired: "を入力してください。",
  ValidMessageSelect: "を選択してください。",
  ValidMessageRegisteredPassword:
    "は既に利用者登録されています。別のメールアドレスを入力してください。",
  ValidMessageMailAndPassword:
    "メールアドレスもしくはパスワードが正しくありません。",
  ValidMessageMatch: "と一致しません。",

  // サブミットエラー
  ValidMessageSubmitError: "入力が完了していません。",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("形式がemailではありません。")
    .required(`メールアドレス${validate.ValidMessageRequired}`),
  password: Yup.string()
    .required(`パスワード${validate.ValidMessageRequired}`)
    .min(4, validate.ValidMessagePassword)
    .max(30, validate.ValidMessagePassword),
});

export const AccountCreateSchema = Yup.object({
  name: Yup.string().required(`名前${validate.ValidMessageRequired}`),
  email: Yup.string()
    .email("形式がemailではありません。")
    .required(`メールアドレス${validate.ValidMessageRequired}`),
  password: Yup.string()
    .min(4, validate.ValidMessagePassword)
    .required(`パスワード${validate.ValidMessageRequired}`),
}).shape({});

export const PresentationCreateSchema = Yup.object({
  discription: Yup.string().required(`本文${validate.ValidMessageRequired}`),
  // title: Yup.string().required(`タイトル${validate.ValidMessageRequired}`),
}).shape({});

export const UserSettingUpdateSchema = Yup.object().shape({
  name: Yup.string().required(`名前${validate.ValidMessageRequired}`),
});

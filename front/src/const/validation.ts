import * as Yup from "yup";

const returnPreDate = (
  startDate?: unknown,
  endDate?: unknown,
  startTime?: unknown,
  endTime?: unknown
) => {
  // 1日だけの通知で終了時間が開始より早いときに、エラーメッセージを表示。
  // if (
  //   startDate instanceof Date &&
  //   endDate instanceof Date &&
  //   typeof endTime === 'string' &&
  //   typeof startTime === 'string' &&
  //   +(endTime.replace(':', '') ?? '') - +(startTime.replace(':', '') ?? '') < 0
  // ) {
  //   return endDate?.setDate(endDate.getDate() - 1);
  // }
  return startDate;
};

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
  email: Yup.string().required(
    `メールアドレス${validate.ValidMessageRequired}`
  ),
  password: Yup.string()
    .required(`パスワード${validate.ValidMessageRequired}`)
    .min(4, validate.ValidMessagePassword)
    .max(30, validate.ValidMessagePassword),
});

// TODO: 検討。条件によってフォームが消えるので、バリデーションを調整する。
export const medicalOrgCreateSchema = Yup.object().shape({
  // 基本情報
  // id: Yup.string().required(`医療機関ID${validate.ValidMessageRequired}`),
  medical_org_id: Yup.string()
    .required(`医療機関ID${validate.ValidMessageRequired}`)
    .matches(
      /[-|\w]+/,
      "医療機関idは英数字、ハイフン、アンダースコアで入力してください。"
    ),
  // .matches(/[^_]+_[^_]+/, '医療機関idはxxx_xxxの形式で入力してください。'),

  name: Yup.string().required(`名称${validate.ValidMessageRequired}`),
  kana: Yup.string().required(`かな${validate.ValidMessageRequired}`),
  zip1: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  zip2: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  pref: Yup.string().nullable(),
  address: Yup.string().nullable(),
  tel1: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  tel2: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  tel3: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  fax1: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  fax2: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  fax3: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  email: Yup.string().nullable(),
  pic: Yup.string().nullable(),
  contract_start_date: Yup.date().nullable(),
  contract_end_date: Yup.date()
    .nullable()
    .min(
      returnPreDate(
        Yup.ref("contract_start_date"),
        Yup.ref("contract_end_date")
      ),
      "契約期間(終了日)は契約期間(開始日)より後に設定してください。"
    ),
  // TODO: 名前の調整
  // salesperson:
  reservation_type_memo: Yup.string().nullable(),
  memo: Yup.string().nullable(),

  // 連動情報
  exist_interlock: Yup.string().required(
    `連動有無${validate.ValidMessageRequired}`
  ),
  interlock_company_name: Yup.string().nullable(),
  interlock_pic: Yup.string().nullable(),
  interlock_contact_info: Yup.string().nullable(),
  interlock_memo: Yup.string().nullable(),

  // 医療機関機能コントロール情報
  max_staff_num: Yup.number().min(0, "0以上の値を入力してください").nullable(),
  theme: Yup.string().nullable(),
  accept_sms: Yup.string().nullable(),
  accept_web_reservation: Yup.string().nullable(),
  tooth_formula: Yup.string().required(
    `歯式利用可${validate.ValidMessageRequired}`
  ),
  reservation_tooth_formula: Yup.string().required(
    `予約歯式${validate.ValidMessageRequired}`
  ),
  // 翻訳機能は2021/04/28時点では不要なためコメントアウト。復活の可能性はあり。
  // translation: Yup.string().required(`翻訳利用可${validate.ValidMessageRequired}`),
  // wovn_token: Yup.string().nullable(),

  // 未会員Web予約情報
  dummy_web_reservation_type_cd: Yup.string().nullable(),
  dummy_web_reservation_select: Yup.string().nullable(),
  select_button_name1: Yup.string().nullable(),
  select_button_name2: Yup.string().nullable(),
  select_description1: Yup.string().nullable(),
  select_description2: Yup.string().nullable(),
  dummy_web_reservation_remove_time: Yup.number()
    .min(0, "0以上の値を入力してください")
    .nullable(),
  dummy_web_reservation_base_url: Yup.string().nullable(),
  dummy_web_reservation_back_button: Yup.string().nullable(),
});
// createとupdateが一緒だったら統合する
// export const medicalOrgUpdateSchema = Yup.object().shape({});

// 法定祝日設定は別で設定している？
export const LegalHolidayUpdateSchema = Yup.object().shape({});

export const OperationalInfoCreateSchema = Yup.object().shape({
  start_date: Yup.date().required(
    `表示期間(開始日)${validate.ValidMessageRequired}`
  ),
  start_time: Yup.string().required(
    `表示期間(開始時間)${validate.ValidMessageRequired}`
  ),
  end_date: Yup.date()
    .required(`表示期間(終了日)${validate.ValidMessageRequired}`)
    .min(
      returnPreDate(
        Yup.ref("start_date"),
        Yup.ref("end_date"),
        Yup.ref("start_time"),
        Yup.ref("end_time")
      ),
      "表示期間(終了日)は表示期間(開始日)より後に設定してください。"
    ),
  end_time: Yup.string().required(
    `表示期間(終了時間)${validate.ValidMessageRequired}`
  ),
  title: Yup.string().required(`タイトル${validate.ValidMessageRequired}`),
  content: Yup.string().required(`内容${validate.ValidMessageRequired}`),
});
// export const OperationalInfoUpdateSchema = Yup.object().shape({});

export const AccountCreateSchema = Yup.object({
  login_id: Yup.string().required(`ユーザーID${validate.ValidMessageRequired}`),
  name1: Yup.string().required(`氏名(姓)${validate.ValidMessageRequired}`),
  name2: Yup.string().required(`氏名(名)${validate.ValidMessageRequired}`),
  kana1: Yup.string().required(`かな(姓)${validate.ValidMessageRequired}`),
  kana2: Yup.string().required(`かな(名)${validate.ValidMessageRequired}`),
  auth_cd: Yup.string().required(`権限${validate.ValidMessageRequired}`),
  password: Yup.string()
    .min(4, validate.ValidMessagePassword)
    .required(`パスワード${validate.ValidMessageRequired}`),
  password2: Yup.string()
    .required(`パスワード(確認)${validate.ValidMessageRequired}`)
    .oneOf(
      [Yup.ref("password"), null],
      `パスワード${validate.ValidMessageMatch}`
    ),
}).shape({});
// export const AccountUpdateSchema = Yup.object().shape({});

export const UserSettingUpdateSchema = Yup.object().shape({
  name1: Yup.string().required(`氏名(姓)${validate.ValidMessageRequired}`),
  name2: Yup.string().required(`氏名(名)${validate.ValidMessageRequired}`),
  kana1: Yup.string().required(`かな(姓)${validate.ValidMessageRequired}`),
  kana2: Yup.string().required(`かな(名)${validate.ValidMessageRequired}`),
  password: Yup.string()
    .min(4, validate.ValidMessagePassword)
    .required(`パスワード${validate.ValidMessageRequired}`),
  password2: Yup.string()
    .required(`パスワード(確認)${validate.ValidMessageRequired}`)
    .oneOf(
      [Yup.ref("password"), null],
      `パスワード${validate.ValidMessageMatch}`
    ),
});

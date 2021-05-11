import { Button, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TextFieldParts from '../../atoms/share/TextFieldParts';
import SelectBoxParts from '../../atoms/share/SelectBoxParts';
import SeparateHr from '../../atoms/share/SeparateHr';
import KeyValuePair from '../../organisms/common/KeyValuePair';
import { createOrUpdateAspUsers, fetchAspUser, TAspUser } from '../../../services/AspUser';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { returnDatetimeString } from '../../../utils/DateUtil';
import { aspAuthCdSelectMenuItems, enumAspAuthCd } from '../../../const';
import CreateOrEditButton from '../../atoms/share/CreateOrEditButton';
import { string } from 'yup/lib/locale';
import { AccountCreateSchema, UserSettingUpdateSchema } from '../../../const/validation';
import { useSnackbar } from 'notistack';

interface Props {
  isEditPage: boolean;
  accountInfo?: any;
  isUserSettingPage?: boolean;
}

const AccountFormCard: React.FC<Props> = ({
  isEditPage = false,
  accountInfo = {},
  isUserSettingPage = false,
}) => {
  const router = useRouter();
  const [aspUser, setAspUser] = useState<TAspUser>({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      if (isEditPage && router.query.authAccountId) {
        const aspUser = await fetchAspUser(router.query.authAccountId as string);
        aspUser && setAspUser(aspUser);
        aspUser && formik.setValues(aspUser);
        aspUser &&
          aspUser.auth_cd &&
          formik.setFieldValue('auth_cd', enumAspAuthCd[aspUser.auth_cd]);
      }

      if (isUserSettingPage) {
        // 自分を取得するように設定する。（ローカルストレージのログイン情報より）
        const tbmAspUser = JSON.parse(localStorage.getItem('tbmAspUser'));
        const aspUser = await fetchAspUser(tbmAspUser.id as string);
        aspUser && setAspUser(aspUser);
        aspUser && formik.setValues(aspUser);
      }
    })();
  }, [router.query]);

  interface tempPassword {
    password2?: string;
  }
  const formik = useFormik<TAspUser & tempPassword>({
    initialValues: {
      auth_cd: '',
    },
    // なお、start_timeとend_timeを設定しないと、登録して表示時に99:99になるが、バリデーションで防げば問題ない。
    validationSchema: isUserSettingPage ? UserSettingUpdateSchema : AccountCreateSchema,
    onSubmit: async (values) => {
      // values.updated_at = returnDatetimeString(new Date());
      // TODO: パスワードの一致確認(この場所以外での実装でも可)

      // パスワード2はAPIでは不要という認識。
      delete values.updated_at;
      delete values.password2;
      const response = await createOrUpdateAspUsers(values);
      if (response) {
        localStorage.setItem('tbmAspUser', JSON.stringify(values));
        enqueueSnackbar(isEditPage ? '更新しました。' : '登録しました。', { variant: 'success' });
        router.push(isUserSettingPage ? '/user-setting' : '/auth-accounts');
      }
    },
  });

  return (
    <>
      <Card className="p-5 w-4/5">
        <ul className="flex flex-col space-y-2">
          {!isUserSettingPage && (
            <KeyValuePair
              keyName="ユーザーID"
              value={<TextFieldParts name="login_id" formik={formik} />}
            />
          )}
          <KeyValuePair
            keyName="氏名"
            value={
              <div className="flex">
                <TextFieldParts name="name1" formik={formik} />
                <div className="mr-3"></div>
                <TextFieldParts name="name2" formik={formik} />
              </div>
            }
          />
          <KeyValuePair
            keyName="かな"
            value={
              <div className="flex">
                <TextFieldParts name="kana1" formik={formik} />
                <div className="mr-3"></div>
                <TextFieldParts name="kana2" formik={formik} />
              </div>
            }
          />
          {!isUserSettingPage && (
            <KeyValuePair
              keyName="権限"
              value={
                <SelectBoxParts
                  name="auth_cd"
                  formik={formik}
                  menuItems={aspAuthCdSelectMenuItems}
                />
              }
            />
          )}
          <KeyValuePair
            keyName="パスワード"
            value={
              <TextFieldParts
                name="password"
                formik={formik}
                placeholder={isEditPage ? '変更する場合だけ入力' : ''}
                isPasswordForm={true}
              />
            }
          />
          <KeyValuePair
            keyName="パスワード(確認)"
            value={
              <TextFieldParts
                name="password2"
                formik={formik}
                placeholder={isEditPage ? '変更する場合だけ入力' : ''}
                isPasswordForm={true}
              />
            }
          />
          {isEditPage ? (
            <>
              <KeyValuePair keyName="登録日時" value={returnDatetimeString(aspUser.created_at)} />
              <KeyValuePair keyName="更新日時" value={returnDatetimeString(aspUser.updated_at)} />
            </>
          ) : (
            ''
          )}
        </ul>
        <SeparateHr />
        <div className="flex justify-end">
          <CreateOrEditButton isEditPage={isEditPage} formik={formik} />
        </div>
      </Card>
    </>
  );
};

export default AccountFormCard;

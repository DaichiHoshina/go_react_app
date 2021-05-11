import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TUser, TUserState } from "../../modules/User";
import { fetchUsers } from "../../services/User";
import {
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  TableContainer,
  TableHead,
  makeStyles,
  Link,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import PageReturnButton from "../../components/atoms/share/PageReturnButton";
import PageTitleParts from "../../components/atoms/share/PageTitleParts";
import RecordAddLinkButton from "../../components/atoms/share/RecordAddLinkButton";
import RedirectToListLink from "../../components/atoms/share/ReturnListLink";
import SeparateHr from "../../components/atoms/share/SeparateHr";
import UserDetailCard from "../../components/organisms/auth-account/UserDetailCard";

export const UsersContext = createContext<{
  users?: UsersApiInterface;
  setUsers?: any;
}>({});

export interface UsersApiInterface {
  tbm_users?: TUser[];
}

interface formType {
  name?: string;
  kana?: string;
  pref?: string;
  pic?: string;
  medical_org_id?: string;
  reservation_type_memo?: string;
  operating?: string;
  exist_interlock?: string;
  page?: number;
  per?: number;
  sorts: string[];
}

const UsersList: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: 1,
        per: 1,
      })
    );
  }, []);

  return (
    <Layout title="ユーザー詳細">
      <>
        <RedirectToListLink href="auth-accounts" linkName="アカウント一覧" />
        <PageTitleParts title="アカウント編集" />
        <div className="flex justify-end mb-5">
          <RecordAddLinkButton pathString="auth-accounts" />
        </div>

        <div className="flex justify-center">
          <UserDetailCard />
        </div>

        <SeparateHr />
        <PageReturnButton />
      </>
    </Layout>
  );
};

export default UsersList;

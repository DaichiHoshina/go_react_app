import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TUser, TUserState } from "../modules/User";
import { fetchUsers } from "../services/User";
import SampleMain from "../components/organisms/sample/SampleMain";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import Link from "next/link";

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

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { userState: TUserState }) => state);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: 1,
        per: 1,
      })
    );
  }, []);

  return (
    <>
      <TableBody>
        {state.userState?.users?.map((row, i) => {
          return (
            // <Link href={'/auth-accounts/' + row.userId} key={row.userId}>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              <TableCell>
                <Link href={"/auth-accounts/" + row.id}></Link>
              </TableCell>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      ;
    </>
  );
};

export default Home;

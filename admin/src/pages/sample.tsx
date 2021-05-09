import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TUser, TUserState } from "../modules/User";
import { fetchUsers } from "../services/User";
import {
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  TableContainer,
  TableHead,
} from "@material-ui/core";

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
    <div>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 140 }}>ユーザーID</TableCell>
                <TableCell style={{ minWidth: 140 }}>氏名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.userState?.users?.map((row) => {
                return (
                  // <Link href={'/auth-accounts/' + row.userId} key={row.userId}>
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Home;

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
import RecordAddLinkButton from "../../components/atoms/share/RecordAddLinkButton";

export const UsersContext = createContext<{
  users?: UsersApiInterface;
  setUsers?: any;
}>({});

export interface UsersApiInterface {
  tbm_users?: TUser[];
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
    <Layout title="User List">
      <div className="flex justify-end mb-5">
        <RecordAddLinkButton pathString="users" />
      </div>
      <Paper className={classes.root}>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 140 }}>id</TableCell>
                <TableCell style={{ minWidth: 140 }}>name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.userState?.users?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <Link href={"/users/" + row.id} key={row.id}>
                        <a className="text-blue-600">{row.id}</a>
                      </Link>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Layout>
  );
};

export default UsersList;

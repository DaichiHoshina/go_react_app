import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from '@material-ui/lab';
import Link from 'next/link';
import { MenuItem, Select } from '@material-ui/core';
import SelectBoxParts from '../../atoms/share/SelectBoxParts';
import { useFormik } from 'formik';
import { AspUsersContext } from '../../templates/account/AccountListArea';
import { enumAspAuthCdString } from '../../../const';
import { TablePaginationSet } from '../medicalInstitutions/MedicalInstitutionListTable';
import { joinName } from '../../../utils/String';
interface Data {
  userId: string;
  fullname: string;
  auth: string;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

interface Props {
  formik?: ReturnType<typeof useFormik>;
}

const AspUsersListTable: React.FC<Props> = ({ formik }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState('20');

  const aspUsersContext = useContext(AspUsersContext);
  const pagination = aspUsersContext.aspUsers?.pagination;

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 140 }}>ユーザーID</TableCell>
                <TableCell style={{ minWidth: 140 }}>氏名</TableCell>
                <TableCell style={{ minWidth: 140 }}>権限</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aspUsersContext.aspUsers?.tbm_asp_users?.map((row, i) => {
                return (
                  // <Link href={'/auth-accounts/' + row.userId} key={row.userId}>
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <Link href={'/auth-accounts/' + row.id}>
                        <a className="text-blue-600">{row.login_id}</a>
                      </Link>
                    </TableCell>
                    <TableCell>{joinName(row?.name1, row?.name2)}</TableCell>
                    <TableCell>{row?.auth_cd && enumAspAuthCdString[row?.auth_cd]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="mt-5">
        <TablePaginationSet formik={formik} pagination={pagination} />
      </div>
    </div>
  );
};

export default AspUsersListTable;

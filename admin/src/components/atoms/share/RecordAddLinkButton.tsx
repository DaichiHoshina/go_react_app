import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Link from 'next/link';

import React from 'react';

interface Props {
  pathString: string;
}

const RecordAddLinkButton: React.FC<Props> = ({ pathString = '' }) => {
  return (
    <Link href={'/' + pathString + '/new'}>
      <Button variant="contained" color="primary" startIcon={<Add />} className="flex">
        新規作成
      </Button>
    </Link>
  );
};

export default RecordAddLinkButton;

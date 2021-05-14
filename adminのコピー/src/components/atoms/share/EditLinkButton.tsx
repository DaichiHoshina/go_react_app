import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

interface Props {
  // urlにidがあるページでは設定不要。
  id?: number;
}

const EditLinkButton: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  // asPathではクエリがついている可能性もあるので、クエリ部削除。
  const editPath = router.asPath.split('?')[0] + (id ? `/${id}` : '') + '/edit';

  return (
    <>
      <Link href={editPath}>
        <Button variant="contained" color="primary">
          編集
        </Button>
      </Link>
    </>
  );
};

export default EditLinkButton;

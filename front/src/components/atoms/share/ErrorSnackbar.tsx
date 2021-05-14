import React, { useEffect, useState } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { Button } from '@material-ui/core';

// トースト表示発火用のコンポーネント。
// トースト発火のたまにもうちょっとうまいやり方がある気もする。
const ErrorSnackbar: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(handleClickVariant('error', 'message'), []);
  return <></>;
};

export default ErrorSnackbar;

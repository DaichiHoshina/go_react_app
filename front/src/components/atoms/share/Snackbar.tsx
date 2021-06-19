import { useSnackbar, VariantType } from "notistack";
import React, { createContext, useContext, useEffect, useState } from "react";

const DisplaySnackbar: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar() || {};

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  return <></>;
};
export default DisplaySnackbar;

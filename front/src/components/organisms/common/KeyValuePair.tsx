import React from "react";

interface Props {
  keyName: string;
  value?: number | string | JSX.Element | null;
  keyClass?: string;
  valueClass?: string;
}

const Div = () => <div />;

const KeyValuePair: React.FC<Props> = ({
  keyName = "",
  value = <Div />,
  keyClass = "w-1/3",
  valueClass = "w-2/3",
}) => {
  if (!value) value = "-";
  return (
    <>
      <li className="flex w-full">
        <p className={keyClass}>{keyName}</p>
        <div className={valueClass}>{value}</div>
      </li>
    </>
  );
};

export default KeyValuePair;

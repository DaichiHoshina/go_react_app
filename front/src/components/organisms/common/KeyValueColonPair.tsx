import React from "react";

interface Props {
  keyName: string;
  value: string | JSX.Element;
  className?: string;
  keyClassName?: string;
  valueClassName?: string;
}

const Div = () => <div />;

const KeyValueColonPair: React.FC<Props> = ({
  keyName = "",
  value = <Div />,
  className = "",
  keyClassName = "w-48",
  valueClassName = "bg-gray-700",
}) => {
  return (
    <>
      <li className={className}>
        <p className={keyClassName}>
          {keyName}
          <span className="mx-3">:</span>
        </p>

        <div className={valueClassName}>{value}</div>
      </li>
    </>
  );
};

export default KeyValueColonPair;

import React from 'react';

interface Props {
  title: string;
}

const PageTitleParts: React.FC<Props> = ({ title = '' }) => {
  return (
    <div className="mb-5">
      <h1 className="text-2lxpy-3 pb-3">
        <span className="mr-2 text-gray-500">●</span>
        {title}
      </h1>
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default PageTitleParts;

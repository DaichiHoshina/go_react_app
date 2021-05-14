import React from 'react';

interface Props {
  title: string;
}

const CategoryTitle: React.FC<Props> = ({ title = '' }) => {
  return (
    <>
      <h2 className="mb-8 pl-5 text-lg border-b border-l-8 border-gray-600">{title}</h2>
    </>
  );
};

export default CategoryTitle;

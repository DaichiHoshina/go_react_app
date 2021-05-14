import React from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  linkName: string;
}

const RedirectToListLink: React.FC<Props> = ({ href = '', linkName = '' }) => {
  return (
    <>
      <Link href={'/' + href}>
        <a className="text-blue-600 text-xs">&gt;&gt; {linkName}</a>
      </Link>
    </>
  );
};

export default RedirectToListLink;

import React from 'react';
import { ReactNode } from 'react';
import Head from 'next/head';

const SampleTemplate = (props: { title: string; children?: ReactNode }): JSX.Element => {
  return (
    <div className="staff-month">
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{props.children}</main>
    </div>
  );
};

export default SampleTemplate;

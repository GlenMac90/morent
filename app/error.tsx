'use client';

import React from 'react';

type Props = {
  error: {
    message: string;
  };
};

const error = ({ error }: Props) => {
  console.log(error);
  return <div>{error.message}</div>;
};

export default error;

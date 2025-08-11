import React from 'react';

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <p>{message}</p>;
};

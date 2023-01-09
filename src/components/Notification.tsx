import React from 'react';
import { Error } from '../types/Error';

type Props = {
  error: Error,
};

export const Notification: React.FC<Props> = ({ error }) => {
  const { type, message } = error;

  return (
    type ? (
      <p data-cy={type}>{message}</p>
    ) : (
      <p>{message}</p>
    )
  );
};

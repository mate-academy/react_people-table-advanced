/* eslint-disable max-len */
import React from 'react';
import { ErrorMessages } from './PeoplePage';

interface ErrorComponentProps {
  message: ErrorMessages;
  [key: string]: string | ErrorMessages;
}

export function ErrorComponent({ message }: ErrorComponentProps) {
  const key = Object.keys(message)[0] as keyof ErrorMessages;

  return <p data-cy={key}>{message[key]}</p>;
}

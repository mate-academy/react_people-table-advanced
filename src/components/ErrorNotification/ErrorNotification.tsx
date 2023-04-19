import { FC } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  message: Errors,
  'dataCy'?: string,
};

export const ErrorNotification: FC<Props> = ({ message, dataCy }) => (
  <p data-cy={dataCy}>
    {message}
  </p>
);

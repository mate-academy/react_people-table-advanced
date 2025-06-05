import { FC } from 'react';

interface Props {
  errorMessage: string;
  dataCy: string;
}

export const ErrorNotification: FC<Props> = ({ errorMessage, dataCy }) => (
  <p data-cy={dataCy} className="has-text-danger">
    {errorMessage}
  </p>
);

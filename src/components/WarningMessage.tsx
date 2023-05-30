import { FC } from 'react';
import { WarningType } from '../types/WarningType';

type Props = {
  message: string;
};

export const WarningMessage: FC<Props> = ({ message }) => (
  <p
    data-cy={(message === WarningType.SERVER && 'peopleLoadingError')
      || (message === WarningType.NOPEOPLE && 'noPeopleMessage')}
  >
    {message}
  </p>
);

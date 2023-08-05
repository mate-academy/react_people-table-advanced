// eslint-disable-next-line no-lone-blocks
import React from 'react';
import { NotificationMessage } from '../types/NotificationMessage';

interface Props {
  type: NotificationMessage;
}

export const Notification: React.FC<Props> = ({ type }) => {
  const dataCy = (type === NotificationMessage.peopleLoadingError)
    ? 'peopleLoadingError'
    : 'noPeopleMessage';

  return (
    <p data-cy={dataCy} className="has-text-danger">
      {type}
    </p>
  );
};

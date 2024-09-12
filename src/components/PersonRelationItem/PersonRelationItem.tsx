import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../../types';
import { URLS } from '../../enums/URLS';
import { findPersonSlugByName } from '../../helpers/helpers';

interface Props {
  keyValue: string | null;
  woman?: string | null;
  peopleList: Person[];
}

export const PersonRelationItem: FC<Props> = ({
  keyValue,
  woman,
  peopleList,
}) => {
  const slugValue = findPersonSlugByName(keyValue, peopleList);

  if (keyValue) {
    if (slugValue) {
      return (
        <Link
          className={woman ? 'has-text-danger' : ''}
          to={`${URLS.people}/${slugValue}`}
        >
          {keyValue}
        </Link>
      );
    }

    return `${keyValue}`;
  }

  return '-';
};

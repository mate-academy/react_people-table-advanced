import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import ScrollIntoView from 'react-scroll-into-view';
import { Person } from '../../../types/Person';

import './PersonName.scss';

interface Props {
  person: Person,
}

export const PersonName: React.FC<Props> = ({ person }) => {
  const searchParams = useLocation().search;

  return (
    <ScrollIntoView
      selector=".person--active"
      scrollOptions={{
        block: 'nearest',
        behavior: 'smooth',
      }}
      onClick={(event) => event.preventDefault()}
    >
      <Link
        to={{
          pathname: `${person.slug}`,
          search: searchParams,
        }}
        className={classNames('person', {
          male: person.sex === 'm',
          female: person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    </ScrollIntoView>
  );
};

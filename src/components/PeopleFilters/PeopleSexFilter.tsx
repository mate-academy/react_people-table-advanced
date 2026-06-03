import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

const sexFilter = [
  { text: 'All', value: undefined },
  { text: 'Male', value: 'm' },
  { text: 'Female', value: 'f' },
] as const;

export const PeopleSexFilter: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSexFilter = searchParams.get('sex');

  function getSexLink(filterValue?: Person['sex']) {
    const params = new URLSearchParams(searchParams);

    if (filterValue) {
      params.set('sex', filterValue);
    } else {
      params.delete('sex');
    }

    return {
      pathname: `/people${slug ? `/${slug}` : ''}`,
      search: params.toString(),
    };
  }

  function getSexFilterActive(key?: Person['sex']) {
    if (!currentSexFilter && !key) {
      return true;
    }

    return currentSexFilter === key;
  }

  return (
    <>
      {sexFilter.map(item => (
        <Link
          key={item.text}
          className={cn({
            'is-active': getSexFilterActive(item.value),
          })}
          to={getSexLink(item.value)}
        >
          {item.text}
        </Link>
      ))}
    </>
  );
};

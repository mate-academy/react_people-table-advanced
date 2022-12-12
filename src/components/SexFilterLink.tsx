import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  gender: string | null;
  group: string;
};

export const SexFilterLink: React.FC<Props> = ({ gender, group }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;

  return (
    <Link
      className={classNames({ 'is-active': sex === gender })}
      to={{ search: getSearchWith(searchParams, { sex: gender }) }}
    >
      {group}
    </Link>
  );
};

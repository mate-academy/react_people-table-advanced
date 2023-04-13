import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchParamsContext } from '../SearchParamsContext';
import { Sex } from '../../types/Sex';

type Props = {
  value: Sex,
  text: string,
};

export const SexFilterLink: React.FC<Props> = ({ value, text }) => {
  const { searchParams } = useContext(SearchParamsContext);

  const sex = searchParams.get('sex') || Sex.All;

  return (
    <Link
      className={classNames(
        { 'is-active': sex === value },
      )}
      to={{
        search: getSearchWith(searchParams, { sex: value || null }),
      }}
    >
      {text}
    </Link>
  );
};

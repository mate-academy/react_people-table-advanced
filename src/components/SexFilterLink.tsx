import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  sexType: string | null;
  text: string;
};

export const SexFilterLink = React.memo<Props>(({ sexType, text }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <Link
      className={classNames({ 'is-active': sex === sexType })}
      to={{ search: getSearchWith(searchParams, { sex: sexType }) }}
    >
      {text}
    </Link>
  );
});

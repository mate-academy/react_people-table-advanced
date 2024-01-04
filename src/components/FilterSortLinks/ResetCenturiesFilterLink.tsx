import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import SearchParam from '../../constants/searchParam';

export const ResetCenturiesFilterLink: React.FC = () => {
  const [searchParams] = useSearchParams();

  const classes = classNames(
    'button is-outlined',
    { 'is-success': !searchParams.has(SearchParam.Centuries) },
  );

  const searchPath = {
    search: getSearchWith(searchParams, { [SearchParam.Centuries]: null }),
  };

  return (
    <Link
      to={searchPath}
      className={classes}
      data-cy="centuryALL"
    >
      All
    </Link>
  );
};

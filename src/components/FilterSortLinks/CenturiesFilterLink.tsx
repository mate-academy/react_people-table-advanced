import React, { memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import SearchParam from '../../constants/searchParam';

interface Props {
  century: number;
}

export const CenturiesFilterLink: React.FC<Props> = memo(({ century }) => {
  const [searchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll(SearchParam.Centuries);
  const centuryIsSelected = selectedCenturies.includes(`${century}`);

  const getClasses = () => {
    return classNames(
      'button',
      'mr-1',
      { 'is-info': centuryIsSelected },
    );
  };

  const getSearchPath = () => {
    const newSelectedCenturies = centuryIsSelected
      ? selectedCenturies.filter(currCentury => +currCentury !== century)
      : [...selectedCenturies, century.toString()];

    const newParam = { [SearchParam.Centuries]: newSelectedCenturies };

    return {
      search: getSearchWith(searchParams, newParam),
    };
  };

  return (
    <Link
      to={getSearchPath()}
      className={getClasses()}
      data-cy="century"
    >
      {century}
    </Link>
  );
});

import React, { memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import Sex from '../../constants/Sex';
import SearchParam from '../../constants/searchParam';

interface Props {
  sex: Sex,
}

export const SexFilterLink: React.FC<Props> = memo(({ sex }) => {
  const [searchParams] = useSearchParams();

  const getClasses = () => {
    return searchParams.get(SearchParam.Sex) === sex ? 'is-active' : '';
  };

  const getSearchPath = () => {
    const newParam = {
      [SearchParam.Sex]: sex === Sex.All ? null : sex,
    };

    return {
      search: getSearchWith(searchParams, newParam),
    };
  };

  const showTextFor = (currentSex: Sex) => currentSex === sex;

  return (
    <Link
      to={getSearchPath()}
      className={getClasses()}
    >
      {showTextFor(Sex.All) && 'All'}
      {showTextFor(Sex.Male) && 'Male'}
      {showTextFor(Sex.Female) && 'Female'}
    </Link>
  );
});

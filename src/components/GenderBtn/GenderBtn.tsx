import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

type Props = {
  filter: string;
};

const getCurrentGender = (filter: string) => {
  switch (filter) {
    case 'Male':
      return 'm';
    case 'Female':
      return 'f';
    default:
      return '';
  }
};

const getActiveGender = (searchParam: string | null) => {
  switch (searchParam) {
    case 'f':
      return 'Female';
    case 'm':
      return 'Male';
    default:
      return 'All';
  }
};

export const GenderBtn: React.FC<Props> = ({ filter }) => {
  const { searchParams, setSearchParams } = useContext(AppContext);
  const currentGender = getCurrentGender(filter);

  const handleChangeFilter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (!currentGender) {
      params.delete('sex');
    } else {
      params.set('sex', currentGender);
    }

    setSearchParams(params);
  };

  return (
    <Link
      onClick={e => handleChangeFilter(e)}
      className={classNames({
        'is-active': getActiveGender(searchParams.get('sex')) === filter,
      })}
      to={{
        pathname: '/people',
        search: searchParams.toString(),
      }}
    >
      {filter}
    </Link>
  );
};

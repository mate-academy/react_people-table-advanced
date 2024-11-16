import classNames from 'classnames';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SexFilter = () => {
  const [filterBySex, setFilterBySex] = useState<string>('all');
  const location = useLocation();
  const navigate = useNavigate();

  const handleFilterChange = (sex: string) => {
    const searchParams = new URLSearchParams(location.search);

    if (sex === 'all') {
      searchParams.delete('sex');
    } else {
      searchParams.set('sex', sex);
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
    setFilterBySex(sex);
  };

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <a
        className={classNames('is-active', {
          'is-active': filterBySex === 'all',
        })}
        href="#/people"
        onClick={() => handleFilterChange('all')}
      >
        All
      </a>
      <a
        className={classNames('is-active', {
          'is-active': filterBySex === 'm',
        })}
        href="#/people?sex=m"
        onClick={() => handleFilterChange('m')}
      >
        Male
      </a>
      <a
        className={classNames('is-active', {
          'is-active': filterBySex === 'f',
        })}
        href="#/people?sex=f"
        onClick={() => handleFilterChange('f')}
      >
        Female
      </a>
    </p>
  );
};

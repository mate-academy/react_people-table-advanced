import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

export const SexFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sex', value);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  return (
    <div className="field" data-cy="sex-filter">
      <div className="tabs is-centered">
        <ul>
          <li className={classNames({ 'is-active': !sex })}>
            <a onClick={() => handleChange('')}>All</a>
          </li>

          <li className={classNames({ 'is-active': sex === 'm' })}>
            <a onClick={() => handleChange('m')}>Male</a>
          </li>

          <li className={classNames({ 'is-active': sex === 'f' })}>
            <a onClick={() => handleChange('f')}>Female</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

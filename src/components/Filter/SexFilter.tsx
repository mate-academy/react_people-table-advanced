import { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { sexFilters } from '../../utils/data';

export const SexFilter: FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexFilters.map(({ title, params }) => (
        <SearchLink
          key={title}
          params={params}
          title={title}
          className={classNames({
            'is-active': sex === params.sex,
          })}
        />
      ))}
    </p>
  );
};

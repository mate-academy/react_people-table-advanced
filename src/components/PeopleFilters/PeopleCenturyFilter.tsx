import React from 'react';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const centuries = ['16', '17', '18', '19', '20'] as const;

export const PeopleCenturyFilter: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');

  function getCenturiesLink(century: string) {
    const params = new URLSearchParams(searchParams);

    if (selectedCenturies.includes(century)) {
      const next = selectedCenturies.filter(item => item !== century);

      params.delete('centuries');

      next.forEach(item => params.append('centuries', item));
    } else {
      params.append('centuries', century);
    }

    return {
      pathname: `/people${slug ? `/${slug}` : ''}`,
      search: params.toString(),
    };
  }

  function getAlllink() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    return {
      pathname: `/people${slug ? `/${slug}` : ''}`,
      search: params.toString(),
    };
  }

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {centuries.map(century => (
          <Link
            key={century}
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': selectedCenturies.includes(century),
            })}
            to={getCenturiesLink(century)}
          >
            {century}
          </Link>
        ))}
      </div>

      <div className="level-right ml-4">
        <Link
          data-cy="centuryALL"
          className={cn('button is-success', {
            'is-outlined': selectedCenturies.length === 0,
          })}
          to={getAlllink()}
        >
          All
        </Link>
      </div>
    </div>
  );
};

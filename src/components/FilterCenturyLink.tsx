import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  century: string,
};

export const FilterCenturyLink: React.FC<Props> = ({ century }) => {
  const [searchParams] = useSearchParams();
  const centuriesParams = searchParams.getAll('centuries') || [];

  return (
    <Link
      data-cy="century"
      className={classNames('button mr-1', {
        'is-info': centuriesParams.includes(century),
      })}
      to={{
        search: getSearchWith(searchParams, {
          centuries: centuriesParams.includes(century)
            ? centuriesParams.filter(c => c !== century)
            : [...centuriesParams, century],
        }),
      }}
    >
      {century}
    </Link>
  );
};

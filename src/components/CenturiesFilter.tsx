import { Link } from 'react-router-dom';
import cN from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  century: string;
  searchParams: URLSearchParams;
}

export const CenturiesFilter: React.FC<Props> = ({ century, searchParams }) => {
  function getCenturiesFilterLink(centuryValue: string) {
    const currentCenturies = searchParams.getAll('centuries');

    const updatedParams = currentCenturies.includes(centuryValue)
      ? currentCenturies.filter(centuriesItem => centuriesItem !== centuryValue)
      : [...currentCenturies, centuryValue];

    return {
      search: getSearchWith({ centuries: updatedParams }, searchParams),
    };
  }

  return (
    <Link
      data-cy="century"
      className={cN('button mr-1', {
        'is-info': searchParams.getAll('centuries').includes(century),
      })}
      to={getCenturiesFilterLink(century)}
    >
      {century}
    </Link>
  );
};

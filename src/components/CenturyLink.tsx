import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

export const CenturyLink: React.FC<{ century: number }> = ({ century }) => {
  const [searchParams] = useSearchParams();
  const centuries
    = (searchParams.getAll('centuries')).map((element) => Number(element));

  const getSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const newCenturies = centuries.includes(century)
      ? centuries.filter((cntry) => cntry !== century)
      : [...centuries, century];

    newSearchParams.delete('centuries');

    newCenturies.forEach((cntry) => {
      newSearchParams.append('centuries', (cntry).toString());
    });

    return newSearchParams.toString();
  };

  return (
    <div className="level-left">
      <Link
        data-cy="century"
        className={classNames(
          'button mr-1',
          { 'is-info': centuries.includes(century) },
        )}
        to={{ search: getSearch() }}
      >
        {century}
      </Link>
    </div>
  );
};

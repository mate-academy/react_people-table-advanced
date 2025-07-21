import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

type Props = {
  century: number;
};

export const CenturyBtn: React.FC<Props> = ({ century }) => {
  const { searchParams, setSearchParams } = useContext(AppContext);
  const { pathname } = useLocation();

  const handleAddParams = () => {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    if (currentCenturies.includes(`${century}`)) {
      const newCenturies = currentCenturies.filter(c => c !== `${century}`);

      params.delete('centuries');
      newCenturies.forEach(cent => params.append('centuries', cent));
    } else {
      params.append('centuries', `${century}`);
    }

    setSearchParams(params);
  };

  return (
    <Link
      onClick={e => {
        e.preventDefault();
        handleAddParams();
      }}
      data-cy="century"
      className={classNames('button mr-1', {
        'is-info': searchParams.getAll('centuries').includes(`${century}`),
      })}
      to={{
        pathname,
        search: searchParams.toString(),
      }}
    >
      {century}
    </Link>
  );
};

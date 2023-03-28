import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/sex';
import { Filter } from '../types/Filter';

export const SexLink: React.FC<{ sex: Sex }> = ({ sex }) => {
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get(('sex')) || 'all';

  const getSearchWithSex = () => {
    searchParams.set('sex', sex);

    return searchParams.toString();
  };

  return (
    <Link
      className={classNames(
        { 'is-active': currentSex === sex },
      )}
      to={{
        search: getSearchWithSex(),
      }}
    >
      {sex === Filter.ALL && ('All')}
      {sex === Filter.MALE && ('Male')}
      {sex === Filter.FEMALE && ('Female')}
    </Link>
  );
};

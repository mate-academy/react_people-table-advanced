import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  sex: string | null;
  searchParams: URLSearchParams;
}

export const SexFilterPanel:React.FC<Props> = ({ sex, searchParams }) => {
  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <Link
        className={cn({ 'is-active': !sex })}
        to={{
          search: getSearchWith(searchParams, { sex: null }),
        }}
      >
        All
      </Link>
      <Link
        className={cn({ 'is-active': sex === 'm' })}
        to={{
          search: getSearchWith(searchParams, { sex: 'm' }),
        }}
      >
        Male
      </Link>
      <Link
        className={cn({ 'is-active': sex === 'f' })}
        to={{
          search: getSearchWith(searchParams, { sex: 'f' }),
        }}
      >
        Female
      </Link>
    </p>
  );
};

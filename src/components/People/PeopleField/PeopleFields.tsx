/* eslint-disable @typescript-eslint/indent */
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink';

type Props = {
  table:
    | {
        value: string;
        param: string;
      }
    | {
        value: string;
        param?: undefined;
      };
};

const PeopleFields = ({ table }: Props) => {
  const { value, param } = table;

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const sortParams = (par: string) => {
    if (sortField === par && !sortOrder) {
      return { sort: par, order: 'desc' };
    } else if (sortField !== par) {
      return { sort: par, order: null };
    }

    return { sort: null, order: null };
  };

  const getClassName = (par: string) => {
    if (sortField === par && !sortOrder) {
      return 'fas fa-sort-up';
    } else if (sortField === par && sortOrder) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <th>
      {param ? (
        <span className="is-flex is-flex-wrap-nowrap">
          {value}
          <SearchLink params={sortParams(param)}>
            <span className="icon">
              <i className={getClassName(param)} />
            </span>
          </SearchLink>
        </span>
      ) : (
        value
      )}
    </th>
  );
};

export default PeopleFields;

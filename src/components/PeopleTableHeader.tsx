import { SearchLink } from './SearchLink';
import classNames from 'classnames';

interface Props {
  sort: string | null;
  order: string;
}

export const PeopleTableHeader: React.FC<Props> = ({ sort, order }) => {
  const getSortParams = (field: string): Record<string, string | null> => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SearchLink
              params={getSortParams('name')}
              className={classNames({ 'is-active': sort === 'name' })}
            >
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'name',
                    'fa-sort-up': sort === 'name' && order !== 'desc',
                    'fa-sort-down': sort === 'name' && order === 'desc',
                  })}
                />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SearchLink
              params={getSortParams('sex')}
              className={classNames({ 'is-active': sort === 'sex' })}
            >
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'sex',
                    'fa-sort-up': sort === 'sex' && order !== 'desc',
                    'fa-sort-down': sort === 'sex' && order === 'desc',
                  })}
                />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SearchLink
              params={getSortParams('born')}
              className={classNames({ 'is-active': sort === 'born' })}
            >
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'born',
                    'fa-sort-up': sort === 'born' && order !== 'desc',
                    'fa-sort-down': sort === 'born' && order === 'desc',
                  })}
                />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SearchLink
              params={getSortParams('died')}
              className={classNames({ 'is-active': sort === 'died' })}
            >
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'died',
                    'fa-sort-up': sort === 'died' && order !== 'desc',
                    'fa-sort-down': sort === 'died' && order === 'desc',
                  })}
                />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};

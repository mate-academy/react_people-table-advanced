import { StringParam, useQueryParams } from 'use-query-params';
import { Person } from '../types';
import { TableRow } from './TableRow';
import { Icon } from './Icon/Icon';
import { SortEnum } from '../types/SortEnum';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useQueryParams({
    sort: StringParam,
    order: StringParam,
  });

  const handleSortFilter = (
    sortBy: string | null,
  ) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (!sortBy) {
      setSearchParams({
        sort: null,
        order: null,
      });

      return;
    }

    if (searchParams.sort !== sortBy) {
      setSearchParams({
        sort: sortBy,
        order: null,
      });

      return;
    }

    if (!searchParams.order) {
      setSearchParams({
        order: 'desc',
      });

      return;
    }

    if (searchParams.order) {
      setSearchParams({
        order: null,
        sort: null,
      });
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#/people?sort=name"
                onClick={handleSortFilter(SortEnum.Name)}
              >
                <span className="icon">
                  <Icon sortBy={SortEnum.Name} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={handleSortFilter(SortEnum.Sex)}
              >
                <span className="icon">
                  <Icon sortBy={SortEnum.Sex} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={handleSortFilter(SortEnum.Born)}
              >
                <span className="icon">
                  <Icon sortBy={SortEnum.Born} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={handleSortFilter(SortEnum.Died)}
              >
                <span className="icon">
                  <Icon sortBy={SortEnum.Died} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <TableRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

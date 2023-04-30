import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';
import { SortType } from '../types/SortType';

type Props = {
  people: Person[],
  slug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

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
              <SearchLink params={{
                sort: sort === SortType.NAME && order ? null : SortType.NAME,
                order: sort === SortType.NAME && !order ? 'desc' : null,
              }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{
                sort: sort === SortType.SEX && order ? null : SortType.SEX,
                order: sort === SortType.SEX && !order ? 'desc' : null,
              }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{
                sort: sort === SortType.BORN && order ? null : SortType.BORN,
                order: sort === SortType.BORN && !order ? 'desc' : null,
              }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{
                sort: sort === SortType.DIED && order ? null : SortType.DIED,
                order: sort === SortType.DIED && !order ? 'desc' : null,
              }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
            slug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};

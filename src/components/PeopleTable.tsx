import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface Props {
  people: Person[]
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const toggleSort = (type: string): SearchParams => {
    if (sort === type) {
      if (order === 'desc') {
        return { sort: null, order: null };
      }

      return { order: 'desc' };
    }

    return { sort: type, order: null };
  };

  const getLinkClass = (type: string) => {
    if (sort === type) {
      if (order === 'desc') {
        return 'fas fa-sort-down';
      }

      return 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  };

  const getCentury = (year: number) => Math.ceil(year / 100);

  const filteredPeople = [...people]
    .sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;

        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;

        case 'born':
          result = a.born - b.born;
          break;

        case 'died':
          result = a.died - b.died;
          break;

        default:
          result = 0;
          break;
      }

      return order === 'desc' ? -result : result;
    })
    .filter((person) => {
      return person.name.toLowerCase().includes(query.toLowerCase())
        && person.sex.includes(sex)
        && (centuries.length
          ? centuries.includes(`${getCentury(person.born)}`)
          : true);
    });

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
              <SearchLink
                params={toggleSort('name')}
              >
                <span className="icon">
                  <i className={getLinkClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={toggleSort('sex')}
              >
                <span className="icon">
                  <i className={getLinkClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={toggleSort('born')}
              >
                <span className="icon">
                  <i className={getLinkClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={toggleSort('died')}
              >
                <span className="icon">
                  <i className={getLinkClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map((person) => (
          <PersonLink person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};

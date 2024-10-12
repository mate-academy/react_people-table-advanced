import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortPeople = [...people].sort((p1, p2) => {
    switch (sort) {
      case 'name':
        return order
          ? p1.name.localeCompare(p2.name)
          : p2.name.localeCompare(p1.name);
      case 'sex':
        return order
          ? p1.sex.localeCompare(p2.sex)
          : p2.sex.localeCompare(p1.sex);
      case 'born':
        return order ? p1.born - p2.born : p2.born - p1.born;
      case 'died':
        return order ? p1.died - p2.died : p2.died - p1.died;
      default:
        return 0;
    }
  });

  const filteredPeople = sortPeople.filter(person => {
    const matchesName =
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    const matchesSex = !sex || person.sex === sex;

    const century = person.born ? Math.ceil(person.born / 100) : null;
    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(century));

    return matchesName && matchesSex && matchesCentury;
  });

  const showPeople = filteredPeople.map(person => {
    return <PersonLink person={person} people={people} key={person.slug} />;
  });

  const getIconClassName = (sortKey: string) =>
    cn('fas', {
      'fa-sort-up': sort === sortKey && order === 'desc',
      'fa-sort-down': sort === sortKey && order !== 'desc',
      'fa-sort': sort !== sortKey,
    });

  const setParams = (sortKey: string) => {
    if (sort !== sortKey) {
      return { sort: sortKey, order: '' };
    }

    if (order === '') {
      return { sort: sortKey, order: 'desc' };
    }

    return { sort: null, order: null };
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
              <SearchLink params={setParams('name')}>
                <span className="icon">
                  <i className={getIconClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={setParams('sex')}>
                <span className="icon">
                  <i className={getIconClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={setParams('born')}>
                <span className="icon">
                  <i className={getIconClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={setParams('died')}>
                <span className="icon">
                  <i className={getIconClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>{showPeople}</tbody>
    </table>
  );
};

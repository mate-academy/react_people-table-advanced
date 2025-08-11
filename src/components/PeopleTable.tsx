import { Link, useParams, useSearchParams } from 'react-router-dom';
import { EnrichPerson, Person } from '../types';
import classNames from 'classnames';
import { TableColumn } from './TableColumn';

type Props = {
  people: EnrichPerson[];
};

const COLUMNS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  function filterPeople(fullPeople: EnrichPerson[]) {
    const sexFilter = searchParams.get('sex');
    const queryFilter = searchParams.get('query')?.toLowerCase();
    const centuryFilter = searchParams.getAll('century');

    return fullPeople.filter(person => {
      const filteredBySex = !sexFilter || person.sex === sexFilter;
      const filteredByQuery =
        !queryFilter || person.name.toLowerCase().includes(queryFilter!);

      const century = Math.ceil(person.died / 100);
      const filteredByCentury =
        !centuryFilter.length || centuryFilter.includes(century.toString());

      return filteredByQuery && filteredBySex && filteredByCentury;
    });
  }

  function sortPeopleBy(allPeople: EnrichPerson[]) {
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order') || 'asc';

    if (!sortField || !sortOrder) {
      return allPeople;
    }

    const sortedPeople = [...allPeople].sort((a, b) => {
      const valueA = a[sortField as keyof Person] ?? '';
      const valueB = b[sortField as keyof Person] ?? '';

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : 1;
      }

      return 0;
    });

    return sortedPeople;
  }

  const isPersoninList = (slug: string | undefined) => {
    const result = people.some(person => person.slug === slug);

    return result;
  };

  const sortedAndFilteredPeople = sortPeopleBy(filterPeople(people));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => (
            <TableColumn columnName={column} key={column} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedAndFilteredPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <>
                  {isPersoninList(person.mother?.slug) ? (
                    <Link
                      className="has-text-danger"
                      to={`../${person.mother?.slug}`}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )}
                </>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <>
                  {isPersoninList(person.father?.slug) ? (
                    <Link to={`../${person.father?.slug}`}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )}
                </>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

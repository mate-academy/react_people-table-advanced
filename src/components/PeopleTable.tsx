import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { usePersons } from './PeopleContext/PeopleContext';
import { NoPeopleMatching } from './NoPeopleMatching';

type SortKey = 'name' | 'sex' | 'born' | 'died';

type Order = 'asc' | 'desc';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { slug } = useParams();
  const { people, loading } = usePersons();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const sort = searchParams.get('sort') as SortKey | null;
  const order = searchParams.get('order') as Order | null;

  const sectionsTable: { label: string; key?: SortKey }[] = [
    { label: 'Name', key: 'name' },
    { label: 'Sex', key: 'sex' },
    { label: 'Born', key: 'born' },
    { label: 'Died', key: 'died' },
    { label: 'Mother' },
    { label: 'Father' },
  ];

  function toggleSort(value: SortKey) {
    const params = new URLSearchParams(searchParams);

    if (sort !== value) {
      params.set('sort', value);
      params.set('order', 'asc');
    } else if (order === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  const allCenturies = searchParams.getAll('centuries');
  const getSex = searchParams.get('sex');

  const filteredPeople = people.filter(p => {
    const bornCentury = Math.floor(p.born / 100) + 1;
    const matchesCentuiries =
      allCenturies.includes(String(bornCentury)) || allCenturies.length === 0;

    const matchesSex = !getSex || getSex === p.sex;

    const matchesQuery =
      !query ||
      p.name?.toLowerCase().includes(query) ||
      p.motherName?.toLowerCase().includes(query) ||
      p.fatherName?.toLowerCase().includes(query);

    return matchesCentuiries && matchesSex && matchesQuery;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      if (sort === 'name' || sort === 'sex') {
        return order === 'desc'
          ? b[sort].localeCompare(a[sort])
          : a[sort].localeCompare(b[sort]);
      } else if (sort === 'born' || sort === 'died') {
        return order === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort];
      }

      return 0;
    });
  }

  if (filteredPeople.length === 0) {
    return <NoPeopleMatching />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sectionsTable.map((section, i) => (
              <th key={i}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {section.label}
                  {section.key && (
                    <a>
                      <span
                        className="icon"
                        onClick={() => toggleSort(section.key!)}
                      >
                        <i className="fas fa-sort"></i>
                      </span>
                    </a>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedPeople.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink name={person.motherName} people={people} />
                ) : (
                  <>-</>
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink name={person.fatherName} people={people} />
                ) : (
                  <>-</>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

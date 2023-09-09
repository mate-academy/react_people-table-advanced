import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableHead } from './TableHead';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const personSex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');

    let filtered = personSex
      ? people.filter(item => item.sex === personSex)
      : [...people];

    if (query) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(query)
        || item.motherName?.toLowerCase().includes(query)
        || item.fatherName?.toLowerCase().includes(query));
    }

    if (centuries.length) {
      filtered = filtered.filter(person => centuries.some(
        century => Math.trunc(person.born / 100) + 1 === +century,
      ));
    }

    if (sort === 'born' || sort === 'died') {
      filtered.sort((a, b) => a[sort] - b[sort]);
    }

    if (sort === 'name' || sort === 'sex') {
      filtered.sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    if (order) {
      filtered.reverse();
    }

    setFilteredPeople(filtered);
  }, [people, searchParams]);

  function getPerson(name: string | null) {
    const person = people.find(item => item.name === name);

    if (person) {
      return <PersonLink person={person} />;
    }

    return name || '-';
  }

  return (
    <>
      {filteredPeople.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <TableHead />
          </thead>

          <tbody>
            {filteredPeople.map(person => {
              const {
                sex, born, died, motherName, fatherName, slug: url,
              } = person;

              const mother = getPerson(motherName);
              const father = getPerson(fatherName);

              return (
                <tr
                  data-cy="person"
                  key={url}
                  className={classNames({
                    'has-background-warning': slug === url,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>{mother}</td>
                  <td>{father}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>
          There are no people matching the current search criteria
        </p>
      )}
    </>
  );
};

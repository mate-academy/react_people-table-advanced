import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { selectPerson } from '../utils/selectPerson';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { slug } = useParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase();

  useEffect(() => {
    // const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('century');

    if (query) {
      setFilteredPeople(
        people.filter(person => {
          const { name, motherName, fatherName } = person;

          const normalize = (str: string | null) => str?.toLowerCase();

          return (
            normalize(name)?.includes(query) ||
            normalize(motherName)?.includes(query) ||
            normalize(fatherName)?.includes(query)
          );
        }),
      );
    }

    if (centuries.length) {
      setFilteredPeople(
        people.filter(person => {
          const normalizedBorn = String(Math.ceil(person.born / 100));

          return centuries.includes(normalizedBorn);
        }),
      );
    }
  }, [searchParams, people, query]);

  useEffect(() => {
    if (slug) {
      setSelectedPerson(prev => people.find(p => p.slug === slug) || prev);
    }
  }, [slug, people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const currentMother = people.find(p => p.name === person.motherName);
          const currentFather = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson === person,
              })}
            >
              <td>
                <Link
                  onClick={() => setSelectedPerson(person)}
                  to={`${person.slug}`}
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

              {currentMother ? (
                <td>
                  <Link
                    to={currentMother.slug}
                    className={classNames({
                      'has-text-danger': currentMother.sex === 'f',
                    })}
                    onClick={() =>
                      selectPerson(people, setSelectedPerson, currentMother)
                    }
                  >
                    {person.motherName}
                  </Link>
                </td>
              ) : (
                <td>{person.motherName || '-'}</td>
              )}

              {currentFather ? (
                <td>
                  <Link
                    to={currentFather.slug}
                    onClick={() =>
                      selectPerson(people, setSelectedPerson, currentFather)
                    }
                  >
                    {person.fatherName}
                  </Link>
                </td>
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

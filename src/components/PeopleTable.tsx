import classNames from 'classnames';
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import { SortBy } from '../types/SortBy';
import { PersonalLink } from './PersonalLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
  personSlug: string | undefined,
};

export const PeopleTable:FC<Props> = ({ people, personSlug }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (!personSlug) {
      return;
    }

    const currentPerson = people.find(person => person.slug === personSlug);

    setSelectedPerson(currentPerson || null);
  }, [personSlug]);

  const findParent = useCallback((name: string | null, sex: string) => {
    if (!name) {
      return '-';
    }

    const parent = people?.find(person => person.name === name) || null;

    return (parent)
      ? (
        <Link
          className={classNames({
            'has-text-danger': parent && sex === 'f',
          })}
          to={`/people/${parent?.slug}`}
        >
          {name}
        </Link>
      )
      : `${name}`;
  }, [people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortBy).map(obj => (
            <th key={obj[0]}>
              <SortLink entry={obj} />
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonalLink
            key={person.slug}
            person={person}
            selectedPerson={selectedPerson}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};

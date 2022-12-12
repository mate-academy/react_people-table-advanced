import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { PeopleSort } from './PeopleSort';
import { SortBy } from '../types/SortBy';
import { Errors } from '../types/Errors';

type Props = {
  people: Person[],
  setIsError: (error: Errors) => void;
};

export const PeopleTable: React.FC<Props> = ({ people, setIsError }) => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const sorting = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const { personSlug = '' } = useParams();

  const findParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const getParent = people.find(parent => parent.name === parentName);

    return getParent ? <PersonLink person={getParent} /> : parentName;
  };

  const getVisablePeople = () => {
    let visible = [...people];

    if (sex) {
      visible = visible.filter(person => person.sex === sex);
    }

    if (query) {
      visible = visible.filter(person => {
        const personName
        = person.name.toLowerCase().includes(query.toLowerCase());
        const personMother = person.motherName
          ? person.motherName.toLowerCase().includes(query.toLowerCase())
          : null;
        const personFather = person.fatherName
          ? person.fatherName.toLowerCase().includes(query.toLowerCase())
          : false;

        return (personName || personMother || personFather);
      });

      if (visible.length === 0) {
        setIsError(Errors.SAERCH);
      }
    }

    if (centuries.length > 0) {
      visible = visible.filter(person => {
        const centuryFiltered = Math.ceil(person.born / 100).toString();

        return centuries.includes(centuryFiltered);
      });
    }

    if (sorting) {
      const sorted = visible.sort((personOne, personTwo) => {
        switch (sorting) {
          case SortBy.name:
            return personOne[sorting].localeCompare(personTwo[sorting]);

          case SortBy.sex:
            return personOne.sex.localeCompare(personTwo.sex);

          case SortBy.born:
            return personOne.born - personTwo.born;

          case SortBy.died:
            return personOne.died - personTwo.died;

          default:
            return 0;
        }
      });

      visible = (!order ? sorted : sorted.reverse());
    }

    setVisiblePeople(visible);
  };

  useEffect(() => {
    getVisablePeople();
  }, [searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <PeopleSort
              sortedBy={SortBy.name}
              sorting={sorting}
              order={order}
            />
          </th>
          <th>
            <PeopleSort
              sortedBy={SortBy.sex}
              sorting={sorting}
              order={order}
            />
          </th>
          <th>
            <PeopleSort
              sortedBy={SortBy.born}
              sorting={sorting}
              order={order}
            />
          </th>
          <th>
            <PeopleSort
              sortedBy={SortBy.died}
              sorting={sorting}
              order={order}
            />
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        { visiblePeople.map(person => {
          const {
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={
                classNames({
                  'has-background-warning': personSlug === slug,
                })
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findParent(motherName)}</td>
              <td>{findParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

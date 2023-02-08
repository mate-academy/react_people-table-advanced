import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { makeFirstLetterBig } from './Helpers';
import { PersonComponent } from './Person/Person';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order') || '';
  const sexFromSearchParams = searchParams.get('sex') || '';

  const [sortBy, setSortBy] = useState<keyof Person | ''>('');
  const [orderBy, setOrderBy] = useState(order);

  const checkName = (personName: string | null) => {
    if (personName) {
      return personName.toLowerCase().includes(query.toLowerCase());
    }

    return false;
  };

  const getCentury = (year: number) => (
    `${Math.ceil(
      year / 100,
    )}`
  );

  const visiblePeople = people.filter(person => {
    const {
      name,
      fatherName = '',
      motherName = '',
      born,
      sex,
    } = person;

    const condition1 = checkName(name)
      || checkName(motherName)
      || checkName(fatherName);

    const condition2 = centuries.length === 0
      ? true
      : centuries.includes(getCentury(born));

    const condition3 = sexFromSearchParams === ''
      ? true
      : sex === sexFromSearchParams;

    return condition1 && condition2 && condition3;
  });

  if (sortBy) {
    visiblePeople.sort((person1, person2) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return person1[sortBy].localeCompare(person2[sortBy]);

        case 'born':
        case 'died':
          return person1[sortBy] - person2[sortBy];
        default:
          return 0;
      }
    });
  }

  if (orderBy) {
    visiblePeople.reverse();
  }

  useEffect(() => {
    searchParams.set('sort', sortBy);
    searchParams.set('order', orderBy);
  }, [sortBy, orderBy]);

  const handleLinkClick = (column: keyof Person) => {
    setSortBy(column);

    if (sortBy === column && !orderBy) {
      setOrderBy('desc');
    }

    if (sortBy === column && orderBy) {
      setOrderBy('');
      setSortBy('');
    }
  };

  const getStrFromSearchParams = (column: string) => {
    searchParams.delete('order');
    const columnInLower = column.toLowerCase();

    searchParams.set('sort', columnInLower);

    if (sortBy === columnInLower && !orderBy) {
      searchParams.set('order', 'desc');
    }

    if (sortBy === columnInLower && orderBy) {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    return searchParams.toString();
  };

  const columnsToRender: (keyof Person)[] = [
    'name',
    'sex',
    'born',
    'died',
    'mother',
    'father',
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {
            columnsToRender.map(column => {
              const shouldSpanWithIconBeRendered = column !== 'mother'
                && column !== 'father';

              return (
                <th key={column}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {makeFirstLetterBig(column)}
                    {shouldSpanWithIconBeRendered && (
                      <Link
                        to={{ search: getStrFromSearchParams(column) }}
                        onClick={() => handleLinkClick(column)}
                      >
                        <span className="icon">
                          <i
                            className={cn({
                              fas: true,
                              'fa-sort': sortBy !== column,
                              'fa-sort-up': sortBy === column && !orderBy,
                              'fa-sort-down': sortBy === column && orderBy,
                            })}
                          />
                        </span>
                      </Link>
                    )}
                  </span>
                </th>
              );
            })
          }
        </tr>
      </thead>

      <tbody>
        {
          visiblePeople.map(person => (
            <PersonComponent key={person.slug} person={person} />
          ))
        }
      </tbody>
    </table>
  );
};

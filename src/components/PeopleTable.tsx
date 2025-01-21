import classNames from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useState } from 'react';

type Props = {
  filteredPeople: Person[];
  selectedPerson: string | undefined;
  searchParams: {};
  setSearchParams: (a: {}) => void;
  order: string;
};

export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  selectedPerson,
  searchParams,
  setSearchParams,
  order,
}) => {
  const [, setAmountClick] = useState(0);
  const [lastType, setLastType] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const prepereAmoutClick = (type: string, clickCount: number) => {
    switch (clickCount) {
      case 1:
        const params1 = new URLSearchParams(searchParams);

        params1.delete('order');
        params1.set('sort', type);
        setSearchParams(params1);
        setSelectedType(type);
        break;
      case 2:
        const params2 = new URLSearchParams(searchParams);

        params2.set('order', 'desc');
        setSearchParams(params2);
        setSelectedType(type);
        break;
      case 3:
        const params3 = new URLSearchParams(searchParams);

        params3.delete('sort');
        params3.delete('order');
        setSearchParams(params3);
        setSelectedType('');

        setAmountClick(0);
        break;
    }
  };

  const handleClick = (type: string) => {
    setLastType(type);
    if (lastType !== type) {
      setAmountClick(1);
      prepereAmoutClick(type, 1);
    } else {
      setAmountClick(prevClick => {
        const newClickCount = (prevClick % 3) + 1;

        prepereAmoutClick(type, newClickCount);

        return newClickCount;
      });
    }
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
              <a
                onClick={() => {
                  handleClick('name');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': selectedType === 'name' && order !== 'desc',
                      'fa-sort-down':
                        selectedType === 'name' && order === 'desc',
                      'fa-sort': selectedType !== 'name',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={() => {
                  handleClick('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': selectedType === 'sex' && order !== 'desc',
                      'fa-sort-down':
                        selectedType === 'sex' && order === 'desc',
                      'fa-sort': selectedType !== 'sex',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={() => {
                  handleClick('born');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': selectedType === 'born' && order !== 'desc',
                      'fa-sort-down':
                        selectedType === 'born' && order === 'desc',
                      'fa-sort': selectedType !== 'born',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={() => {
                  handleClick('died');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': selectedType === 'died' && order !== 'desc',
                      'fa-sort-down':
                        selectedType === 'died' && order === 'desc',
                      'fa-sort': selectedType !== 'died',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                <p>{!person.motherName ? '-' : <p>{person.motherName}</p>}</p>
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                <p>{!person.fatherName ? '-' : <p>{person.fatherName}</p>}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

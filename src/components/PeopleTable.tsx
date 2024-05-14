/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */

import { useContext, useState } from 'react';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { sortClass } from '../utils/sortClass';
import { StateType } from '../types/StateType';

const initialHandlePosition = {
  name: 1,
  sex: 1,
  born: 1,
  died: 1,
};

export const PeopleTable = () => {
  const { slug } = useParams();
  const { people } = useContext(PeopleContext);
  const [namesCount, setNamesCount] = useState<StateType>(
    initialHandlePosition,
  );

  const handleOnClick = (count: number, key: string) => {
    return count !== 3
      ? setNamesCount(prevObject => {
          const newObject: StateType = prevObject;

          for (const [k, value] of Object.entries(namesCount)) {
            if (k !== key) {
              newObject[k] = 1;
            } else {
              newObject[k] = value + 1;
            }
          }

          return { ...newObject };
        })
      : setNamesCount(prevOb => ({ ...prevOb, [key]: 1 }));
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'].map(item =>
            item !== 'Mother' && item !== 'Father' ? (
              <th key={item}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {item}
                  <Link
                    to={{ search: '?sort=name' }}
                    onClick={() =>
                      handleOnClick(
                        namesCount[item.toLocaleLowerCase()],
                        item.toLocaleLowerCase(),
                      )
                    }
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          `fas ${sortClass(namesCount[item.toLocaleLowerCase()])}`,
                        )}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            ) : (
              <>
                <th>{item}</th>
              </>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <Link
                to={{ pathname: person.slug }}
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
              <PersonLink person={person.motherName} sex={'f'} />
            </td>
            <td>
              <PersonLink person={person.fatherName} sex={'m'} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

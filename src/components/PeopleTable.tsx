import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { SortMethod, SortOrder } from '../types/Sort';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const { personSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortButtonsStyles = (method: SortMethod) => cn(
    'fas',
    {
      'fa-sort': searchParams.get('sort') !== method,
      'fa-sort-up': searchParams.get('sort') === method
        && !searchParams.has('order'),
      'fa-sort-down': searchParams.get('sort') === method
        && searchParams.has('order'),
    },
  );

  const handleSortButtonClick = (method: SortMethod) => {
    setSearchParams(currentParams => {
      if (currentParams.get('sort') !== method) {
        currentParams.set('sort', method);
        currentParams.delete('order');

        return currentParams;
      }

      if (currentParams.has('order')) {
        currentParams.delete('order');
        currentParams.delete('sort');

        return currentParams;
      }

      currentParams.set('order', SortOrder.Desc);

      return currentParams;
    });
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
                role="presentation"
                onClick={() => handleSortButtonClick(SortMethod.Name)}
              >
                <span className="icon">
                  <i className={sortButtonsStyles(SortMethod.Name)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                role="presentation"
                onClick={() => handleSortButtonClick(SortMethod.Sex)}
              >
                <span className="icon">
                  <i className={sortButtonsStyles(SortMethod.Sex)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                role="presentation"
                onClick={() => handleSortButtonClick(SortMethod.Born)}
              >
                <span className="icon">
                  <i className={sortButtonsStyles(SortMethod.Born)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                role="presentation"
                onClick={() => handleSortButtonClick(SortMethod.Died)}
              >
                <span className="icon">
                  <i className={sortButtonsStyles(SortMethod.Died)} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === personSlug,
            })}
            key={person.slug}
          >
            <PersonLink person={person} />

            <td>{person.sex}</td>

            <td>{person.born}</td>

            <td>{person.died}</td>

            {person.motherName ? (
              <PersonLink person={
                people.find(
                  possibleMother => possibleMother.name === person.motherName,
                ) || person.motherName
              }
              />
            ) : (
              <td>
                -
              </td>
            )}

            {person.fatherName ? (
              <PersonLink person={
                people.find(
                  possibleFather => possibleFather.name === person.fatherName,
                ) || person.fatherName
              }
              />
            ) : (
              <td>
                -
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

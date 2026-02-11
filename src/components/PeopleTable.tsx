import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sortPeopleBy: string | null;
  orderPeopleBy: string | null;
};

export const PeopleTable = ({ people, sortPeopleBy, orderPeopleBy }: Props) => {
  const { personSlug } = useParams();

  const renderParent = (parent?: Person, parentName?: string | null) => {
    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName || '-';
  };

  function getOrderByClassName(iconName: string): string {
    switch (true) {
      case sortPeopleBy === iconName && orderPeopleBy === null:
        return 'fa-sort-up';
      case sortPeopleBy === iconName && orderPeopleBy === 'desc':
        return 'fa-sort-down';
      case sortPeopleBy !== iconName:
      default:
        return 'fa-sort';
    }
  }

  function getNextParams(iconName: string) {
    switch (true) {
      case sortPeopleBy === iconName && orderPeopleBy === null:
        return { sort: iconName, order: 'desc' };
      case sortPeopleBy === iconName && orderPeopleBy === 'desc':
        return { sort: null, order: null };
      case sortPeopleBy !== iconName:
      default:
        return { sort: iconName, order: null };
    }
  }

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
              <SearchLink params={getNextParams('name')}>
                <span className="icon">
                  <i className={cn('fas', getOrderByClassName('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextParams('sex')}>
                <span className="icon">
                  <i className={cn('fas', getOrderByClassName('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextParams('born')}>
                <span className="icon">
                  <i className={cn('fas', getOrderByClassName('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextParams('died')}>
                <span className="icon">
                  <i className={cn('fas', getOrderByClassName('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': personSlug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParent(person.mother, person.motherName)}</td>
              <td>{renderParent(person.father, person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

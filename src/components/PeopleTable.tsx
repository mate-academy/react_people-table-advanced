/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person, OrderTypeEnum, SortFieldEnum } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  peoples: Person[];
}

const sortIconClasses = (
  sortField: SortFieldEnum,
  currentSort: SortFieldEnum | null,
  currentOrder: OrderTypeEnum | null,
) => {
  return classNames('fas', {
    'fa-sort': currentSort !== sortField,
    'fa-sort-up': currentSort === sortField && !currentOrder,
    'fa-sort-down':
      currentSort === sortField && currentOrder === OrderTypeEnum.Desc,
  });
};

export const PeopleTable: FC<Props> = ({ peoples }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') as SortFieldEnum | null;
  const currentOrder = searchParams.get('order') as OrderTypeEnum | null;

  if (peoples.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const getSortParams = (sortField: SortFieldEnum) => {
    if (currentSort !== sortField) {
      return { sort: sortField, order: null };
    }

    if (!currentOrder) {
      return { sort: sortField, order: OrderTypeEnum.Desc };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortFieldEnum).map(field => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {fieldName}
                  <SearchLink params={getSortParams(field)}>
                    <span className="icon">
                      <i
                        className={sortIconClasses(
                          field,
                          currentSort,
                          currentOrder,
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => {
          const mother = peoples.find(
            currentPerson => currentPerson.name === person.motherName,
          );

          const father = peoples.find(
            currentPerson => currentPerson.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames('', {
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink person={mother} parentName={person.motherName} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink person={father} parentName={person.fatherName} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

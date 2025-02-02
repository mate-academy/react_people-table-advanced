/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person, OrderTypeEnum, SortFieldEnum } from '../types';
import { getSortParams } from '../utils/getSortParams';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  peoples: Person[];
}

const sortIconClasses = (
  sortField: SortFieldEnum,
  sortBy: SortFieldEnum | null,
  order: OrderTypeEnum | null,
) => {
  return classNames('fas', {
    'fa-sort': sortBy !== sortField,
    'fa-sort-up': sortBy === sortField && !order,
    'fa-sort-down': sortBy === sortField && order === OrderTypeEnum.Desc,
  });
};

export const PeopleTable: FC<Props> = ({ peoples }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') as SortFieldEnum | null;
  const order = searchParams.get('order') as OrderTypeEnum | null;

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
                  <SearchLink params={getSortParams(field, sortBy, order)}>
                    <span className="icon">
                      <i className={sortIconClasses(field, sortBy, order)} />
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

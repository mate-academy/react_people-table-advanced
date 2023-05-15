import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[]
  link: string
  sort: string
  order: string
}

export const PeaopleTable: FC<Props> = ({
  people, link = '', sort, order,
}) => {
  const isSelected = (person: Person) => person.slug === link;
  const sortingParamsArray = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {
            sortingParamsArray.map(param => {
              const isSelectedSortType = sort === param.toLowerCase();

              return (
                <th key={param}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {param}
                    <SearchLink
                      params={{
                        sort: isSelectedSortType && order
                          ? null
                          : param.toLowerCase(),
                        order: isSelectedSortType && !order
                          ? 'decs'
                          : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            { 'fa-sort': !isSelectedSortType },
                            { 'fa-sort-up': isSelectedSortType && !order },
                            { 'fa-sort-down': isSelectedSortType && order },
                          )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              );
            })
          }
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            mother,
            father,
            fatherName,
            motherName,
          } = person;

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected(person),
              })}
            >
              <td>
                <PersonLink
                  to={slug}
                  text={name}
                  sex={sex}
                />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother
                ? (
                  <td>
                    <PersonLink
                      to={mother.slug}
                      text={mother.name}
                      sex={mother.sex}
                    />
                  </td>
                ) : (
                  <td>
                    {motherName || '-'}
                  </td>
                )}
              {father
                ? (
                  <td>
                    <PersonLink
                      to={father.slug}
                      text={father.name}
                    />
                  </td>
                ) : (
                  <td>
                    {fatherName || '-'}
                  </td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  selectedSlug: string;
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sort,
  order,
}) => {
  const sortItems = useMemo(() => ['Name', 'Sex', 'Born', 'Died'], []);

  const getParentLayout = (
    parentName: string | null,
    parent?: Person,
  ) => (
    parent ? (
      <PersonLink
        name={parent.name}
        sex={parent.sex}
        slug={parent.slug}
      />
    ) : (
      parentName || '-'
    )
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortItems.map(title => {
            const lowTitle = title.toLowerCase();

            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink
                    params={{
                      sort: sort === lowTitle && order
                        ? null
                        : lowTitle,
                      order: sort === lowTitle && !order
                        ? 'desc'
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        {
                          'fa-sort': sort !== lowTitle,
                          'fa-sort-up': sort === lowTitle && !order,
                          'fa-sort-down': sort === lowTitle && order,
                        },
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;
          const motherLayout = getParentLayout(motherName, mother);
          const fatherLayout = getParentLayout(fatherName, father);

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedSlug === slug,
              })}
            >
              <td>
                <PersonLink
                  name={name}
                  sex={sex}
                  slug={slug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {motherLayout}
              </td>

              <td>
                {fatherLayout}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

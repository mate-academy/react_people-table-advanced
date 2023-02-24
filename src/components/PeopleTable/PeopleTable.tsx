import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getFiltredPeople } from '../../utils/getFiltredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';
import { PersonNavLink } from '../PersonNavLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const sexFilter = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort') as keyof Person;
  const isReversed = searchParams.get('order') === 'desc';

  let preparedPeople = useMemo(() => (
    getFiltredPeople(people, centuries, sexFilter, query)
  ), [people, centuries, sexFilter, query]);

  preparedPeople = useMemo(() => (
    getSortedPeople(preparedPeople, sort, isReversed)
  ), [preparedPeople, sort, isReversed]);

  if (preparedPeople.length === 0) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
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
              <SortLink sort="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sort="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sort="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sort="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople?.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
          } = person;

          const isSelected = slug === selectedSlug;
          const motherNameCell = motherName || '-';
          const fatherNameCell = fatherName || '-';
          const mother = people?.find(p => p.name === motherName) || null;
          const father = people?.find(p => p.name === fatherName) || null;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonNavLink
                  name={name}
                  sex={sex}
                  slug={slug}
                />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonNavLink
                      name={mother.name}
                      sex={mother.sex}
                      slug={mother.slug}
                    />
                  ) : (
                    motherNameCell
                  )}
              </td>
              <td>
                {father
                  ? (
                    <PersonNavLink
                      name={father.name}
                      sex={father.sex}
                      slug={father.slug}
                    />
                  ) : (
                    fatherNameCell
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

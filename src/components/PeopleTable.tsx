import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableHeadLink } from './TableHeadLink';

type Props = {
  filteredPeopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  filteredPeopleList,
}) => {
  const { urlSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || '';
  const sortReverse = searchParams.get('order') || '';
  const [
    visiblePeopleList,
    setVisiblePeopleList,
  ] = useState<Person[]>(filteredPeopleList);

  const isPersonSelected = (slug: string) => slug === urlSlug;

  const parentsCheck = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const linkToParent = visiblePeopleList.find(person => person.name === name);

    return linkToParent ? <PersonLink person={linkToParent} /> : name;
  };

  const tableHeadFilter = async () => {
    let filteredPeople: Person[] = [...filteredPeopleList].sort((
      personA: Person,
      personB: Person,
    ) => {
      switch (sortColumn) {
        case 'name':
        case 'sex':
          return personA[sortColumn].localeCompare(personB[sortColumn]);

        case 'born':
        case 'died':
          return personA[sortColumn] - personB[sortColumn];

        default:
          return 0;
      }
    });

    if (sortReverse === 'desc') {
      filteredPeople = filteredPeople.reverse();
    }

    setVisiblePeopleList(filteredPeople);
  };

  useEffect(() => {
    tableHeadFilter();
  }, [filteredPeopleList, searchParams]);

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
              <TableHeadLink title="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <TableHeadLink title="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <TableHeadLink title="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <TableHeadLink title="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeopleList.map((person) => {
          const {
            name,
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': isPersonSelected(slug) },
              )}
            >
              <td>
                <PersonLink person={{ name, sex, slug }} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{parentsCheck(motherName)}</td>
              <td>{parentsCheck(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

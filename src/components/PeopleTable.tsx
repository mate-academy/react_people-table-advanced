import { useParams, useSearchParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { OPTIOPN_TABLES } from '../constans';
import { getIconClass, getParams, isName } from '../services/people';
import { sortPeople } from '../utils/worksWithPeople';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

import { OptionsTable, Person, PersonKey } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = memo(function PeopleTableComponent({
  people,
}) {
  const [peopleFilter, setPeopleFilter] = useState(people);
  const { slugId } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get(OptionsTable.SORT) || '';
  const order = searchParams.get(OptionsTable.ORDER) || '';

  const filteredPeople = useCallback(() => {
    const sortKey = sort as PersonKey;

    return setPeopleFilter(sortPeople(people, sortKey, order));
  }, [people, sort, order]);

  useEffect(() => filteredPeople(), [filteredPeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {OPTIOPN_TABLES.map(option => (
            <th key={option}>
              <span className="is-flex is-flex-wrap-nowrap">
                {option}
                <SearchLink
                  params={getParams(sort, order, option.toLowerCase())}
                >
                  <span className="icon">
                    <i
                      className={getIconClass(
                        sort,
                        order,
                        option.toLowerCase(),
                      )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleFilter.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({ 'has-background-warning': slug === slugId })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : isName(motherName)}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : isName(fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

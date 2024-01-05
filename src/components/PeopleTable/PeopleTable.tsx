import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { WOMAN } from '../../constants';
import { Person } from '../../types/Person';
import { Sort } from '../../types/Sort';
import { SortBtn } from '../SortBtn';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [currentRowSlug, setCurrentRowSlug] = useState('');
  const { slug: slugParam } = useParams();

  useEffect(() => {
    if (slugParam) {
      setCurrentRowSlug(slugParam);
    }
  }, [slugParam]);

  if (people.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Name
              <SortBtn field={Sort.Name} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Sex
              <SortBtn field={Sort.Sex} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Born
              <SortBtn field={Sort.Born} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Died
              <SortBtn field={Sort.Died} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(({
          slug,
          sex,
          name,
          born,
          died,
          motherName,
          fatherName,
          mother,
          father,
        }) => (
          <tr
            key={slug}
            data-cy="person"
            className={cn({
              'has-background-warning': slug === currentRowSlug,
            })}
          >
            <td>
              <a
                href={`#/people/${slug}`}
                className={cn({
                  'has-text-danger': sex === WOMAN,
                })}
              >
                {name}
              </a>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            {!motherName && (
              <td>-</td>
            )}

            {(motherName && mother?.slug) && (
              <td>
                <a
                  className="has-text-danger"
                  href={`#/people/${mother?.slug}`}
                >
                  {motherName}
                </a>
              </td>
            )}
            {(motherName && !mother?.slug) && (
              <td>
                {motherName}
              </td>
            )}

            {!fatherName && (
              <td>-</td>
            )}

            {(fatherName && father?.slug) && (
              <td>
                <a
                  href={`#/people/${father.slug}`}
                >
                  {fatherName}
                </a>
              </td>
            )}
            {(fatherName && !father?.slug) && (
              <td>
                {fatherName}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

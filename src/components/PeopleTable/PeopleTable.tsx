import { useSearchParams } from 'react-router-dom';
import { PeopleDictionary, PersonSlug } from '../../types';
import { PeopleTableRow } from '../PeopleTableRow';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

type Props = {
  people: PeopleDictionary;
  peopleSlugs: PersonSlug[];
};

export const PeopleTable: React.FC<Props> = ({ people, peopleSlugs }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toLocaleUpperCase() + field.slice(1)}
                <SearchLink
                  params={{
                    sort: sort === field && order === 'desc' ? null : field,
                    //    sort !== field || order !== 'desc' ? field : null,
                    order: sort === field && order !== 'desc' ? 'desc' : null,
                    //     sort !== field || order === 'desc' ? null : 'desc',
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== field,
                        'fa-sort-up': sort === field && order !== 'desc',
                        'fa-sort-down': sort === field && order === 'desc',
                      })}
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
        {peopleSlugs.map(slug => (
          <PeopleTableRow key={slug} person={people[slug]} />
        ))}
      </tbody>
    </table>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */

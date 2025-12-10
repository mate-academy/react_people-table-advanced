import { Person, PersonWidget } from '@entities/person';
import { usePeopleContext } from '@pages/peoplePage/model';
import { Sort } from '@pages/peoplePage/types';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const location = useLocation();
  const { state, parametersAction } = usePeopleContext();
  const renderList = [Sort.NAME, Sort.SEX, Sort.BORN, Sort.DIED];

  const uiMap: Record<Exclude<Sort, Sort.NONE>, string> = {
    [Sort.NAME]: 'Name',
    [Sort.SEX]: 'Sex',
    [Sort.BORN]: 'Born',
    [Sort.DIED]: 'Died',
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderList.map(el => (
            <th key={el}>
              <span
                className="is-flex is-flex-wrap-nowrap"
                style={{ textTransform: 'capitalize' }}
              >
                {uiMap[el as Exclude<Sort, Sort.NONE>]}
                <Link
                  to={`?sort=${el.toLowerCase()}`}
                  onClick={e => {
                    e.preventDefault();
                    if (state.sort !== el) {
                      parametersAction.setSort(el);
                      parametersAction.rmReverse();

                      return;
                    }

                    if (state.sort === el && state.order === 'desc') {
                      parametersAction.setSort(Sort.NONE);
                      parametersAction.rmReverse();

                      return;
                    }

                    if (state.order !== 'desc') {
                      parametersAction.setReverse();

                      return;
                    } else {
                      parametersAction.rmReverse();

                      return;
                    }
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        {
                          'fa-sort': state.sort !== el,
                        },
                        {
                          'fa-sort-up': state.sort === el && state.order === '',
                        },
                        {
                          'fa-sort-down':
                            state.sort === el && state.order === 'desc',
                        },
                      )}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(el => (
          <PersonWidget
            key={el.name}
            person={el}
            active={location.pathname === `/people/${el.slug}`}
          />
        ))}
      </tbody>
    </table>
  );
};

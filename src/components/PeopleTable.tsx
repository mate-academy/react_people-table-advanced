import { Person } from '../types/Person';
import { PersonLink } from '../components/PersonLink';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type PeopleTableProps = {
  people: Person[];
  loading?: boolean;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  loading,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const sort = params.get('sort');
  const order = params.get('order');

  function sortToggle(field: string) {
    return () => {
      const cur = params.get('sort');
      const ord = params.get('order');
      const newParams = new URLSearchParams(params.toString());


      if (cur !== field) {
        newParams.set('sort', field);
        newParams.delete('order');
      } else if (!ord) {
        newParams.set('order', 'desc');
      } else {
        newParams.delete('sort');
        newParams.delete('order');
      }

      setParams(newParams);
    };
  }

  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    }
  }, [slug]);

  return (
    <>
      {people.length > 0 && !loading && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <button
                  onClick={sortToggle('name')}
                  className={classNames('sort-btn', {
                    active: sort === 'name',
                    desc: sort === 'name' && order === 'desc',
                  })}
                >
                  Name
                  <i
                    className={
                      sort === 'name'
                        ? order === 'desc'
                          ? 'fa fa-sort-down'
                          : 'fa fa-sort-up'
                        : 'fa fa-sort'
                    }
                  />
                </button>
              </th>
              <th>
                <button
                  onClick={sortToggle('sex')}
                  className={classNames('sort-btn', {
                    active: sort === 'sex',
                    desc: sort === 'sex' && order === 'desc',
                  })}
                >
                  Sex
                  <i
                    className={
                      sort === 'sex'
                        ? order === 'desc'
                          ? 'fa fa-sort-down'
                          : 'fa fa-sort-up'
                        : 'fa fa-sort'
                    }
                  />
                </button>
              </th>
              <th>
                <button
                  onClick={sortToggle('born')}
                  className={classNames('sort-btn', {
                    active: sort === 'born',
                    desc: sort === 'born' && order === 'desc',
                  })}
                >
                  Born
                  <i
                    className={
                      sort === 'born'
                        ? order === 'desc'
                          ? 'fa fa-sort-down'
                          : 'fa fa-sort-up'
                        : 'fa fa-sort'
                    }
                  />
                </button>
              </th>
              <th>
                <button
                  onClick={sortToggle('died')}
                  className={classNames('sort-btn', {
                    active: sort === 'died',
                    desc: sort === 'died' && order === 'desc',
                  })}
                >
                  Died
                  <i
                    className={
                      sort === 'died'
                        ? order === 'desc'
                          ? 'fa fa-sort-down'
                          : 'fa fa-sort-up'
                        : 'fa fa-sort'
                    }
                  />
                </button>
              </th>
              <th>
                <button
                  onClick={sortToggle('motherName')}
                  className={classNames('sort-btn', {
                    active: sort === 'motherName',
                    desc: sort === 'motherName' && order === 'desc',
                  })}
                >
                  Mother
                  <i
                    className={
                      sort === 'motherName'
                        ? order === 'desc'
                          ? 'fa fa-sort-down'
                          : 'fa fa-sort-up'
                        : 'fa fa-sort'
                    }
                  />
                </button>
              </th>
              <th>
                <button
                  onClick={sortToggle('fatherName')}
                  className={classNames('sort-btn', {
                    active: sort === 'fatherName',
                    desc: sort === 'fatherName' && order === 'desc',
                  })}
                >
                  Father
                  <i
                    className={
                      sort === 'fatherName'
                        ? order === 'desc'
                          ? 'fa fa-sort-down'
                          : 'fa fa-sort-up'
                        : 'fa fa-sort'
                    }
                  />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                key={person.slug}
                className={
                  selectedSlug?.trim() === person.slug.trim()
                    ? 'has-background-warning'
                    : ''
                }
                onClick={() => setSelectedSlug(person.slug.trim())}
              >
                <td>
                  <PersonLink personName={person.name} people={people} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  <PersonLink personName={person.motherName} people={people} />
                </td>
                <td>
                  <PersonLink personName={person.fatherName} people={people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

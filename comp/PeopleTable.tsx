import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleTable: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isTableEmpty, setIsTableEmpty] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const loadData = async () => {
    setIsDataLoading(true);
    const peopleFromServer = await getPeople();

    if (!peopleFromServer.length) {
      setIsTableEmpty(true);
      setIsDataLoading(false);

      return;
    }

    setPeople(peopleFromServer);
    setIsDataFetched(true);
    setIsDataLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const parent = people.map(person => {
    return {
      ...person,

      motherName: person.motherName ? person.motherName : '-',
      mother: people
        .filter(p => person.motherName === p.name)
        .map(p => p.slug)[0] || '',

      fatherName: person.fatherName ? person.fatherName : '-',
      father: people
        .filter(p => person.fatherName === p.name)
        .map(p => p.slug)[0] || '',
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isDataLoading && <Loader />}

          {!isDataLoading && !isDataFetched && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isDataFetched && (isTableEmpty ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {parent.map(person => {
                  return (
                    <tr
                      data-cy="person"
                      key={person.name}
                      className={classNames({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <NavLink
                          to={`/people/${person.slug}`}
                          className={classNames({
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {person.name}
                        </NavLink>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.mother ? (
                          <NavLink
                            to={`/people/${person.mother}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </NavLink>
                        ) : person.motherName}
                      </td>
                      <td>
                        {person.father ? (
                          <NavLink to={`/people/${person.father}`}>
                            {person.fatherName}
                          </NavLink>
                        ) : person.fatherName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </>
  );
};

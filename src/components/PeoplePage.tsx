import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { PeopleTable } from './PeopleTable';
import { getParents } from '../utils/getParents';
import { NoPeople } from './NoPeople';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [content, setContent] = useState<JSX.Element>(<Loader />);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const peopleWithParents = getParents(data);

        if (data.length) {
          setContent(<PeopleTable people={peopleWithParents} />);
        } else {
          setContent(<NoPeople />);
        }
      })
      .catch(() => setContent(ErrorMessage))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

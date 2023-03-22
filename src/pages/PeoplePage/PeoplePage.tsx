import { useState } from 'react';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { Filter, Order, Sex, Parameters } from '../../types';

const initialParameters: Parameters = {
  filter: Filter.None,
  sex: Sex.All,
  order: Order.None,
  query: '',
  centuries: null,
};

export const PeoplePage = () => {
  const [parameters, setParameters] = useState<Parameters>(initialParameters);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">

                {/* <p data-cy="peopleLoadingError">Something went wrong</p> */}

                {/* <p data-cy="noPeopleMessage">
          There are no people on the server
        </p> */}

                {/* <p>There are no people matching the current search criteria</p> */}

                <PeopleTable
                  parameters={parameters}
                  setParameters={setParameters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

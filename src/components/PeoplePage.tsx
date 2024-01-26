import { useContext, useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from '../App';
import { Errors } from '../types/Errors';

interface Props {
  isError: boolean;
  isLoad: boolean
}

export const PeoplePage: React.FC<Props> = ({
  isError,
  isLoad,
}) => {
  const { slug } = useParams();
  const arrayOfPeople = useContext(PeopleContext);
  const [filteringType, setFilteringType] = useState();
  const [chosenCentury, setChosenCentury] = useState();
  const [chosenSex, setChosenSex] = useState();
  const [enteredText, setEnteredText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const getQuery = searchParams.get('query');
  const getSexQuery = searchParams.get('sex');
  let filtering;

  switch (filteringType) {
    case 'by_sex':
      filtering = arrayOfPeople.filter((p) => p.sex === getSexQuery);
      break;
    case 'by_text':
      filtering = arrayOfPeople
        .filter((p) => p.name.toLowerCase().includes(getQuery));
      break;
    case 'by_century':
      filtering = arrayOfPeople.filter((p) => Math
        .floor(p.born / 100) === chosenCentury - 1);
      break;

    default:
      filtering = arrayOfPeople;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setChosenCentury={setChosenCentury}
              setChosenSex={setChosenSex}
              setFilteringType={setFilteringType}
              enteredText={enteredText}
              setEnteredText={setEnteredText}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!arrayOfPeople && (
                <p data-cy="noPeopleMessage">
                  {Errors.no_people}
                </p>
              )}
              <p>There are no people matching the current search criteria</p>

              <PeopleTable filtering={filtering} slug={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

const centuries = [16, 17, 18, 19, 20];

type PeopleProps = {
  selectedCenturies: number[];
};

const CenturyFilter = ({ selectedCenturies }: PeopleProps) => {
  const [searchParams] = useSearchParams();

  const getLink = (century: number) => {
    let newCenturies: string[];

    if (selectedCenturies.includes(century)) {
      newCenturies = selectedCenturies.filter(c => c !== century).map(String);
    } else {
      newCenturies = [...selectedCenturies.map(String), century.toString()];
    }

    return `/people?${getSearchWith(searchParams, { centuries: newCenturies })}`;
  };

  const allLink = `/people?${getSearchWith(searchParams, { centuries: null })}`;

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <Link
              key={century}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(century) ? 'is-info' : ''
              }`}
              to={getLink(century)}
            >
              {century}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className="button is-success is-outlined"
            to={allLink}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CenturyFilter;

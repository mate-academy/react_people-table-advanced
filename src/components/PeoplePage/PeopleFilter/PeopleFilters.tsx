import classNames from 'classnames';
import {
  useLocation, useSearchParams,
} from 'react-router-dom';
import { Person } from '../../../types';
// import { getSearchWith } from '../../../utils/searchHelper';
import { SearchLink } from '../../SearchLink';

type Props = {
  people: Person[],
  visiblePeople: Person[],
  setVisiblePeople: any,
  setSearchInput: any,
  searchInput: any,
};

export const PeopleFilters:
React.FC<Props> = ({
  people,
  setVisiblePeople,
  setSearchInput,
  searchInput,
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const centuries = searchParams.getAll('centuries') || [];

  // const isSelected = (century) => centuries.includes(century);
  // const history = useParams();
  const { search } = useLocation();
  // const [sortType, setSortType] = useState('all');

  // let searchInputSex = '';

  // console.log(location.search)
  // console.log(sexParam)

  // const onParamChange = (value: any) => {
  //   setSearchParams({ sexParam: value })
  //   console.log(sexParam, value)
  // }

  const filterByInput = (input: string = searchInput) => {
    setSearchInput(input);
    // searchInputSex = location.search.slice(5);

    // setVisiblePeople(visiblePeople.filter((person) => {
    //   console.log(person)
    //   return person.name.toLowerCase().includes(input.toLowerCase());
    // }));
    // console.log(input)
    // console.log(people)
    // console.log(visiblePeople, 's')
    // setSortType(searchInputSex);
  };

  // useEffect(() => {
  //   setVisiblePeople(people.filter((person) => {
  //     switch (sortType) {
  //       case 'm':
  //       case 'f':
  //         return (person.sex === sortType
  //         && person.name.toLowerCase().includes(searchInput.toLowerCase()));
  //       default:
  //         return person
  //          && person.name.toLowerCase().includes(searchInput.toLowerCase());
  //     }
  //     // return person.sex ==='m'
  //   }));
  // }, [sortType, searchInput]);
  // const filterSex = async (sex: string) => {
  //   setSortType(sex);
  // };

  // console.log(search);
  // const sortCentury = (century: any) => {
  //   // console.log(centuries.includes(century));
  //   // console.log(centuries, century);
  //   // if (!centuries.includes(century.toString())) {
  //   //   searchParams.append('centuries', century.toString());
  //   // }

  //   // setSearchParams(searchParams);
  //   const sortedPeople = [...people];

  //   console.log(century);
  //   setVisiblePeople(sortedPeople.filter(
  //     (person) => (centuries.includes(String(Math.ceil(person.born / 100))))
  //     // || +century === Math.ceil(person.born / 100))
  //     && person.name.toLowerCase().includes(searchInput.toLowerCase()),
  //   ));
  // };

  // useEffect(() => {
  //   const sortedPeople = [...people];

  //   // setVisiblePeople(sortedPeople.filter(
  //     (person) => (centuries.includes(String(Math.ceil(person.born / 100))))
  //      && person.name.toLowerCase().includes(searchInput.toLowerCase()),
  //   ));
  // }, [centuries]);

  const showAll = () => {
    setVisiblePeople(people.filter(
      (person) => person.name.toLowerCase().includes(searchInput.toLowerCase()),
    ));
  };

  // const visibleAndSortedPeople = filterByInput()

  return (
    <nav className="panel">
      <p>
        {location.pathname}
        {location.search}
      </p>
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': search === '',
          })}
          // to="/people"
          params={{ sex: 'all' }}
          // onClick={() => setSortType('all')}
          // onClick={() => setVisiblePeople(people.filter((person) => {
          //   return (
          //     person.name.toLowerCase().includes(searchInput.toLowerCase()));
          // }))}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': search === '?sex=m',
          })}
          // to="..?sex=m"
          params={{ sex: 'm' }}
          onClick={() => {
            // filterSex('m');
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': search.includes('?sex=f'),
          })}
          params={{ sex: 'f' }}
          // to="..?sex=f"
          onClick={() => {
            // filterSex('f');
            // getSearchWith('d','d')
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => filterByInput(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              ['16', '17', '18', '19', '20'].map((century) => {
                return (
                  <SearchLink
                    key={century}
                    data-cy="century"
                    className={classNames('button mr-1', {
                      'is-info':
                      centuries.includes(century.toString()),
                      // && isSelected(century),
                    })}
                    // to={
                    //   isSelected(century.toString())
                    //     ? {
                    //       pathname: '..',
                    //     }
                    //     : {
                    //       pathname: '..',
                    //       search: searchParams.toString(),
                    //       // `../?${searchParams.toString()}`
                    //     }
                    // }
                    params={{
                      centuries: centuries.includes(century)
                        ? centuries.filter(el => el !== century)
                        : [...centuries, century],
                    }}
                    // onClick={() => sortCentury(century)}
                  >
                    {century}
                  </SearchLink>
                );
              })
            }
            {/* <SearchLink
              params={{ centuries: '100' }}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=100'),
              })}
            >
              100
            </SearchLink> */}
            {/* <Link
              data-cy="century"
              // className="button mr-1"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=16'),
              })}
              to={{
                pathname: '../',
                search: location.search,
                // `../?${searchParams.toString()}`
              }}
              onClick={() => sortCentury(16)}
            >
              16
            </Link> */}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              // to=".."
              params={{ centuries: [] }}
              onClick={showAll}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

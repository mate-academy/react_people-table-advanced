export interface PeopleFiltersProps {
  searchParams: URLSearchParams;
  setSearchParams: (nextInit: URLSearchParams | string) => void;
}

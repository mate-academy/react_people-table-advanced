import { FilterCentury } from "./FilterCentury";
import { FilterGender } from "./FilterGender";
import { FilterQuery } from "./FilterQuery";
import { FilterReset } from "./FilterReset";

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterGender />

      <FilterQuery />

      <FilterCentury />

      <FilterReset />
    </nav>
  );
};

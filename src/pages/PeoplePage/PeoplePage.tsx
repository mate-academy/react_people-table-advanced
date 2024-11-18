import { People } from '../../components/People/People';
import { PeopleFilters } from '../../components/PeopleFilter/PeopleFilters';
import { Title } from '../../shared/Title';

const PeoplePage = () => (
  <>
    <Title text="People Page" />

    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <PeopleFilters />
        <People />
      </div>
    </div>
  </>
);

export default PeoplePage;

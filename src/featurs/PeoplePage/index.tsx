import { PeoplePageProvider } from '../../context/PeoplePageContext';
import { PeoplePageContent } from './PeoplePageContent';

export const PeoplePage = () => (
  <PeoplePageProvider>
    <PeoplePageContent />
  </PeoplePageProvider>
);

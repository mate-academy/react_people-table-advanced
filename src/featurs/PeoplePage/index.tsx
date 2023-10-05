import { PeoplePageContent } from './PeoplePageContent';
import { PeoplePageProvider } from './context/PeoplePageContext';

export const PeoplePage = () => (
  <PeoplePageProvider>
    <PeoplePageContent />
  </PeoplePageProvider>
);

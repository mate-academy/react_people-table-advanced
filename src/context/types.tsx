import {Person} from "../types";

export interface PeoplePageContextType {
people: Person[],
    error: boolean,
    isLoading: boolean,
}

export type Props = React.PropsWithChildren<{}>;

import { FC } from 'react';
import {PersonLink} from "./PersonLink";
import {Person} from "../types";

interface Props {
  parentName: string | null,
  parent: Person | undefined,
}

export const ParentLink: FC<Props> = ({ parentName, parent }) => {
  if (!parentName) {
    return <span>-</span>;
  }

  if (parent === undefined) {
    return <span>{parentName}</span>;
  }

  return <PersonLink person={parent} />;
};

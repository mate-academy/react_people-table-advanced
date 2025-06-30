import { useMemo } from "react";
import { Person } from "../types";
import { useSearchParams } from "react-router-dom";


export const useSortPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort");
  const order = searchParams.get("order");

  const getOrder = (column: string) => {
      if (sortBy !== column || order === null) return "fa-sort";
      if (order === "asc") return "fa-sort-down";
      if (order === "desc") return "fa-sort-up";
      return "fa-sort";
    };


    const getNextOrder = (column: string) => {
      if (sortBy !== column) return "asc";
      if (order === "asc") return "desc";
      if (order === "desc") return null;
      return "asc";
    };


    const sortedPeople = useMemo(() => {
      if (!order) return people;

      return [...people].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "sex":
            comparison = a.sex.localeCompare(b.sex);
            break;
          case "born":
            comparison = a.born - b.born;
            break;
          case "died":
            comparison = (a.died || 0) - (b.died || 0);
            break;
          default:
            return 0;
        }

        return order === "asc" ? comparison : -comparison;
      });
    }, [people, sortBy, order]);

  return { sortedPeople, getOrder, getNextOrder };
};

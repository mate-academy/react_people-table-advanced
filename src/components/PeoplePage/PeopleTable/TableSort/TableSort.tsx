// import { useState } from "react";
// export const TableSort = () => {
//   const [sortType, setSortType] = useState('');
//   const [clickName, setClickName] = useState(0);

//   const sortByValue = (
//     value: string,
//     click: number,
//     setClick: (value: number) => void,
//   ) => {
//     setClick(click + 1);
//     if (click === 0) {
//       setSortType(`${value}Asc`);
//     }

//     if (click === 1) {
//       setSortType(`${value}Desc`);
//     }

//     if (click === 2) {
//       setSortType('default');
//       setClick(0);
//     }
//   };

// console.log(onClick)

//   return (
//     <th>
//       <span className="is-flex is-flex-wrap-nowrap">
//         Name
//         <a
//           href="#/people?sort=name"
//           onClick={sortByValue('name', clickName, setClickName)}
//         >
//           <span className="icon">
//             <i className="fas fa-sort" />
//           </span>
//         </a>
//       </span>
//     </th>
//   );
// };

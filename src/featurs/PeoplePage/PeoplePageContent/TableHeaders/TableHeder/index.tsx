type Props = {
  name:string,
  href: string,
  className: string,
};

export const TableHeader = ({ name, href, className }: Props) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {name}
      <a href={href}>
        <span className="icon">
          <i className={className} />
        </span>
      </a>
    </span>
  </th>
);

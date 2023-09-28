type Props = {
  name:string,
  href: string,
  className: string,
  onClick: () => void,
};

export const TableHeader = ({
  name,
  href,
  className,
  onClick,
}: Props) => (
  <th>
    <span className="is-flex is-flex-wrap-nowrap">
      {name}
      <a
        href={href}
        onClick={onClick}
      >
        <span className="icon">
          <i className={className} />
        </span>
      </a>
    </span>
  </th>
);

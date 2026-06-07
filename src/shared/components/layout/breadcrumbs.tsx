import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({
  items
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <Link href={item.href}>{item.label}</Link>
            {i < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

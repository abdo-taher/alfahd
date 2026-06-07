export type Breadcrumb = {
  name: string;
  url: string;
};

export function generateBreadcrumbs(items: Breadcrumb[]) {
  return items.map((item, index) => ({
    ...item,
    position: index + 1
  }));
}

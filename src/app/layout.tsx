// Root layout is intentionally minimal.
// The [locale] layout owns <html>, <body>, direction, and locale providers.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

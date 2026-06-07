import { Container } from "@/shared/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <Container className="py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Sakeya Altina Contracting
      </Container>
    </footer>
  );
}

export function ServicesOverview() {
  const services = [
    "Fast performance architecture",
    "Reusable component system",
    "Modern UI/UX design",
    "Scalable backend structure",
    "SEO optimized pages",
    "Production-ready setup"
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to build fast
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border hover:shadow-lg transition bg-gray-50"
            >
              <p className="font-medium">{s}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
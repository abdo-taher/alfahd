export function FeaturedProjects() {
  const projects = [
    { name: "Analytics Dashboard", tag: "Frontend" },
    { name: "E-commerce Platform", tag: "Full Stack" },
    { name: "AI Chat App", tag: "AI Product" },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border hover:scale-[1.02] transition"
            >
              <div className="text-sm text-blue-600">{p.tag}</div>
              <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
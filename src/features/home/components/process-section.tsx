export function ProcessSection() {
  const steps = [
    { title: "Plan", desc: "Define structure and goals" },
    { title: "Design", desc: "Create clean UI layouts" },
    { title: "Build", desc: "Develop scalable components" },
    { title: "Launch", desc: "Deploy with confidence" },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Simple process, powerful results
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border">
              <div className="text-blue-600 font-bold text-lg">
                0{i + 1}
              </div>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export function WhyChooseSection() {
  return (
    <section className="bg-black text-white py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Why teams choose us
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          We focus on performance, scalability, and clean architecture so you can ship faster without technical debt.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {["Fast", "Scalable", "Modern"].map((item, i) => (
            <div key={i} className="p-6 border border-gray-800 rounded-2xl">
              <h3 className="font-semibold">{item}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
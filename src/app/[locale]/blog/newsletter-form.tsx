"use client";

interface NewsletterFormProps {
  placeholder: string;
  submitLabel: string;
}

export function NewsletterForm({ placeholder, submitLabel }: NewsletterFormProps) {
  return (
    <form
      className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder={placeholder}
        className="flex-1 px-4 py-3 text-sm rounded bg-gray-900 border border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
      />
      <button
        type="submit"
        className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
      >
        {submitLabel}
      </button>
    </form>
  );
}

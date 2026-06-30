type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  inverse?: boolean;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p
          className={`mb-4 text-xs font-extrabold uppercase tracking-[0.22em] ${
            inverse ? "text-blue-200" : "text-blue-700"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-balance text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl ${
          inverse ? "text-white" : "text-[#10172b]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            inverse ? "text-blue-100/75" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

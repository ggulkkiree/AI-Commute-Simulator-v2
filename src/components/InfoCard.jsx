export default function InfoCard({
  title,
  value,
  description,
  highlight = false,
  className = '',
  children,
}) {
  return (
    <article
      className={`rounded-[2rem] border-2 border-amber-100 bg-white/90 p-6 shadow-lg shadow-amber-100/60 lg:p-8 ${className}`}
    >
      {children ?? (
        <>
          <p className="text-xl font-bold text-slate-700 lg:text-2xl">
            {title}
          </p>
          {value ? (
            <p
              className={
                highlight
                  ? 'mt-3 text-3xl font-extrabold text-slate-900 lg:text-4xl'
                  : 'mt-3 text-2xl font-extrabold text-slate-900 lg:text-3xl'
              }
            >
              {value}
            </p>
          ) : null}
          {description ? (
            <p className="mt-3 text-lg font-semibold leading-7 text-slate-600 lg:text-xl lg:leading-8">
              {description}
            </p>
          ) : null}
        </>
      )}
    </article>
  );
}

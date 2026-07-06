export default function ScreenHeader({
  eyebrow = 'core flow',
  studentName,
  title,
  description,
  targetArrivalTime,
  currentTime,
}) {
  const statusItems = [
    targetArrivalTime ? { label: '목표 도착', value: targetArrivalTime } : null,
    currentTime ? { label: '현재 시간', value: currentTime } : null,
  ].filter(Boolean);

  return (
    <header className="mb-8 rounded-[2rem] border-2 border-amber-200 bg-white/90 p-6 text-center shadow-lg lg:p-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <p className="rounded-full border border-amber-200 bg-amber-50 px-5 py-2 text-base font-extrabold text-amber-700 lg:text-lg">
          ⭐ {eyebrow}
        </p>
        {studentName ? (
          <p className="rounded-full border border-sky-200 bg-sky-100 px-5 py-2 text-base font-extrabold text-sky-800 lg:text-lg">
            {studentName}의 출근 연습
          </p>
        ) : null}
      </div>

      <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-800 lg:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mx-auto mt-4 max-w-4xl text-xl font-semibold leading-8 text-slate-600 lg:text-2xl lg:leading-9">
          {description}
        </p>
      ) : null}

      {statusItems.length > 0 ? (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border-2 border-sky-100 bg-sky-50/80 px-5 py-3 shadow-sm"
            >
              <span className="text-base font-bold text-slate-500">
                {item.label}
              </span>
              <span className="ml-3 text-2xl font-extrabold text-slate-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}

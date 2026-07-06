const variantClasses = {
  primary:
    'border-2 border-blue-200 bg-gradient-to-r from-blue-500 to-sky-400 text-white shadow-blue-200/70 hover:from-blue-600 hover:to-sky-500 focus:ring-sky-200',
  secondary:
    'border-2 border-slate-200 bg-white text-slate-700 shadow-slate-200/70 hover:bg-slate-50 focus:ring-slate-200',
};

export default function PrimaryButton({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...buttonProps
}) {
  const classes = variantClasses[variant] ?? variantClasses.primary;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-3 rounded-[2rem] px-8 py-4 text-xl font-extrabold shadow-lg transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-200 disabled:bg-none disabled:text-slate-500 disabled:opacity-70 disabled:shadow-none disabled:hover:bg-slate-200 lg:px-10 lg:py-5 lg:text-2xl ${classes} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

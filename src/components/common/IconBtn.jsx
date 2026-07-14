export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline
          ? "border border-purple-300 bg-transparent text-purple-100"
          : "bg-brand-gradient text-white shadow-purple-glow"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold transition-all duration-200 hover:scale-[0.98] ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-purple-100"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}

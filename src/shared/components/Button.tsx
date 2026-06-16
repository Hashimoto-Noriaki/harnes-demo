type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "flex h-12 w-full items-center justify-center rounded-full px-5 font-medium transition-colors disabled:opacity-50";
  const variants = {
    primary: "bg-pink-500 text-white hover:bg-pink-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

import { ArrowIcon } from "./icons";

type CtaButtonProps = {
  onClick: () => void;
  variant?: "solid" | "outline";
  children: React.ReactNode;
};

export function CtaButton({
  onClick,
  variant = "solid",
  children,
}: CtaButtonProps) {
  const baseClassName =
    "group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all";
  const variantClassName =
    variant === "solid"
      ? "bg-[#1F7A63] text-white hover:bg-[#1a6a55] active:scale-[0.99]"
      : "border border-[#1F7A63]/40 text-[#1F7A63] hover:border-[#1F7A63] hover:bg-[#1F7A63]/5";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClassName} ${variantClassName}`}
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

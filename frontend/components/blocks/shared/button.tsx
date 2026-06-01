import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button as SanityButton, ButtonVariant } from "@/sanity.types";
import { ArrowRight } from "lucide-react";

// Button size type (only valid for primary and secondary)
export type ButtonSize = "sm" | "lg";

// Type for Sanity button data (with _key from arrays)
export type ButtonData = {
  _key: string;
  href?: string | null;
  buttonSize?: ButtonSize;
} & Omit<SanityButton, "href">;

// Props when using full Sanity button data
interface WithButtonData {
  button: ButtonData;
  label?: never;
  href?: never;
  isExternal?: never;
  target?: never;
  variant?: never;
  size?: never;
  onClick?: never;
  children?: never;
  type?: never;
  disabled?: never;
}

// Props when using individual values
interface WithIndividualProps {
  button?: never;
  label?: string;
  href?: string | null;
  isExternal?: boolean;
  target?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

type ButtonProps = {
  className?: string;
} & (WithButtonData | WithIndividualProps);

// Common style variables
const labelTransition = "[&_.label-block]:duration-500 [&_.label-block]:transition-all [&_.label-block]:ease-in-out";
const arrowTransition = "[&_.arrow-block]:transition-all [&_.arrow-block]:ease-in-out";

const outlineHoverBase = "[&_.label-block]:outline [&_.label-block]:outline-transparent [&:hover_.label-block]:outline-2 [&:hover_.label-block]:-outline-offset-2 [&:hover_.label-block]:bg-transparent [&_.arrow-block]:outline [&_.arrow-block]:outline-transparent [&:hover_.arrow-block]:outline-2 [&:hover_.arrow-block]:-outline-offset-2 [&:hover_.arrow-block]:!bg-transparent";

const borderBase = "[&_.arrow-block]:bg-transparent [&_.arrow-block]:border [&_.label-block]:bg-transparent [&_.label-block]:border";

const linkBase = "[&_.arrow-block]:p-0 [&_.label-block]:p-0 [&_.arrow-block]:aspect-auto [&_.arrow-block]:h-fit [&_.label-block]:h-fit";

// Size styles (only for primary and secondary)
const sizeStyles: Record<ButtonSize, { label: string; arrow: string; icon: string }> = {
  sm: {
    label: "min-h-10 lg:min-h-12 h-fit px-4 lg:px-6 py-2 lg:py-2 text-sm sm:text-base",
    arrow: "h-10 lg:h-12",
    icon: "h-4 lg:h-5 w-4 lg:w-5",
  },
  lg: {
    label: "min-h-12 lgmin-h-14 h-fit px-6 lg:px-8 py-3 lg:py-4 text-sm sm:text-base",
    arrow: "h-12 lg:h-14",
    icon: "h-5 lg:h-6 w-5 lg:w-6",
  },
};

// Variants that support custom sizes (sm/lg)
const variantsWithSize: ButtonVariant[] = ["primary", "secondary"];

// Variants that don't use size styles at all
const variantsWithoutSize: ButtonVariant[] = ["link", "secondary_link"];

const variantStyles: Record<ButtonVariant, string> = {
  default: "default-button bg-brand-primary flex items-center rounded-md px-4 lg:px-6 py-2 lg:py-3 font-medium text-sm sm:text-base transition-all ease-in-out outline hover:outline-2 hover:-outline-offset-2 hover:outline-brand-primary hover:bg-transparent hover:text-brand-primary",
  primary: `primary-button group ${labelTransition} ${outlineHoverBase} !text-brand-white [&_.arrow-block]:bg-brand-white [&_.label-block]:bg-brand-white [&:hover_.label-block]:outline-brand-primary [&:hover_.arrow-block]:outline-brand-primary hover:text-brand-primary`,
  secondary: `secondary-button group ${labelTransition} ${outlineHoverBase} [&_.arrow-block]:bg-brand-primary [&_.label-block]:bg-brand-primary [&:hover_.label-block]:outline-brand-primary [&:hover_.arrow-block]:outline-brand-primary hover:text-brand-primary`,
  outline: `outline-button group ${labelTransition} ${arrowTransition} ${borderBase} [&_.arrow-block]:border-brand-black [&_.label-block]:border-brand-black [&:hover_.label-block]:bg-brand-black [&:hover_.label-block]:border-brand-black [&:hover_.arrow-block]:bg-brand-black [&:hover_.arrow-block]:border-brand-black hover:text-brand-white`,
  secondary_outline: `secondary-outline-button group ${labelTransition} ${arrowTransition} ${borderBase} [&_.arrow-block]:border-brand-white [&_.label-block]:border-brand-white text-brand-white [&:hover_.label-block]:bg-brand-white [&:hover_.label-block]:border-brand-white [&:hover_.arrow-block]:bg-brand-white [&:hover_.arrow-block]:border-brand-white hover:text-brand-black`,
  link: `link-button ${linkBase}`,
  secondary_link: `secondary-link-button ${linkBase} text-brand-white`,
  ghost: "ghost-button [&_.arrow-block]:bg-gray-300 [&_.label-block]:bg-gray-300 text-gray-500 cursor-not-allowed",
};

// Variants that show the arrow-block
const variantsWithArrow: ButtonVariant[] = [
  "primary",
  "secondary",
  "outline",
  "secondary_outline",
  "link",
  "secondary_link",
  "ghost",
];

const ArrowBlock = ({ size }: { size?: ButtonSize }) => {
  const styles = size ? sizeStyles[size] : null;

  return (
    <span className={cn("arrow-block block aspect-square rounded-md overflow-hidden transition-all ease-in-out duration-500", styles?.arrow)}>
      <div className="flex h-full w-[200%] relative -translate-x-1/2 group-hover:translate-x-0 transition-all ease-in-out duration-500">
        <span className="w-full h-full flex justify-center items-center relative">
          <ArrowRight className={styles?.icon} />
        </span>
        <span className="w-full h-full flex justify-center items-center relative">
          <ArrowRight className={styles?.icon} />
        </span>
      </div>
    </span>
  );
};

const Button = (props: ButtonProps) => {
  const { className } = props;

  // Extract values from either button data or individual props
  const label = props.button?.label ?? props.label;
  const href = props.button?.href ?? props.href;
  const isExternal = props.button?.isExternal ?? props.isExternal;
  const target = props.button?.target ?? props.target;
  const variant = props.button?.buttonVariant ?? props.variant ?? "default";
  const size = props.button?.buttonSize ?? props.size;
  const onClick = props.button ? undefined : props.onClick;
  const children = props.button ? undefined : props.children;
  const type = props.button ? undefined : props.type;
  const disabled = props.button ? undefined : props.disabled;

  const variantClass = variantStyles[variant] || variantStyles.default;
  const hasArrow = variantsWithArrow.includes(variant);

  // Size: primary/secondary use provided size (default "sm"), link variants have no size, others use "sm"
  const effectiveSize: ButtonSize | undefined = hasArrow
    ? variantsWithoutSize.includes(variant)
      ? undefined
      : variantsWithSize.includes(variant)
        ? (size || "sm")
        : "sm"
    : undefined;
  const content = children ?? label;

  // Default variant - simple button without arrow
  if (!hasArrow) {
    const combinedClassName = cn(variantClass, className);

    if (onClick && !href) {
      return (
        <button
          type={type || "button"}
          onClick={onClick}
          disabled={disabled}
          className={combinedClassName}
        >
          {content}
        </button>
      );
    }

    if (isExternal && href) {
      return (
        <a
          href={href}
          target={target ? "_blank" : undefined}
          rel={target ? "noopener noreferrer" : undefined}
          onClick={onClick}
          className={combinedClassName}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href || "#"} onClick={onClick} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  // Variants with arrow-block
  const combinedClassName = cn("group flex flex-row gap-[2px]", variantClass, className);
  const labelSizeClass = effectiveSize ? sizeStyles[effectiveSize].label : "";

  const innerContent = (
    <>
      <span className={cn("label-block flex items-center rounded-md font-medium", labelSizeClass)}>
        {content}
      </span>
      <ArrowBlock size={effectiveSize} />
    </>
  );

  if (onClick && !href) {
    return (
      <button
        type={type || "button"}
        onClick={onClick}
        disabled={disabled}
        className={combinedClassName}
      >
        {innerContent}
      </button>
    );
  }

  if (isExternal && href) {
    return (
      <a
        href={href}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={combinedClassName}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <Link href={href || "#"} onClick={onClick} className={combinedClassName}>
      {innerContent}
    </Link>
  );
};

export default Button;

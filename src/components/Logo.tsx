import Image from "next/image";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Logo = ({ variant = "default", size = "lg" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-20",
    md: "h-24",
    lg: "h-32",
    xl: "h-44",
    "2xl": "h-52"
  };

  // For white variant, apply a CSS filter to make logo white
  const filterClass = variant === "white" ? "brightness-0 invert" : "";

  return (
    <Image 
      src="/logo.png" 
      alt="FanniFix - فني تصليح" 
      width={200}
      height={200}
      className={`${sizeClasses[size]} ${filterClass} w-auto object-contain`}
      priority
    />
  );
};

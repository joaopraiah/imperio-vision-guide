import logo from "@/assets/logo-imperio.webp";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Ótica Império Glasses"
      width={240}
      height={160}
      className={cn("h-10 w-auto sm:h-11", className)}
    />
  );
}

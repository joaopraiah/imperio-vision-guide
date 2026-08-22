import logo from "@/assets/logo-imperio.png";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Ótica Império Glasses"
      width={220}
      height={132}
      className={cn("h-10 w-auto sm:h-11", className)}
    />
  );
}

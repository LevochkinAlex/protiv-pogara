import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoMarkProps = {
  className?: string
  /** Для LCP в шапке */
  priority?: boolean
}

export function LogoMark({ className, priority }: LogoMarkProps) {
  return (
    <Image
      src="/Icon.png"
      alt="Институт национальной противопожарной безопасности"
      width={40}
      height={40}
      className={cn("h-10 w-10 shrink-0 rounded-lg object-contain", className)}
      priority={priority}
    />
  )
}

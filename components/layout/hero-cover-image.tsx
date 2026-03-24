import Image from 'next/image'
import { cn } from '@/lib/utils'

type HeroCoverImageProps = {
  src: string
  alt: string
  /** CSS object-position, напр. 50% 28% */
  objectPosition?: string
  /** Только для LCP на главной */
  priority?: boolean
  className?: string
}

/** Фоновая иллюстрация в hero с alt для SEO (вместо чистого background-image). */
export function HeroCoverImage({
  src,
  alt,
  objectPosition = 'center',
  priority = false,
  className,
}: HeroCoverImageProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition }}
        sizes="100vw"
        priority={priority}
      />
    </div>
  )
}

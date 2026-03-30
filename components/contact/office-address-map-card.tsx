"use client"

import type { ReactNode } from "react"
import { MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const OFFICE_ADDRESS_LINE =
  "109052, г. Москва, проезд Автомобильный, дом 10, стр. 15, пом. 1/1"

/** Центр здания: OSM building 10 с15, Автомобильный проезд */
const MAP_LON = 37.7064111
const MAP_LAT = 55.7232395
const MAP_ZOOM = 18

function yandexMapEmbedSrc() {
  const ll = `${MAP_LON}%2C${MAP_LAT}`
  return `https://yandex.ru/map-widget/v1/?ll=${ll}&z=${MAP_ZOOM}&l=map&pt=${ll}~pm2rdm&lang=ru_RU`
}

function OfficeAddressMapDialogContent() {
  return (
    <DialogContent className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-[min(90vw,800px)]">
      <DialogHeader className="space-y-1 px-6 pt-6 pb-4 text-left sm:pr-12">
        <DialogTitle>Адрес офиса</DialogTitle>
        <DialogDescription className="text-pretty">{OFFICE_ADDRESS_LINE}</DialogDescription>
      </DialogHeader>
      <div className="bg-muted relative h-[min(58vh,440px)] w-full min-h-[280px] border-y border-border">
        <iframe
          src={yandexMapEmbedSrc()}
          title="Офис на Яндекс.Картах"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
      <DialogFooter className="flex flex-row items-center justify-start border-0 px-6 py-4 sm:justify-end">
        <a
          href={`https://yandex.ru/maps/?text=${encodeURIComponent(OFFICE_ADDRESS_LINE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium hover:underline"
        >
          Открыть в Яндекс.Картах
        </a>
      </DialogFooter>
    </DialogContent>
  )
}

export function OfficeAddressMapDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <OfficeAddressMapDialogContent />
    </Dialog>
  )
}

export function OfficeAddressMapCard() {
  return (
    <OfficeAddressMapDialog>
      <button
        type="button"
        className="bg-card hover:bg-muted/50 hover:border-primary/25 focus-visible:ring-ring w-full rounded-lg border border-border p-6 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="flex gap-4">
          <MapPin className="text-primary mt-1 h-6 w-6 shrink-0" />
          <div>
            <h3 className="mb-2 font-semibold">Адрес</h3>
            <p className="text-muted-foreground">{OFFICE_ADDRESS_LINE}</p>
          </div>
        </div>
      </button>
    </OfficeAddressMapDialog>
  )
}

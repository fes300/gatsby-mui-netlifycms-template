import { pipe } from "fp-ts/lib/function"
import { map, fromNullable } from "fp-ts/lib/Option"
import { right, left } from "fp-ts/lib/Either"

export const scrollToId = (id: string, topMargin: number = 0) => {
  pipe(
    fromNullable(document.querySelector(`#${id}`)?.getBoundingClientRect().top),
    map((scrollPosition) => {
      window.scrollTo({
        top: window.scrollY + scrollPosition - topMargin,
        behavior: "smooth",
      })
    })
  )
}

export const eitherWindow =
  typeof window !== `undefined` ? right(window) : left(null)

export const isEntryNotScrolledYet = (e: IntersectionObserverEntry) => {
  return (e?.boundingClientRect.top ?? 0) > 0
}

export const getEitherDocument = () =>
  typeof document !== `undefined` ? right(document) : left(null)

import * as React from "react"
import * as O from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import * as R from "fp-ts/Record"
import { EnforceNonEmptyRecord, eqStringOption } from "."

export const registerIntersectionObservers = <S extends string>({
  headerHeight,
  setActiveButton,
  activeButtonRef,
  sections,
}: {
  headerHeight: number
  setActiveButton: React.Dispatch<React.SetStateAction<O.Option<S>>>
  activeButtonRef: React.MutableRefObject<O.Option<S>>
  sections: EnforceNonEmptyRecord<Record<S, string>>
}) => {
  const scrollUpSectionObserver = new IntersectionObserver(
    ([entry]) => {
      const sectionId = entry.target.id

      if (entry.isIntersecting) {
        setActiveButton(O.some(sectionId as S))
      } else {
        if (
          eqStringOption.equals(O.some(sectionId as S), activeButtonRef.current)
        )
          setActiveButton(O.none)
      }
    },
    {
      root: null,
      rootMargin: `-${headerHeight + 50}px`,
    }
  )
  const sectionDOMElements = pipe(
    sections,
    R.traverseWithIndex(O.option)((k, _: string) =>
      O.fromNullable(document.getElementById(k))
    )
  )

  pipe(
    sectionDOMElements,
    O.fold(
      () => {
        console.error(
          `you forgot to define some sections: ${pipe(
            sections,
            R.mapWithIndex((k, _: string) =>
              O.fromNullable(document.getElementById(k))
            ),
            R.compact,
            R.keys
          ).join(", ")}`
        )
      },
      (els) => {
        R.record.map(els, (el) => {
          scrollUpSectionObserver.observe(el)
        })
      }
    )
  )

  return () => {
    scrollUpSectionObserver.disconnect()
  }
}

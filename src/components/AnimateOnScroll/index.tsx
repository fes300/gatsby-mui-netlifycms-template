import * as React from "react"
import * as A from "fp-ts/Array"
import * as R from "fp-ts/Record"
import * as O from "fp-ts/Option"
import { MotionValue, useElementScroll, useViewportScroll } from "framer-motion"
import { contramap, ordNumber } from "fp-ts/Ord"
import { pipe } from "fp-ts/function"
import { snd } from "fp-ts/Tuple"
import { usePrevious } from "../../hooks/usePrevious"

interface Props<B extends string> {
  breakpoints: Record<B, number>
  scrollRef?: React.RefObject<HTMLElement>
  children: (i: {
    scrollYProgress: MotionValue<number>
    scrollY: MotionValue<number>
    pastBreakpoint: B
    prevPastBreakpoint: B
  }) => React.ReactElement
}

const ordNumberTuple = contramap<number, [any, number]>(snd)(ordNumber)

export const AnimateOnScroll = <B extends string>({
  children,
  scrollRef,
  breakpoints,
}: Props<B>) => {
  const orderedBreakpoints = pipe(
    breakpoints,
    R.toArray,
    A.sort(ordNumberTuple)
  )
  const invertedBreakpoint = pipe(orderedBreakpoints, A.reverse)

  const [pastBreakpoint, setPastBreakpoint] = React.useState(
    orderedBreakpoints[0][0]
  )
  const prevPastBreakpoint = usePrevious(pastBreakpoint)

  const { scrollYProgress, scrollY } =
    scrollRef !== undefined ? useElementScroll(scrollRef) : useViewportScroll()

  React.useEffect(
    () =>
      scrollYProgress.onChange((v) => {
        pipe(
          invertedBreakpoint,
          A.findFirst(([, b]) => {
            return v >= b
          }),
          O.map(([bl]) => setPastBreakpoint(bl))
        )
      }),
    [scrollYProgress]
  )

  return children({
    scrollYProgress,
    scrollY,
    pastBreakpoint,
    prevPastBreakpoint,
  })
}

export default AnimateOnScroll

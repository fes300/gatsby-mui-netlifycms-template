import { fold } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/pipeable"
import * as React from "react"
import { eitherWindow } from "../utils/dom"

export default function useWindowSize() {
  const [size, setSize] = React.useState(
    pipe(
      eitherWindow,
      fold(
        () => [0, 0],
        () => [window.innerHeight, window.innerWidth]
      )
    )
  )

  React.useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth])
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return size
}

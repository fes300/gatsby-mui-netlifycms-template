import * as React from "react"

export function usePrevious<V>(value: V, defaultValue?: V) {
  const ref = React.useRef(defaultValue ?? value)

  React.useEffect(() => {
    ref.current = value
  })

  return ref.current
}

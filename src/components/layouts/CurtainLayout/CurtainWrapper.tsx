import { pipe } from "fp-ts/lib/function"
import { Option, none, fold, some } from "fp-ts/lib/Option"
import * as React from "react"

interface Props {
  children: (parentHeight: number) => React.ReactNode
}

interface MemoProps {
  setParentHeight: React.Dispatch<React.SetStateAction<Option<number>>>
}

const MemoizedWrapper = React.memo<MemoProps>(
  ({ setParentHeight }) => {
    return (
      <div
        ref={(el) => {
          const parent = el?.parentElement ?? null
          if (parent !== null) {
            setParentHeight(some(parent.offsetHeight))
          }
        }}
        style={{ position: "absolute" }}
      />
    )
  },
  () => true
)

const CurtainWrapper: React.FC<Props> = ({ children }) => {
  const [parentHeight, setParentHeight] = React.useState<Option<number>>(none)

  return (
    <>
      <MemoizedWrapper setParentHeight={setParentHeight} />

      {pipe(
        parentHeight,
        fold(
          () => null,
          (ph) => children(ph)
        )
      )}
    </>
  )
}

export default CurtainWrapper

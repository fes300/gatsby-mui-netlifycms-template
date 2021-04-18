import { makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/lib/function"
import { Option, none, fromNullable, chainFirst } from "fp-ts/lib/Option"
import * as React from "react"
import Column from "../../Column"

export { default as CurtainWrapper } from "./CurtainWrapper"

type Props = {
  curtain: React.ReactNode
  hiddenSection: React.ReactNode
  parentHeight: number
}

const useStyles = makeStyles((t) => ({
  curtain: {
    zIndex: 2,
    overflow: "scroll",
  },
  transparentSection: {
    zIndex: 2,
    backgroundColor: "transparent",
  },
  hiddenSection: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wrapper: {
    overflow: "scroll",
  },
  relativeWrapper: {
    position: "relative",
  },
}))

const MemoizedTransparentSection = React.memo<{
  parentHeight: number
  setTransparentRef: React.Dispatch<
    React.SetStateAction<Option<HTMLDivElement>>
  >
}>(
  ({ setTransparentRef, parentHeight }) => {
    const classes = useStyles()
    return (
      <Column
        grow
        ref={(ref) => {
          pipe(fromNullable(ref), setTransparentRef)
        }}
        className={classes.transparentSection}
        style={{
          minHeight: `${parentHeight}px`,
          height: `${parentHeight}px`,
        }}
      />
    )
  },
  () => true
)

export const CurtainLayout: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [transparentRef, setTransparentRef] = React.useState<
    Option<HTMLDivElement>
  >(none)

  return (
    <>
      <Column className={classes.relativeWrapper}>
        <Column
          grow
          style={{ height: `${props.parentHeight}px` }}
          className={classes.hiddenSection}
        >
          {props.hiddenSection}
        </Column>
      </Column>

      <Column
        onMouseDown={(e) => {
          pipe(
            transparentRef,
            chainFirst((tr) => {
              tr.style.setProperty("pointer-events", "none")
              const el = document.elementFromPoint(e.clientX, e.clientY)

              if (el && (el as any).click) {
                ;(el as any).click()
              }

              tr.style.setProperty("pointer-events", "all")
              return none
            })
          )
        }}
        className={classes.wrapper}
        style={{ height: `${props.parentHeight}px` }}
      >
        <Column
          style={{ minHeight: `${props.parentHeight}px` }}
          className={classes.curtain}
          grow
        >
          {props.curtain}
        </Column>
        <MemoizedTransparentSection
          parentHeight={props.parentHeight}
          setTransparentRef={setTransparentRef}
        />
      </Column>
    </>
  )
}

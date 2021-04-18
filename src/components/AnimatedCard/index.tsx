import * as React from "react"
import Column from "../Column"
import { Card, makeStyles, Theme } from "@material-ui/core"
import cx from "classnames"
import { ReactElement } from "react"
import * as O from "fp-ts/Option"
import { eqString } from "fp-ts/Eq"

interface Props<K extends string> {
  active: O.Option<K>
  setActive: React.Dispatch<React.SetStateAction<O.Option<K>>>
  id: K
  className?: string
  height?: number
  activeClassName?: string
  change?: Change
}

type Change = "translate" | "height" | "translateNoMargin"

type StyleProps = {
  prop: string
  snakeProp: string
  propInitialValue: string
  propFinalValue: string
}

const useStyles = makeStyles<Theme, StyleProps>((t) => {
  return {
    wrapper: {},
    card: ({ prop, snakeProp, propInitialValue }) => ({
      backgroundColor: "transparent",
      [prop]: propInitialValue,
      transition: `${snakeProp} .2s linear`,
      boxShadow: "none",
    }),
    active: ({ prop, propFinalValue }) => ({
      zIndex: 1,
      [prop]: propFinalValue,
      boxShadow: `0 0 80px ${t.shadows[10]}`,
    }),
    cardNoMargin: {
      backgroundColor: "transparent",
      transform: "translateY(0)",
      transition: "all .2s ease-in-out",
      boxShadow: "none",
    },
    activeNoMargin: {
      zIndex: 1,
      transform: "translateY(-20px)",
      boxShadow: `0 0 80px ${t.shadows[10]}`,
    },
  }
})

export const eqActive = O.getEq(eqString)

const AnimatedCard = <K extends string>({
  children,
  active,
  setActive,
  id,
  height,
  className,
  activeClassName,
  change = "translate",
}: React.PropsWithChildren<Props<K>>): ReactElement => {
  const [prop, snakeProp] =
    change === "height" ? ["height", "height"] : ["marginTop", "margin-top"]
  const [propInitialValue, propFinalValue] =
    change === "height"
      ? [height ? `${height}px` : "100%", height ? `${height * 1.1}px` : "110%"]
      : ["20px", "0"]
  const classes = useStyles({
    prop,
    snakeProp,
    propInitialValue,
    propFinalValue,
  })
  const noMargin = change === "translateNoMargin"
  const isActive = eqActive.equals(active, O.some(id))

  return (
    <Column className={classes.wrapper}>
      <Card
        onClick={() => setActive(O.some(id))}
        className={cx(
          noMargin ? classes.cardNoMargin : classes.card,
          {
            [classes.active]: !noMargin && isActive,
            [classes.activeNoMargin]: noMargin && isActive,
          },
          className,
          isActive && activeClassName
        )}
      >
        {children}
      </Card>
      <Column style={{ zIndex: -1, opacity: 0, position: "absolute" }}>
        {children}
      </Column>
    </Column>
  )
}
export default AnimatedCard

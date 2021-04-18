import * as React from "react"
import Column from "../Column"
import { makeStyles, Theme } from "@material-ui/core"
import cx from "classnames"
import useIntersect from "../../hooks/useIntersect"

interface Props {
  distance?: number | string
  delay?: number
  position?: "top" | "left"
  animationTime?: string
}

interface StyleProps {
  distance: number | string
  delay: number
  position: "top" | "left"
  animationTime?: string
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  wrapper: {
    position: "relative",
  },
  slideIn: ({ animationTime, delay, distance, position }) => {
    return {
      width: "100%",
      transitionDelay: `${delay}ms`,
      opacity: 0,
      position: "absolute",
      [position]: distance,
      transition: `all ${animationTime} ease-in`,
    }
  },
  slideInOn: ({ position }) => ({
    opacity: 1,
    [position]: 0,
  }),
}))

const SlideInAtAppear: React.FC<Props> = ({
  delay = 0,
  distance = 60,
  position = "top",
  children,
  animationTime = "0.7s",
}) => {
  const classes = useStyles({ delay, distance, position, animationTime })
  const [show, setShow] = React.useState(false)
  const [setNodeRef, entry] = useIntersect({})

  React.useEffect(() => {
    if (!show && entry?.isIntersecting) {
      setShow(true)
    }
  }, [entry])

  return (
    <Column className={classes.wrapper}>
      <Column
        ref={setNodeRef}
        className={cx(classes.slideIn, { [classes.slideInOn]: show })}
      >
        {children}
      </Column>
      <Column style={{ opacity: 0 }}>{children}</Column>
    </Column>
  )
}
export default SlideInAtAppear

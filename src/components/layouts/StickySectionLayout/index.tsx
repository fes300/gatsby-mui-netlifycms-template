import { Container, makeStyles } from "@material-ui/core"
import * as React from "react"
import cx from "classnames"
import Column from "../../Column"

type Props = {
  className?: string
}

const useStyles = makeStyles((t) => ({
  stickySection: {
    position: "sticky",
    top: `${t.constants.mobileHeaderHeight}px`,
    height: `calc(100vh - ${t.constants.mobileHeaderHeight}px)`,
    minHeight: `calc(100vh - ${t.constants.mobileHeaderHeight}px)`,

    [t.breakpoints.up("sm")]: {
      top: `${t.constants.desktopHeaderHeight}px`,
      height: `calc(100vh - ${t.constants.desktopHeaderHeight}px)`,
      minHeight: `calc(100vh - ${t.constants.desktopHeaderHeight}px)`,
    },
  },
}))

const StickySectionLayout: React.FC<Props> = ({ children, className }) => {
  const classes = useStyles()

  return (
    <Column className={cx(classes.stickySection, className)}>
      <Container>
        <>{children}</>
      </Container>
    </Column>
  )
}

export default StickySectionLayout

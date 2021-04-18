import { makeStyles, Typography, useTheme } from "@material-ui/core"
import { Button } from "gatsby-theme-material-ui"
import * as React from "react"
import { useMatch } from "@reach/router"
import cx from "classnames"
import { Variant } from "@material-ui/core/styles/createTypography"
import { scrollToId } from "../../utils/dom"
import { noop } from "../../utils/function"

type SharedProps = {
  toggleDrawer?: (open: boolean) => React.EventHandler<any>
  className?: string
  label: string
  variant: Variant
}

type PageProps = SharedProps & {
  to: string
}

type ScrollProps = SharedProps & {
  scrollTo: string
}

type Props = PageProps | ScrollProps

const isPageProps = (p: Props): p is PageProps => {
  return (p as any).to !== undefined
}

const useStyles = makeStyles(() => ({
  menuItemCurrent: {
    color: "red",
  },
}))

const PageLink: React.FC<PageProps> = ({
  toggleDrawer,
  to,
  label,
  className,
  variant,
}) => {
  const classes = useStyles()
  const isCurrent = useMatch(to)

  return (
    <Button
      className={cx(className, {
        [classes.menuItemCurrent]: isCurrent,
      })}
      onClick={toggleDrawer !== undefined ? toggleDrawer(false) : noop}
      disableRipple
      color="inherit"
      to={to}
    >
      <Typography
        variant={variant}
        style={{
          textTransform: "none",
        }}
        color={"inherit"}
      >
        {label}
      </Typography>
    </Button>
  )
}

const ScrollLink: React.FC<ScrollProps> = ({
  toggleDrawer,
  scrollTo,
  label,
  className,
  variant,
}) => {
  const theme = useTheme()

  return (
    <Button
      className={className}
      disableRipple
      color="inherit"
      onClick={(e) => {
        scrollToId(scrollTo, theme.constants.mobileHeaderHeight * 0.7)
        if (toggleDrawer !== undefined) toggleDrawer(false)(e)
      }}
    >
      <Typography
        variant={variant}
        style={{
          textTransform: "none",
        }}
        color={"inherit"}
      >
        {label}
      </Typography>
    </Button>
  )
}

const MenuItem: React.FC<Props> = (props) => {
  return isPageProps(props) ? (
    <PageLink {...props} />
  ) : (
    <ScrollLink {...props} />
  )
}

export default MenuItem

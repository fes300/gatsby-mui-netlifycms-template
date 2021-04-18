import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
  Container,
} from "@material-ui/core"
import * as React from "react"
import cx from "classnames"
import Row from "../../Row"
import MenuItem from "../MenuItem"
import { IconButton } from "gatsby-theme-material-ui"
import * as O from "fp-ts/Option"
import * as R from "fp-ts/Record"
import * as A from "fp-ts/Array"
import { eqStringOption } from ".."
import { pipe } from "fp-ts/function"

interface Props<S extends string> {
  activeButton: O.Option<S>
  scrolled: boolean
  sections?: Record<S, string>
  intersectRef: React.Dispatch<React.SetStateAction<Element | null>>
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${theme.constants.desktopHeaderHeight}px`,
    justifyContent: "center",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  active: {
    color: "red",
  },
  menuItemsWrapper: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  menuItem: {
    marginRight: "10px",
  },
  menuButton: {
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  logoArea: {
    cursor: "pointer",
  },
  scrolled: {
    backgroundColor: "red",
  },
}))

const DesktopHeader = <S extends string>({
  activeButton,
  intersectRef,
  scrolled,
  sections,
}: React.PropsWithChildren<Props<S>>) => {
  const classes = useStyles()

  return (
    <>
      <AppBar
        className={cx(classes.appBar, { [classes.scrolled]: scrolled })}
        position="fixed"
      >
        <Toolbar>
          <Container>
            <Row hAlign={"center"}>
              <Box
                className={classes.logoArea}
                display={"flex"}
                flexDirection={"row"}
                flexGrow={1}
              >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="home"
                  disableRipple
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  <Typography variant={"h4"}>logoIcon</Typography>
                </IconButton>
              </Box>

              <Row centered className={classes.menuItemsWrapper}>
                {sections !== undefined
                  ? pipe(
                      sections,
                      R.toArray,
                      A.map(([v, l]) => (
                        <MenuItem
                          scrollTo={v}
                          label={l}
                          variant={"h3"}
                          className={cx(classes.menuItem, {
                            [classes.active]: eqStringOption.equals(
                              activeButton,
                              O.some(v)
                            ),
                          })}
                        />
                      ))
                    )
                  : null}
              </Row>
            </Row>
          </Container>
        </Toolbar>
      </AppBar>
      <div ref={intersectRef} id={"desktop-header-intersection-bait"} />
    </>
  )
}

export default DesktopHeader

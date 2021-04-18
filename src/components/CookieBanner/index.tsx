import {
  Button,
  Container,
  Grid,
  Snackbar,
  Typography,
  useTheme,
} from "@material-ui/core"
import { fade } from "@material-ui/core/styles/colorManipulator"
import * as React from "react"
import CookieModal from "./CookieModal"
import Row from "../Row"
import UnderlinedText from "../CustomTypography/UnderlinedText"

const CookieBanner: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const theme = useTheme()

  React.useEffect(() => {
    if (window.localStorage.getItem("privacyPolicy") === "true") {
      return
    }
    setOpen(true)
  }, [])

  return open ? (
    <Snackbar open={open} onClose={() => setOpen(false)}>
      <Container>
        <CookieModal open={modalOpen} handleClose={() => setModalOpen(false)} />

        <Grid
          container
          style={{ boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, .2)" }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            style={{
              padding: "20px",
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Typography
              variant={"h6"}
              color={"primary"}
              style={{ display: "inline-block", marginRight: "5px" }}
            >
              We use cookies to improve our site, by continuing to browse on
              this website you accept the use of cookies.
            </Typography>
            <Button onClick={() => setModalOpen(true)} variant={"text"}>
              <UnderlinedText
                textStyle={{
                  fontSize: "13px",
                  textTransform: "none",
                  letterSpacing: "0px",
                }}
              >
                More Information
              </UnderlinedText>
            </Button>
          </Grid>

          <Grid
            item
            onClick={() => {
              window.localStorage.setItem("privacyPolicy", "true")
              setOpen(false)
            }}
            xs={12}
            sm={4}
            md={3}
            style={{
              backgroundColor: fade(theme.palette.secondary.light, 1),
              padding: "20px",
            }}
          >
            <Row
              className={"cookie-close"}
              hAlign={"between"}
              vAlign={"center"}
              style={{ height: "100%" }}
            >
              <Typography
                variant={"h4"}
                color={"primary"}
                style={{ fontSize: "13px" }}
              >
                accept and close
              </Typography>

              <Typography variant={"h4"}>closeIcon</Typography>
            </Row>
          </Grid>
        </Grid>
      </Container>
    </Snackbar>
  ) : null
}

export default CookieBanner

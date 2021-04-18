import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import * as React from "react"

type Ratio = "1/5" | "1/1"

type Props = {
  left: React.ReactNode
  ratio: Ratio
  right: {
    mobileShow: React.ReactNode
    mobileHidden?: React.ReactNode
  }
  style?: React.CSSProperties
  color?: string
}

type size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

const getSizes = (r: Ratio): [size, size] => {
  switch (r) {
    case "1/1":
      return [6, 6]
    case "1/5":
      return [2, 10]
  }
}

const LeftRightLayout: React.FC<Props> = ({
  left,
  right,
  ratio,
  style,
  color,
}) => {
  const theme = useTheme()
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md"))
  const [leftSize, rightSize] = getSizes(ratio)
  const computedColor: React.CSSProperties =
    color !== undefined ? { color } : {}

  return (
    <Grid
      className={"gcs-ui-inner-section-layout"}
      container
      spacing={2}
      style={{ ...style, ...computedColor }}
    >
      <Grid item xs={12} md={leftSize}>
        {left}
      </Grid>

      <Grid item xs={12} md={rightSize}>
        {isTabletUp ? (
          <Grid container spacing={4}>
            {right.mobileShow}
            {right.mobileHidden}
          </Grid>
        ) : (
          <>
            <Grid container spacing={2}>
              {right.mobileShow}
            </Grid>

            {right.mobileHidden && (
              <Accordion
                className={"gcs-ui-inner-section-layout-read-more"}
                style={{ marginTop: 40, marginBottom: 60 }}
              >
                <AccordionSummary
                  style={computedColor}
                  expandIcon={<div>v</div>}
                  aria-controls="content"
                >
                  <Typography
                    style={{ fontSize: 14 }}
                    color={computedColor ? "inherit" : "primary"}
                    variant={"h4"}
                  >
                    Read more
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  className={"gcs-ui-inner-section-layout-read-more-details"}
                  style={computedColor}
                >
                  <Grid container spacing={2}>
                    {right.mobileHidden}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default LeftRightLayout

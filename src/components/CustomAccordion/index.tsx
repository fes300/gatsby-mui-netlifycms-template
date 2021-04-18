import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core"
import * as A from "fp-ts/lib/Array"
import * as O from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import Row from "../Row"

export type Props<I extends string> = {
  controlled?: boolean
  items: [id: I, summaryText: string, body: React.ReactNode][]
  expandIcon: React.ReactNode
  collapseIcon: React.ReactNode
}

export const accordionItems = <I extends string>(i: Props<I>["items"]) => i

const useStyles = makeStyles((t) => ({
  accordion: {
    "& .MuiAccordionSummary-content": {
      flexGrow: 1,
    },
    borderTopWidth: "1px",
    borderTopColor: t.palette.primary.main,
    borderTopStyle: "solid",
    "&:first-child": {
      borderTop: "none",
    },
  },
  summary: {
    padding: `${t.spacing(1)}px 0`,
  },
}))

const CustomAccordion = <I extends string>({
  controlled = false,
  items,
  expandIcon,
  collapseIcon,
}: Props<I>) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState<Array<I>>([])
  const handleChange = (panel: I) => (_: any, isExpanded: boolean) => {
    if (isExpanded) {
      setOpen(controlled ? [panel] : open.concat(panel))
    } else {
      setOpen(
        controlled
          ? []
          : pipe(
              open,
              A.filter((i) => i !== panel)
            )
      )
    }
  }

  return (
    <>
      {items.map(([summaryPreText, summaryText, body]) => {
        const isOpen = pipe(
          open,
          A.findIndex((opened) => opened === summaryPreText),
          O.fold(
            () => false,
            () => true
          )
        )

        return (
          <Accordion
            key={summaryText}
            className={classes.accordion}
            expanded={isOpen}
            onChange={handleChange(summaryPreText)}
          >
            <AccordionSummary
              className={classes.summary}
              expandIcon={isOpen ? collapseIcon : expandIcon}
              aria-controls="content"
            >
              <Row grow vAlign={"start"}>
                {summaryText}
              </Row>
            </AccordionSummary>

            <AccordionDetails>
              <Typography variant={"body1"}>{body}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}

export default CustomAccordion

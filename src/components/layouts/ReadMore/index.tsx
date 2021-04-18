import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core"
import * as React from "react"
import Column from "../../Column"

type Props = {
  showed: React.ReactNode
  hidden: React.ReactNode
}

const ReadMore: React.FC<Props> = ({ showed, hidden }) => {
  return (
    <Column>
      {showed}
      <Accordion>
        <AccordionSummary expandIcon={<div>v</div>} aria-controls="content">
          <Typography variant={"h4"}>Read more</Typography>
        </AccordionSummary>

        <AccordionDetails>{hidden}</AccordionDetails>
      </Accordion>
    </Column>
  )
}

export default ReadMore

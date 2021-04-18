import { Box, Typography } from "@material-ui/core"
import * as React from "react"
import PageLayout from "../components/layouts/PageLayout"

type Props = {}

const FourOFour: React.FC<Props> = () => {
  return (
    <PageLayout>
      <Box
        display={"flex"}
        flexDirection="column"
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography variant="h4">404</Typography>
        <Typography variant="h5">sorry page not found.</Typography>
      </Box>
    </PageLayout>
  )
}

export default FourOFour

import { Container } from "@material-ui/core"
import * as React from "react"
import Column from "../../Column"

type Props = {
  background?: string
  noContainer?: boolean
  className?: string
  id?: string
}

const Section: React.FC<Props> = ({
  background,
  noContainer,
  children,
  className,
  id,
}) => {
  return (
    <Column
      className={className}
      id={id}
      style={{
        background,
      }}
    >
      {noContainer ? (
        children
      ) : (
        <Container>
          <>{children}</>
        </Container>
      )}
    </Column>
  )
}

export default Section

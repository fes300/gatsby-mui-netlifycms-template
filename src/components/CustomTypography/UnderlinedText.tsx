import { Typography, useTheme } from "@material-ui/core"
import * as React from "react"
import Column from "../Column"
import Row from "../Row"

type Props = {
  className?: string
  color?: string
  textStyle?: React.CSSProperties
}

const UnderlinedText: React.FC<Props> = ({
  className,
  children,
  color,
  textStyle,
}) => {
  const theme = useTheme()

  return (
    <Row className={className}>
      <Column style={color ? { color } : {}}>
        <Typography
          variant={"h4"}
          color={color ? "inherit" : "primary"}
          style={textStyle}
        >
          {children}
        </Typography>

        <Row
          grow
          style={{
            marginTop: "1px",
            height: "3px",
            backgroundColor: color ?? theme.palette.primary.main,
          }}
        />
      </Column>
    </Row>
  )
}

export default UnderlinedText

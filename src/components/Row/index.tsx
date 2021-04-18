import * as React from "react"
import cx from "classnames"
import { noop } from "../../utils/function"
import { makeStyles } from "@material-ui/core"

interface Props {
  centered?: boolean
  grow?: boolean
  className?: string
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  hAlign?: "start" | "end" | "between" | "evenly" | "around" | "center"
  vAlign?: "start" | "end" | "center"
  style?: React.CSSProperties
}

const useStyles = makeStyles((t) => ({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  grow: {
    flexGrow: 1,
  },
  hCenter: {
    justifyContent: "center",
  },
  hBetween: {
    justifyContent: "space-between",
  },
  hStart: {
    justifyContent: "flex-start",
  },
  hEnd: {
    justifyContent: "flex-end",
  },
  hAround: {
    justifyContent: "space-around",
  },
  hEvenly: {
    justifyContent: "space-evenly",
  },
  vStart: {
    alignItems: "flex-start",
  },
  vEnd: {
    alignItems: "flex-end",
  },
  vCenter: {
    alignItems: "center",
  },
}))

const Row: React.FC<Props> = ({
  className,
  hAlign,
  vAlign,
  grow,
  centered,
  children,
  style,
  onClick = noop,
}) => {
  const classes = useStyles()

  return (
    <div
      style={style}
      onClick={(e) => {
        onClick(e)
      }}
      className={cx(classes.row, className, {
        [classes.centered]: centered,
        [classes.grow]: grow,
        [classes.hCenter]: hAlign === "center",
        [classes.hStart]: hAlign === "start",
        [classes.hEnd]: hAlign === "end",
        [classes.hBetween]: hAlign === "between",
        [classes.hEvenly]: hAlign === "evenly",
        [classes.hAround]: hAlign === "around",
        [classes.vStart]: vAlign === "start",
        [classes.vEnd]: vAlign === "end",
        [classes.vCenter]: vAlign === "center",
      })}
    >
      {children}
    </div>
  )
}

export default Row

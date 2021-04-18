import * as React from "react"
import cx from "classnames"
import { makeStyles } from "@material-ui/core"

interface Props {
  centered?: boolean
  grow?: boolean
  className?: string
  id?: string
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLDivElement, MouseEvent>>
  onMouseUp?: React.EventHandler<React.MouseEvent<HTMLDivElement, MouseEvent>>
  vAlign?: "start" | "end" | "between" | "evenly" | "around" | "center"
  hAlign?: "start" | "end" | "center"
  style?: React.CSSProperties
  children?: React.ReactNode
}

const useStyles = makeStyles(() => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  grow: {
    flexGrow: 1,
  },
  vCenter: {
    justifyContent: "center",
  },
  vBetween: {
    justifyContent: "space-between",
  },
  vStart: {
    justifyContent: "flex-start",
  },
  vEnd: {
    justifyContent: "flex-end",
  },
  vAround: {
    justifyContent: "space-around",
  },
  vEvenly: {
    justifyContent: "space-evenly",
  },
  hStart: {
    alignItems: "flex-start",
  },
  hEnd: {
    alignItems: "flex-end",
  },
  hCenter: {
    alignItems: "center",
  },
}))

const Column = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      grow,
      centered,
      children,
      hAlign,
      vAlign,
      style,
      onClick,
      onMouseDown,
      onMouseUp,
      id,
    },
    ref
  ) => {
    const classes = useStyles()

    return (
      <div
        id={id}
        style={style}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
        ref={ref}
        className={cx(classes.column, className, {
          [classes.centered]: centered,
          [classes.grow]: grow,
          [classes.hCenter]: hAlign === "center",
          [classes.hStart]: hAlign === "start",
          [classes.hEnd]: hAlign === "end",
          [classes.vBetween]: vAlign === "between",
          [classes.vEvenly]: vAlign === "evenly",
          [classes.vAround]: vAlign === "around",
          [classes.vStart]: vAlign === "start",
          [classes.vEnd]: vAlign === "end",
          [classes.vCenter]: vAlign === "center",
        })}
      >
        {children}
      </div>
    )
  }
)

export default Column

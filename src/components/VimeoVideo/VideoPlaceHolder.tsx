import { Option, some } from "fp-ts/lib/Option"
import React from "react"
import Player from "@vimeo/player"
import { makeStyles } from "@material-ui/core"
import cx from "classnames"

interface VimeoIFrameProps {
  height: number
  width: number
  videoSrcURL: string
  videoTitle: string
  landscape: boolean
  setPlayer: React.Dispatch<React.SetStateAction<Option<Player>>>
}

const useStyles = makeStyles((t) => ({
  outerWrapper: {
    position: "relative",
    overflow: "hidden",
    maxWidth: "100vw",
    height: "100%",
  },
  wrapper: {
    overflow: "hidden",
    background: "black",
    position: "absolute",

    "& iframe": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    },
    "& object": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    },
    "& embed": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    },
  },
  landscape: {
    left: "50%",
    transform: "translate(-50%, 0px)",
  },
}))

const VideoPlaceholder: React.FC<VimeoIFrameProps> = React.memo(
  ({ height, width, videoSrcURL, videoTitle, setPlayer, landscape }) => {
    const classes = useStyles()
    return (
      <div className={classes.outerWrapper}>
        <div
          className={cx(classes.wrapper, { [classes.landscape]: landscape })}
          style={{ height, width, minWidth: width }}
        >
          <iframe
            className={"vimeoPlaceholder"}
            ref={(iframe) => {
              if (iframe) {
                const player = new Player(iframe)
                setPlayer(some(player))
              }
            }}
            src={videoSrcURL + "?controls=0&muted=1"}
            title={videoTitle}
            allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            width={width}
            height={height}
          />
        </div>
      </div>
    )
  },
  (
    { height: prevHeight, width: prevWidth, videoSrcURL: prevVideoSrcURL },
    { height, width, videoSrcURL }
  ) => {
    return (
      prevHeight === height &&
      prevWidth === width &&
      videoSrcURL === prevVideoSrcURL
    )
  }
)

export default VideoPlaceholder

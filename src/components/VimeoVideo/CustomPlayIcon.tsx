import cx from "classnames"
import React from "react"
import Player from "@vimeo/player"
import { makeStyles } from "@material-ui/styles"

interface CustomPlayIconProps {
  controlledPlayerId: string
  controlledPlayer: Player | null
  CustomPlayIcon: React.FC
  CustomPauseIcon: React.FC
}

const useStyles = makeStyles(() => ({
  playIcon: {
    minHeight: "30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "opacity 0.5s",
    opacity: 1,
    cursor: "pointer",
    zIndex: 2,
  },
  playingIcon: {
    opacity: 0,
  },
}))

const CustomPlayIconComponent: React.FC<CustomPlayIconProps> = React.memo(
  ({
    controlledPlayer,
    CustomPlayIcon,
    CustomPauseIcon,
    controlledPlayerId,
  }) => {
    const classes = useStyles()
    const [playing, setPlaying] = React.useState(false)
    React.useEffect(() => {
      controlledPlayer?.on("playing", () => {
        setPlaying(true)
      })
      controlledPlayer?.on("pause", () => {
        setPlaying(false)
      })
    }, [controlledPlayer])

    return (
      <div className={cx(classes.playIcon, { [classes.playingIcon]: playing })}>
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => {
            if (playing) {
              controlledPlayer?.pause()
            } else {
              document
                .getElementById(controlledPlayerId)
                ?.setAttribute(
                  "style",
                  "position: absolute; top: 0; z-index: 1;"
                )
              controlledPlayer?.play()
            }
          }}
        />
        {playing ? <CustomPauseIcon /> : <CustomPlayIcon />}
      </div>
    )
  },
  ({ controlledPlayer: prevPlayer }, { controlledPlayer }) =>
    prevPlayer === controlledPlayer
)

export default CustomPlayIconComponent

import { fold, none, Option, some } from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import React, { useState } from "react"
import useWindowSize from "../../hooks/useWindowSize"
import Player from "@vimeo/player"
import { makeStyles } from "@material-ui/styles"
import { useMediaQuery, useTheme } from "@material-ui/core"
import CustomPlayIconComponent from "./CustomPlayIcon"
import VideoPlaceholder from "./VideoPlaceHolder"

interface Props {
  videoURL: string
  heightWidthRatio: number
  mobile?: {
    videoURL: string
    heightWidthRatio: number
  }
  videoTitle: string
  height?: number
  controls?: boolean
  CustomPlayIcon?: React.FC
  CustomPauseIcon?: React.FC
  landscape?: boolean
}

type State = {
  sizes: Option<{ width: number; height: number }>
  player: Option<Player>
}
interface WrapperProps {
  heightWidthRatio: number
  setSizes: React.Dispatch<React.SetStateAction<State["sizes"]>>
  windowSize: number
  manualHeight?: number
  landscape: boolean
}

const useStyles = makeStyles(() => ({
  playerDOMEl: {
    position: "absolute",
    top: 0,
    zIndex: -1,
    left: "50%",
    transform: "translate(-50%, 0px)",
  },
  playerDOMElWrapper: {
    position: "relative",
    overflow: "hidden",
    maxWidth: "100vw",
    height: "100%",
  },
  wrapper: {
    position: "relative",
    overflow: "hidden",
  },
  hoverLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
}))

const Wrapper = React.memo<WrapperProps>(
  (props) => {
    return (
      <div
        className="video"
        ref={(el) => {
          if (el !== null) {
            const computedHeight = el.offsetWidth * props.heightWidthRatio
            const computedWidth = el.offsetWidth

            const [actualHeight, actualWidth] = props.landscape
              ? getMinimalSizes(
                  props.manualHeight ?? computedHeight,
                  computedWidth,
                  props.heightWidthRatio
                )
              : [props.manualHeight ?? computedHeight, computedWidth]

            props.setSizes(
              some({
                height: actualHeight,
                width: actualWidth,
              })
            )
          }
        }}
      />
    )
  },
  (
    { heightWidthRatio: prevHeightWidthRatio, windowSize: prevWindowSize },
    { heightWidthRatio, windowSize }
  ) => {
    return (
      prevHeightWidthRatio === heightWidthRatio && prevWindowSize === windowSize
    )
  }
)

const getMinimalSizes = (
  minHeight: number,
  minWidth: number,
  heightWidthRatio: number
): [height: number, width: number] => {
  // height if we chose minWidth as basis
  const relativeH = heightWidthRatio * minWidth
  // width if we chose minHeight as basis
  const relativeW = minHeight / heightWidthRatio

  // the biggest difference wins
  if (relativeH / minHeight > relativeW / minWidth) {
    return [relativeH, minWidth]
  } else {
    return [minHeight, relativeW]
  }
}

const VimeoVideo: React.FC<Props> = ({
  videoURL,
  heightWidthRatio,
  mobile,
  videoTitle,
  CustomPlayIcon,
  CustomPauseIcon,
  height,
  controls = false,
  landscape = false,
}) => {
  const classes = useStyles()
  const [sizes, setSizes] = useState<State["sizes"]>(none)
  const [windowSize] = useWindowSize()
  const videoID = videoURL.split("/")[videoURL.split("/").length - 1]
  const [player, setPlayer] = useState<State["player"]>(none)
  const controlledPlayer = React.useRef<Player | null>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const removeWrapperActive = () => {
    wrapperRef.current?.blur()
    wrapperRef.current?.classList.remove("active")
  }
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))
  const domElID = React.useMemo(() => (Math.random() * 1000).toFixed(0), [])
  const actualVideoURL =
    mobile !== undefined && !isDesktop ? mobile.videoURL : videoURL
  const actualHeightWidthRatio =
    mobile !== undefined && !isDesktop
      ? mobile.heightWidthRatio
      : heightWidthRatio

  React.useEffect(() => {
    if (sizes._tag === "None") return

    document.addEventListener("mousedown", removeWrapperActive)

    controlledPlayer.current = new Player(domElID, {
      url: actualVideoURL,
      controls,
      height: height ?? sizes.value.height, // not working!
      width: sizes.value.width,
    })

    setTimeout(() => {
      const iframe = document.querySelector(`[id='${domElID}'] iframe`)

      iframe?.setAttribute(
        "height",
        (landscape
          ? sizes.value.height
          : height ?? sizes.value.height
        ).toString()
      )
      iframe?.setAttribute("width", sizes.value.width.toString())
      iframe?.setAttribute("min-width", sizes.value.width.toString())
    }, 500)

    return () => document.removeEventListener("mousedown", removeWrapperActive)
  }, [videoURL, videoID, mobile?.videoURL, sizes])

  return (
    <>
      <Wrapper
        landscape={landscape}
        manualHeight={height}
        windowSize={windowSize}
        setSizes={setSizes}
        heightWidthRatio={actualHeightWidthRatio}
      />
      {pipe(
        sizes,
        fold(
          () => null,
          ({ width, height }) => {
            return (
              <div
                ref={wrapperRef}
                className={classes.wrapper}
                style={{ height }}
              >
                <div className={classes.hoverLayer}>
                  <div className={classes.playerDOMElWrapper}>
                    <div id={domElID} className={classes.playerDOMEl} />
                  </div>

                  <div>
                    {player._tag === "Some" &&
                      CustomPlayIcon &&
                      CustomPauseIcon && (
                        <CustomPlayIconComponent
                          controlledPlayerId={domElID}
                          controlledPlayer={controlledPlayer.current}
                          CustomPlayIcon={CustomPlayIcon}
                          CustomPauseIcon={CustomPauseIcon}
                        />
                      )}
                  </div>

                  <VideoPlaceholder
                    landscape={landscape}
                    setPlayer={setPlayer}
                    height={height}
                    width={width}
                    videoSrcURL={actualVideoURL}
                    videoTitle={videoTitle}
                  />
                </div>
              </div>
            )
          }
        )
      )}
    </>
  )
}

export default VimeoVideo

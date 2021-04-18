import * as React from "react"
import { motion, Variants } from "framer-motion"
import { makeStyles, Theme, Typography } from "@material-ui/core"
import { Button } from "gatsby-theme-material-ui"
import AnimateOnScroll from "../AnimateOnScroll"
import Column from "../Column"

const useStyles = makeStyles<Theme, { noScroll: boolean }>((t) => ({
  innerScrollContainer: {
    minHeight: "500vh",
  },
  scrollContainer: ({ noScroll }) => ({
    overflow: noScroll ? "hidden" : "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    height: "100vh",
  }),
  gear: {
    position: "fixed",
    top: "calc(65% - 50px)",
    left: "calc(70% - 50px)",
    width: "100px",
  },
  centerGear: {
    position: "fixed",
    top: "calc(65% - 8px)",
    left: "calc(70% - 8px)",
    borderRadius: "50%",
    backgroundColor: "red",
  },
  claim: {
    height: "80vh",
    zIndex: 2,
    backgroundColor: t.palette.primary.main,
  },
}))

const gearsVariants: Variants = {
  initial: { opacity: 1, x: 0, y: 0, transform: "none" },
  break: {
    opacity: 1,
    x: 100,
    y: 70,
    transition: {
      x: { duration: 0.5, stiffness: 1000, ease: [0, 0, 0, 1] },
      y: { duration: 0.6 },
    },
  },
}

const dotVariants: Variants = {
  show: {
    height: 16,
    width: 16,
    scale: 1.4,
    transition: {
      scale: {
        repeatType: "reverse",
        values: [1, 2, 1],
        duration: 0.5,
        repeat: Infinity,
      },
    },
  },
  hide: {
    height: 0,
    width: 0,
  },
}

export const IntroAnimation = () => {
  const scrollRef = React.useRef(null)
  const [fixed, setFixed] = React.useState(false)
  const [noScroll, setNoScroll] = React.useState(false)
  const classes = useStyles({ noScroll })
  const centerGearRef = React.useRef<null | HTMLDivElement>(null)

  return (
    <>
      <Column ref={scrollRef} className={classes.scrollContainer}>
        <Column vAlign={"end"} className={classes.innerScrollContainer}>
          <Column centered className={classes.claim}>
            <Typography variant={"h1"}>
              Building logical machines is hard...
            </Typography>
            <Typography variant={"h3"}>
              Thank you for fixing my website, can help you with your project in
              exchange?
            </Typography>

            <Button to={"/profile"} color={"secondary"}>
              Sure why not
            </Button>
          </Column>
        </Column>
      </Column>

      <AnimateOnScroll
        breakpoints={{
          initial: 0,
          break: 0.5,
        }}
        scrollRef={scrollRef}
      >
        {({ scrollY, pastBreakpoint, prevPastBreakpoint }) => {
          if (pastBreakpoint === "initial" && prevPastBreakpoint === "break") {
            setTimeout(() => setFixed(false))
          }

          if (
            pastBreakpoint === "break" &&
            prevPastBreakpoint === "initial" &&
            !fixed
          ) {
            setTimeout(() => setNoScroll(true))
          }

          return (
            <>
              <motion.div
                variants={dotVariants}
                animate={pastBreakpoint === "break" && !fixed ? "show" : "hide"}
                ref={centerGearRef}
                className={classes.centerGear}
              />
              <motion.svg
                variants={gearsVariants}
                animate={
                  pastBreakpoint === "break" && !fixed ? "break" : "initial"
                }
                className={classes.gear}
                onDragEnd={(_, info) => {
                  const isRightVel =
                    Math.abs(info.velocity.x) < 25 &&
                    Math.abs(info.velocity.y) < 25
                  const isRightH =
                    Math.abs(
                      info.point.x -
                        10 -
                        (centerGearRef.current?.offsetLeft ?? 0)
                    ) < 30
                  const isRightV =
                    Math.abs(
                      info.point.y -
                        10 -
                        (centerGearRef.current?.offsetTop ?? 0)
                    ) < 30

                  if (isRightH && isRightV && isRightVel) {
                    setFixed(true)
                    setNoScroll(false)
                  }
                }}
                dragConstraints={scrollRef}
                drag={pastBreakpoint === "break" && !fixed}
                viewBox="0 0 500 500"
              >
                <motion.path
                  d="m 241.2694,28.97144 -7.3448,29.11007 -10.5321,1.66343 c -5.8204,0.83172 -14.1353,2.49515 -18.7085,3.6041 -4.4346,1.10896 -8.1762,1.94067 -8.4534,1.66344 -0.1386,-0.27724 -7.622,-10.67369 -16.6297,-23.28806 -8.8692,-12.61436 -16.7683,-23.42667 -17.3226,-23.98114 -1.5244,-1.66344 -38.9413,16.4957 -38.1098,18.71361 1.3858,3.88134 15.7982,55.72498 15.5211,56.00222 -9.8393,7.62406 -18.1541,14.55503 -22.7273,18.99085 l -5.8204,5.54477 -26.469,-12.05988 C 70.12195,98.41974 57.78825,93.01358 57.09534,93.01358 c -0.6929,0 -6.37472,7.62407 -12.61086,16.77295 l -11.50222,16.91156 21.20288,20.93152 21.06431,20.93152 -2.35588,6.23787 c -1.38581,3.46549 -4.01885,11.22817 -5.95898,17.32742 -1.94013,6.09925 -3.74169,11.36679 -4.01885,11.64403 -0.27716,0.41585 -13.71951,1.94067 -29.93348,3.46548 L 3.6031,210.14694 2.63304,221.23648 c -0.55433,6.09926 -1.24723,15.52537 -1.80155,20.93153 L 0,252.00998 l 29.102,7.34683 29.10199,7.34682 0.97007,6.37649 c 0.83148,5.96063 3.46452,20.23843 5.26607,27.86249 0.69291,3.18825 -1.24723,4.85168 -23.55876,20.65428 -13.30376,9.42612 -24.11308,17.60466 -23.83592,18.15914 4.85034,11.92126 17.32262,36.04103 18.70843,36.04103 1.10865,0 14.13526,-3.46548 29.24058,-7.76268 l 27.30044,-7.62407 3.4645,4.43582 c 1.9402,2.49515 7.4834,9.14888 12.3337,14.83227 l 8.7306,10.11922 -11.9179,26.06043 c -6.5133,14.41642 -11.918,26.61492 -11.918,27.30802 0,0.69309 7.622,6.51511 17.0455,12.8916 l 16.9068,11.5054 20.9258,-21.76324 c 20.0942,-20.93152 21.0643,-21.76323 24.2516,-19.96118 1.8016,0.97033 9.8393,4.01996 17.877,6.79235 l 14.551,4.99029 2.7716,28.41697 c 1.5244,15.52537 3.1873,28.97144 3.7417,29.80316 0.6929,0.97033 8.3148,1.94067 18.7084,2.49515 9.8392,0.55448 18.7084,1.24757 19.9556,1.66343 1.8016,0.41586 3.4646,-4.71306 9.5621,-28.55559 6.5133,-25.36734 7.7606,-29.24868 10.255,-29.66454 1.663,-0.27724 8.592,-1.52481 15.3825,-2.77238 6.929,-1.24758 13.9967,-2.49515 15.9368,-3.04963 3.3259,-0.6931 4.8503,1.10895 20.0942,22.45633 9.1464,12.75298 17.0455,23.70391 17.4612,24.39701 0.4158,0.6931 9.1464,-2.91101 19.4014,-7.9013 13.9966,-6.93097 18.4312,-9.70336 18.1541,-11.50541 -0.2772,-1.24757 -3.8803,-14.27779 -8.0377,-28.6942 l -7.3448,-26.33768 4.4346,-3.46549 c 2.3558,-1.94067 8.8692,-7.34682 14.4124,-12.1985 5.5432,-4.71306 10.3936,-8.5944 10.8093,-8.5944 0.4157,0 12.6109,5.40616 27.1619,11.92127 14.551,6.65373 26.8847,11.36678 27.439,10.81231 0.5543,-0.6931 5.959,-8.31717 11.9179,-17.05018 l 10.8094,-15.66399 -21.2029,-21.20876 -21.2029,-21.20876 4.9889,-13.72332 c 2.7716,-7.48544 5.5432,-15.52537 6.2362,-17.74328 l 1.2472,-4.15858 29.2406,-2.911 c 16.2139,-1.66343 29.6563,-3.18825 29.9334,-3.46549 0.6929,-0.83171 3.7417,-40.33823 3.1874,-40.8927 -0.2772,-0.41586 -13.3038,-3.88135 -29.102,-7.90131 l -28.4091,-7.2082 -1.663,-10.67369 c -0.8314,-5.96064 -2.4944,-14.41642 -3.6031,-18.71362 -1.1086,-4.2972 -1.5244,-8.17854 -0.97,-8.73302 0.5543,-0.55447 11.0864,-8.03992 23.2816,-16.63432 12.1951,-8.5944 22.7272,-16.07984 23.2816,-16.63432 1.8015,-1.52481 -16.4912,-38.95204 -18.7085,-38.12032 -0.97,0.41586 -13.0266,3.88134 -26.7461,7.62406 -13.7195,3.88134 -25.9146,7.34683 -27.1618,7.62407 -1.5244,0.55447 -3.4646,-0.97034 -5.6819,-4.43582 -1.9401,-2.91101 -7.4833,-9.56474 -12.1951,-14.69365 l -8.592,-9.42612 11.918,-26.19906 c 6.5133,-14.55503 11.9179,-26.89215 11.9179,-27.58525 0,-0.69309 -7.6219,-6.37649 -16.7683,-12.61436 l -16.7683,-11.36678 -21.2028,21.07014 -21.2029,21.20876 -6.0976,-2.49515 c -3.1874,-1.38619 -11.225,-4.15858 -17.7384,-6.23787 L 296.0089,62.93319 293.2373,33.26864 290.4656,3.6041 278.6863,2.63377 C 272.1729,2.21791 262.7494,1.38619 257.7605,0.83172 L 248.6142,0 Z m 39.4956,77.21098 c 32.1507,6.65373 64.0244,26.4763 84.6729,52.39812 10.3936,13.03022 22.5887,36.73413 26.7461,52.25949 14.1353,52.39812 -0.5543,106.7369 -39.2184,144.57999 -57.0953,55.8636 -149.806,55.44774 -205.9312,-0.6931 -29.102,-29.11006 -43.2373,-62.93319 -43.5144,-103.68727 -0.2772,-37.42723 11.225,-68.47796 35.8924,-97.58803 21.4801,-25.22872 57.2339,-44.49681 91.4634,-49.20987 12.8881,-1.80205 36.1697,-0.83171 49.8892,1.94067 z"
                  style={{
                    rotate: pastBreakpoint === "initial" || fixed ? scrollY : 0,
                  }}
                />
              </motion.svg>
            </>
          )
        }}
      </AnimateOnScroll>
    </>
  )
}

export default IntroAnimation

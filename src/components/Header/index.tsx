import * as React from "react"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"
import * as O from "fp-ts/Option"
import { getEq } from "fp-ts/Option"
import { eqString } from "fp-ts/Eq"
import { registerIntersectionObservers } from "./registerIntersectionObservers"
import { Theme, useMediaQuery, useTheme } from "@material-ui/core"
import useIntersect from "../../hooks/useIntersect"
import { isEntryNotScrolledYet } from "../../utils/dom"

export const eqStringOption = getEq(eqString)
export type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

interface Props<S extends string> {
  sections?: EnforceNonEmptyRecord<Record<S, string>>
}

const Header = <S extends string>({
  sections,
}: React.PropsWithChildren<Props<S>>) => {
  const theme = useTheme()
  const [desktopScrolled, setDesktopScrolled] = React.useState(false)
  const [mobileScrolled, setMobileScrolled] = React.useState(false)
  const isDesktop = useMediaQuery<Theme>((t) => t.breakpoints.up("md"), {
    noSsr: true,
  })
  const headerHeight = isDesktop
    ? theme.constants.desktopHeaderHeight
    : theme.constants.mobileHeaderHeight
  const [activeButton, setActiveButton] = React.useState<O.Option<S>>(O.none)
  const [mobileRef, mobileEntry] = useIntersect({})
  const activeButtonRef = React.useRef(activeButton)

  React.useEffect(() => {
    activeButtonRef.current = activeButton
  }, [activeButton])

  React.useEffect(() => {
    if (isDesktop || mobileEntry === null) return

    if (isEntryNotScrolledYet(mobileEntry)) {
      setMobileScrolled(false)
      return
    }

    setMobileScrolled(true)
  }, [mobileEntry])

  const [desktopRef, desktopEntry] = useIntersect({})

  React.useEffect(() => {
    if (!isDesktop || desktopEntry === null) return

    if (isEntryNotScrolledYet(desktopEntry)) {
      setDesktopScrolled(false)
      return
    }

    setDesktopScrolled(true)
  }, [desktopEntry])

  React.useEffect(() => {
    if (sections === undefined) return

    return registerIntersectionObservers({
      headerHeight,
      setActiveButton,
      activeButtonRef,
      sections,
    })
  }, [])

  return (
    <>
      <DesktopHeader
        sections={sections}
        scrolled={desktopScrolled}
        intersectRef={desktopRef}
        activeButton={activeButton}
      />
      <MobileHeader
        sections={sections}
        scrolled={mobileScrolled}
        intersectRef={mobileRef}
        activeButton={activeButton}
      />
    </>
  )
}

export default Header

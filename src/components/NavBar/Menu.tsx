import { MouseEvent, useEffect, useRef, useState } from 'react'
import { matchPath, Link, useLocation } from 'react-router-dom'
import { FaCompactDisc, FaMicrophoneAlt, FaSearch } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

import styles from './Menu.module.css'

export const Menu = () => {
  // set hovered element reference

  const [hover, setHover] = useState<Element | null>(null)

  const handleMouseEnterItem = (e: MouseEvent) => {
    setHover(e.currentTarget)
  }
  const handleMouseLeaveItem = () => {
    setHover(null)
  }

  // set active element reference based on current path

  const [active, setActive] = useState<Element | null>(null)
  const links = useRef<Record<string, Element | null>>({})
  const location = useLocation()

  useEffect(() => {
    const route = Object.entries(links.current).find(
      ([path]) => !!matchPath(location.pathname, path)
    )
    if (route) {
      const [, element] = route
      setActive(element)
    }
  }, [location.pathname])

  // highlight element positioning

  const wrapper = useRef<HTMLDivElement>(null)

  function renderHighlight() {
    const element = hover || active

    if (!element || !wrapper.current) {
      return <span className={styles.highlight} />
    }

    const elementRect = element.getBoundingClientRect()
    const wrapperRect = wrapper.current.getBoundingClientRect()

    return (
      <span
        className={styles.highlight}
        style={{
          height: `${elementRect.height}px`,
          width: `${elementRect.width}px`,
          transform: `
            translate(
              ${elementRect.left - wrapperRect.left}px,
              ${elementRect.top - wrapperRect.top}px
            )
          `,
        }}
      />
    )
  }

  function renderLink(
    path: string,
    displayName: string,
    Icon: IconType,
    ...matches: string[]
  ) {
    return (
      <li
        onMouseEnter={handleMouseEnterItem}
        onMouseLeave={handleMouseLeaveItem}
        ref={(el) => {
          links.current[path] = el
          matches.forEach((match) => {
            links.current[match] = el
          })
        }}
      >
        <Link className={styles.item} to={path}>
          <Icon className={styles.icon} />
          {displayName}
        </Link>
      </li>
    )
  }

  return (
    <div ref={wrapper}>
      {renderHighlight()}
      <ul className={styles.menu}>
        {renderLink('/shows', 'Shows', FaMicrophoneAlt, '/episodes')}
        {renderLink('/library', 'Your Library', FaCompactDisc)}
        {renderLink('/search', 'Search', FaSearch)}
      </ul>
    </div>
  )
}

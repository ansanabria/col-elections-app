'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const TOP_GAP = 24 // px from top of viewport when locked at top
const BOTTOM_GAP = 24 // px from bottom of viewport when locked at bottom

/**
 * StickySidebar
 *
 * Smart sticky sidebar that handles sidebars taller than the viewport:
 *
 * - Scrolling DOWN → sidebar scrolls down with the page and locks once its
 *   bottom edge reaches the bottom of the viewport.
 * - Scrolling UP   → sidebar scrolls UP smoothly with the page and locks
 *   once its top edge reaches the top of the viewport.
 *
 * Uses a two-element structure: an outer `<aside>` that fills the grid row
 * naturally, and an inner sticky `<div>` (h-max) that only takes up as much
 * height as its content.
 */
export function StickySidebar({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const computeInitialTop = () => {
      const sidebarH = el.offsetHeight
      const viewportH = window.innerHeight
      if (sidebarH <= viewportH - TOP_GAP - BOTTOM_GAP) {
        return TOP_GAP
      }
      return viewportH - sidebarH - BOTTOM_GAP
    }

    let currentTop = computeInitialTop()
    let lastScrollY = window.scrollY

    el.style.top = `${currentTop}px`

    function onScroll() {
      if (!el) return

      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      const sidebarH = el.offsetHeight
      const viewportH = window.innerHeight

      const minTop = viewportH - sidebarH - BOTTOM_GAP
      const maxTop = TOP_GAP

      currentTop = Math.min(maxTop, Math.max(minTop, currentTop - delta))
      el.style.top = `${currentTop}px`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside>
      <div
        ref={innerRef}
        className="sticky h-max overflow-hidden rounded-lg border border-border bg-card"
      >
        {children}
      </div>
    </aside>
  )
}

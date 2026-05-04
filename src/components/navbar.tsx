import * as React from "react"
import { useTheme } from "@/components/theme-provider.tsx"
import { Link, Outlet } from "react-router-dom"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  // Determine the system theme (dark or light)
  const getSystemTheme = React.useCallback((): "dark" | "light" => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark"
    }
    return "light"
  }, [])

  const handleToggle = () => {
    const next =
      theme === "dark"
        ? "light"
        : theme === "light"
          ? "dark"
          : getSystemTheme() === "dark"
            ? "light"
            : "dark"

    setTheme(next)
  }

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand / Logo */}
            <div className="flex items-center">
              <a
                href="#"
                className="flex items-center space-x-2 text-lg font-semibold text-foreground"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                  </svg>
                </span>
                <h3 className="ml-2">Mapping</h3>
              </a>
            </div>

            {/* Desktop nav links (hidden on small screens) */}
            <nav className="hidden items-center space-x-10 md:flex">
              <Link
                to="/leaflet"
                className="text-sm font-medium text-foreground hover:text-foreground/80"
              >
                Leaflet
              </Link>
              <Link
                to="/gmaps"
                className="text-sm font-medium text-foreground hover:text-foreground/80"
              >
                GMaps
              </Link>
            </nav>

            {/* Theme toggle button */}
            <div className="flex items-center">
              <button
                onClick={handleToggle}
                aria-label="Toggle theme"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted/60 focus:ring-2 focus:ring-ring/50 focus:outline-none"
              >
                {theme === "dark" ? (
                  // Sun icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 2v2m0 16v2m-6-6H4m16 0h-2M5 5l-1-1m0 0 1-1m13 13l1 1m0-0-1-1" />
                  </svg>
                ) : (
                  // Moon icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
                  </svg>
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Navbar

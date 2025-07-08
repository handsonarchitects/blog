import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  const [showDropdown, setShowDropdown] = React.useState(false)

  const handleDropdown = () => setShowDropdown(!showDropdown)
  const closeDropdown = () => setShowDropdown(false)

  if (isRootPath) {
    header = (
      <>
        <Link className="header-link-home" to="/">
          Home
        </Link>
        <div
          className="header-link-dropdown"
          onMouseEnter={handleDropdown}
          onMouseLeave={closeDropdown}
          style={{ display: "inline-block", position: "relative" }}
        >
          <button
            className="header-link-projects"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Open-source ▼
          </button>
          {showDropdown && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                border: "1px solid #ccc",
                zIndex: 1000,
                minWidth: "160px",
              }}
            >
              <Link
                className="dropdown-item"
                to="https://knotx.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDropdown}
              >
                Knot.x
              </Link>
              <Link
                className="dropdown-item"
                to="https://github.com/wttech/aet"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDropdown}
              >
                AET
              </Link>
              {/* Add more projects as needed */}
            </div>
          )}
        </div>
        <Link className="header-link-contact" to="mailto:contact@handsonarchitects.com">
          Contact us
        </Link>
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
      </>
    )
  } else {
    header = (
      <>
        <Link className="header-link-home" to="/">
          Home
        </Link>
        <div
          className="header-link-dropdown"
          onMouseEnter={handleDropdown}
          onMouseLeave={closeDropdown}
          style={{ display: "inline-block", position: "relative" }}
        >
          <button
            className="header-link-projects"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Open-source ▼
          </button>
          {showDropdown && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                border: "1px solid #ccc",
                zIndex: 1000,
                minWidth: "160px",
              }}
            >
              <Link
                className="dropdown-item"
                to="https://knotx.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDropdown}
              >
                Knot.x
              </Link>
              <Link
                className="dropdown-item"
                to="https://github.com/wttech/aet"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDropdown}
              >
                AET
              </Link>
            </div>
          )}
        </div>
        <Link className="header-link-contact" to="mailto:contact@handsonarchitects.com">
          Contact us
        </Link>
      </>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Copyright ©HandsOnArchitects.com
      </footer>
    </div>
  )
}

export default Layout

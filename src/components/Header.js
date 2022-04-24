import * as Utils from "@contentstack/utils"
import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import { connect } from "react-redux"
import { actionHeader } from "../store/actions/state.action"
import jsonIcon from "../images/json.svg"
import Tooltip from "./tool-tip"
import Stack, { onEntryChange } from "../live-preview-sdk/index"

const queryHeader = () => {
  const query = graphql`
    query {
      contentstackHeader {
        title
        uid
        logo {
          url
        }
        navigation_menu {
          label
          page_reference {
            title
            url
          }
        }
        notification_bar {
          show_announcement
          announcement_text
        }
      }
    }
  `
  return useStaticQuery(query)
}

const Header = ({ dispatch }) => {
  const { contentstackHeader } = queryHeader()
  Utils.jsonToHTML({
    entry: contentstackHeader,
    paths: ["notification_bar.announcement_text"],
  })

  const [getHeader, setHeader] = useState(contentstackHeader)

  async function getHeaderData() {
    const headerRes = await Stack.getEntry({
      contentTypeUid: "header",
      referenceFieldPath: ["navigation_menu.page_reference"],
      jsonRtePath: ["notification_bar.announcement_text"],
    })
    setHeader(headerRes[0][0])
    dispatch(actionHeader(headerRes[0][0]))
  }

  useEffect(() => {
    onEntryChange(() => getHeaderData())
  }, [onEntryChange])

  return (
    <header className="header">
      <div className="note-div">
        {getHeader.notification_bar.show_announcement &&
          typeof getHeader.notification_bar.announcement_text === "string" &&
          parse(getHeader.notification_bar.announcement_text)}
      </div>
      <div className="max-width header-div">
        <div className="wrapper-logo">
          <Link to="/" className="logo-tag" title="Contentstack">
            <img
              className="logo"
              src={getHeader.logo?.url}
              alt={getHeader.title}
              title={getHeader.title}
            />
          </Link>
        </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <nav className="menu">
          <ul className="nav-ul header-ul">
            {getHeader.navigation_menu.map((menu, index) => {
              return (
                <li className="nav-li" key={index}>
                  {menu.label === "Home" ? (
                    <Link
                      to={`${menu.page_reference[0]?.url}`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  ) : (
                    <Link
                      to={`${menu.page_reference[0]?.url}/`}
                      activeClassName="active"
                    >
                      {menu.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="json-preview">
          <Tooltip content="JSON Preview" direction="top">
            <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <img src={jsonIcon} alt="JSON Preview icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}

export default connect()(Header)

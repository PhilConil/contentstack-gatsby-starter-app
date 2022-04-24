import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import parser from "html-react-parser"
import { connect } from "react-redux"
import { actionFooter } from "../store/actions/state.action"
import * as Utils from "@contentstack/utils"
import Stack, { onEntryChange } from "../live-preview-sdk/index"

const queryLayout = () => {
  const data = useStaticQuery(graphql`
    query {
      contentstackFooter {
        title
        uid
        logo {
          url
        }
        navigation {
          link {
            href
            title
          }
        }
        social {
          social_share {
            link {
              href
              title
            }
            icon {
              url
            }
          }
        }
        copyright
      }
    }
  `)
  return data
}

const Footer = ({ dispatch }) => {
  const { contentstackFooter } = queryLayout()
  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children)
    },
  }
  Utils.jsonToHTML({
    entry: contentstackFooter,
    paths: ["copyright"],
    renderOption,
  })
  const [getFooter, setFooter] = useState(contentstackFooter)

  async function getFooterData() {
    const footerRes = await Stack.getEntry({
      contentTypeUid: 'footer',
      jsonRtePath: ['copyright'],
    });
    setFooter(footerRes[0][0])
    dispatch(actionFooter(footerRes[0][0]))
  }

  useEffect(() => {
    onEntryChange(() => getFooterData())
  }, [onEntryChange])

  return (
    <footer>
      <div className="max-width footer-div">
        <div className="col-quarter">
          <Link to="/" className="logo-tag">
            <img
              src={getFooter.logo?.url}
              alt={getFooter.title}
              title={getFooter.title}
              className="logo footer-logo"
            />
          </Link>
        </div>
        <div className="col-half">
          <nav>
            <ul className="nav-ul">
              {getFooter.navigation.link.map((menu, index) => {
                return (
                  <li className="footer-nav-li" key={index}>
                    <Link to={menu.href}>
                      {menu.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="col-quarter social-link">
          <div className="social-nav">
            {getFooter.social.social_share.map((social, index) => {
              return (
                <a
                  href={social.link?.href}
                  title={social.link.title.toLowerCase()}
                  key={index}
                  className="footer-social-links"
                >
                  <img
                    src={social.icon?.url}
                    alt="social-icon"
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="copyright">
        {typeof getFooter.copyright === "string"
          ? <div>{parser(getFooter?.copyright)}</div>
          : ""}
      </div>
    </footer>
  )
}

export default connect()(Footer)

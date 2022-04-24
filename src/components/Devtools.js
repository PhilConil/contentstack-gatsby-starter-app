import React, { useState, useEffect } from "react"
import Tooltip from "./tool-tip"
import copyIcon from "../images/copy.svg";

const ReactJson = React.lazy(() => import("react-json-view"))

const DevTools = ({ response }) => {
  const isSSR = typeof window === "undefined"
  const [forceUpdate, setForceUpdate] = useState(0)

  function copyObject(object) {
    navigator.clipboard.writeText(object)
    setForceUpdate(1)
  }

  useEffect(() => {
    if (forceUpdate !== 0) {
      setTimeout(() => setForceUpdate(0), 300)
    }
  }, [forceUpdate])

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog .modal-lg modal-dialog-centered modal-dialog-scrollable"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="staticBackdropLabel">
              JSON Preview
            </h2>
            <span
              className="json-copy"
              onClick={e => copyObject(JSON.stringify(response))}
              aria-hidden="true"
            >
              <Tooltip
                content={forceUpdate === 0 ? "Copy" : "Copied"}
                direction="top"
                dynamic
                delay={200}
                status={forceUpdate}
              >
                <img src={copyIcon} alt="copy icon" />
              </Tooltip>
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <pre id="jsonViewer">
              {response && !isSSR && (
                <React.Suspense fallback={<div />}>
                  <ReactJson
                    src={response}
                    collapsed={1}
                    name="response"
                    enableClipboard={false}
                  />
                </React.Suspense>
              )}
            </pre>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn tertiary-btn modal-btn"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DevTools

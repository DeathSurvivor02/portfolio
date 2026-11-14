import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./Icons";

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for insecure contexts / older browsers
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    el.remove();
    return ok;
  }
};

/** Shows the address, copies it on click, and confirms without shifting layout. */
export const CopyEmailButton = ({ email, className = "btn btn-secondary" }) => {
  const [state, setState] = useState("idle"); // idle | copied | failed
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async () => {
    const ok = await copyText(email);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button type="button" onClick={handleClick} className={`${className} font-mono !font-medium`}>
      {state === "copied" ? <Check className="w-4 h-4 text-ok" /> : <Copy className="w-4 h-4 text-subtle" />}
      {/* Both labels occupy the same grid cell so the button never changes width */}
      <span className="grid text-left">
        <span className={`col-start-1 row-start-1 ${state === "idle" ? "" : "invisible"}`}>{email}</span>
        <span
          aria-hidden="true"
          className={`col-start-1 row-start-1 ${state === "idle" ? "invisible" : ""}`}
        >
          {state === "failed" ? "Couldn't copy" : "Copied to clipboard"}
        </span>
      </span>
      <span className="sr-only">{state === "idle" ? "— copy email address" : ""}</span>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
};

export default CopyEmailButton;

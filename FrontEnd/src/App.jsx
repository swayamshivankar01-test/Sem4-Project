import { useEffect, useRef } from "react";
import { mountApp } from "./app.js";

// This is the ONLY React component in the entire application.
// It mounts a single DOM container and immediately hands control
// over to plain vanilla JavaScript (see app.js), which does all
// screen rendering, state management, and event handling using
// ordinary HTML strings/DOM APIs — not React components or JSX.
export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Boot the vanilla-JS application once, into this one div.
    const teardown = mountApp(containerRef.current);
    return teardown;
  }, []);

  return <div ref={containerRef} />;
}

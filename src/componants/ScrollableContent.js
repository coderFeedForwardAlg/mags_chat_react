import React, { useRef, useEffect } from 'react';

function ScrollableContent({ children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [children]); // Re-run effect when children update

  return (
    <div ref={contentRef} className="flex-grow overflow-scroll no-scrollbar">
      {children}
    </div>
  );
}
export default ScrollableContent

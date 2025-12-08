
import React from 'react';

/**
 * Handles smooth scrolling to a specific element ID.
 * Updates the URL hash without causing a page jump.
 */
export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLElement>, href: string) => {
  e.preventDefault();
  const id = href.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', href);
  }
};

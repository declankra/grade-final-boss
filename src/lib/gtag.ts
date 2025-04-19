// src/lib/gtag.ts

declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params?: { [key: string]: any }
    ) => void;
  }
}

/**
 * Sends a custom event to Google Analytics.
 * Make sure Google Analytics (gtag.js) is loaded on the page.
 *
 * @param action The name of the event action (e.g., 'click', 'calculate').
 * @param params Optional parameters associated with the event.
 */
export const sendGAEvent = (
  action: string,
  params?: { [key: string]: any }
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
    console.log(`GA Event: ${action}`, params); // Optional: for debugging
  } else {
    console.warn('gtag function not found. Make sure Google Analytics is loaded.');
  }
}; 
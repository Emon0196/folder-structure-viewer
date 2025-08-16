// --- folder-structure-viewer/client/src/styles/GlobalStyle.ts ---
import { createGlobalStyle } from 'styled-components';

/**
 * Global styles for the entire application.
 * This component will be included in the main application file.
 */
export const GlobalStyle = createGlobalStyle`
  /* Reset box model and remove default margins/paddings */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Set up the body styles */
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    color: #333;
    line-height: 1.6;
  }

  /* Style for HTML buttons */
  button {
    cursor: pointer;
    font-family: inherit;
  }

  /* Basic list style reset */
  ul {
    list-style: none;
  }
`;

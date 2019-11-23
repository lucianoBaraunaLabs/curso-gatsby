/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "lazysizes";
import { globalHistory } from '@reach/router';

require("prismjs/themes/prism-tomorrow.css");

export const onInitialClientRender = () => {
  globalHistory._onTransitionComplete();
}
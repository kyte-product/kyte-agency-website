// Blade's archived theme helper imports a default export removed in v7.
// Keep that API while using v8's prototype-key protections.
import { merge } from "../../node_modules/ts-deepmerge/esm/index.js";
export { merge };
export default merge;

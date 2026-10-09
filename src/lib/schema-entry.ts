/**
 * Build-time entry for scripts/emit-static-schema.mjs.
 *
 * schema.ts imports PLATFORMS from the catalog, which is a .tsx file carrying
 * React icon components. Bundling that into the build script would drag React
 * along. This entry pulls only what the static graph needs.
 */

export { organizationGraph } from './schema';
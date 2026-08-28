// OpenNext Cloudflare configuration for Style Signal.
//
// `defineCloudflareConfig` produces a config object that drives
// `opennextjs-cloudflare build`. We use the static-assets incremental
// cache so prerendered static pages (built into `.open-next/cache/...`)
// are copied into the Cloudflare Workers Static Assets directory at
// `cdn-cgi/_next_cache/...` and served from there at runtime.
//
// This is the right cache for a publication site where every page is
// prerendered at build time and there is no ISR or revalidation: it
// avoids any need to read MDX files from disk inside the workerd
// sandbox (where the `nodejs_compat` `fs.readFile` polyfill is not
// implemented) and lets the worker serve cached HTML directly from
// the ASSETS binding.
//
// To enable R2-backed ISR cache later, replace the
// `cf-static-assets-incremental-cache` import with
// `r2IncrementalCache`, provision an R2 bucket, and add the
// `NEXT_INC_CACHE_R2_BUCKET` binding to wrangler.jsonc.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});

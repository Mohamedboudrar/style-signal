// OpenNext Cloudflare configuration for Style Signal.
//
// `defineCloudflareConfig` produces a config object that drives
// `opennextjs-cloudflare build`. We use the defaults for now:
//   - incremental cache: in-memory (per-isolate) — fine for a publication
//     site where most pages are statically rendered at build time and
//     served from the assets binding.
//   - tagCache / queue / cachePurge: defaults (dummy for most, since we
//     do not run ISR on this site at the moment)
//
// To enable R2-backed ISR cache later, uncomment the `r2IncrementalCache`
// import + override, provision an R2 bucket, and add the
// `NEXT_INC_CACHE_R2_BUCKET` binding to wrangler.jsonc.

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // incrementalCache: r2IncrementalCache,
});

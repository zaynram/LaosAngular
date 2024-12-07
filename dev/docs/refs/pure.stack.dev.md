# PureScript Framework Stack

Frontend:
- PureScript 0.14.5
- Halogen (for UI components)
- Formless (for form handling)
- purescript-spec (for testing)
- purescript-cloudflare (for Workers bindings)

Build Tools:
- Vite
- vite-plugin-purescript
- purescript-psa (for error reporting)
- spago (for package management)
- wrangler (Cloudflare Workers CLI)

Development:
- purescript-language-server
- purescript-test-runner
- purescript-format

Backend (Cloudflare Workers):
- Workers KV for state management
- Durable Objects for data consistency 
- Workers AI for document analysis
- R2 for document storage
- D1 for metadata storage
- Pages Functions for API endpoints

Integration:
- Cloudflare Workers runtime
- Supabase client 
- Court Systems API client
- Document processing pipeline
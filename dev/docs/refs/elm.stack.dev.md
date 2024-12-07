# Elm Framework Stack

Frontend:
- Elm 0.19.1
- elm-ui (for layout)
- elm-form-builder (for form handling)  
- elm-test (for testing)
- elm-review (for static analysis)
- elm-cloudflare (for Workers integration)

Build Tools:
- Vite
- vite-plugin-elm
- elm-format
- elm-review
- wrangler (Cloudflare Workers CLI)

Development:
- elm-language-server
- elm-test-runner
- elm-format

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
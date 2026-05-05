# What Store

Live demo: https://what-store.vercel.app/

What Store is a minimal Next.js 16 e-commerce demo showcasing product pages, a simple cart, and reusable UI components.

**Highlights:**
- Easy-to-read app structure using the `app/` directory
- Reusable components in the `components/` folder
- Lightweight client-side cart state in `store.ts`
- Sample product data in `lib/products.ts`

## Demo

Visit the deployed demo on Vercel:

https://what-store.vercel.app/

## Getting Started (local)

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm start
```

## Project Structure (notable files)

- **App entry:** [app/page.tsx](app/page.tsx)
- **Product pages:** [app/product/[id]/page.tsx](app/product/[id]/page.tsx)
- **Cart UI:** [components/CartControls.tsx](components/CartControls.tsx)
- **Product components:** [components/ProductSection.tsx](components/ProductSection.tsx)
- **Product data:** [lib/products.ts](lib/products.ts)
- **Cart state:** [store.ts](store.ts)

## Development notes

- The UI uses small presentational components in `components/` for clarity and reuse.
- Product data is mocked in `lib/products.ts` and consumed by the product pages.
- Cart state is implemented in `store.ts` for a simple client-side experience.

## Deploying

This project is ready to deploy on Vercel. The live site is available at:

https://what-store.vercel.app/

For more details on deploying Next.js apps, see the Next.js docs: https://nextjs.org/docs/app/building-your-application/deploying

## Contributing

Contributions and improvements are welcome. Open an issue or a pull request with suggestions.

## License

This repository is provided for demonstration purposes. Check repository settings for any license information.

<p align="center">
  <a href="https://skeet.dev/en/">
    <img src="https://storage.skeet.dev/ogp.jpg" alt="Skeet" />
  </a>

  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/SkeetDev.svg?label=Follow%20@SkeetDev" alt="Follow @SkeetDev" />
  </a>
  <br/>
  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/cli">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/cli">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/cli">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/cli">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-cli/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

This is the RC for the Solana dApp code of skeet v3.

Demo: https://solana-dapp.skeeter.dev/

## Features

- Static Site Generation
- i18n Native
- Next.js App Router
- React Compiler (Always optimizes memoization for production)
- Solana Wallet Connection
- Solana Web3.js
- Solana Blinks Actions Interface
- Green Coding

<a href="https://www.thegreenwebfoundation.org/green-web-check/?url=https%3A%2F%2Fsolana-dapp.skeeter.dev%2F">
  <img src="https://app.greenweb.org/api/v3/greencheckimage/solana-dapp.skeeter.dev?nocache=true" alt="This website runs on green hosting - verified by thegreenwebfoundation.org" width="200px" height="95px">
</a>

## Built with

- [Next.js](https://nextjs.org/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [pnpm](https://pnpm.io/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [React Compiler](https://react.dev/learn/react-compiler)
- [shadcn/ui](https://ui.shadcn.com/)
- [Next Sitemap](https://github.com/iamvishnusankar/next-sitemap)
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js/)
- [Solana Wallet Adapter](https://github.com/anza-xyz/wallet-adapter)
- [Solana Blinks Actions Interface](https://github.com/dialectlabs/blinks)

## Getting Started

First, run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:4242](http://localhost:4242) with your browser to see the result.

### Solana RPC Endpoint

It's recommended to set your own Solana RPC endpoint, as the default mainnet endpoint is few times limited, which could lead to 429 errors (too many requests).

No worries, you can get free credit for a Solana RPC endpoint at ERPC - Enhanced Solana RPC.

ERPC: https://erpc.validators.solutions

Setting Example (.env.local):

```
NEXT_PUBLIC_SOLANA_ENDPOINT=https://rpc.validators.solutions/rpc?api-key=<your-api-key>
```

### GitHub Actions Deployment

If you're using GitHub Actions for auto-deployment, don't forget to set your repository secrets.

For example:

- `NEXT_PUBLIC_SOLANA_ENDPOINT`: Your Solana RPC endpoint
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Add Components

<a href="https://ui.shadcn.com/">
  <img src="https://storage.skeet.dev/shadcnUI.jpg" alt="shadcn/ui" />
</a>

You can add the high-quality UI components from [shadcn/ui](https://ui.shadcn.com/)

```bash
// shortcut method for shadcn/ui
pnpm add:ui button
```

You can also use [v0](https://v0.dev/) which is a UI generator with shadcn/ui from simple text prompts and images.

<a href="https://v0.dev/">
  <img src="https://storage.skeet.dev/v0.jpg" alt="v0" />
</a>

## References

- [Next.js App Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Solana](https://solana.com/)
- [Solana Actions and Blinks](https://solana.com/docs/advanced/actions)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-v3-next-ssg-rc This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the Skeet project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet/blob/master/CODE_OF_CONDUCT.md).

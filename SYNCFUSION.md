# Syncfusion routing — React only

Detected platform (from `package.json`): **React / Next.js 16**.  
Angular MCP (`sf-angular-mcp`) does not apply to this repository. Do not install Angular skills or the Angular MCP server here.

Installing agent skills requires no product license, MCP key, or Syncfusion account. Product licensing still applies when Syncfusion packages are used in an application.

## Skills

```sh
npx skills add https://github.com/syncfusion/agent-onboarding-skill --yes
```

Add React skills only when a task actually uses Syncfusion packages. Do not bulk-install the catalog.

## MCP (optional)

- Server: `sf-react-mcp`
- Package: `@syncfusion/react-mcp`
- Do **not** write an API key into git.
- Use `Syncfusion_API_Key_Path` pointing at a local file **outside** this repo.

If no key exists, skip MCP. Skills still work. Do not report MCP as configured until a server has answered a query.

Do not use deprecated `@syncfusion/*-assistant` packages.

## Product license (separate)

An MCP API key is not a product license and does not grant product rights.

When Syncfusion UI packages are used:

```ts
import { registerLicense } from "@syncfusion/react-base";

registerLicense(process.env.SYNCFUSION_LICENSE_KEY);
```

Never commit the key. Community license is available at https://www.syncfusion.com/products/communitylicense.

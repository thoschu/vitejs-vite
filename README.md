# vite

https://vite.dev/

https://github.com/vitejs/vite

- https://esbuild.github.io/

- https://rollupjs.org/

https://vite.dev/plugins/

```shell
npm create vite@latest
```

---

## es and commonjs modules

Convention: module = code file

### commonjs modules - require syntax

- commonjs.org
- https://nodejs.org/api/modules.html

### es modules - import syntax

- https://262.ecma-international.org/6.0/

## module bundling

- https://en.wikipedia.org/wiki/Module_bundler

- https://vite.dev/guide/dep-pre-bundling

## tree shaking

- https://en.wikipedia.org/wiki/Tree_shaking 

- https://vite.dev/config/build-options

## hot module replacement

- https://vite.dev/guide/features#hot-module-replacement

## assets

- https://vite.dev/guide/assets

## config

- https://vite.dev/config/

## plugins

- https://vite.dev/plugins/

## libraries

- https://vite.dev/config/build-options#build-lib
- https://vitejs.dev/guide/features.html#libraries
- https://vitejs.dev/guide/build.html#library-mode

**Typical file extensions**

> CJS: .cjs or sometimes .js
> 
> AMD: usually .js
> 
> UMD: often .umd.js
> 
> ESM: .mjs or .js with "type": "module"
> 
> IIFE: often .iife.js

**Easy way to remember**

> CJS = old Node format
> 
> AMD = old browser format
> 
> UMD = universal format for older systems
> 
> ESM = modern standard
> 
> IIFE = not a module system, just an encapsulation pattern

```bash
npm i '../math-lib'
```

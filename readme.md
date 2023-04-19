# Wasm - Grupo 1

This is WASM

- https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/

## Contributors

| Name                | Email              | Github                                           |
| ------------------- | ------------------ | ------------------------------------------------ |
| Jose Antonio Castro | jacastro18@uc.cl   | [@Baelfire18](https://github.com/Baelfire18)     |
| Benjamín Vicente    | benjavicente@uc.cl | [@benjavicente](https://github.com/benjavicente) |
| José Madriaza       | jm.madriaza@uc.cl  | [@LeoMo-27](https://github.com/LeoMo-27)         |

## How to run

### Install pnpm and dependencies

```bash
npm install -g pnpm
```

```bash
pnpm install
```

### Install Emscripten and add to environment

1. Download Emscripten from <https://emscripten.org/docs/getting_started/downloads.html>
2. Add to environment with `source ./emsdk_env.sh`
3. Build the wasm with `pnpm run build:emscripten`

### Run script

```bash
pnpm dev
```

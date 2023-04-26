# Wasm - Grupo 1

This a project that compares the performance of different languages when running in the browser using WebAssembly.

The resources used for this project are:

- [Web Page](https://wasm-web-uc.pages.dev/)
- [Worker that calls the wasm](https://github.com/IIC3585-2023/wasm-grupo-01/blob/main/app/worker.ts)
- [Presentation](https://github.com/IIC3585-2023/wasm-grupo-01/blob/main/slides/web-wasm.pdf)

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

### Install Emscripten, add to environment and build cpp

1. Download Emscripten from <https://emscripten.org/docs/getting_started/downloads.html>
2. Add to environment with `source ./emsdk_env.sh`
3. Build the wasm with `pnpm run build:cpp`

### Install Wasm-Pack and build rust

1. Install Rust with RustUp <https://rustup.rs/>
2. Go to <https://rustwasm.github.io/wasm-pack/installer>
3. Run `cargo install wasm-bindgen-cli`
4. Build WASM with `pnpm run build:rust`

### Install and build Go
1. Install Go <https://golang.org/doc/install>
2. Build WASM with `pnpm run build:go`

### Build AssemblyScript
1. Build using this: `pnpm build:assemblyscript`

### Run script

```bash
pnpm dev
```

# upload.ai

An application that generates textual output based on an input video. First, the video is converted to .mp3 using FFmpeg and WebAssembly, after that it uses OpenAI's Whisper to transcribe the contents of the audio to obtain context, and finally we use OpenAI's ChatGPT to returns a generated response. By default, there are prompt options to generate sugestions for titles for the video and to generate a description of its contents (tested only for Portuguese). 

Video demonstration: [here](https://youtu.be/rCSpkbEb-Jo)

## Technologies used:
- OpenAI API
- FFmpeg & WebAssembly
- React & Vite
- Tailwind CSS

You can start the app using:
```sh
pnpm run dev
```

---
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

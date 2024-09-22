import globals, { commonjs } from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,   // O "12", si prefieres, para ECMAScript 12 (2021)
      sourceType: 'module',
      globals: {
        ...globals.node,    // Soporte para entorno Node.js
        ...globals.browser  // Soporte para entorno del navegador
      },
    },
    rules: {
      indent: ['error', 2],               // Indentación de 2 espacios
      quotes: ['error', 'single'],        // Usar comillas simples
      semi: ['error', 'never'],           // No requiere punto y coma
      'linebreak-style': ['error', 'off'], // Desactiva la regla
    },
    env : {
      browser: true,
      node: true,
      es2021: true,
      commonjs: true
    },
  },
  // Añadir las configuraciones recomendadas de ESLint para JS
  pluginJs.configs.recommended
]
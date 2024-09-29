const globals = require('globals') // Asegúrate de que esto funcione
const pluginJs = require('@eslint/js') // Importa el plugin ESLint JS

module.exports = [ // Cambia export default a module.exports
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,   // O "12", si prefieres, para ECMAScript 12 (2021)
      sourceType: 'commonjs', // Cambia a 'commonjs'
      globals: {
        ...globals.node,    // Soporte para entorno Node.js
        ...globals.browser   // Soporte para entorno del navegador
      },
    },
    rules: {
      indent: ['error', 2],                // Indentación de 2 espacios
      quotes: ['error', 'single'],         // Usar comillas simples
      semi: ['error', 'never'],            // No requiere punto y coma
      'no-unused-vars': ['warn'],          // Avisa sobre variables no usadas
    },    
  },
  // Añadir las configuraciones recomendadas de ESLint para JS
  pluginJs.configs.recommended
]
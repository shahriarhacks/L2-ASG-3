import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
   allConfig: js.configs.all,
});

export default [
   ...compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
   ),
   {
      plugins: {
         "@typescript-eslint": typescriptEslint,
      },

      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.node,
            process: "readonly",
         },

         parser: tsParser,
         ecmaVersion: "latest",
         sourceType: "module",
      },

      rules: {
         "no-unused-vars": "off", // Turned off since @typescript-eslint handles it
         "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" },
         ], // Warn for unused vars, ignore variables prefixed with _
         "@typescript-eslint/no-var-requires": "error", // Require usage of ES6 imports
         "@typescript-eslint/no-namespace": "error", // Prevent use of custom TypeScript namespaces
         "@typescript-eslint/no-empty-function": [
            "warn",
            { allow: ["arrowFunctions", "functions"] },
         ], // Warn for empty functions, allow specific cases
         "@typescript-eslint/no-explicit-any": "warn", // Discourage `any`, but warn instead of error
         "@typescript-eslint/no-non-null-assertion": "warn", // Warn on non-null assertions (!)
         "no-console": ["warn", { allow: ["warn", "error"] }], // Allow `warn` and `error` console methods, but warn for others
         "no-unused-expressions": "error", // Prevent unused expressions
         "prefer-const": ["warn", { destructuring: "all" }], // Encourage `const` usage where possible
         "no-undef": "error", // Disallow undeclared variables
         eqeqeq: ["error", "always"], // Enforce strict equality
         curly: ["error", "multi-line"], // Enforce curly braces for multi-line blocks
         "arrow-body-style": ["warn", "as-needed"], // Encourage concise arrow functions where appropriate
         "no-debugger": "error", // Disallow debugger statements
         "consistent-return": "warn", // Ensure consistent return statements
         "@typescript-eslint/explicit-module-boundary-types": "off", // Allow omission of explicit return types for functions
      },
   },
];

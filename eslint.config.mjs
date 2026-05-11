import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  tseslint.config({
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "no-undef": "off",
      // ── Vue ───────────────────────────────────────────────────────────────
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "vue/require-default-prop": "off",
      "vue/no-v-html": "warn",

      "vue/block-order": [
        "error",
        {
          order: ["script", "template", "style"],
        },
      ],

      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineSlots", "defineModel"],
        },
      ],

      "vue/block-lang": [
        "error",
        {
          script: { lang: "ts" },
        },
      ],

      "vue/no-unused-vars": "error",
      "vue/prefer-separate-static-class": "error",
      "vue/no-useless-v-bind": "error",
      "vue/padding-line-between-blocks": ["error", "always"],

      // ── TypeScript ────────────────────────────────────────────────────────
      // "@typescript-eslint/no-unused-vars": [
      //   "error",
      //   {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_",
      //   },
      // ],

      "@typescript-eslint/consistent-type-imports": "off",
      // "@typescript-eslint/no-explicit-any": "warn",
      // "@typescript-eslint/no-non-null-assertion": "warn",

      // ── General ───────────────────────────────────────────────────────────
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",

      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
          },
        },
      ],
    },
  })
)

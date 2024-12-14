import globals from 'globals';
import rulesDirPlugin from 'eslint-plugin-rulesdir';
rulesDirPlugin.RULES_DIR = './rules';
import prettier from 'eslint-config-prettier';

export default [
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.es2021,
				"__dirname": false, // webpack.config.js で使用しているため、false にしています。
			},
			parserOptions: {
				ecmaVersion: "latest"
			},
		},
		plugins: {
			'rulesdir': rulesDirPlugin,
			'prettier': prettier
		},
		rules: {
			"no-undef": "off",
      "default-param-last": "off",
      "no-console": "warn",
      "max-statements": "off",
      "rulesdir/no-kintoneJsApi": "error",
      "max-len": "off",
      "require-atomic-updates": "off",
			...prettier.rules
		},
		ignores: [
			"**/dist/**",
			"**/node_modules/**",
			"**/plugins/**",
			"**/rules/**",
			"**/kintoneJsApi.js",
		]
	}
]

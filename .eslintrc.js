module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: ['plugin:n8n-nodes-base/community'],
	rules: {
		'n8n-nodes-base/node-param-default-missing': 'warn',
		'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'warn',
		'n8n-nodes-base/node-class-description-outputs-wrong': 'warn',
	},
};


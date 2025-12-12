import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SymbolApi implements ICredentialType {
	name = 'symbolApi';
	displayName = 'Symbol API';
	documentationUrl = 'https://docs.symbol.dev';
	properties: INodeProperties[] = [
		{
			displayName: 'Node URL',
			name: 'nodeUrl',
			type: 'string',
			default: 'https://reference.symboltest.net:3001',
			placeholder: 'https://reference.symboltest.net:3001',
			description: 'The URL of the Symbol node to connect to',
			required: true,
		},
		{
			displayName: 'Network Type',
			name: 'networkType',
			type: 'options',
			options: [
				{
					name: 'Mainnet',
					value: 'mainnet',
				},
				{
					name: 'Testnet',
					value: 'testnet',
				},
			],
			default: 'testnet',
			description: 'The Symbol network to use',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.nodeUrl}}',
			url: '/node/health',
		},
	};
}


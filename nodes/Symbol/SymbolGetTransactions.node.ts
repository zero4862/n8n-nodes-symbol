import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class SymbolGetTransactions implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Symbol Get Transactions',
		name: 'symbolGetTransactions',
		icon: 'file:symbol.svg',
		group: ['transform'],
		version: 1,
		description: 'Search confirmed transactions on Symbol blockchain',
		defaults: {
			name: 'Symbol Get Transactions',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'symbolApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				placeholder: 'TBIL6D6RURP45YQRWV6Q7YVWIIPLQGLZQFHWFEQ',
				description: 'Filter by address involved in the transaction.',
				required: true,
			},
			{
				displayName: 'Transaction Type',
				name: 'type',
				type: 'string',
				default: '16724',
				placeholder: '16724',
				description: 'Filter by transaction type.',
			},
			{
				displayName: 'From Height',
				name: 'fromHeight',
				type: 'number',
				default: 0,
				placeholder: '1234567',
				description: 'Only return transactions from this block height onwards.',
				typeOptions: {
					minValue: 0,
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('symbolApi', i);
				const nodeUrl = credentials.nodeUrl as string;

				const address = this.getNodeParameter('address', i) as string;
				const type = this.getNodeParameter('type', i, '') as string;
				const fromHeight = this.getNodeParameter('fromHeight', i, 0) as number;

				const pageSize = 100; // Use max page size for efficiency

				// Build query parameters
				const queryParams = [
					`address=${encodeURIComponent(address)}`,
					`order=desc`,
					`pageSize=${pageSize}`,
					`pageNumber=1`,
				];

				// Add type filter if specified
				if (type) {
					queryParams.push(`type=${encodeURIComponent(type)}`);
				}

				// Add fromHeight if specified
				if (fromHeight > 0) {
					queryParams.push(`fromHeight=${fromHeight}`);
				}

				// Fetch all transactions (multiple pages if needed)
				let allTransactions: any[] = [];
				let currentPage = 1;
				let hasMore = true;

				while (hasMore) {
					queryParams[queryParams.findIndex(p => p.startsWith('pageNumber='))] = `pageNumber=${currentPage}`;

					const url = `${nodeUrl}/transactions/confirmed?${queryParams.join('&')}`;
					const response = await this.helpers.request({
						method: 'GET',
						url,
						json: true,
					});

					const transactions = response.data || [];
					allTransactions = allTransactions.concat(transactions);

					if (transactions.length < pageSize) {
						hasMore = false;
					} else {
						currentPage++;
					}
				}

				// Return each transaction as a separate item
				// If no transactions, return empty array so workflow continues
				if (allTransactions.length === 0) {
					returnData.push({
						json: { transactions: [] },
						pairedItem: i,
					});
				} else {
					for (const transaction of allTransactions) {
						returnData.push({
							json: transaction,
							pairedItem: i,
						});
					}
				}
			} catch (error) {
				// Always return empty array structure on error so workflow continues
				returnData.push({
					json: {
						transactions: [],
						error: error.message,
					},
					pairedItem: i,
				});
			}
		}

		return [returnData];
	}
}



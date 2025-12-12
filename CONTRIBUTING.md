# Contributing to n8n-nodes-symbol

Thanks for considering contributing to this project. Here's how you can help.

## Adding New Nodes

Want to add support for more Symbol features? Here's the process:

### 1. Plan Your Node

Consider:
- What Symbol SDK feature you want to expose
- What parameters users will need
- What the output data structure should be
- How errors should be handled

### 2. Create the Node File

Create a new TypeScript file in `nodes/Symbol/`:

```
nodes/Symbol/YourNewNode.node.ts
```

Use the existing nodes as templates.

### 3. Register the Node

Add your node to `package.json` under the `n8n.nodes` array:

```json
"n8n": {
  "nodes": [
    "dist/nodes/Symbol/SymbolTransfer.node.js",
    "dist/nodes/Symbol/SymbolWaitForConfirmation.node.js",
    "dist/nodes/Symbol/YourNewNode.node.js"
  ]
}
```

### 4. Build and Test

```bash
npm run build
npm run lint
```

Test your node in n8n to verify it works as expected.

## Node Ideas

Here are some Symbol features that would make great nodes:

- **Account Info**: Fetch account balance and metadata
- **Mosaic Creation**: Create custom tokens/mosaics
- **Namespace Registration**: Register namespaces
- **Multisig Setup**: Configure multisig accounts
- **Aggregate Transactions**: Bundle multiple transactions
- **Hash Lock**: Create hash lock transactions
- **Secret Lock**: Create secret lock transactions
- **Metadata**: Add/update account or mosaic metadata
- **Block Info**: Fetch block information
- **Transaction History**: Query account transactions

## Code Style

- Use TypeScript
- Follow the existing code structure
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small

## Testing

Before submitting:

1. Build without errors: `npm run build`
2. Pass linting: `npm run lint`
3. Test in a live n8n instance
4. Test with both testnet and mainnet configurations
5. Test error scenarios (invalid addresses, insufficient funds, etc.)

## Documentation

When adding a node:

1. Update README.md with node documentation
2. Add usage examples
3. Document all parameters clearly
4. Include sample output

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

Include in your PR:
- Clear description of what you added/changed
- Why the change is useful
- Any breaking changes
- Screenshots if applicable

## Questions?

Open an issue if you have questions about contributing.


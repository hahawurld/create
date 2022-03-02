# <%= name %>

<%= description %>

## Inputs

### `example_required_input`

**Required**  Lorem ipsum dolor

### `example_input`

Lorem ipsum dolor

## Outputs

### `example_output`

Lorem ipsum dolor

## Example usage

```yaml
name: example_usage
on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 12.x
        uses: actions/setup-node@v2
        with:
          node-version: 12.x
      - name: npm ci
        run: |
          npm ci
      - name: Some action
        id: <%= name %>
        uses: hahawurld/<%= name %>@main
        with:
          private_key: ${{ secrets.SOME_PRIVATE_KEY }}
          app_id: <SOME_APP_ID>
          installation_id: <SOME_INSTALL_ID>
      - name: Some other action
        run: npx foo -n bar
        env: 
          GITHUB_TOKEN: ${{ steps.<%= name %>.outputs.example_output }}
```

## Contributing

Submit a PR!

## Release

JavaScript Actions require `/node_modules` be bundled in the repository. We use `ncc` to bundle our code and all dependencies into a single file. After making your changes use `npm run build` to recompile the Action and commit `./dist/index.js`.

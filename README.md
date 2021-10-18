# secrets-to-env
Copies the specified secrets from the repository into environment variables. This can be useful when you have tools like Terraform that automatically take env var inputs of a certain prefix (E.G. `TF_VAR_`) and you want to avoid having to update your workflow files to map each secret to an env var.

### Usage

Only copy secrets with names starting with `TF_VAR_`

```yaml
uses: Firenza/secrets-to-env@v1.0.1
with:
    secrets: ${{ toJSON(secrets) }}
    secret_filter_regex: TF_VAR_*
```

Copy all secrets

```yaml
uses: Firenza/secrets-to-env@v1 
with:
    secrets: ${{ toJSON(secrets) }}
```

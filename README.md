# secrets-to-env
Copies the specified secrets from the repository into environment variables. This can be useful when you have tools like Terraform that automatically take env var inputs of a certain prefix (E.G. `TF_VAR_`) and you want to avoid having to update your workflow files to map each secret to an env var.

### Usage

Copy all secrets

```yaml
uses: Firenza/secrets-to-env@v1.1.0
with:
    secrets: ${{ toJSON(secrets) }}
```

Only copy secrets with names starting with `TF_VAR_`

```yaml
uses: Firenza/secrets-to-env@v1.0.1

with:
    secrets: ${{ toJSON(secrets) }}
    secret_filter_regex: TF_VAR_*
```

Only copy secrets with names starting with `TF_VAR_` and have the copied environment variable names have everything after `TF_VAR_` be lowercase.

```yaml
uses: Firenza/secrets-to-env@v1.0.1
with:
    secrets: ${{ toJSON(secrets) }}
    secret_filter_regex: TF_VAR_*
    env_var_name_lower_case_regex: (?<=TEST_).*
```

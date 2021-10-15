const core = require('@actions/core');

try {
    const secrets = core.getInput('secrets');
    const secretNameRegex = core.getInput('secret_name_regex');

    const parsedSecrets = JSON.parse(secrets);

    for(var attributeName in parsedSecrets){
        const secretNameRegexDefined = secretNameRegex !== null && secretNameRegex !== undefined && secretNameRegex !== ''

        if (!secretNameRegexDefined || secretNameRegexDefined && attributeName.match(secretNameRegex)){
            console.log(`Exporting secret ${attributeName} as environment variable`);
            core.exportVariable(attributeName, parsedSecrets[attributeName]);
        }
    }
} catch (error) {
    core.setFailed(error.message);
}
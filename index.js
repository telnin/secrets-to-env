const core = require('@actions/core');

try {
    const secrets = core.getInput('secrets');
    const secretFilterRegex = core.getInput('secret_filter_regex');

    const parsedSecrets = JSON.parse(secrets);

    for(var attributeName in parsedSecrets){
        const secretFilterRegexDefined = secretFilterRegex !== null && secretFilterRegex !== undefined && secretFilterRegex !== ''

        if (!secretFilterRegexDefined || secretFilterRegexDefined && attributeName.match(secretFilterRegex)){
            console.log(`Exporting secret ${attributeName} as environment variable`);
            core.exportVariable(attributeName, parsedSecrets[attributeName]);
        }
    }
} catch (error) {
    core.setFailed(error.message);
}
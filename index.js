const core = require('@actions/core');

try {
    const secrets = core.getInput('secrets');
    const secretFilterRegex = core.getInput('secret_filter_regex');
    const lowerCaseRegex = core.getInput('lower_case_regex');

    const parsedSecrets = JSON.parse(secrets);

    for(var attributeName in parsedSecrets){
        const secretFilterRegexDefined = secretFilterRegex !== null && secretFilterRegex !== undefined && secretFilterRegex !== ''

        if (!secretFilterRegexDefined || secretFilterRegexDefined && attributeName.match(secretFilterRegex)){
            
            variableName = attributeName;
            variableValue = parsedSecrets[attributeName];

            const lowerCaseRegexDefined = lowerCaseRegex !== null && lowerCaseRegex !== undefined && lowerCaseRegex !== ''
            
            if(lowerCaseRegexDefined){
                variableName = variableName.replace(lowerCaseRegexDefined, function(match){
                    return match.toLowerCase()
                })

                console.log(`Exporting secret ${attributeName} as environment variable ${variableName}`);
            }
            else{
                console.log(`Exporting secret ${attributeName} as environment variable`);
            }
            
            core.exportVariable(variableName, variableValue);
        }
    }
} catch (error) {
    core.setFailed(error.message);
}
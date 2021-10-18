const core = require('@actions/core');

function run(){
    try {
        const secrets = core.getInput('secrets');
        const secretFilterRegexString = core.getInput('secret_filter_regex');
        const lowerCaseRegexString = core.getInput('lower_case_regex');
    
        const parsedSecrets = JSON.parse(secrets);
    
        for(var attributeName in parsedSecrets){
            const secretFilterRegexDefined = secretFilterRegexString !== null && secretFilterRegexString !== undefined && secretFilterRegexString !== ''
    
            if (!secretFilterRegexDefined || secretFilterRegexDefined && attributeName.match(new RegExp(secretFilterRegexString))){
                
                variableName = attributeName;
                variableValue = parsedSecrets[attributeName];
    
                const lowerCaseRegexStringDefined = lowerCaseRegexString !== null && lowerCaseRegexString !== undefined && lowerCaseRegexString !== ''
                
                if(lowerCaseRegexStringDefined){
       
                    variableName = variableName.replace(new RegExp(lowerCaseRegexString), function(match){
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
}

module.exports = run;

run();
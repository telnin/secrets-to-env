const index = require('./main');
const core = require('@actions/core');

jest.mock("@actions/core");

test('lower case regex works', () => {
    // Arrange
    var secretsObj = new Object();
    secretsObj.TEST_VAR = "Hello";
    secretsObj.TEST_VAR2 = "Hello2";

    core.getInput.mockImplementation((key) => {
        if (key === "secrets"){
            return JSON.stringify(secretsObj)
        }
        else if (key === "secret_filter_regex"){
            return undefined;
        }
        else if (key === "lower_case_regex"){
            return "(?<=TEST_).*";
        }
    })

    // Act
    index();

    // Assert
    expect(core.exportVariable).toHaveBeenCalledWith("TEST_var", "Hello");
    expect(core.exportVariable).toHaveBeenCalledWith("TEST_var2", "Hello2");
});


test('secret filter works', () => {
    // Arrange
    var secretsObj = new Object();
    secretsObj.TEST_VAR = "Hello";
    secretsObj.IM_BOB = "BOB";

    core.getInput.mockImplementation((key) => {
        if (key === "secrets"){
            return JSON.stringify(secretsObj)
        }
        else if (key === "secret_filter_regex"){
            return "TEST_.*";
        }
        else if (key === "lower_case_regex"){
            return undefined;
        }
    })

    // Act
    index();

    // Assert
    expect(core.exportVariable).toHaveBeenCalledWith("TEST_VAR", "Hello");
    expect(core.exportVariable).not.toHaveBeenCalledWith("IM_BOB", "BOB");
});

test('all secrets processed with no filter', () => {
    // Arrange
    var secretsObj = new Object();
    secretsObj.TEST_VAR = "Hello";
    secretsObj.IM_BOB = "BOB";

    core.getInput.mockImplementation((key) => {
        if (key === "secrets"){
            return JSON.stringify(secretsObj)
        }
        else if (key === "secret_filter_regex"){
            return undefined;
        }
        else if (key === "lower_case_regex"){
            return undefined;
        }
    })

    // Act
    index();

    // Assert
    expect(core.exportVariable).toHaveBeenCalledWith("TEST_VAR", "Hello");
    expect(core.exportVariable).toHaveBeenCalledWith("IM_BOB", "BOB");
});
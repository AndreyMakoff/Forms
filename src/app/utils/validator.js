export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusvalidate;
        switch (validateMethod) {
        case "isRequired":
            statusvalidate = data.trim() === "";
            // if (data.trim() === "") return config.message;
            break;
        case "isEmail": {
            const emailRegEx = /^\S+@\S+\.\S+$/g;
            statusvalidate = !emailRegEx.test(data);
            // if (!emailRegEx.test(data)) return config.message;
            break;
        };
        case "isCapitalSymbol": {
            const сapitalRegExp = /[A-Z]+/g;
            statusvalidate = !сapitalRegExp.test(data);
            // if (!сapitalRegExp.test(data)) return config.message;
            break;
        };
        case "isContainDigit": {
            const DigitRegExp = /\d+/g;
            statusvalidate = !DigitRegExp.test(data);
            break;
        };
        case "min": {
            statusvalidate = data.length < config.value;
            break;
        }
        default:
            break;
        };
        if (statusvalidate) return config.message;
    };
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}

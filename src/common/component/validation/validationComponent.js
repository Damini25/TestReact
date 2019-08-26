
export const validateField = (fieldName, value) => {

    switch (fieldName) {
        case 'email': {
            return value.match() ? true : false;
        }
        case 'password': {
            return value.length > 4 ? true : false;
        }
        default:
            return true;
    }
}



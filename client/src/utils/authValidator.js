
export const validEmail = (email) => {
    const emailRegex = new RegExp("^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");

    if (email !== '' &&
        emailRegex.test(email)
    ) {
        return '';
    }

    return ('Invalid email.');
};





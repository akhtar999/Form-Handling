const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// show input error message
const showError = (field, message) => {
    const formControl = field.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

//show success outine
const showSuccess = (field) => {
    const formControl = field.parentElement;
    formControl.className = 'form-control success';
};

//check email is valid
const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email)
    } else {
        showError(email, 'Email is not valid')
    }
}

// check required field
const checkRequired = (fieldArr) => {
    fieldArr.forEach(field => {
        if (field.value.trim() === '') {
            showError(field, `${getFieldName(field)} is required`)
        } else {
            showSuccess(field)
        }
    });
}
const getFieldName = (field) => {
    return field.id.charAt(0).toUpperCase() + field.id.slice(1)
}

// length check
const checkLength = (field, min, max) => {
    if (field.value.length < min) {
        showError(field, `${getFieldName(field)} should atleast of ${min} characters `)
    } else if (field.value.length > max) {
        showError(field, `Character limit exceeded`)
    } else {
        showSuccess(field)
    }
}

//check password matchs
const checkPasswordMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match')
    }
}
// Even listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2])
    checkLength(username, 4, 12)
    checkLength(password, 7, 12)
    checkEmail(email)
    checkPasswordMatch(password, password2)
})
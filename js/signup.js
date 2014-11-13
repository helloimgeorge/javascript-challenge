"strict use";

function onReady() {
    var stateForm = document.getElementById('signup');
    var stateSelect = stateForm.elements['state'];

    var idx;
    var option;

    for (idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        stateSelect.appendChild(option);
    }

    document.addEventListener('change', function() {
        var option = document.getElementById('occupation');

        if (option.value == 'other') {
            document.getElementById("occupationOther").style.display = "block";
        } else {
            document.getElementById("occupationOther").style.display = "none";
        }
    });

    var buttonConfirmation = document.getElementById('cancelButton');

    buttonConfirmation.addEventListener('click', function() {
        if (window.confirm('Are you really sure you want to leave?')) {
            window.location = 'http://www.google.com';
        }
    });

    signup.addEventListener('submit', onSubmit);
}


function onSubmit(evt) {
    var dob = this.elements['birthdate'].value;

    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = calculateAge(dob);
    return evt.returnValue;

} //onSubmit()

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

    var option = document.getElementById('occupation');

        if (option.value == 'other') {
            requiredFields.push('occupationOther');
        }

    var idx;
    var formValid = true;
    for (idx = 0; idx < requiredFields.length; ++idx) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    if (!formValid) {
        /* var errMsg = document.getElementById('error-message');
        errMsg.innerHTML = "Please fill out the required fields";
        errMsg.style.display = 'block'; */
    }

    return formValid;

} //validateForm()

 function validateRequiredField(field) {
    var value = field.value.trim(); //need to trim entered values so its not counted
    var valid = value.length > 0;

    if (field.id == 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        var res = zipRegExp.test(value);
        if (res) {
            field.className = 'form-control';

        } else {
            valid = false;
            field.className ='form-control invalid invalid-form';

        }
    } else if (valid) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid invalid-form';
    }

    return valid;
}

function calculateAge(dob) {
    if (!dob) {
        throw new Error('Please tell me when you were born!');
    }

    var today = new Date();
    dob = new Date(dob);
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }

    return yearsDiff;
}





document.addEventListener('DOMContentLoaded', onReady);
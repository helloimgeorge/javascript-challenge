"use strict";

document.addEventListener('DOMContentLoaded', function() {

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

    // cancel button
    var buttonConfirmation = document.getElementById('cancelButton');

    buttonConfirmation.addEventListener('click', function () {
        if (window.confirm('Are you really sure you want to leave?')) {
            window.location = 'http://www.google.com';
        }
    });

    // submit button
    signup.addEventListener('submit', onSubmit);

    // if occupation other
    document.addEventListener('change', function () {
        var option = document.getElementById('occupation');

        if (option.value == 'other') {
            document.getElementById("occupationOther").style.display = "block";
        } else {
            document.getElementById("occupationOther").style.display = "none";
        }
    });

    // on submit
    function onSubmit(evt) {
        evt.returnValue = validateForm(this);
        evt.returnvalue = ageCheck(this);
        if (!evt.returnValue && evt.preventDefault) {
            evt.preventDefault();
        }
        return evt.returnValue;
    } // end onSubmit method

    // validate form by certain required fields
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
        return formValid;
    } // end validateForm method

    // validate specific field
    function validateRequiredField(field) {
        var value = field.value.trim(); //need to trim entered values so its not counted
        var valid = value.length > 0;

        if (field.id == 'zip') {
            valid = zipCheck(field);
        }
        if (valid) {
            field.className = 'form-control';
        }
        else {
            field.className = 'form-control invalid invalid-form';
        }
        return valid;
    } // end validateRequiredFields method

    // calculate the age of user
    function calculateAge(dob) {
        if (!dob) {
            throw new Error('Please tell me when you were born!');
        }
        return moment().diff(dob, 'years');
    } // end calculateAge method

    // check if zipcode is 5 digits
    function zipCheck(field) {
        var res = new RegExp('^\\d{5}$').test(field.value.trim());
        return res;
    } // end zhipcheck method

    // check whether age is greater than 13
    function ageCheck(evt) {
        var dob = evt.elements['birthdate'].value;
        var age = calculateAge(dob);
        var msgElem = document.getElementById('birthdateMessage');
        if (age < 14) {
            birthdate.className = 'form-control invalid invalid-form';
            msgElem.style.display = "block";
            msgElem.innerHTML = 'You must be 13 years or older to sign up';
        } else {
            birthdate.className = 'form-control';
            msgElem.style.display = "none";
        }
        return age < 14;
    } // end ageCheck method
});
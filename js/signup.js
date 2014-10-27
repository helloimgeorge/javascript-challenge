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
}

document.addEventListener('change', function() {
    var option = document.getElementById('occupation');
    console.log(option.value);

    if (option.value == 'other') {
        document.getElementById("occupationOther").style.display = "block";
    } else {
        document.getElementById("occupationOther").style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', onReady);
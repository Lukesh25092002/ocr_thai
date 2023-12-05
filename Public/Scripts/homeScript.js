function blockScreen(){
    overlay.style.display = "block";
}

function unblockScreen(){
    overlay.style.display = "none";
}






function createCard(cardData) {
    // blockScreen();

    const endpoint = "http://localhost:3000/card/";
    fetch(endpoint,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cardData)
    })
    .then(function(res){
        if(!res.ok){
            return res.json().then(function(json){
                return Promise.reject(json);
            });
        }
        else
            return res.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })
    // .finally(unblockScreen);
}


const inp_identification_number = document.getElementById("identification_number");
const inp_first_name = document.getElementById("first_name");
const inp_last_name = document.getElementById("last_name");
const inp_date_of_birth = document.getElementById("date_of_birth");
const inp_date_of_issue = document.getElementById("date_of_issue");
const inp_date_of_expiry = document.getElementById("date_of_expiry");



btn_insert = document.getElementById("create");
btn_insert.addEventListener("click",function(){
    let cardData = {
        'identification_number': inp_identification_number.value,
        'name': inp_first_name.value,
        'last_name': inp_last_name.value,
        'date-of-birth': inp_date_of_birth.value,
        'date-of-issue': inp_date_of_issue.value,
        'date-of-expiry': inp_date_of_expiry.value
    };

    createCard(cardData);

    inp_identification_number.value = "";
    inp_first_name.value = "";
    inp_last_name.value = "";
    inp_date_of_birth.value = "";
    inp_date_of_issue.value = "";
    inp_date_of_expiry.value = "";
});




container_preview = document.getElementById("preview");
inp_browse = document.getElementById("browse");
inp_browse.addEventListener("change",function(){
    const file = inp_browse.files[0];
    const reader = new FileReader();
    reader.addEventListener("load",function(){
        const uploaded_image = reader.result;
        container_preview.src = uploaded_image;
    });
    reader.readAsDataURL(file);
});


function readUploadedFile(){
    const file = inp_browse.files[0];

    const reader = new FileReader();
    let imageData;
    reader.onload = function(){
        imageData = reader.result;
    }

    reader.readAsDataURL(file);

    return imageData;
}
const ENDPOINT_URL = 'https://vision.googleapis.com/v1/images:annotate'
const api_key = "AIzaSyCOxNkK0N3jTNRXSN0ThHGf2R4frIIQr14"
// const ImageData = readUploadedFile();

async function requestOCR(url, apiKey) {
    try {
        // Assuming you have a function makeImageData that returns the image data
        const imgData = readUploadedFile();

        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imgData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for further handling, if needed
    }
}
btn_upload = document.getElementById("upload");
btn_upload.addEventListener("click",async function(event){
    // blockScreen();
    console.log("called");
    let result;
    try {
        result = await requestOCR(ENDPOINT_URL, api_key);
        console.log(typeof(result));
        console.log('OCR Result:', result);

        // Storing data in localStorage
        localStorage.setItem('bdc', result);

        // Retrieving data from localStorage
    } catch (error) {
        console.error('OCR Request Error:', error);
    }
     // Output: value

});



function createLogWrapper(name, idNumber) {
    // Create wrapper div
    const logWrapper = document.createElement('div');
    logWrapper.classList.add('log_wrapper');
  
    // Create image element
    const imgElement = document.createElement('img');
    imgElement.src = 'http://localhost:3000/public/Images/default_id_card.png';
    imgElement.alt = '';
  
    // Create log details div
    const logDetails = document.createElement('div');
    logDetails.classList.add('log_details');
  
    // Create log detail divs
    const logDetail1 = createLogDetail('Name:', name);
    const logDetail2 = createLogDetail('Identification number:', idNumber);
  
    // Append log detail divs to log details div
    logDetails.appendChild(logDetail1);
    logDetails.appendChild(logDetail2);
  
    // Create edit and delete icons
    const editIcon = createIcon('edit_icon', 'fa-solid', 'fa-pen');
    const deleteIcon = createIcon('delete_icon', 'fa-solid', 'fa-trash-can');
  
    // Append elements to wrapper div
    logWrapper.appendChild(imgElement);
    logWrapper.appendChild(logDetails);
    logWrapper.appendChild(editIcon);
    logWrapper.appendChild(deleteIcon);
  
    return logWrapper;
  }
  
// Function to create log detail div
function createLogDetail(label, value) {
    const logDetail = document.createElement('div');
    logDetail.classList.add('log_detail');

    const labelElement = document.createElement('p');
    labelElement.classList.add('log_detail_label');
    labelElement.textContent = label;

    const valueElement = document.createElement('p');
    valueElement.classList.add('log_detail_value');
    valueElement.textContent = value;

    logDetail.appendChild(labelElement);
    logDetail.appendChild(valueElement);

    return logDetail;
}
  
  // Function to create icon
function createIcon(className, prefix, iconName) {
    const icon = document.createElement('i');
    icon.classList.add('icon', className, prefix, iconName);
    return icon;
}

function displayCards(cardLogData) {
    const container = document.getElementById("log_collection");
    container.innerHTML = '';

    for(let i=0 ; i<cardLogData.length ; i++){
        const logWrapper = createLogWrapper(`${cardLogData[i]['name']} ${cardLogData[i]['last_name']}`,cardLogData[i]['identification_number']);
        container.appendChild(logWrapper);
    }
}






inp_filter_key = document.getElementById('filter_key');
inp_filter_value = document.getElementById('filter_value');

function singleParameterfilter(){
    // blockScreen();

    const filter_key = inp_filter_key.options[inp_filter_key.selectedIndex].value;
    const filter_value = inp_filter_value.value;

    let endpoint;
    if(filter_key=="none")
        endpoint = "http://localhost:3000/filter/";
    else
        endpoint = `http://localhost:3000/filter/${filter_key}/${filter_value}`;

    fetch(endpoint,{
        method: "GET",
    })
    .then(function(res){
        if(!res.ok){
            return res.json().then(function(json){
                return Promise.reject(json);
            });
        }
        else
            return res.json();
    })
    .then(function(data){
        displayCards(data.result);
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    })
    // .finally(unblockScreen);
}

btn_filter = document.getElementById("filter");
btn_filter.addEventListener("click",singleParameterfilter);
singleParameterfilter();



function editCardRecord(identification_number){
    console.log(identification_number);
    const link = `http://localhost:3000/user/card/${identification_number}`;
    window.location.href = link;
}


function deleteCardRecord(identification_number,log_wrapper){
    // blockScreen();

    const allowed = confirm("Are you sure?");
    if(allowed){
        const endpoint = `http://localhost:3000/card/${identification_number}`;
        fetch(endpoint,{
            method: "DELETE",
        })
        .then(function(res){
            if(!res.ok){
                return res.json().then(function(json){
                    return Promise.reject(json);
                })
            }
            else
                return res.json();
        })
        .then(function(data){
            log_wrapper.style.display  = "none";
            console.log(data);
        })
        .catch(function(err){
            console.log(err);
        })
        // .finally(unblockScreen);
    }
}


log_collection = document.getElementById('log_collection');
log_collection.addEventListener("click",function(event){
    if(event.target.classList.contains('icon')){
        const icon = event.target;
        const identification_number = icon.parentNode.querySelectorAll(".log_detail_value")[1].innerHTML.toString();

        if(icon.classList.contains('edit_icon'))
            editCardRecord(identification_number);

        if(icon.classList.contains('delete_icon'))
            deleteCardRecord(identification_number,icon.parentNode);
    }
});
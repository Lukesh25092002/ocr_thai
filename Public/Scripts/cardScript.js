const disp_error = document.getElementById("error");
const overlay = document.getElementById("overlay");

function blockScreen(){
    disp_error.innerText = "* Loading... please wait";
    disp_error.style.color = "#FFFFFF";
    overlay.style.display = "block";
}

function unblockScreen(){
    overlay.style.display = "none";
    disp_error.style.color = "#FF0000";
}



const inp_identification_number = document.getElementById("identification_number");
const inp_first_name = document.getElementById("first_name");
const inp_last_name = document.getElementById("last_name");
const inp_date_of_birth = document.getElementById("date_of_birth");
const inp_date_of_issue = document.getElementById("date_of_issue");
const inp_date_of_expiry = document.getElementById("date_of_expiry");


btn_update = document.getElementById("update");
btn_update.addEventListener("click",function(){
    blockScreen();

    const identification_number = inp_identification_number.value;
    const payload = {
        'name': inp_first_name.value,
        'last_name': inp_last_name.value,
        'date-of-birth': inp_date_of_birth.value,
        'date-of-issue': inp_date_of_issue.value,
        'date-of-expiry': inp_date_of_expiry.value
    }

    const endpoint = `http://localhost:3000/card/${identification_number}`;
    fetch(endpoint,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
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
        disp_error.innerText = "* The data has been successfully updated";
        console.log(data);
    })
    .catch(function(err){
        disp_error.innerText = "* An error occoured please try again";
        console.log(err);
    })
    .finally(unblockScreen);
});

btn_delete = document.getElementById("delete");
btn_delete.addEventListener("click",function(){
    blockScreen();

    const allowed = confirm("Are you sure?");
    if(allowed){
        const identification_number = inp_identification_number.value;
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
            window.location.href = "http://localhost:3000/user/home";
            console.log(data);
        })
        .catch(function(err){
            disp_error.innerText = "* An error occoured please try again";
            console.log(err);
        })
        .finally(unblockScreen);
    }
});

btn_cancel = document.getElementById("cancel");
btn_cancel.addEventListener("click",function(){
    window.location.href = "http://localhost:3000/user/home";
});
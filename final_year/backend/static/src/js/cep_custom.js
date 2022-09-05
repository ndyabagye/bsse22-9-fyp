subscription_url = "/cep/company/subscribe"
unsubscription_url = "/cep/company/unsubscribe"
services_url = '/new/feedback/services';
categories_url = '/new/feedback/categories';

function subscribe(company_id) {
    console.log(company_id);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const obj = JSON.parse(this.responseText);
        if (obj.status == "subscribed") {
            unsubscribe_btn =   "<button id='unsubscribe_btn' class='btn btn-circle btn-sm' style='background-color: #c3f294;' t-attf-value='#{ company.id }' onclick='subscribe(this.value)'>"+
                                    "<i class='fa fa-check fa-sm' t-attf-style='color:#228B22'></i>" +
                                "</button>"+
                                "<span style ='margin-left:7px;'>Subscribed</span>"
                                ;
            document.getElementById(company_id).innerHTML = unsubscribe_btn
            location.reload();
        }
    }
    xhttp.open("POST", subscription_url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(company_id);
}

function unSubscribe(company_id) {
    console.log(company_id);
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (response) {
        const obj = JSON.parse(this.responseText)
        if (obj.status == "unsubscribed") {
            subscribe_btn = "<button id='unsubscribe_btn' class='btn btn-circle btn-sm' style='background-color: #FFC6C6;' t-attf-value='#{ company.id }' onclick='subscribe(this.value)'>"+
                                "<i class='fas fa-bell fa-sm' t-attf-style='color:#FF4E4E;'></i>" +
                            "</button>"+
                            "<span style ='margin-left:7px;'>Subscribe</span>";   
            document.getElementsByClassName(company_id).innerHTML = subscribe_btn
            location.reload();

        }
    }
    xhttp.open("POST", unsubscription_url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(company_id);
}

function fetchServices(company) {
    var select = document.getElementById("service");
    select.options.length = 0;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (response) {
        const obj = JSON.parse(this.responseText)
        for (index in obj) {
            select.options[select.options.length] = new Option(obj[index], index);
        }
    }
    xhttp.open("POST", services_url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(company);

    var select1 = document.getElementById("category");
    select1.options.length = 0;
    const xhttp1 = new XMLHttpRequest();
    xhttp1.onload = function (response) {
        const obj1 = JSON.parse(this.responseText)
        for (index1 in obj1) {
            select1.options[select1.options.length] = new Option(obj1[index1], index1);
        }
    }
    xhttp1.open("POST", categories_url, true);
    xhttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp1.send(company);
}


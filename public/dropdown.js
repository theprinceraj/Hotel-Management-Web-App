
//for RoomNo dropdown
function dropdownFunction1() {
  var settings = {
    url: "http://localhost:3000/Bed",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let option1 = '<option value="" selected>Select Room No</option>';
    for (let i = 0; i < response.length; i++) {
      option1 += "<option>" + response[i].broomNo + "</option>";
    }
    document.getElementById("broomNo").innerHTML = option1;
  });
}


//for bedNo dropdown

function dropdownFunction2() {
  var settings = {
    url: "http://localhost:3000/Student",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let option1 = '<option value="" selected>Select Bed No</option>';
    for (let i = 0; i < response.length; i++) {
      option1 += "<option>" + response[i].sbedNo + "</option>";
    }
    document.getElementById("sbedNo").innerHTML = option1;
  });
}

//for registrationNo dropdown

function dropdownFunction3() {
  var settings = {
    url: "http://localhost:3000/Money",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let option1 = '<option value="" selected>Select Registration No</option>';
    for (let i = 0; i < response.length; i++) {
      option1 += "<option>" + response[i].regNo + "</option>";
    }
    document.getElementById("regNo").innerHTML = option1;
    document.getElementById("editregNo").innerHTML = option1;
  });
}

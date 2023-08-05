const dashboardLink = document.querySelector(".dashboard-link");
const dashboardContent = document.querySelector(".dashboard-content");
const roomMasterLink = document.querySelector(".room-master-link");
const roomMasterContent = document.querySelector(".room-master-content");
const bedMasterLink = document.querySelector(".bed-master-link");
const bedMasterContent = document.querySelector(".bed-master-content");
const studentMasterLink = document.querySelector(".student-master-link");
const studentMasterContent = document.querySelector(".student-master-content");
const moneyReceiptLink = document.querySelector(".money-receipt-link");
const moneyReceiptContent = document.querySelector(".money-receipt-content");



dashboardLink.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardContent.style.display = "block";
  roomMasterContent.style.display = "none";
  bedMasterContent.style.display = "none";
  studentMasterContent.style.display = "none";
  moneyReceiptContent.style.display = "none";
});

roomMasterLink.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardContent.style.display = "none";
  roomMasterContent.style.display = "block";
  bedMasterContent.style.display = "none";
  studentMasterContent.style.display = "none";
  moneyReceiptContent.style.display = "none";
});

bedMasterLink.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardContent.style.display = "none";
  roomMasterContent.style.display = "none";
  bedMasterContent.style.display = "block";
  studentMasterContent.style.display = "none";
  moneyReceiptContent.style.display = "none";
});

studentMasterLink.addEventListener("click", function (e){
  e.preventDefault();
  dashboardContent.style.display = "none";
  roomMasterContent.style.display = "none";
  bedMasterContent.style.display = "none";
  studentMasterContent.style.display = "block";
  moneyReceiptContent.style.display = "none";
});

moneyReceiptLink.addEventListener("click", function (e){
  e.preventDefault();
  dashboardContent.style.display = "none";
  roomMasterContent.style.display = "none";
  bedMasterContent.style.display = "none";
  studentMasterContent.style.display = "none";
  moneyReceiptContent.style.display = "block";
  });

//  $(document).ready(function () {
//       $(".bed-master-link").click(function () {
//         $(".dashboard-content, .room-master-content").hide();
//         $(".bed-master-content").show();
//       });
//     });

// $(document).ready(function () {
//   $(".dashboard-link").click(function () {
//     $(".room-master-content, .bed-master-content").hide();
//     $(".dashboard-content").show();
//   });

//   $(".room-master-link").click(function () {
//     $(".dashboard-content, .bed-master-content").hide();
//     $(".room-master-content").show();
//   });

//   $(".bed-master-link").click(function () {
//     $(".dashboard-content, .room-master-content").hide();
//     $(".bed-master-content").show();
//   });
// });

// JS CODE FOR ROOMMASTER
// ADD NEW ROOM
function addRoom() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    //roomID: $("#roomID").val(),
    roomNo: $("#roomNo").val(),
    totalBeds: $("#totalBeds").val(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/RoomMaster", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      //Handle the response here if needed
      console.log(data); //Log the response to the console
      showData(); //Refresh the table
    })
    .catch((error) => console.log("ERROR", error));

  //$("roomID").val("");
  $("roomNo").val("");
  $("totalBeds").val("");
}

// ROOM DETAILS DISPLAY FUNCTION
function showData() {
  var settings = {
    url: "http://localhost:3000/RoomMaster/",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    if (response.length > 0) {
      var html = "";
      document.getElementById("tblRoomBody").innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html +=
          "<tr><td>" +
          response[i].id +
          // "</td><td>" +
          // response[i].roomID +
          "</td><td>" +
          response[i].roomNo +
          "</td><td>" +
          response[i].totalBeds +
          "</td> " +
          generateActionButtons(response[i].id) + // Add the action buttons to the row
          "</tr>";
      }
      document.getElementById("tblRoomBody").innerHTML += html;
    }
  });
}

// Function to generate the action buttons for each row
function generateActionButtons(id) {
  return (
    '<td><button class="btn btn-sm btn-primary"  onclick="editRoomRow(' +
    id +
    ')">Edit</button> ' +
    '<button class="btn btn-sm btn-danger" onclick="deleteRoomRow(' +
    id +
    ')">Delete</button></td>'
  );
}

// Edit Room row function
// Implement the edit functionality here
//   // You can access the row data using the "id" parameter
//   // For example, you can fetch the row data from the server based on the ID
function editRoomRow(id) {
  currentEditID = id; // Store the ID of the row being edited
  populateModalFields(id); // Populate the modal fields with row data
  $("#editModal").modal("show"); // Open the edit modal
}

// Function to populate the modal fields with data
function populateModalFields(id) {
  // Fetch the data for the given ID and populate the input fields in the edit modal
  // Replace this with your implementation

}


// // Delete row function
// function deleteRow(id) {
//   // Implement the delete functionality here
//   // You can access the row data using the "id" parameter
//   // For example, you can send a delete request to the server based on the ID
// }
function deleteRoomRow(id) {
  var confirmation = confirm("Are you sure you want to delete this row?");
  if (confirmation) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:3000/RoomMaster/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response here if needed
        console.log(data); // Log the response to the console
        showData(); // Refresh the table
      })
      .catch((error) => console.log("ERROR", error));
  }
}

function editRoom() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
   // roomID: $("#editRoomID").val(),
    roomNo: $("#editRoomNo").val(),
    totalBeds: $("#editTotalBeds").val(),
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/RoomMaster/" + currentEditID, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showData();
    })
    .catch((error) => console.log("ERROR", error));

  //$("#editRoomID").val("");
  $("#editRoomNo").val("");
  $("#editTotalBeds").val("");
  $("#editModal").modal("hide");
}

// for bed master

//Add New Bed
// new code---

function addBed() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    //bedID: $("#bedID").val(),
    broomNo: $("#broomNo").val(),
    bedNo: $("#bedNo").val(),
    bedCharge: $("#bedCharge").val(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/Bed", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response here if needed
      console.log(data); // Log the response to the console
      show1Data(); // Refresh the table
    })
    .catch((error) => console.log("Error:", error));

  //$("#bedID").val("");
  $("#broomNo").val("");
  $("#bedNo").val("");
  $("#bedCharge").val("");
}

// Bed Details Display Function
function show1Data() {
  var settings = {
    url: "http://localhost:3000/Bed/",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    if (response.length > 0) {
      var html = "";
      document.getElementById("tblBedBody").innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html +=
          "<tr><td>" +
          response[i].id +
          // "</td><td>" +
          // response[i].bedID +
          "</td><td>" +
          response[i].broomNo +
          "</td><td>" +
          response[i].bedNo +
          "</td><td>" +
          response[i].bedCharge +
          "</td> " +
          generateActionBedButtons(response[i].id) + // Add the action buttons to the row
          "</tr>";
      }
      document.getElementById("tblBedBody").innerHTML += html;
    }
  });
}

//for edit bed
//Function to generate the action buttons for each row
function generateActionBedButtons(id) {
  return (
    '<td><button class="btn btn-sm btn-primary" onclick="editBedRow(' +
    id +
    ')">Edit</button> ' +
    '<button class="btn btn-sm btn-danger" onclick="deleteBedRow(' +
    id +
    ')">Delete</button></td>'
  );
}

function editBedRow(id) {
  currentEditID = id; // Store the ID of the row being edited
  populateModalBedFields(id); // Populate the modal fields with row data
  $("#editBedModal").modal("show"); // Open the edit modal
}

//Function to populate the modal fields with data
function populateModalBedFields(id) {
  // Fetch the data for the given ID and populate the input fields in the edit modal
  // Replace this with your implementation
}
// function populateModalFields(id) {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   fetch("http://localhost:3000/Bed/" + id, requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       $("#editBedID").val(data.bedID);
//       $("#editBRoomNo").val(data.broomNo);
//       $("#editBedNo").val(data.bedNo);
//       $("#editBedCharge").val(data.bedCharge);
//     })
//     .catch((error) => console.log("ERROR", error));
// }

function editBed() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    //bedID: $("#editBedID").val(),
    broomNo: $("#editBRoomNo").val(),
    bedNo: $("#editBedNo").val(),
    bedCharge: $("#editBedCharge").val(),
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/Bed/" + currentEditID, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      show1Data();
    })
    .catch((error) => console.log("ERROR", error));

  //$("#editBedID").val("");
  $("#editBRoomNo").val("");
  $("#editBedNo").val("");
  $("#editBedCharge").val("");
  $("#editBedModal").modal("hide");
}

function deleteBedRow(id) {
  var confirmation = confirm("Are you sure you want to delete this row?");
  if (confirmation) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:3000/Bed/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        show1Data();
      })
      .catch((error) => console.log("ERROR", error));
  }
}


function RoomNoFunction() {
  var settings = {
    url: "http://localhost:3000/Bed",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let a = document.getElementById("broomNo").value;

    for (i = 0; i < response.length; i++) {
      if (response[i].broomNo === a) {
        // document.getElementById("bedID").value = response[i].bedID;
        document.getElementById("broomNo").value = response[i].broomNo;
        document.getElementById("bedNo").value = response[i].bedNo;
        document.getElementById("bedCharge").value = response[i].bedCharge;
        // document.getElementById("bed-no").value = response[i].bedNo;
      }
    }
  });
}

// JS CODE FOR STUDENT MASTER 
// Add New Student

function addStudent() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    registrationNo: $("#registrationNo").val(),
    studentName: $("#studentName").val(),
    contactNo: $("#contactNo").val(),
    address: $("#address").val(),
    sbedNo: $("#sbedNo").val(),
    sbedCharge: $("#sbedCharge").val(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/Student", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response here if needed
      console.log(data); // Log the response to the console
      showStudentData(); // Refresh the table
    })
    .catch((error) => console.log("Error:", error));

  $("#registrationNo").val("");
  $("#studentName").val("");
  $("#contactNo").val("");
  $("#address").val("");
  $("#sbedNo").val("");
  $("#sbedCharge").val("");
}

// Bed Details Display Function
function showStudentData() {
  var settings = {
    url: "http://localhost:3000/Student/",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    if (response.length > 0) {
      var html = "";
      document.getElementById("tblStudentBody").innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html +=
          "<tr><td>" +
          response[i].id +
          "</td><td>" +
          response[i].registrationNo +
          "</td><td>" +
          response[i].studentName +
          "</td><td>" +
          response[i].contactNo +
          "</td><td>" +
          response[i].address +
          "</td><td>" +
          response[i].sbedNo +
          "</td><td>" +
          response[i].sbedCharge +
          "</td> " +
          generateActionStudentButtons(response[i].id) + // Add the action buttons to the row
          "</tr>";
      }
      document.getElementById("tblStudentBody").innerHTML += html;
    }
  });
}

//for editing student details
// Function to generate the action buttons for each row
function generateActionStudentButtons(id) {
  return (
    '<td><button class="btn btn-sm btn-primary" onclick="editStudentRow(' +
    id +
    ')">Edit</button> ' +
    '<button class="btn btn-sm btn-danger" onclick="deleteStudentRow(' +
    id +
    ')">Delete</button></td>'
  );
}

function editStudentRow(id) {
  currentEditID = id; // Store the ID of the row being edited
  populateModalStudentFields(id); // Populate the modal fields with row data
  $("#editStudentModal").modal("show"); // Open the edit modal
}

// Function to populate the modal fields with data
function populateModalStudentFields(id) {
  // Fetch the data for the given ID and populate the input fields in the edit modal
  // Replace this with your implementation
}

function editStudent() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    registrationNo: $("#editRegistrationNo").val(),
    studentName: $("#editStudentName").val(),
    contactNo: $("#editContactNo").val(),
    address: $("#editAddress").val(),
    sbedNo: $("#editSBedNo").val(),
    sbedCharge: $("#editSBedCharge").val(),
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/Student/" + currentEditID, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showStudentData();
    })
    .catch((error) => console.log("ERROR", error));

  $("#editRegistrationNo").val("");
  $("#editStudentName").val("");
  $("#editContactNo").val("");
  $("#editAddress").val("");
  $("#editSBedNo").val("");
  $("#editSBedCharge").val("");
  $("#editStudentModal").modal("hide");
}

function deleteStudentRow(id) {
  var confirmation = confirm("Are you sure you want to delete this row?");
  if (confirmation) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:3000/Student/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        showStudentData();
      })
      .catch((error) => console.log("ERROR", error));
  }
}




function BedNoFunction() {
  var settings = {
    url: "http://localhost:3000/Student",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let a = document.getElementById("sbedNo").value;

    for (i = 0; i < response.length; i++) {
      if (response[i].registrationNo === a) {
        document.getElementById("studentName").value = response[i].studentName;
        document.getElementById("contact").value = response[i].contactNo;
        document.getElementById("address").value = response[i].address;
        document.getElementById("sbedNo").value = response[i].bedNo;
      }
    }
  });
}



// JS CODE FOR MONEY RECEIPT
// Add New Money Receipt

function addMoneyReceipt() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    mrNo:$("#mrNo").val(),
    datePicker:$("#datePicker").val(),
    regNo: $("#regNo").val(),
    studentName: $("#studentName").val(),
    contact: $("#contact").val(),
    address: $("#address").val(),
    bedNo: $("#bedNo").val(),
    amountReceived: $("#amountReceived").val(),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/Money", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response here if needed
      console.log(data); // Log the response to the console
      showMoneyReceiptData(); // Refresh the table
    })
    .catch((error) => console.log("Error:", error));

  $("#mrNo").val("");
  $("#datePicker").val("");
  $("#regNo").val("");
  $("#studentName").val("");
  $("#contact").val("");
  $("#address").val("");
  $("#bedNo").val("");
  $("#amountReceived").val("");
}

// Money Details Display Function
function showMoneyReceiptData() {
  var settings = {
    url: "http://localhost:3000/Money/",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    if (response.length > 0) {
      var html = "";
      document.getElementById("tblMoneyReceiptBody").innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html +=
          "<tr><td>" +
          response[i].id +
          "</td><td>" +
          response[i].mrNo +
          "</td><td>" +
          response[i].datePicker + 
          "</td><td>" +
          response[i].regNo +
          "</td><td>" +
          response[i].studentName +
          "</td><td>" +
          response[i].contact +
          "</td><td>" +
          response[i].address +
          "</td><td>" +
          response[i].bedNo +
          "</td><td>" +
          response[i].amountReceived +
          "</td> " +
          generateActionMoneyButtons(response[i].id) + // Add the action buttons to the row
          "</tr>";
      }
      document.getElementById("tblMoneyReceiptBody").innerHTML += html;
    }
  });
}

//for editing student details
// Function to generate the action buttons for each row
function generateActionMoneyButtons(id) {
  return (
    '<td><button class="btn btn-sm btn-primary" onclick="editMoneyRow(' +
    id +
    ')">Edit</button> ' +
    '<button class="btn btn-sm btn-danger" onclick="deleteMoneyRow(' +
    id +
    ')">Delete</button></td>'
  );
}

function editMoneyRow(id) {
  currentEditID = id; // Store the ID of the row being edited
  populateModalMoneyFields(id); // Populate the modal fields with row data
  $("#editMoneyReceiptModal").modal("show"); // Open the edit modal
}

// Function to populate the modal fields with data
function populateModalMoneyFields(id) {
  // Fetch the data for the given ID and populate the input fields in the edit modal
  // Replace this with your implementation
}

function editMoneyReceipt() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    mrNo: $("#editmrNo").val(),
    datePicker: $("#editdatePicker").val(),
    regNo: $("#editregNo").val(),
    studentName: $("#editstudentName").val(),
    contact: $("#editContact").val(),
    address: $("#editAddressMoneyReceiptModal").val(),
    bedNo: $("#editbedNo").val(),
    amountReceived: $("#editAmountReceived").val(),
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/Money/" + currentEditID, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showMoneyReceiptData();
    })
    .catch((error) => console.log("ERROR", error));
 
  $("#editmrNo").val("");
  $("#editdatePicker").val("");
  $("#editregNo").val("");
  $("#editstudentName").val("");
  $("#editContact").val("");
  $("#editAddressMoneyReceiptModal").val("");
  $("#editbedNo").val("");
  $("#editAmountReceived").val("");
  $("#editMoneyReceiptModal").modal("hide");
}

function deleteMoneyRow(id) {
  var confirmation = confirm("Are you sure you want to delete this row?");
  if (confirmation) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:3000/Money/" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        showMoneyReceiptData();
      })
      .catch((error) => console.log("ERROR", error));
  }
}



function RegdFunction() {
  var settings = {
    url: "http://localhost:3000/Money",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let a = document.getElementById("regNo").value;

    for (i = 0; i < response.length; i++) {
      if (response[i].regNo === a) {
        document.getElementById("mrNo").value = response[i].mrNo;
        document.getElementById("datePicker").value = response[i].datePicker;
        document.getElementById("studentName").value = response[i].studentName;
        document.getElementById("contactNo").value = response[i].contactNo;
        document.getElementById("address").value = response[i].address;
        document.getElementById("bedNo").value = response[i].bedNo;
        document.getElementById("amountReceived").value = response[i].amountReceived;
      }
    }
  });
}


// JS CODE FOR FEE SUMMARY
// JS CODE FOR CHANGE PASSWORD
// JS CODE FOR PROFILE
// JS CODE FOR LOGOUT



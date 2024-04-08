function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/9eae1dc0e3044118a978c0ea505c2000/appointmentData",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }

  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/9eae1dc0e3044118a978c0ea505c2000/appointmentData")
    .then((res) => {
        console.log(res)
        for (var i = 0; i< res.data.length; i++) {
            displayUserOnScreen(res.data[i])
        }
    })
    
    .catch((error) => console.log(error))
    
  })
  

  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      //userList.removeChild(event.target.parentElement);
      axios.delete(`https://crudcrud.com/api/9eae1dc0e3044118a978c0ea505c2000/appointmentData/${userDetails._id}`)
      .then((res) => {
        userList.removeChild(event.target.parentElement)
      })
      .catch((error) => console.log(error));
    });
  
    editBtn.addEventListener("click", function (event) {

      axios.delete(`https://crudcrud.com/api/9eae1dc0e3044118a978c0ea505c2000/appointmentData/${userDetails._id}`)
      .then((res) => {
        userList.removeChild(event.target.parentElement)
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
      })
      .catch((error) => console.log(error));
      
    });
  }
  
  // Do not touch code below
  module.exports = handleFormSubmit;
function handleFormSubmit(event) {
    event.preventDefault();
    const vegDetail = {
      Name: event.target.Name.value,
      Price: event.target.Price.value,
      Quantity: event.target.Quantity.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/0abe13028f224d9d88f2ff8939818e2b/VegetableShop",
        vegDetail
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("Name").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("Quantity").value = "";
  }

  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/0abe13028f224d9d88f2ff8939818e2b/VegetableShop")
    .then((res) => {
        console.log(res)
        for (var i = 0; i< res.data.length; i++) {
            displayUserOnScreen(res.data[i])
        }
    })
    
    .catch((error) => console.log(error))
    
  })
  

  
  function displayUserOnScreen(vegDetail) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${vegDetail.Name}    ${"Rs:"+vegDetail.Price}     ${vegDetail.Quantity+"KG"}`
      )
    );
  
    //<label for="Name">Name</label>
    //<input type="text" name="Name" id="Name" />

    const inputbox = document.createElement("input");
    inputbox.type = "number"
    inputbox.name = "Buy"
    inputbox.id = "Buy"
    
    userItem.appendChild(inputbox);
  
    const buy = document.createElement("button");
    buy.htmlFor = "Buy"
    buy.appendChild(document.createTextNode("Buy"));
    userItem.appendChild(buy);

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      //userList.removeChild(event.target.parentElement);
      axios.delete(`https://crudcrud.com/api/0abe13028f224d9d88f2ff8939818e2b/VegetableShop/${vegDetail._id}`)
      .then((res) => {
        userList.removeChild(event.target.parentElement)
      })
      .catch((error) => console.log(error));
    });
  
    buy.addEventListener("click", function (event) {
      const quantityEntered = document.getElementById("Buy").value
      const stockQuantity = vegDetail.Quantity
      const remainingStock = {
        "Name":vegDetail.Name,
        "Price":vegDetail.Price,
        "Quantity":stockQuantity - quantityEntered
      }
      if (quantityEntered <= stockQuantity) {
        axios.put(`https://crudcrud.com/api/0abe13028f224d9d88f2ff8939818e2b/VegetableShop/${vegDetail._id}`,
        remainingStock
      )
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
      }
        
    });
  }
  
  // Do not touch code below
  module.exports = handleFormSubmit;
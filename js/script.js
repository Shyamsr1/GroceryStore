// Get the modal
var modal = document.getElementById("addItem");

// Get the button that opens the modal
var btn = document.getElementById("addItems");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Take array of objects and puts it in table

$(document).ready(function () {
  let jsonItems = [];
  let newItems = [];
  $.getJSON("/groceryList.json", (data) => {
    jsonItems = data;
  });

  $("#saveItem").click(function (e) {
    e.preventDefault();
    class NewItem {
      constructor(Serialnumber, Name, Quantity, units, Department, Notes) {
        this.Serialnumber = Serialnumber;
        this.Name = Name;
        this.Quantity = Quantity;
        this.units = units;
        this.Department = Department;
        this.Notes = Notes;
      }
    }
    let itemSerialnumber = $("#addItem_Serialnumber").val();
    let itemName = $("#addItem_Name").val();
    let itemQuantity = $("#addItem_Quantity").val();
    let itemunits = $("#addItem_units").val();
    let itemDepartment = $("#addItem_Department").val();
    let itemNotes = $("#addItem_Notes").val();

    let item = new NewItem(
      itemSerialnumber,
      itemName,
      itemQuantity,
      itemunits,
      itemDepartment,
      itemNotes
    );
    newItems.push(item);
    alert("Item added successfully");
    console.log(item);
    console.log(newItems);
    let oldNewList = jsonItems.concat(newItems);
    createTable(oldNewList);

    // $.ajax({
    //   url: "/groceryList.json",
    //   dataType: "json",
    //   success: (data) => {
    //     if (typeof newItems != "undefined" && newItems.length > 0) {

    //     } else {
    //       alert("No new items Added");
    //     }
    //     // createTable(data);
    //   },
    // });
  });
});

function createTable(data) {
  console.log(data);
  $("#groceryListTable").find("tbody").empty();
  if (data != null || data != undefined) {
    $(data).each(function (index, element) {
      console.log(element.Name);
      $("#groceryListTable")
      .find("tbody")
      .append($("<tr>"))
      .append(
        $("<td>").text(index + 1),
        $("<td>").text(element.Serialnumber),
        $("<td>").text(element.Name),
        $("<td>").text(element.Quantity),
        $("<td>").text(element.units),
        $("<td>").text(element.Department),
        $("<td>").text(element.Notes)
        );
      });
    }
    // $("#groceryListTable").show();
    $("#tableContainer").fadeIn(2500);
}

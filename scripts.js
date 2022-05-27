currentDay = moment();

let today = currentDay.format("MMMM Do YYYY");
$("#currentDay").text(today);

const tableContent = $("#tableContent");

for (i = 0; i < 24; i++) {
	//     <tr>
	//   <th scope="row">3</th>
	//   <td colspan="2" class="table-active">
	//     <input type="text" class="form-control" placeholder="something">
	//   </td>
	//   <td>save</td>
	// </tr>

	// create the virtual dom nodes and assign it to consts after calling jquery on it

	const tableRow = $(document.createElement("tr"));
	const tableHours = $(document.createElement("th"));
	const inputColumn = $(document.createElement("td"));
	const taskInput = $(document.createElement("input"));
	const saveColumn = $(document.createElement("td"));

	// append table hours to the table row with the hour
	tableHours.text(i);
	tableHours.appendTo(tableRow);

	// create the input column
	taskInput.appendTo(inputColumn);
	inputColumn.appendTo(tableRow);

	saveColumn.appendTo(tableRow);

	tableRow.appendTo(tableContent);
}

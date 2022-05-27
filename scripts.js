currentDay = moment();

let today = currentDay.format("MMMM Do YYYY");
$("#currentDay").text(today);

let hour = currentDay.format("H HH");

$(document).on("click", ".save-btn", function () {
	const id = $(this).attr("id");
	const index = id.split("--")[1];
	const task = $("#task--" + index).val();

	if (task !== "") {
		localStorage.setItem(`${moment().format("MMMM Do YYYY")}--${index}`, task);
	}
});

const tableContent = $("#tableContent");

for (i = 0; i < 24; i++) {
	const tableRow = $(document.createElement("tr"));
	const tableHours = $(document.createElement("th"));
	const inputColumn = $(document.createElement("td"));
	const taskInput = $(document.createElement("input"));
	const saveColumn = $(document.createElement("td"));
	const saveButton = $(document.createElement("btn"));
	const saveIcon = $(document.createElement("i"));

	let existingTask = localStorage.getItem(
		`${moment().format("MMMM Do YYYY")}--${i}`
	);

	// append table hours to the table row with the hour
	tableHours.text(i);
	tableHours.prop({ scope: "row" });
	tableHours.appendTo(tableRow);

	// create the input column
	inputColumn.prop({ colspan: 2 });
	inputColumn.addClass("table-active");
	taskInput.addClass("form-control");
	taskInput.attr({ id: "task--" + i });
	taskInput.appendTo(inputColumn);

	if (existingTask !== null) {
		taskInput.val(existingTask);
	}

	inputColumn.appendTo(tableRow);

	// creating save column
	saveColumn.prop({ colspan: 1 });

	saveButton.text("Save ");
	saveButton.addClass("btn btn-primary save-btn");
	saveButton.prop({ id: `save--${i}` });
	saveIcon.addClass("bi bi-save");
	saveIcon.appendTo(saveButton);
	saveButton.appendTo(saveColumn);
	saveColumn.appendTo(tableRow);

	//appending table row to table content
	tableRow.appendTo(tableContent);
}

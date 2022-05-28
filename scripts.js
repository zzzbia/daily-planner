currentDay = moment();

let today = currentDay.format("MMMM Do YYYY");
$("#currentDay").text(today);

const hour = currentDay.startOf("hour");
const businessHours = currentDay.format("hh:mm A");

// in 24 hour clock -> when do you start working?
const startOfWorkDayHour = 9;

// how many hours do you want to work
const hoursToWork = 9;

$(document).on("click", ".save-btn", function () {
	const id = $(this).attr("id");
	// ["task", "3"];
	const index = id.split("--")[1];
	const task = $("#task--" + index).val();
	localStorage.setItem(`${currentDay.format("MMMM-Do-YYYY")}--${index}`, task);
});

const tableContent = $("#tableContent");

// 10 for 10 hour work day + 1
// workday to be from 9am -6pm
for (i = 0; i < hoursToWork; i++) {
	const tableRow = $(document.createElement("tr"));
	const tableHours = $(document.createElement("th"));
	const inputColumn = $(document.createElement("td"));
	const taskInput = $(document.createElement("input"));
	const saveColumn = $(document.createElement("td"));
	const saveButton = $(document.createElement("btn"));
	const saveIcon = $(document.createElement("i"));

	const workHour = moment().set("hour", i + startOfWorkDayHour);

	let existingTask = localStorage.getItem(
		`${currentDay.format("MMMM-Do-YYYY")}--${i}`
	);

	// append table hours to the table row with the hour
	tableHours.text(workHour.format("h:00 A"));
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

	if (workHour.isBefore(currentDay, "hour")) {
		saveButton.addClass("disabled");
		taskInput.prop({ readonly: true });
	}

	//appending table row to table content
	tableRow.appendTo(tableContent);
}

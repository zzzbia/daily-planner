currentDay = moment();

let today = currentDay.format("MMMM Do YYYY");
$("#currentDay").text(today);

const businessHours = currentDay.format("hh:mm A");

// in 24 hour clock -> when do you start working?
const startOfWorkDayHour = 9;

// how many hours do you want to work
const hoursToWork = 24;

$(document).on("click", ".save-btn", function () {
	const id = $(this).attr("id");
	// splitting by -- to set an index
	// ["task", "3"];
	const index = id.split("--")[1];
	const task = $("#task--" + index).val();
	localStorage.setItem(`${currentDay.format("MMMM-Do-YYYY")}--${index}`, task);
});

const tableContent = $("#tableContent");

// workday to be from 9am -6pm
for (i = 0; i < hoursToWork; i++) {
	const tableRow = $(document.createElement("tr"));
	const tableHours = $(document.createElement("th"));
	const inputColumn = $(document.createElement("td"));
	const taskInput = $(document.createElement("textarea"));
	const saveColumn = $(document.createElement("td"));
	const saveButton = $(document.createElement("btn"));
	const saveIcon = $(document.createElement("i"));

	const workHour = moment().set("hour", i + startOfWorkDayHour);
	const currentHour = moment().startOf("hour");

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
	taskInput.attr({ id: "task--" + i, rows: 3 });

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

	// if the current hour is set to the work hour
	// then the input column color will be teal (table-info)
	if (workHour.format("hh a") == currentHour.format("hh a")) {
		inputColumn.addClass("table-info");
		taskInput.attr({ placeholder: "Current hour" });
	}
	if (workHour.isBefore(currentDay, "hour")) {
		saveButton.addClass("disabled");
		taskInput.prop({ readonly: true });
		taskInput.attr({ placeholder: "Past" });
	}

	if (workHour.isAfter(currentDay, "hour")) {
		inputColumn.addClass("table-success");
		taskInput.attr({ placeholder: "Add task" });
	}

	//appending table row to table content
	tableRow.appendTo(tableContent);
}

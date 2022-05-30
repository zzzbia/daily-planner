currentDay = moment();

let today = currentDay.format("MMMM Do YYYY");
$("#currentDay").text(today);

// in 24 hour clock -> when do you start working?
const startOfWorkDayHour = 9;

// how many hours do you want to work
const hoursToWork = 9;

// when the node with the class save-btn is clicked,
$(document).on("click", ".save-btn", function () {
	const id = $(this).attr("id");
	// splitting by -- to set an index
	// ["task", "3"];
	const index = id.split("--")[1];
	const task = $("#task--" + index).val();
	localStorage.setItem(`${currentDay.format("MMMM-Do-YYYY")}--${index}`, task);
});

const tableContent = $("#tableContent");

//  creates the table rows for each hour of the day
for (i = 0; i < hoursToWork; i++) {
	// create all the required dom nodes
	const tableRow = $("<tr>");
	const tableHours = $("<th>");
	const inputColumn = $("<td>");
	const taskInput = $("<textarea>");
	const saveColumn = $("<td>");
	const saveButton = $("<button>");
	const saveIcon = $("<i>");

	// see if the task for given hour
	// already exists in the local storage of the user
	let existingTask = localStorage.getItem(
		`${currentDay.format("MMMM-Do-YYYY")}--${i}`
	);

	// set  the id to the hour so we can compare the hour of the table row
	// with the current hour in the hour updater function
	tableRow.prop({ id: i + startOfWorkDayHour });
	tableRow.addClass("hour-row");

	const workHour = moment({ hour: i + startOfWorkDayHour });
	tableHours.text(workHour.format("h:00 A"));

	tableHours.prop({ scope: "row" });
	tableHours.addClass("table-hour");
	tableHours.appendTo(tableRow);

	// create the input column
	inputColumn.prop({ colspan: 2 });
	inputColumn.addClass("table-active").addClass("table-input-col");
	taskInput.addClass("form-control");
	taskInput.attr({ id: "task--" + i, rows: 3 });

	taskInput.appendTo(inputColumn);

	// if there is a task from local storage, set the value of the input
	// to the task that is persisted in the local storage

	if (existingTask !== null) {
		taskInput.val(existingTask);
	}

	// append the nodes to their parents
	inputColumn.appendTo(tableRow);

	// saveButton and saveColumn nodes
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

function hourUpdater() {
	// function to rest classes for past , current and future hours in the table
	// selects all elements with the class .hour-row and loops through them to check if the
	// hour has past by checking the value in the id with the current hour from moment
	$(".hour-row").each(function () {
		const hour = $(this).attr("id");
		// if the current hour is set to the work hour
		// then the input column color will be teal (table-info)

		if (hour < moment().hours()) {
			$(this).find("textarea").attr({ placeholder: "Past", readonly: true });
			$(this).find("button").addClass("disabled");
		}

		if (hour == moment().hours()) {
			$(this).find(".table-input-col").addClass("table-info");
			$(this).find("textarea").attr({ placeholder: "Current hour" });
		}

		if (hour > moment().hours()) {
			$(this).find(".table-input-col").addClass("table-success");
			$(this).find("textarea").attr({ placeholder: "Add task" });
		}
	});
}
hourUpdater();

// re-runs hourUpdater function after every 30 seconds
setInterval(hourUpdater, 30000);

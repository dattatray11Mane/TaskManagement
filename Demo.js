$(document).ready(function () {
    loadTasks();

    $('#taskForm').submit(function (event) {
        event.preventDefault();
        addTask();
    });
});

function loadTasks() {
    $.ajax({
        url: 'http://localhost:8080/tasks',
        type: 'GET',
        success: function (data) {
            displayTasks(data);
        }
    });
}

function displayTasks(tasks) {
    var taskList = $('#taskList');
    taskList.empty();

    $.each(tasks, function (index, task) {
        taskList.append('<li>' + task.name + ': ' + task.description + '</li>');
    });
}

function addTask() {
    var taskName = $('#taskName').val();
    var taskDescription = $('#taskDescription').val();

    var task = {
        name: taskName,
        description: taskDescription
    };

    $.ajax({
        url: 'http://localhost:8080/tasks',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(task),
        success: function () {
            loadTasks();
            $('#taskForm')[0].reset();
        }
    });
}

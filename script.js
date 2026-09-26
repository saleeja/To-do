// ==========================================
// 1. TASK DATA
// ==========================================

let tasks = [];


// ==========================================
// 2. GET HTML ELEMENTS
// ==========================================


// Add button

const addTaskButton =
    document.querySelector("#addTaskButton");


// Search

const searchInput =
    document.querySelector("#searchInput");


// Sort

const sortSelect =
    document.querySelector("#sortSelect");


// Navigation

const navigationLinks =
    document.querySelectorAll(".nav-item");


// Pages

const pages =
    document.querySelectorAll(".page");


// ==========================================
// 3. MODAL ELEMENTS
// ==========================================

const taskModal =
    document.querySelector("#taskModal");


const closeModal =
    document.querySelector("#closeModal");


const cancelTask =
    document.querySelector("#cancelTask");


const taskForm =
    document.querySelector("#taskForm");


const taskTitle =
    document.querySelector("#taskTitle");


const taskDescription =
    document.querySelector("#taskDescription");


const taskDate =
    document.querySelector("#taskDate");


const taskPriority =
    document.querySelector("#taskPriority");


const taskCategory =
    document.querySelector("#taskCategory");


const taskImportant =
    document.querySelector("#taskImportant");


// ==========================================
// 4. DASHBOARD ELEMENTS
// ==========================================

const totalCount =
    document.querySelector("#totalCount");


const activeCount =
    document.querySelector("#activeCount");


const completedCount =
    document.querySelector("#completedCount");


const importantCount =
    document.querySelector("#importantCount");


const completionRate =
    document.querySelector("#completionRate");


const todayCount =
    document.querySelector("#todayCount");


const upcomingCount =
    document.querySelector("#upcomingCount");


const overdueCount =
    document.querySelector("#overdueCount");


// ==========================================
// 5. ANALYTICS ELEMENTS
// ==========================================

const analyticsTotal =
    document.querySelector("#analyticsTotal");


const analyticsCompleted =
    document.querySelector("#analyticsCompleted");


const analyticsActive =
    document.querySelector("#analyticsActive");


const analyticsImportant =
    document.querySelector("#analyticsImportant");


const progressFill =
    document.querySelector("#progressFill");


const progressText =
    document.querySelector("#progressText");


// ==========================================
// 6. LOAD SAVED TASKS
// ==========================================

const savedTasks =
    localStorage.getItem("tasks");


if (savedTasks) {

    tasks = JSON.parse(savedTasks);

}


// ==========================================
// 7. SAVE TASKS
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ==========================================
// 8. OPEN MODAL
// ==========================================

addTaskButton.addEventListener(
    "click",
    function () {

        taskModal.classList.add("show");

        taskTitle.focus();

    }
);


// ==========================================
// 9. CLOSE MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    closeTaskModal
);


cancelTask.addEventListener(
    "click",
    closeTaskModal
);


function closeTaskModal() {

    taskModal.classList.remove("show");

    taskForm.reset();

}


// ==========================================
// 10. CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

taskModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === taskModal
        ) {

            closeTaskModal();

        }

    }
);


// ==========================================
// 11. ADD TASK
// ==========================================

function addTask(event) {

    // Stop page refresh

    event.preventDefault();


    // Get form values

    const title =
        taskTitle.value.trim();


    const description =
        taskDescription.value.trim();


    const dueDate =
        taskDate.value;


    const priority =
        taskPriority.value;


    const category =
        taskCategory.value;


    const important =
        taskImportant.checked;


    // ======================================
    // CREATE TASK OBJECT
    // ======================================

    const task = {

        id: Date.now(),

        text: title,

        description: description,

        dueDate: dueDate,

        priority: priority,

        category: category,

        completed: false,

        important: important,

        createdAt:
            new Date().toISOString()

    };


    // Add to array

    tasks.push(task);


    // Save

    saveTasks();


    // Update everything

    renderAll();


    // Close modal

    closeTaskModal();


    // Show dashboard

    showPage("dashboard");

}


// ==========================================
// 12. FORM SUBMIT
// ==========================================

taskForm.addEventListener(
    "submit",
    addTask
);


// ==========================================
// 13. RENDER EVERYTHING
// ==========================================

function renderAll() {

    renderDashboardTasks();

    renderImportantTasks();

    renderAllTasks();

    updateDashboard();

    updateAnalytics();

}


// ==========================================
// 14. CREATE TASK ELEMENT
// ==========================================

function createTaskElement(task) {


    const taskElement =
        document.createElement("div");


    taskElement.classList.add(
        "task-item"
    );


    // Completed

    if (task.completed) {

        taskElement.classList.add(
            "completed"
        );

    }


    // Important

    if (task.important) {

        taskElement.classList.add(
            "important"
        );

    }


    // ======================================
    // TASK HTML
    // ======================================

    taskElement.innerHTML = `

        <div class="task-info">


            <div>

                <span class="task-text">
                    ${escapeHTML(task.text)}
                </span>

            </div>


            <div class="task-meta">


                <span class="task-category">

                    ${getCategoryIcon(task.category)}

                    ${task.category}

                </span>


                <span
                    class="task-priority
                    priority-${task.priority}"
                >

                    ${task.priority}

                </span>


                ${
                    task.dueDate

                    ?

                    `
                    <span class="task-date">

                        📅

                        ${formatDate(task.dueDate)}

                    </span>
                    `

                    :

                    ""
                }


            </div>


            ${
                task.description

                ?

                `
                <p class="task-description">

                    ${escapeHTML(task.description)}

                </p>
                `

                :

                ""
            }


        </div>


        <div class="task-actions">


            <button
                class="complete-btn"
                title="Complete task"
            >
                ✓
            </button>


            <button
                class="important-btn"
                title="Mark important"
            >

                ${task.important ? "★" : "☆"}

            </button>


            <button
                class="delete-btn"
                title="Delete task"
            >
                🗑
            </button>


        </div>

    `;


    // ======================================
    // COMPLETE BUTTON
    // ======================================

    const completeButton =
        taskElement.querySelector(
            ".complete-btn"
        );


    completeButton.addEventListener(
        "click",
        function () {

            task.completed =
                !task.completed;


            saveTasks();

            renderAll();

        }
    );


    // ======================================
    // IMPORTANT BUTTON
    // ======================================

    const importantButton =
        taskElement.querySelector(
            ".important-btn"
        );


    importantButton.addEventListener(
        "click",
        function () {

            task.important =
                !task.important;


            saveTasks();

            renderAll();

        }
    );


    // ======================================
    // DELETE BUTTON
    // ======================================

    const deleteButton =
        taskElement.querySelector(
            ".delete-btn"
        );


    deleteButton.addEventListener(
        "click",
        function () {


            const confirmDelete =
                confirm(
                    "Are you sure you want to delete this task?"
                );


            if (!confirmDelete) {

                return;

            }


            tasks =
                tasks.filter(
                    function (item) {

                        return (
                            item.id !== task.id
                        );

                    }
                );


            saveTasks();

            renderAll();

        }
    );


    return taskElement;
}


// ==========================================
// 15. DASHBOARD TASKS
// ==========================================

function renderDashboardTasks() {


    const container =
        document.querySelector(
            "#dashboardTaskList"
        );


    container.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    const recentTasks =
        filteredTasks.slice(0, 5);


    if (
        recentTasks.length === 0
    ) {

        container.innerHTML = `

            <div class="task-item">

                <span class="task-text">

                    No tasks found.

                </span>

            </div>

        `;

        return;

    }


    recentTasks.forEach(
        function (task) {

            container.appendChild(
                createTaskElement(task)
            );

        }
    );
}


// ==========================================
// 16. IMPORTANT TASKS
// ==========================================

function renderImportantTasks() {


    const container =
        document.querySelector(
            "#importantTaskContainer"
        );


    container.innerHTML = "";


    const importantTasks =
        tasks.filter(
            function (task) {

                return task.important;

            }
        );


    // ======================================
    // NO IMPORTANT TASKS
    // ======================================

    if (
        importantTasks.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-important">


                <div class="important-icon">
                    ☆
                </div>


                <h2>
                    No Important Tasks
                </h2>


                <p>

                    Mark tasks as important to
                    see them here.

                    Important tasks help you
                    focus on what matters most.

                </p>


            </div>

        `;

        return;

    }


    // ======================================
    // SHOW IMPORTANT TASKS
    // ======================================

    importantTasks.forEach(
        function (task) {

            container.appendChild(
                createTaskElement(task)
            );

        }
    );
}


// ==========================================
// 17. ALL TASKS
// ==========================================

function renderAllTasks() {


    const container =
        document.querySelector(
            "#allTaskList"
        );


    container.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    if (
        filteredTasks.length === 0
    ) {

        container.innerHTML = `

            <div class="task-item">

                <span class="task-text">

                    No tasks found.

                </span>

            </div>

        `;

        return;

    }


    filteredTasks.forEach(
        function (task) {

            container.appendChild(
                createTaskElement(task)
            );

        }
    );
}


// ==========================================
// 18. SEARCH + SORT
// ==========================================

function getFilteredTasks() {


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    let filteredTasks =
        tasks.filter(
            function (task) {

                return task.text
                    .toLowerCase()
                    .includes(searchText);

            }
        );


    // Newest

    if (
        sortSelect.value === "newest"
    ) {

        filteredTasks.sort(
            function (a, b) {

                return b.id - a.id;

            }
        );

    }


    // Oldest

    if (
        sortSelect.value === "oldest"
    ) {

        filteredTasks.sort(
            function (a, b) {

                return a.id - b.id;

            }
        );

    }


    // Important first

    if (
        sortSelect.value === "important"
    ) {

        filteredTasks.sort(
            function (a, b) {

                return (
                    Number(b.important) -
                    Number(a.important)
                );

            }
        );

    }


    return filteredTasks;
}


// ==========================================
// 19. UPDATE DASHBOARD
// ==========================================

function updateDashboard() {


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    const active =
        tasks.filter(
            function (task) {

                return !task.completed;

            }
        ).length;


    const important =
        tasks.filter(
            function (task) {

                return task.important;

            }
        ).length;


    // Update cards

    totalCount.textContent =
        total;


    activeCount.textContent =
        active;


    completedCount.textContent =
        completed;


    importantCount.textContent =
        important;


    // Completion percentage

    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    completionRate.textContent =
        `${percentage}% completion rate`;


    // ======================================
    // DATE COUNTS
    // ======================================

    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const nextSevenDays =
        new Date(today);


    nextSevenDays.setDate(
        today.getDate() + 7
    );


    let todayTasks = 0;

    let upcomingTasks = 0;

    let overdueTasks = 0;


    tasks.forEach(
        function (task) {


            if (!task.dueDate) {

                return;

            }


            const dueDate =
                new Date(task.dueDate);


            dueDate.setHours(
                0,
                0,
                0,
                0
            );


            // Today

            if (
                dueDate.getTime() ===
                today.getTime()
            ) {

                todayTasks++;

            }


            // Upcoming

            if (
                dueDate > today &&
                dueDate <= nextSevenDays
            ) {

                upcomingTasks++;

            }


            // Overdue

            if (
                dueDate < today &&
                !task.completed
            ) {

                overdueTasks++;

            }

        }
    );


    todayCount.textContent =
        todayTasks;


    upcomingCount.textContent =
        upcomingTasks;


    overdueCount.textContent =
        overdueTasks;
}


// ==========================================
// 20. ANALYTICS
// ==========================================

function updateAnalytics() {


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    const active =
        tasks.filter(
            function (task) {

                return !task.completed;

            }
        ).length;


    const important =
        tasks.filter(
            function (task) {

                return task.important;

            }
        ).length;


    analyticsTotal.textContent =
        total;


    analyticsCompleted.textContent =
        completed;


    analyticsActive.textContent =
        active;


    analyticsImportant.textContent =
        important;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    progressFill.style.width =
        `${percentage}%`;


    progressText.textContent =
        `${percentage}% completed`;
}


// ==========================================
// 21. PAGE NAVIGATION
// ==========================================

function showPage(pageName) {


    // Hide all pages

    pages.forEach(
        function (page) {

            page.style.display =
                "none";

        }
    );


    // Find page

    const selectedPage =
        document.querySelector(
            `#${pageName}-page`
        );


    if (selectedPage) {

        selectedPage.style.display =
            "block";

    }


    // Remove active

    navigationLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );

        }
    );


    // Add active

    const activeLink =
        document.querySelector(
            `.nav-item[data-page="${pageName}"]`
        );


    if (activeLink) {

        activeLink.classList.add(
            "active"
        );

    }
}


// ==========================================
// 22. NAVIGATION CLICK
// ==========================================

navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const pageName =
                    link.dataset.page;


                showPage(pageName);

            }
        );

    }
);


// ==========================================
// 23. SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function () {

        renderDashboardTasks();

        renderAllTasks();

    }
);


// ==========================================
// 24. SORT
// ==========================================

sortSelect.addEventListener(
    "change",
    function () {

        renderDashboardTasks();

        renderAllTasks();

    }
);


// ==========================================
// 25. CATEGORY ICON
// ==========================================

function getCategoryIcon(category) {


    const icons = {

        work: "💼",

        personal: "👤",

        study: "📚",

        shopping: "🛒",

        other: "📌"

    };


    return (
        icons[category] ||
        "📌"
    );
}


// ==========================================
// 26. FORMAT DATE
// ==========================================

function formatDate(dateString) {


    if (!dateString) {

        return "";

    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",

            month: "short",

            year: "numeric"
        }
    );
}


// ==========================================
// 27. SECURITY
// ==========================================

function escapeHTML(text) {


    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;
}


// ==========================================
// 28. INITIAL LOAD
// ==========================================

renderAll();

showPage("dashboard");
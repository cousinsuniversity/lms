// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the LMS
    initLMS();
});

function initLMS() {
    // DOM Elements
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content');
    const welcomeDialogBtn = document.getElementById('welcomeDialogBtn');
    const welcomeDialog = document.getElementById('welcomeDialog');
    const closeWelcomeDialogBtns = document.querySelectorAll('#closeWelcomeDialog, #closeWelcomeDialog2');
    const courseDialog = document.getElementById('courseDialog');
    const closeCourseDialogBtns = document.querySelectorAll('#closeCourseDialog, #closeCourseDialog2');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const coursesContainer = document.querySelector('.courses-container');
    const allCoursesContainer = document.getElementById('all-courses-container');
    const announcementsList = document.getElementById('announcements-list');
    const fullAnnouncementsList = document.getElementById('full-announcements-list');
    const activityList = document.getElementById('activity-list');
    const enterCourseBtn = document.getElementById('enterCourseBtn');
    
    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        sidebarToggle.innerHTML = sidebar.classList.contains('collapsed') 
            ? '<i class="fas fa-bars"></i>' 
            : '<i class="fas fa-times"></i>';
    });
    
    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Get the page to show
            const page = this.getAttribute('data-page');
            
            // Hide all page contents
            pageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected page
            const pageToShow = document.getElementById(`${page}-page`);
            if (pageToShow) {
                pageToShow.classList.add('active');
            }
        });
    });
    
    // Welcome dialog functionality
    welcomeDialogBtn.addEventListener('click', function() {
        showDialog(welcomeDialog);
    });
    
    closeWelcomeDialogBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            hideDialog(welcomeDialog);
        });
    });
    
    // Course dialog functionality
    closeCourseDialogBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            hideDialog(courseDialog);
        });
    });
    
    // Enter course button
    enterCourseBtn.addEventListener('click', function() {
        alert('Entering course... This would navigate to the course page in a full implementation.');
        hideDialog(courseDialog);
    });
    
    // Add course button
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', function() {
            showAddCourseDialog();
        });
    }
    
    // Close dialog when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('dialog-overlay')) {
            hideDialog(event.target);
        }
    });
    
    // Initialize course data
    const courses = [
        {
            id: 1,
            code: "CS101",
            title: "Introduction to Computer Science",
            instructor: "Dr. Sarah Johnson",
            progress: 75,
            description: "This course provides an introduction to the fundamental concepts of computer science and programming.",
            color: "#0052cc"
        },
        {
            id: 2,
            code: "MATH201",
            title: "Calculus II",
            instructor: "Prof. Robert Chen",
            progress: 60,
            description: "Continuation of Calculus I, covering integration techniques, applications of integration, and infinite series.",
            color: "#28a745"
        },
        {
            id: 3,
            code: "ENG102",
            title: "Composition and Rhetoric",
            instructor: "Dr. Maria Garcia",
            progress: 90,
            description: "Advanced writing course focusing on argumentation, research methods, and academic writing styles.",
            color: "#dc3545"
        },
        {
            id: 4,
            code: "PHYS150",
            title: "University Physics I",
            instructor: "Dr. James Wilson",
            progress: 40,
            description: "Introductory physics course covering mechanics, thermodynamics, and waves.",
            color: "#ffc107"
        },
        {
            id: 5,
            code: "HIST101",
            title: "World History I",
            instructor: "Prof. Elizabeth Brown",
            progress: 100,
            description: "Survey of world history from ancient civilizations to the early modern period.",
            color: "#17a2b8"
        },
        {
            id: 6,
            code: "ART110",
            title: "Introduction to Studio Art",
            instructor: "Prof. Michael Taylor",
            progress: 30,
            description: "Foundation course in visual arts covering drawing, painting, and design principles.",
            color: "#6f42c1"
        }
    ];
    
    // Initialize announcements data
    const announcements = [
        {
            id: 1,
            title: "Midterm Exam Schedule Posted",
            course: "CS101",
            date: "2023-10-15",
            content: "The schedule for midterm exams has been posted. Please check the course page for your specific exam time and location."
        },
        {
            id: 2,
            title: "Assignment 3 Deadline Extended",
            course: "MATH201",
            date: "2023-10-12",
            content: "The deadline for Assignment 3 has been extended to Friday, October 20th at 11:59 PM."
        },
        {
            id: 3,
            title: "Office Hours Change",
            course: "ENG102",
            date: "2023-10-10",
            content: "My office hours for this week will be moved to Wednesday 2-4 PM instead of Tuesday."
        },
        {
            id: 4,
            title: "Lab Session Cancelled",
            course: "PHYS150",
            date: "2023-10-08",
            content: "The lab session scheduled for October 10th has been cancelled. A makeup session will be announced next week."
        }
    ];
    
    // Initialize activity data
    const activities = [
        {
            id: 1,
            type: "assignment",
            course: "CS101",
            action: "Assignment 2 graded",
            time: "2 hours ago"
        },
        {
            id: 2,
            type: "announcement",
            course: "MATH201",
            action: "New announcement posted",
            time: "1 day ago"
        },
        {
            id: 3,
            type: "grade",
            course: "ENG102",
            action: "Essay grade posted",
            time: "2 days ago"
        },
        {
            id: 4,
            type: "resource",
            course: "PHYS150",
            action: "New study guide uploaded",
            time: "3 days ago"
        },
        {
            id: 5,
            type: "discussion",
            course: "HIST101",
            action: "Replied to discussion thread",
            time: "4 days ago"
        }
    ];
    
    // Render courses on dashboard
    renderCourses(courses.slice(0, 4), coursesContainer);
    
    // Render all courses on courses page
    if (allCoursesContainer) {
        renderCourses(courses, allCoursesContainer);
    }
    
    // Render announcements
    renderAnnouncements(announcements.slice(0, 3), announcementsList);
    
    // Render all announcements
    if (fullAnnouncementsList) {
        renderAnnouncements(announcements, fullAnnouncementsList);
    }
    
    // Render activity feed
    renderActivities(activities, activityList);
    
    // Course card click handlers
    document.addEventListener('click', function(event) {
        if (event.target.closest('.course-card')) {
            const courseCard = event.target.closest('.course-card');
            const courseId = parseInt(courseCard.getAttribute('data-course-id'));
            const course = courses.find(c => c.id === courseId);
            
            if (course) {
                showCourseDialog(course);
            }
        }
    });
    
    // Tour button functionality
    const tourBtn = document.getElementById('tourBtn');
    if (tourBtn) {
        tourBtn.addEventListener('click', function() {
            hideDialog(welcomeDialog);
            alert("Welcome to the interactive tour! This feature would guide you through the LMS interface in a full implementation.");
        });
    }
}

// Function to render courses
function renderCourses(courses, container) {
    container.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.setAttribute('data-course-id', course.id);
        
        courseCard.innerHTML = `
            <div class="course-header" style="background-color: ${course.color}">
                <div class="course-code">${course.code}</div>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-instructor">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span>${course.instructor}</span>
                </div>
            </div>
            <div class="course-body">
                <div class="course-progress">
                    <div>Progress: ${course.progress}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <p>${course.description.substring(0, 100)}...</p>
                <div class="course-actions">
                    <button class="btn btn-secondary view-course-btn" data-course-id="${course.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn-primary enter-course-btn" data-course-id="${course.id}">
                        <i class="fas fa-door-open"></i> Enter
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(courseCard);
    });
}

// Function to render announcements
function renderAnnouncements(announcements, container) {
    container.innerHTML = '';
    
    announcements.forEach(announcement => {
        const announcementElement = document.createElement('div');
        announcementElement.className = 'announcement';
        
        announcementElement.innerHTML = `
            <div class="announcement-title">${announcement.title}</div>
            <div class="announcement-meta">
                <span><i class="fas fa-book"></i> ${announcement.course}</span>
                <span><i class="fas fa-calendar"></i> ${announcement.date}</span>
            </div>
            <div class="announcement-content">${announcement.content}</div>
        `;
        
        container.appendChild(announcementElement);
    });
}

// Function to render activities
function renderActivities(activities, container) {
    container.innerHTML = '';
    
    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        // Set icon based on activity type
        let iconClass = 'fas fa-bell';
        if (activity.type === 'assignment') iconClass = 'fas fa-tasks';
        if (activity.type === 'grade') iconClass = 'fas fa-chart-bar';
        if (activity.type === 'resource') iconClass = 'fas fa-file-upload';
        if (activity.type === 'discussion') iconClass = 'fas fa-comments';
        
        activityElement.innerHTML = `
            <div class="activity-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-text">
                    <strong>${activity.course}</strong>: ${activity.action}
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        
        container.appendChild(activityElement);
    });
}

// Function to show dialog
function showDialog(dialog) {
    dialog.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to hide dialog
function hideDialog(dialog) {
    dialog.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Function to show course dialog
function showCourseDialog(course) {
    const dialogTitle = document.getElementById('courseDialogTitle');
    const dialogContent = document.getElementById('courseDialogContent');
    
    dialogTitle.textContent = `${course.code}: ${course.title}`;
    
    dialogContent.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <strong>Instructor:</strong> ${course.instructor}
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Progress:</strong> ${course.progress}%
            <div class="progress-bar" style="margin-top: 0.3rem;">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Description:</strong> ${course.description}
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Upcoming Assignments:</strong>
            <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
                <li>Assignment 3 - Due Oct 25</li>
                <li>Midterm Exam - Nov 5</li>
                <li>Final Project Proposal - Nov 15</li>
            </ul>
        </div>
        <div>
            <strong>Recent Grades:</strong>
            <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
                <li>Assignment 1: 92/100</li>
                <li>Assignment 2: 87/100</li>
                <li>Quiz 1: 45/50</li>
            </ul>
        </div>
    `;
    
    showDialog(document.getElementById('courseDialog'));
}

// Function to show add course dialog
function showAddCourseDialog() {
    // Create a new dialog for adding a course
    const dialogHTML = `
        <div class="dialog-overlay active" id="addCourseDialog">
            <div class="dialog">
                <div class="dialog-header">
                    <h2 class="dialog-title">Add New Course</h2>
                    <button class="dialog-close" id="closeAddCourseDialog">&times;</button>
                </div>
                <div class="dialog-body">
                    <form id="addCourseForm">
                        <div style="margin-bottom: 1rem;">
                            <label for="courseCode" style="display: block; margin-bottom: 0.3rem; font-weight: 600;">Course Code</label>
                            <input type="text" id="courseCode" class="form-control" placeholder="e.g., CS101" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;" required>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="courseTitle" style="display: block; margin-bottom: 0.3rem; font-weight: 600;">Course Title</label>
                            <input type="text" id="courseTitle" class="form-control" placeholder="e.g., Introduction to Computer Science" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;" required>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="courseInstructor" style="display: block; margin-bottom: 0.3rem; font-weight: 600;">Instructor</label>
                            <input type="text" id="courseInstructor" class="form-control" placeholder="e.g., Dr. Sarah Johnson" style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;" required>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="courseDescription" style="display: block; margin-bottom: 0.3rem; font-weight: 600;">Description</label>
                            <textarea id="courseDescription" class="form-control" rows="4" placeholder="Enter course description..." style="width: 100%; padding: 0.5rem; border: 1px solid #ced4da; border-radius: 4px;"></textarea>
                        </div>
                    </form>
                </div>
                <div class="dialog-footer">
                    <button class="btn btn-secondary" id="cancelAddCourse">Cancel</button>
                    <button class="btn btn-primary" id="submitAddCourse">Add Course</button>
                </div>
            </div>
        </div>
    `;
    
    // Add dialog to the body
    document.body.insertAdjacentHTML('beforeend', dialogHTML);
    
    // Get references to the new dialog elements
    const addCourseDialog = document.getElementById('addCourseDialog');
    const closeAddCourseDialog = document.getElementById('closeAddCourseDialog');
    const cancelAddCourse = document.getElementById('cancelAddCourse');
    const submitAddCourse = document.getElementById('submitAddCourse');
    
    // Close dialog functions
    const closeDialog = () => {
        addCourseDialog.remove();
        document.body.style.overflow = 'auto';
    };
    
    closeAddCourseDialog.addEventListener('click', closeDialog);
    cancelAddCourse.addEventListener('click', closeDialog);
    
    // Submit form
    submitAddCourse.addEventListener('click', function() {
        const courseCode = document.getElementById('courseCode').value;
        const courseTitle = document.getElementById('courseTitle').value;
        const courseInstructor = document.getElementById('courseInstructor').value;
        const courseDescription = document.getElementById('courseDescription').value;
        
        if (courseCode && courseTitle && courseInstructor) {
            // In a real application, this would send data to a server
            alert(`Course "${courseCode}: ${courseTitle}" added successfully!`);
            closeDialog();
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    // Close when clicking outside
    addCourseDialog.addEventListener('click', function(event) {
        if (event.target === addCourseDialog) {
            closeDialog();
        }
    });
    
    document.body.style.overflow = 'hidden';
}

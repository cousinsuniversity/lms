// script.js - Blackboard Learn LMS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Blackboard LMS
    initBlackboardLMS();
});

function initBlackboardLMS() {
    // DOM Elements
    const globalNavItems = document.querySelectorAll('.bb-nav-item-global');
    const tabContents = document.querySelectorAll('.bb-tab-content');
    const courseTabs = document.querySelectorAll('.bb-tab[data-view]');
    const courseModal = document.getElementById('courseModal');
    const announcementModal = document.getElementById('announcementModal');
    const courseMenuDropdown = document.getElementById('courseMenuDropdown');
    const coursesContainer = document.getElementById('courses-container');
    const allCoursesContainer = document.getElementById('all-courses-container');
    const activityStream = document.getElementById('activity-stream');
    const gradesTable = document.getElementById('grades-table');
    
    // Sample Data - Blackboard Style
    const courses = [
        {
            id: 1,
            code: "CS-101-01",
            title: "Introduction to Computer Science",
            instructor: "Dr. Sarah Johnson",
            progress: 75,
            color: "#1372d3",
            term: "Fall 2023",
            lastAccessed: "2 hours ago",
            announcements: 2,
            assignments: 3,
            grade: "A-"
        },
        {
            id: 2,
            code: "MATH-201-03",
            title: "Calculus II",
            instructor: "Prof. Robert Chen",
            progress: 60,
            color: "#0a7b1d",
            term: "Fall 2023",
            lastAccessed: "1 day ago",
            announcements: 1,
            assignments: 1,
            grade: "B+"
        },
        {
            id: 3,
            code: "ENG-102-02",
            title: "Composition and Rhetoric",
            instructor: "Dr. Maria Garcia",
            progress: 90,
            color: "#d1232a",
            term: "Fall 2023",
            lastAccessed: "3 hours ago",
            announcements: 0,
            assignments: 2,
            grade: "A"
        },
        {
            id: 4,
            code: "PHYS-150-01",
            title: "University Physics I",
            instructor: "Dr. James Wilson",
            progress: 40,
            color: "#ff9800",
            term: "Fall 2023",
            lastAccessed: "4 days ago",
            announcements: 1,
            assignments: 0,
            grade: "C+"
        },
        {
            id: 5,
            code: "HIST-101-04",
            title: "World History I",
            instructor: "Prof. Elizabeth Brown",
            progress: 100,
            color: "#6f42c1",
            term: "Summer 2023",
            lastAccessed: "2 weeks ago",
            announcements: 0,
            assignments: 0,
            grade: "A"
        },
        {
            id: 6,
            code: "ART-110-02",
            title: "Introduction to Studio Art",
            instructor: "Prof. Michael Taylor",
            progress: 30,
            color: "#17a2b8",
            term: "Fall 2023",
            lastAccessed: "1 week ago",
            announcements: 3,
            assignments: 1,
            grade: "In Progress"
        }
    ];

    const announcements = [
        {
            id: 1,
            course: "CS-101-01",
            title: "Midterm Exam Schedule Posted",
            date: "Oct 15, 2023",
            content: "The schedule for midterm exams has been posted to the course content area. Please check your specific exam time and location. The exam will cover chapters 1-5 of the textbook.",
            urgent: true
        },
        {
            id: 2,
            course: "MATH-201-03",
            title: "Assignment 3 Deadline Extended",
            date: "Oct 12, 2023",
            content: "Due to the university network issues yesterday, the deadline for Assignment 3 has been extended to Friday, October 20th at 11:59 PM.",
            urgent: false
        },
        {
            id: 3,
            course: "PHYS-150-01",
            title: "Lab Session Cancelled",
            date: "Oct 10, 2023",
            content: "The lab session scheduled for October 10th has been cancelled. A makeup session will be scheduled for next week. Please check your email for updates.",
            urgent: true
        }
    ];

    const activities = [
        {
            id: 1,
            type: "assignment",
            course: "CS-101-01",
            title: "Assignment 2 graded",
            content: "Your submission for Assignment 2 has been graded. You scored 42/50 points.",
            time: "2 hours ago",
            icon: "fas fa-tasks"
        },
        {
            id: 2,
            type: "announcement",
            course: "MATH-201-03",
            title: "New announcement posted",
            content: "Professor Chen posted a new announcement about Assignment 3 deadline extension.",
            time: "1 day ago",
            icon: "fas fa-bullhorn"
        },
        {
            id: 3,
            type: "grade",
            course: "ENG-102-02",
            title: "Essay grade posted",
            content: "Your grade for the Rhetorical Analysis Essay has been posted. Check the Grade Center for feedback.",
            time: "2 days ago",
            icon: "fas fa-chart-bar"
        },
        {
            id: 4,
            type: "resource",
            course: "PHYS-150-01",
            title: "New study guide uploaded",
            content: "A new study guide for Chapter 4 has been uploaded to the course documents.",
            time: "3 days ago",
            icon: "fas fa-file-upload"
        }
    ];

    // Initialize the dashboard
    renderCourses(courses.slice(0, 4), coursesContainer);
    renderActivities(activities, activityStream);
    renderGradesTable(courses.slice(0, 4), gradesTable);
    
    // Render all courses on courses page
    if (allCoursesContainer) {
        renderCourses(courses, allCoursesContainer);
    }

    // Global Navigation
    globalNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            globalNavItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Get the tab to show
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab
            const tabToShow = document.getElementById(`${tabId}-tab`);
            if (tabToShow) {
                tabToShow.classList.add('active');
                tabToShow.classList.add('bb-fade-in');
                
                // If courses tab, render all courses
                if (tabId === 'courses' && allCoursesContainer) {
                    renderCourses(courses, allCoursesContainer);
                }
            }
        });
    });

    // Course Tabs (Current/Upcoming/Past)
    courseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            courseTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            filterCoursesByView(view);
        });
    });

    // Course Card Interactions
    document.addEventListener('click', function(e) {
        // Course menu click
        if (e.target.closest('.bb-course-menu')) {
            e.stopPropagation();
            const courseCard = e.target.closest('.bb-course-card');
            const courseId = parseInt(courseCard.getAttribute('data-course-id'));
            const course = courses.find(c => c.id === courseId);
            
            if (course) {
                showCourseMenu(courseCard, course);
            }
        }
        
        // Enter course button click
        if (e.target.closest('.enter-course-btn')) {
            const courseId = parseInt(e.target.closest('.enter-course-btn').getAttribute('data-course-id'));
            const course = courses.find(c => c.id === courseId);
            
            if (course) {
                enterCourse(course);
            }
        }
        
        // Course card click (excluding menu)
        if (e.target.closest('.bb-course-card') && !e.target.closest('.bb-course-menu')) {
            const courseCard = e.target.closest('.bb-course-card');
            const courseId = parseInt(courseCard.getAttribute('data-course-id'));
            const course = courses.find(c => c.id === courseId);
            
            if (course) {
                showCourseModal(course);
            }
        }
        
        // Close dropdown when clicking outside
        if (!e.target.closest('.bb-course-menu') && !e.target.closest('.bb-dropdown')) {
            courseMenuDropdown.classList.remove('active');
        }
    });

    // Course Menu Dropdown Actions
    courseMenuDropdown.querySelectorAll('.bb-dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const courseId = parseInt(courseMenuDropdown.getAttribute('data-course-id'));
            const course = courses.find(c => c.id === courseId);
            
            if (course) {
                handleCourseMenuAction(action, course);
            }
            
            courseMenuDropdown.classList.remove('active');
        });
    });

    // Modal Close Buttons
    document.getElementById('closeCourseModal')?.addEventListener('click', () => closeModal(courseModal));
    document.getElementById('cancelCourseModal')?.addEventListener('click', () => closeModal(courseModal));
    document.getElementById('closeAnnouncementModal')?.addEventListener('click', () => closeModal(announcementModal));
    document.getElementById('closeAnnouncementModalBtn')?.addEventListener('click', () => closeModal(announcementModal));
    
    // Enter Course from Modal
    document.getElementById('enterCourseModal')?.addEventListener('click', function() {
        const courseId = parseInt(courseModal.getAttribute('data-course-id'));
        const course = courses.find(c => c.id === courseId);
        
        if (course) {
            enterCourse(course);
        }
    });

    // Customize Page Button
    document.getElementById('customizeBtn')?.addEventListener('click', function() {
        showAlert('Page customization options would appear here in the full Blackboard implementation.', 'info');
    });

    // Course Catalog Button
    document.getElementById('courseCatalogBtn')?.addEventListener('click', function() {
        showAlert('Course catalog would open in a new window in the full Blackboard implementation.', 'info');
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('bb-modal-overlay')) {
            closeModal(e.target);
        }
    });

    // Keyboard shortcuts (Blackboard style)
    document.addEventListener('keydown', function(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.bb-modal-overlay.active');
            openModals.forEach(modal => closeModal(modal));
            
            // Close dropdowns
            courseMenuDropdown.classList.remove('active');
        }
        
        // Quick navigation with Alt + number (simulated)
        if (e.altKey && e.key >= '1' && e.key <= '8') {
            const index = parseInt(e.key) - 1;
            if (globalNavItems[index]) {
                globalNavItems[index].click();
            }
        }
    });

    // Show welcome notification
    setTimeout(() => {
        showAnnouncementModal(announcements[0]);
    }, 1000);
}

// Render Courses
function renderCourses(coursesList, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    coursesList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'bb-course-card bb-slide-down';
        courseCard.setAttribute('data-course-id', course.id);
        courseCard.style.animationDelay = `${course.id * 0.1}s`;
        
        courseCard.innerHTML = `
            <div class="bb-course-banner" style="background: linear-gradient(135deg, ${course.color}, ${darkenColor(course.color, 20)})">
                <div class="bb-course-code">${course.code}</div>
                <div class="bb-course-title">${course.title}</div>
                <div class="bb-course-menu">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>
            <div class="bb-course-content">
                <div class="bb-course-instructor">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <span>${course.instructor}</span>
                </div>
                <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
                    <i class="fas fa-clock"></i> Last accessed: ${course.lastAccessed}
                </div>
                <div class="bb-course-progress">
                    <div class="bb-progress-label">
                        <span>Course Progress</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="bb-progress-bar">
                        <div class="bb-progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <div class="bb-course-actions">
                    <button class="bb-btn enter-course-btn" data-course-id="${course.id}">
                        <i class="fas fa-door-open"></i> Enter
                    </button>
                    <button class="bb-btn" onclick="showCourseModal(${course.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
                <div style="display: flex; gap: 15px; margin-top: 15px; font-size: 11px; color: #999;">
                    <div>
                        <i class="fas fa-bullhorn"></i> ${course.announcements} new
                    </div>
                    <div>
                        <i class="fas fa-tasks"></i> ${course.assignments} due
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(courseCard);
    });
}

// Render Activities
function renderActivities(activitiesList, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    activitiesList.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'bb-stream-item bb-fade-in';
        
        activityItem.innerHTML = `
            <div class="bb-stream-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="bb-stream-content">
                <div class="bb-stream-meta">
                    <span style="font-weight: 600;">${activity.course}</span>
                    <span>${activity.time}</span>
                </div>
                <div class="bb-stream-text">
                    <strong>${activity.title}</strong> - ${activity.content}
                </div>
            </div>
        `;
        
        container.appendChild(activityItem);
    });
}

// Render Grades Table
function renderGradesTable(coursesList, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    coursesList.forEach(course => {
        const row = document.createElement('tr');
        row.className = 'bb-fade-in';
        
        // Determine status badge
        let statusBadge = '';
        if (course.progress === 100) {
            statusBadge = '<span style="background: #e7f7e7; color: #0a7b1d; padding: 3px 8px; border-radius: 10px; font-size: 11px;">Completed</span>';
        } else if (course.progress > 70) {
            statusBadge = '<span style="background: #e7f3ff; color: #1372d3; padding: 3px 8px; border-radius: 10px; font-size: 11px;">On Track</span>';
        } else if (course.progress > 40) {
            statusBadge = '<span style="background: #fff8e1; color: #ff9800; padding: 3px 8px; border-radius: 10px; font-size: 11px;">Needs Work</span>';
        } else {
            statusBadge = '<span style="background: #fdeaea; color: #d1232a; padding: 3px 8px; border-radius: 10px; font-size: 11px;">At Risk</span>';
        }
        
        row.innerHTML = `
            <td>
                <div style="font-weight: 600;">${course.code}</div>
                <div style="font-size: 12px; color: #666;">${course.title}</div>
            </td>
            <td>${course.lastAccessed}</td>
            <td>
                <div style="font-size: 18px; font-weight: 600; color: ${getGradeColor(course.grade)}">${course.grade}</div>
                <div style="font-size: 11px; color: #999;">${course.progress}% complete</div>
            </td>
            <td>${statusBadge}</td>
        `;
        
        container.appendChild(row);
    });
}

// Show Course Menu
function showCourseMenu(courseCard, course) {
    const dropdown = document.getElementById('courseMenuDropdown');
    const rect = courseCard.getBoundingClientRect();
    
    // Position dropdown
    dropdown.style.top = `${rect.bottom + 5}px`;
    dropdown.style.right = `${window.innerWidth - rect.right}px`;
    
    // Set course ID
    dropdown.setAttribute('data-course-id', course.id);
    
    // Show dropdown
    dropdown.classList.add('active');
}

// Handle Course Menu Actions
function handleCourseMenuAction(action, course) {
    switch(action) {
        case 'enter':
            enterCourse(course);
            break;
        case 'details':
            showCourseModal(course);
            break;
        case 'messages':
            showAlert(`Message composer would open for ${course.code}`, 'info');
            break;
        case 'calendar':
            showAlert(`${course.code} would be added to your calendar`, 'success');
            break;
    }
}

// Show Course Modal
function showCourseModal(course) {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('courseModalTitle');
    const modalContent = document.getElementById('courseModalContent');
    
    modalTitle.textContent = `${course.code}: ${course.title}`;
    modal.setAttribute('data-course-id', course.id);
    
    modalContent.innerHTML = `
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="flex: 1;">
                <div class="bb-form-group">
                    <label class="bb-form-label">Instructor</label>
                    <div>${course.instructor}</div>
                </div>
                <div class="bb-form-group">
                    <label class="bb-form-label">Term</label>
                    <div>${course.term}</div>
                </div>
                <div class="bb-form-group">
                    <label class="bb-form-label">Last Accessed</label>
                    <div>${course.lastAccessed}</div>
                </div>
            </div>
            <div style="flex: 1;">
                <div class="bb-form-group">
                    <label class="bb-form-label">Current Grade</label>
                    <div style="font-size: 24px; font-weight: 600; color: ${getGradeColor(course.grade)}">${course.grade}</div>
                </div>
                <div class="bb-form-group">
                    <label class="bb-form-label">Course Progress</label>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1;">
                            <div class="bb-progress-bar">
                                <div class="bb-progress-fill" style="width: ${course.progress}%"></div>
                            </div>
                        </div>
                        <div style="font-weight: 600;">${course.progress}%</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bb-form-group">
            <label class="bb-form-label">Course Description</label>
            <div style="padding: 15px; background: #f8f9fa; border-radius: 3px; border: 1px solid #e6e6e6;">
                This course provides an introduction to the fundamental concepts and practices. 
                Students will develop skills through hands-on projects and assignments.
            </div>
        </div>
        
        <div class="bb-form-group">
            <label class="bb-form-label">Recent Announcements</label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${course.announcements > 0 ? 
                    `<div style="padding: 10px; background: #e7f3ff; border-radius: 3px; border: 1px solid #b3d7ff;">
                        <div style="font-weight: 600;">${course.announcements} new announcement(s)</div>
                        <div style="font-size: 12px; color: #666;">Click "Enter Course" to view</div>
                    </div>` 
                    : 
                    '<div style="color: #999; font-style: italic;">No new announcements</div>'
                }
            </div>
        </div>
        
        <div class="bb-form-group">
            <label class="bb-form-label">Upcoming Assignments</label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${course.assignments > 0 ? 
                    `<div style="padding: 10px; background: #fff8e1; border-radius: 3px; border: 1px solid #ffe082;">
                        <div style="font-weight: 600;">${course.assignments} assignment(s) due soon</div>
                        <div style="font-size: 12px; color: #666;">Check the assignments tab in the course</div>
                    </div>` 
                    : 
                    '<div style="color: #999; font-style: italic;">No upcoming assignments</div>'
                }
            </div>
        </div>
    `;
    
    openModal(modal);
}

// Show Announcement Modal
function showAnnouncementModal(announcement) {
    const modal = document.getElementById('announcementModal');
    const modalTitle = document.getElementById('announcementModalTitle');
    const modalContent = document.getElementById('announcementModalContent');
    
    modalTitle.textContent = `Announcement: ${announcement.course}`;
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 16px; font-weight: 600;">${announcement.title}</div>
                <div style="font-size: 12px; color: #666;">${announcement.date}</div>
            </div>
            ${announcement.urgent ? 
                '<div style="background: #fdeaea; color: #d1232a; padding: 8px 12px; border-radius: 3px; margin-bottom: 15px; font-size: 12px; border: 1px solid #f5c6cb;">❗ <strong>URGENT</strong> - Please read immediately</div>' 
                : ''
            }
            <div style="line-height: 1.6;">
                ${announcement.content}
            </div>
        </div>
        <div style="padding: 15px; background: #f8f9fa; border-radius: 3px; border: 1px solid #e6e6e6; font-size: 12px;">
            <i class="fas fa-info-circle"></i> This announcement is from your course. You can find all announcements in the course's announcements section.
        </div>
    `;
    
    openModal(modal);
}

// Enter Course Function
function enterCourse(course) {
    // Simulate loading
    showAlert(`Entering ${course.code}: ${course.title}...`, 'info');
    
    // In a real implementation, this would redirect to the course page
    setTimeout(() => {
        // Simulate course page
        const modal = document.getElementById('courseModal');
        const modalTitle = document.getElementById('courseModalTitle');
        const modalContent = document.getElementById('courseModalContent');
        
        modalTitle.textContent = `${course.code} Course Page`;
        
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 48px; color: #1372d3; margin-bottom: 20px;">
                    <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <h3 style="margin-bottom: 10px;">Welcome to ${course.code}</h3>
                <p style="color: #666; margin-bottom: 30px;">This would be the actual course interface in Blackboard Learn</p>
                <div style="display: inline-flex; gap: 10px;">
                    <button class="bb-btn" onclick="closeModal(document.getElementById('courseModal'))">
                        <i class="fas fa-times"></i> Close
                    </button>
                    <button class="bb-btn bb-btn-primary">
                        <i class="fas fa-external-link-alt"></i> Open Full Course
                    </button>
                </div>
            </div>
        `;
        
        openModal(modal);
    }, 500);
}

// Filter Courses by View
function filterCoursesByView(view) {
    const container = document.getElementById('all-courses-container');
    if (!container) return;
    
    // This is a simplified filter - in a real app, you'd have more data
    let filteredCourses = [];
    
    switch(view) {
        case 'current':
            filteredCourses = courses.filter(c => c.term === 'Fall 2023');
            break;
        case 'upcoming':
            filteredCourses = []; // No upcoming courses in sample data
            break;
        case 'past':
            filteredCourses = courses.filter(c => c.term === 'Summer 2023');
            break;
    }
    
    if (filteredCourses.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #999; font-style: italic;">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                <div>No ${view} courses found.</div>
            </div>
        `;
    } else {
        renderCourses(filteredCourses, container);
    }
}

// Modal Functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Utility Functions
function darkenColor(color, percent) {
    // Simplified color darkening for gradients
    return color; // In a real implementation, you'd calculate a darker shade
}

function getGradeColor(grade) {
    if (grade.includes('A')) return '#0a7b1d';
    if (grade.includes('B')) return '#1372d3';
    if (grade.includes('C')) return '#ff9800';
    if (grade.includes('D') || grade.includes('F')) return '#d1232a';
    return '#666';
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `bb-alert bb-alert-${type} bb-fade-in`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
        <div>${message}</div>
    `;
    
    // Add to top of main content
    const mainContent = document.querySelector('.bb-main-content');
    if (mainContent) {
        mainContent.insertBefore(alert, mainContent.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Global function to show course modal by ID
window.showCourseModal = function(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        showCourseModal(course);
    }
};

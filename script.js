// script.js - JavaScript for IPK Calculator
// Uses LocalStorage to store courses data
// Key: 'courses' (JSON array of {name, sks, grade})

// Grade to point mapping
const gradePoints = {
    'A': 4,
    'B': 3,
    'C': 2,
    'D': 1,
    'E': 0
};

// Utility: Save courses to LocalStorage
function saveCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Utility: Load courses from LocalStorage
function loadCourses() {
    const data = localStorage.getItem('courses');
    return data ? JSON.parse(data) : [];
}

// Utility: Calculate IPK
function calculateIPK(courses) {
    if (courses.length === 0) return 0.00;
    let totalPoints = 0;
    let totalSKS = 0;
    courses.forEach(course => {
        const points = gradePoints[course.grade];
        totalPoints += points * course.sks;
        totalSKS += course.sks;
    });
    return (totalPoints / totalSKS).toFixed(2);
}

// Utility: Render table
function renderTable() {
    const courses = loadCourses();
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    courses.forEach(course => {
        const row = document.createElement('tr');
        const points = gradePoints[course.grade];
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.sks}</td>
            <td>${course.grade}</td>
            <td>${points * course.sks}</td>
        `;
        tableBody.appendChild(row);
    });
    // Update IPK display
    document.getElementById('ipkValue').textContent = calculateIPK(courses);
}

// Event: Add course
document.getElementById('courseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('courseName').value.trim();
    const sks = parseInt(document.getElementById('sks').value);
    const grade = document.getElementById('grade').value;
    
    if (!name || !sks || !grade) return; // Basic validation
    
    const courses = loadCourses();
    courses.push({ name, sks, grade });
    saveCourses(courses);
    renderTable();
    this.reset(); // Clear form
});

// Event: Reset data
document.getElementById('resetBtn').addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data?')) {
        localStorage.removeItem('courses');
        renderTable();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderTable);

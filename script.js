// GP Calculator: Add new course row dynamically
function addCalculatorRow() {
    const container = document.getElementById('course-rows');
    const newRow = document.createElement('div');
    newRow.className = 'calculator-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Course Name (Optional)" class="calc-input">
        <input type="number" placeholder="Units (e.g. 3)" class="calc-unit" min="1" max="6">
        <select class="calc-grade">
            <option value="5">A (5 Points)</option>
            <option value="4">B (4 Points)</option>
            <option value="3">C (3 Points)</option>
            <option value="2">D (2 Points)</option>
            <option value="1">E (1 Point)</option>
            <option value="0">F (0 Points)</option>
        </select>
    `;
    container.appendChild(newRow);
}

// Calculate Current Semester GP
let currentSemesterTotalPoints = 0;
let currentSemesterTotalUnits = 0;

function calculateGP() {
    const units = document.querySelectorAll('.calc-unit');
    const grades = document.querySelectorAll('.calc-grade');

    let totalPoints = 0;
    let totalUnits = 0;

    for (let i = 0; i < units.length; i++) {
        const unitVal = parseFloat(units[i].value);
        const gradeVal = parseFloat(grades[i].value);

        if (!isNaN(unitVal) && unitVal > 0) {
            totalUnits += unitVal;
            totalPoints += unitVal * gradeVal;
        }
    }

    if (totalUnits === 0) {
        alert("Please enter valid units for your courses.");
        return;
    }

    currentSemesterTotalUnits = totalUnits;
    currentSemesterTotalPoints = totalPoints;

    const gp = (totalPoints / totalUnits).toFixed(2);
    document.getElementById('gp-value').innerText = gp;
    document.getElementById('gp-result').style.display = 'block';
}

// Calculate Overall CGPA
function calculateCGPA() {
    const prevUnits = parseFloat(document.getElementById('prev-units').value) || 0;
    const prevCGPA = parseFloat(document.getElementById('prev-cgpa').value) || 0;

    if (currentSemesterTotalUnits === 0) {
        alert("Please calculate your current semester GP first!");
        return;
    }

    const prevTotalPoints = prevUnits * prevCGPA;
    const overallTotalUnits = prevUnits + currentSemesterTotalUnits;
    const overallTotalPoints = prevTotalPoints + currentSemesterTotalPoints;

    const cgpa = (overallTotalPoints / overallTotalUnits).toFixed(2);
    document.getElementById('cgpa-value').innerText = cgpa;
    document.getElementById('cgpa-result').style.display = 'block';
}

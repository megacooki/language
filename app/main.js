
// URL of your JSON file (replace 'your-json-url-here' with the actual URL)
const jsonUrl = '../lessons/spanish/course.json';

// Get the content div where everything will be appended
const contentDiv = document.getElementById('lessons');

// Fetch the JSON from the URL
fetch(jsonUrl)
  .then(response => response.json())  // Parse the JSON from the response
  .then(data => {
    // Loop through each unit in the JSON
    for (let unitKey in data) {
        const unit = data[unitKey];
        
        // Create an h2 for each unit
        const unitHeading = document.createElement('h2');
        unitHeading.textContent = `Unit ${unitKey}`;
        contentDiv.appendChild(unitHeading);
        
        // Create a ul element to hold the lessons
        const lessonList = document.createElement('ul');
        
        // Loop through each lesson within the unit
        for (let lessonKey in unit) {
            const lesson = unit[lessonKey];
            
            // Create an li for each lesson
            const lessonItem = document.createElement('li');
            lessonItem.textContent = lesson;
            
            // Set the id for the li element as unit_lesson
            lessonItem.id = `${unitKey}_${lessonKey}`;
            
            // Append the li to the ul
            lessonList.appendChild(lessonItem);
        }
        
        // Append the list to the content div
        contentDiv.appendChild(lessonList);
    }
    
    // Now that the lessons are appended to the DOM, set the active class
    if (localStorage.getItem("unit")) {
        var saved = localStorage.getItem("unit") + "_" + localStorage.getItem("lesson");
        const savedElement = document.getElementById(saved);
        
        // Check if the element exists before assigning the active class
        if (savedElement) {
            savedElement.className = "active";
        } else {
            console.error("No element found with ID: " + saved);
        }
    } else {
        localStorage.setItem("unit", "1");
        localStorage.setItem("lesson", "1");
        window.location.reload();
    }

    // Set the next lesson's content
    const activeElement = document.getElementsByClassName("active")[0];
    if (activeElement) {
        document.getElementById("next-lesson").innerHTML = activeElement.innerHTML;
    } else {
        console.error("No active lesson found.");
    }
  })
  .catch(error => {
    console.error('Error fetching the JSON:', error);
    contentDiv.textContent = 'Failed to load lessons. Please try again later.';
  });
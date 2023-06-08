let items = document.querySelectorAll('.item');
let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let resetButton = document.getElementById('resetButton');
let success = document.getElementById('success-msg')

// Add event listeners to each item
items.forEach(function(item) {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Drag Start
function dragStart(e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.innerHTML);
  e.target.classList.add('dragging');
}

// Drag End
function dragEnd(e) {
  e.target.classList.remove('dragging');
}

// Container2 Drag Events
container2.addEventListener('dragover', dragOver);
container2.addEventListener('dragenter', dragEnter);
container2.addEventListener('dragleave', dragLeave);
container2.addEventListener('drop', drop);

// Drag Over
function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  container2.classList.add('dragging-over');
}

// Drag Enter
function dragEnter(e) {
  e.preventDefault();
  container2.classList.add('dragging-over');
}

// Drag Leave
function dragLeave(e) {
  container2.classList.remove('dragging-over');
}

// Drop
function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData('text/plain');
    let newItem = document.createElement('div');
    newItem.classList.add('success');
    newItem.innerText = data;
    container2.appendChild(newItem);
    container2.classList.remove('dragging-over');
  
    // Remove the item from the first container
    let item = document.querySelector('.dragging');
    item.parentNode.removeChild(item);
  
    // Print success message
    let successMessage = document.createElement('div');
    successMessage.innerText = 'Item dropped successfully!';
    success.appendChild(successMessage);
  
    // Remove the success message after 2 seconds
    setTimeout(function() {
      success.removeChild(successMessage);
    }, 2000);
  }
  

// Reset Button Click
resetButton.addEventListener('click', resetContainers);

// Reset Containers
function resetContainers() {
  // Clear second container
  container2.innerHTML = '';

  // Reset first container
  container1.innerHTML = '';
  items.forEach(function(item) {
    container1.appendChild(item);
  });
}
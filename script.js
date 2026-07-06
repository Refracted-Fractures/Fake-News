// Manu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

  function updatePreview() {
    const channelName = document.getElementById('channelName').value;
    const headline = document.getElementById('headline').value;
    const description = document.getElementById('description').value;
    const dateInput = document.getElementById('dateInput').value;

    document.getElementById('previewChannelName').innerText = channelName || "CNN";
    document.getElementById('previewHeadline').innerText = headline || "Flying Shoes Hit the Market";
    document.getElementById('previewDescription').innerText = description || "Flying shoes allow people to avoid traffic by gliding smoothly above...";
    
    const dateTime = dateInput ? new Date(dateInput) : new Date();
    document.getElementById('time').innerText = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    document.getElementById('date').innerText = dateTime.toLocaleDateString(); // Format date
  }

  function previewImage(event) {
    const file = event.target.files[0];
    const imgElement = document.getElementById('previewImage');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imgElement.src = e.target.result;
        imgElement.style.display = 'block'; // Show the image
      }
      reader.readAsDataURL(file);
    }
  }

  // Reset
  function resetFields() {
    document.getElementById('channelName').value = '';
    document.getElementById('headline').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('previewImage').style.display = 'none'; // Hide the image
    updatePreview(); // Reset preview to default values
}



  function downloadImage() {
    const previewElement = document.getElementById('preview');
    html2canvas(previewElement, {
      useCORS: true, // Enable Cross-Origin Resource Sharing (CORS) to fetch images
      allowTaint: true, // Allow cross-origin images to be drawn onto the canvas
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = 'breaking-news.png';
      link.click();
    });
  }


  // Automatically update the date and time display on page load
  document.addEventListener('DOMContentLoaded', () => {
    updatePreview(); // Initialize preview with current date and time
  });

 // Make the image draggable
dragElement(document.getElementById("previewImage"));

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // Attach mouse and touch event listeners
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        updateElementPosition();
    }

    function elementTouchDrag(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        updateElementPosition();
    }

    function updateElementPosition() {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

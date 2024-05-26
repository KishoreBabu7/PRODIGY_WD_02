document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const lapButton = document.getElementById('lap');
    const resetButton = document.getElementById('reset');
    const timeDisplay = document.getElementById('time');
    const lapsTableBody = document.querySelector('.laps tbody');
  
    let timerInterval;
    let isRunning = false;
    let ms = 0, sec = 0, min = 0, hr = 0;
    let lapNumber = 1;
  
    function updateDisplay() {
      timeDisplay.textContent = `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
    }
  
    function startTimer() {
      if (!isRunning) {
        timerInterval = setInterval(() => {
          ms++;
          if (ms === 100) {
            ms = 0;
            sec++;
          }
          if (sec === 60) {
            sec = 0;
            min++;
          }
          if (min === 60) {
            min = 0;
            hr++;
          }
          updateDisplay();
        }, 10);
        isRunning = true;
      }
    }
  
    function stopTimer() {
      clearInterval(timerInterval);
      isRunning = false;
    }
  
    function resetTimer() {
      stopTimer();
      ms = sec = min = hr = 0;
      lapNumber = 1;
      updateDisplay();
      lapsTableBody.innerHTML = ''; 
      const noLapsRow = document.createElement('tr');
      const noLapsCell = document.createElement('td');
      noLapsCell.colSpan = 3;
      noLapsCell.textContent = 'No laps recorded yet';
      noLapsRow.appendChild(noLapsCell);
      lapsTableBody.appendChild(noLapsRow);
    }
  
    function recordLap() {
      if (isRunning) {
        if (lapsTableBody.children.length === 1 && lapsTableBody.children[0].querySelector('td').textContent === 'No laps recorded yet') {
          lapsTableBody.innerHTML = '';
        }
        const lapRow = document.createElement('tr');
        const lapCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
  
        lapCell.textContent = lapNumber++;
        timeCell.textContent = timeDisplay.textContent;
  
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          lapRow.remove();
          if (lapsTableBody.children.length === 0) {
            const noLapsRow = document.createElement('tr');
            const noLapsCell = document.createElement('td');
            noLapsCell.colSpan = 3;
            noLapsCell.textContent = 'No laps recorded yet';
            noLapsRow.appendChild(noLapsCell);
            lapsTableBody.appendChild(noLapsRow);
          }
        });
  
        actionCell.appendChild(deleteButton);
        lapRow.appendChild(lapCell);
        lapRow.appendChild(timeCell);
        lapRow.appendChild(actionCell);
  
        lapsTableBody.appendChild(lapRow);
        lapRow.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', recordLap);
  });
  
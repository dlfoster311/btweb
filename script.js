function toggleTheme() {
    const themeIcon = document.getElementById('theme-icon');
    document.body.classList.toggle('light-mode');
    themeIcon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
}

function toggleFieldsBasedOnNeeds() {
    var needDoneValue = document.getElementById('need_done').value;
    var repairGroup = document.getElementById('repair_description_group');
    var setupPersonGroup = document.getElementById('setup_person_group');
    var backupToggleGroup = document.getElementById('backup_toggle_group');

    repairGroup.style.display = needDoneValue === 'repair' ? 'block' : 'none';
    setupPersonGroup.style.display = ["setup", "reconfigure", "repair", "wipereload"].includes(needDoneValue) ? 'block' : 'none';
    backupToggleGroup.style.display = needDoneValue !== 'setup' ? 'block' : 'none';
}

function setCurrentDateTime() {
    var now = new Date();
    var dateTimeLocalInput = document.getElementById('date_time');
    dateTimeLocalInput.value = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
}

window.onload = function() {
    setCurrentDateTime();
    toggleFieldsBasedOnNeeds();
};

function toggleSelection(clickedButton) {
    const buttons = document.querySelectorAll('.toggle-button');
    const nothingButton = document.querySelector('.toggle-button[value="nothing"]');
    const newInBoxButtons = document.querySelectorAll('.toggle-button[value="new"], .toggle-button[value="new_open"]');

    if (clickedButton.value === 'nothing') {
        clickedButton.classList.toggle('selected');
        buttons.forEach(button => {
            button.disabled = clickedButton.classList.contains('selected');
            if (button.disabled) button.classList.remove('selected');
        });
    } else {
        nothingButton.classList.remove('selected');
        nothingButton.disabled = false;
        clickedButton.classList.toggle('selected');
        newInBoxButtons.forEach(button => {
            if (button !== clickedButton && button.value === clickedButton.value) {
                button.classList.remove('selected');
            }
        });
    }
}

function toggleBackupMessage() {
    var checkbox = document.getElementById('backup-toggle');
    var message = document.getElementById('backupMessage');
    message.textContent = checkbox.checked ? "Backup enabled. This adds an average of a day to turnaround time." : "Backup disabled. Data may be erased.";
}

document.getElementById('need_done').addEventListener('change', toggleFieldsBasedOnNeeds);

function toggleTheme() {
    const themeIcon = document.getElementById('theme-icon');
    document.body.classList.toggle('light-mode');
    themeIcon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
}

function toggleFieldsBasedOnNeeds() {
    const needDoneValue = document.getElementById('need_done').value;
    const repairGroup = document.getElementById('repair_description_group');
    const setupPersonGroup = document.getElementById('setup_person_group');
    const backupToggleGroup = document.getElementById('backup_toggle_group');

    repairGroup.style.display = needDoneValue === 'repair' ? 'block' : 'none';
    setupPersonGroup.style.display = ["setup", "reconfigure", "repair", "wipereload"].includes(needDoneValue) ? 'block' : 'none';
    backupToggleGroup.style.display = needDoneValue !== 'setup' ? 'block' : 'none';
}

function setCurrentDateTime() {
    const now = new Date();
    const dateTimeLocalInput = document.getElementById('date_time');
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
            if (button !== clickedButton) {
                button.disabled = clickedButton.classList.contains('selected');
                button.classList.remove('selected');
            }
        });
    } else {
        nothingButton.classList.remove('selected');
        nothingButton.disabled = false;

        if (clickedButton.value === 'new' || clickedButton.value === 'new_open') {
            newInBoxButtons.forEach(button => {
                if (button !== clickedButton) {
                    button.classList.remove('selected');
                }
            });
            clickedButton.classList.add('selected');
        } else {
            clickedButton.classList.toggle('selected');
        }

        const anySelected = [...buttons].some(button => button.classList.contains('selected'));
        if (!anySelected) {
            buttons.forEach(button => button.disabled = false);
        }
    }
}

function toggleBackupMessage() {
    const checkbox = document.getElementById('backup-toggle');
    const message = document.getElementById('backupMessage');
    message.textContent = checkbox.checked ? "Backup enabled. This adds an average of a day to turnaround time." : "Backup disabled. Data may be erased.";
}

document.getElementById('need_done').addEventListener('change', toggleFieldsBasedOnNeeds);

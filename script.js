    function toggleTheme() {
        const themeIcon = document.getElementById('theme-icon');
        document.body.classList.toggle('light-mode');
        themeIcon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
    }

    function toggleSpecificUser(isSpecific) {
        var userInput = document.getElementById('setup_person_input');
        userInput.disabled = !isSpecific;
        if (!isSpecific) {
            userInput.value = '';
        }
    }

    function toggleIssueDescription() {
        var needDoneValue = document.getElementById('need_done').value;
        var repairGroup = document.getElementById('repair_description_group');
        repairGroup.style.display = needDoneValue === 'repair' ? 'block' : 'none';
    }

    function toggleFieldsBasedOnNeeds() {
        var needDoneValue = document.getElementById('need_done').value;
        var repairGroup = document.getElementById('repair_description_group');
        var setupPersonGroup = document.getElementById('setup_person_group');
        var backupToggleGroup = document.getElementById('backup_toggle_group');

        repairGroup.style.display = needDoneValue === 'repair' ? 'block' : 'none';
        setupPersonGroup.style.display = ["setup", "reconfigure", "repair", "wipereload"].includes(needDoneValue) ? 'block' : 'none';
        backupToggleGroup.style.display = needDoneValue === 'setup' ? 'none' : 'block';
    }

    function toggleBackupMessage() {
        var checkbox = document.getElementById('backup-toggle');
        var message = document.getElementById('backupMessage');
        message.textContent = checkbox.checked ? "Backup enabled. This adds an average of a day to turnaround time." : "Backup disabled. Data may be erased.";
    }

    function setCurrentDateTime() {
        var now = new Date();
        var dateTimeLocalInput = document.getElementById('date_time');
        dateTimeLocalInput.value = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    }

    function toggleSelection(clickedButton) {
        const buttons = document.querySelectorAll('.toggle-button');
        const nothingButton = document.querySelector('.toggle-button[value="nothing"]');
        const newInBoxButtons = document.querySelectorAll('.toggle-button[value="new"], .toggle-button[value="new_open"]');

        if (clickedButton.value === 'nothing') {
            clickedButton.classList.toggle('selected');
            buttons.forEach(button => button.disabled = clickedButton.classList.contains('selected') && button.value !== 'nothing');
        } else if (clickedButton.value === 'new' || clickedButton.value === 'new_open') {
            newInBoxButtons.forEach(button => {
                if (button !== clickedButton) button.classList.remove('selected');
            });
            clickedButton.classList.add('selected');
            nothingButton.classList.remove('selected');
            buttons.forEach(button => button.disabled = false);
        } else {
            nothingButton.classList.remove('selected');
            buttons.forEach(button => button.disabled = false);
            clickedButton.classList.toggle('selected');
        }
    }

    window.onload = function() {
        setCurrentDateTime();
        toggleFieldsBasedOnNeeds();
    };

    document.getElementById('need_done').addEventListener('change', toggleFieldsBasedOnNeeds);

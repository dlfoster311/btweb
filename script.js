    function toggleTheme() {
            const body = document.body;
            body.classList.toggle('light-mode');
            const themeIcon = document.getElementById('theme-icon');
            themeIcon.textContent = body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
        }
        
        function toggleTheme() {
            const themeIcon = document.getElementById('theme-icon');
            document.body.classList.toggle('light-mode');
            themeIcon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
        }

        function toggleFieldsBasedOnNeeds() {
            var needDoneValue = document.getElementById('need_done').value;
            var repairGroup = document.getElementById('repair_description_group');
            var setupPersonGroup = document.getElementById('setup_person_group');

            // Manage repair description visibility
            if (needDoneValue === 'repair') {
                repairGroup.style.display = 'block';
            } else {
                repairGroup.style.display = 'none';
            }

            // Manage setup person visibility
            if (needDoneValue === 'decommission' || needDoneValue === 'recycle') {
                setupPersonGroup.style.display = 'none';
            } else {
                setupPersonGroup.style.display = 'block';
            }
        }


        // Function to toggle the display of the 'repair description' input based on the selected service
        function toggleIssueDescription() {
            var needDoneValue = document.getElementById('need_done').value;
            var repairGroup = document.getElementById('repair_description_group');
            repairGroup.style.display = needDoneValue === 'repair' ? 'block' : 'none';
        }

        // Function to set the current date and time in the datetime-local input field
        function setCurrentDateTime() {
            var now = new Date();
            var dateTimeLocalInput = document.getElementById('date_time');
            dateTimeLocalInput.value = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        }

        // Call the function to set the current date and time on page load
        window.onload = function() {
            setCurrentDateTime();
            toggleFieldsBasedOnNeeds(); // Set initial visibility based on the default selected option
        };

        function toggleSelection(element) {
            element.classList.toggle('selected');
            // Add or remove the value from a hidden input for form submission
        }

        function toggleSelection(clickedButton) {
            const buttons = document.querySelectorAll('.toggle-button');
            const nothingButton = document.querySelector('.toggle-button[value="nothing"]');
            const newInBoxButtons = document.querySelectorAll('.toggle-button[value="new"], .toggle-button[value="new_open"]');

            if (clickedButton.value === 'nothing') {
                clickedButton.classList.toggle('selected');

                if (clickedButton.classList.contains('selected')) {
                    buttons.forEach(button => {
                        if (button.value !== 'nothing') {
                            button.classList.remove('selected');
                            button.disabled = true;
                        }
                    });
                } else {
                    buttons.forEach(button => {
                        button.disabled = false;
                    });
                }
            } else if (clickedButton.value === 'new' || clickedButton.value === 'new_open') {
                // Deselect the other New in box button if one is selected
                newInBoxButtons.forEach(button => {
                    if (button !== clickedButton) {
                        button.classList.remove('selected');
                    }
                });
                clickedButton.classList.add('selected');
                nothingButton.classList.remove('selected');
                buttons.forEach(button => {
                    if (button !== clickedButton) {
                        button.disabled = false;
                    }
                });
            } else {
                nothingButton.classList.remove('selected');
                buttons.forEach(button => {
                    button.disabled = false;
                });
                clickedButton.classList.toggle('selected');
            }
        }

        function toggleFieldsBasedOnNeeds() {
            var needDoneValue = document.getElementById('need_done').value;
            var setupPersonGroup = document.getElementById('setup_person_group');

            // Manage setup person visibility based on selected options
            if (["setup", "reconfigure", "repair", "wipereload"].includes(needDoneValue)) {
                setupPersonGroup.style.display = 'block';
            } else {
                setupPersonGroup.style.display = 'none';
            }
        }

        function toggleFieldsBasedOnNeeds() {
            var needDoneValue = document.getElementById('need_done').value;
            var setupPersonGroup = document.getElementById('setup_person_group');
            var backupToggleGroup = document.getElementById('backup_toggle_group');

            // Manage setup person visibility
            if (["setup", "reconfigure", "repair", "wipereload"].includes(needDoneValue)) {
                setupPersonGroup.style.display = 'block';
            } else {
                setupPersonGroup.style.display = 'none';
            }

            // Manage backup toggle visibility
            if (needDoneValue === 'setup') {
                backupToggleGroup.style.display = 'none';
            } else {
                backupToggleGroup.style.display = 'block';
            }
        }

        function toggleBackupMessage() {
            var checkbox = document.getElementById('backup-toggle');
            var message = document.getElementById('backupMessage');
            if (checkbox.checked) {
                message.textContent = "Backup enabled. This adds an average of a day to turnaround time.";
            } else {
                message.textContent = "Backup disabled. Data may be erased.";
            }
        }

        document.getElementById('need_done').addEventListener('change', toggleFieldsBasedOnNeeds);

        document.getElementById('need_done').addEventListener('change', toggleFieldsBasedOnNeeds);
       }

        // Listen for changes in the system's color scheme
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "light" : "dark";
            document.body.classList.toggle('light-mode', newColorScheme === "light");
        });
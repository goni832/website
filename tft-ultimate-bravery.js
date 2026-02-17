document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('tft-ultimate-bravery');
    if (!btn) return;

    // when an option is selected, add it to the list on the right
    const selector = document.getElementById('tft-selector');

    // populate the drop‑down using the "Name" column from the CSV
    async function populateSelector() {
        if (!selector) return;
        try {
            const res = await fetch('tft16.csv');
            if (!res.ok) throw new Error('Failed to fetch CSV for selector');
            const text = await res.text();
            const rows = text.trim().split('\n');
            // first line is header
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i].trim();
                if (!row) continue;
                const cols = row.split(',');
                const name = cols[1] || '';
                if (!name) continue;
                // skip placeholder option already present
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                selector.appendChild(opt);
            }
            addSelectedItem("Nasus")
            addSelectedItem("Renekton")
            addSelectedItem("Xerath")
        } catch (err) {
            console.error('could not populate selector', err);
        }
    }

    if (selector) {
        populateSelector();
    }

    function addSelectedItem(value) {
        if (!value) return;
        const list = document.getElementById('selected-list');
        if (!list) return;
        // avoid duplicates
        if (list.querySelector(`[data-value="${value}"]`)) return;
        const item = document.createElement('div');
        item.setAttribute('data-value', value);
        item.style.display = 'flex';
        item.style.justifyContent = 'left';
        item.style.alignItems = 'center';
        item.style.marginBottom = '0.25rem';
        const btnRem = document.createElement('button');
        btnRem.type = 'button';
        btnRem.textContent = '×';
        btnRem.className = 'btn';
        btnRem.style.marginRight = '0.5rem';
        btnRem.style.padding = '0rem 0.25rem'
        btnRem.addEventListener('click', () => item.remove());

        const textSpan = document.createElement('span');
        textSpan.textContent = value;

        item.appendChild(btnRem);
        item.appendChild(textSpan);
        list.appendChild(item);
    }
    if (selector) {
        selector.addEventListener('change', function () {
            addSelectedItem(this.value);
            this.value = '';
        });
    }

    btn.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            const front = ["Attack Assassin","Attack Fighter","Attack Tank","Hybrid Fighter","Magic Assassin","Magic Fighter","Magic Tank"]
            const back = ["Attack Caster","Attack Marksman","Attack Specialist","Magic Caster","Magic Marksman","Magic Specialist"]
            
            function getAllowedCosts() {
                return Array.from(document.querySelectorAll('#cost-checkboxes input[type=checkbox]:checked'))
                            .map(i => i.value);
            }
            const allowed_costs = getAllowedCosts();
            // build blacklist from the values currently shown in the selected-list div
            function getBlacklisted() {
                return Array.from(document.querySelectorAll('#selected-list [data-value]'))
                            .map(el => el.getAttribute('data-value'));
            }
            const blacklisted_units = getBlacklisted();

            const res = await fetch('tft16.csv');
            if (!res.ok) throw new Error('Failed to fetch CSV');
            const text = await res.text();
            const rows = text.trim().split('\n');
            if (rows.length <= 1) throw new Error('CSV empty');
            let data_raw = rows.slice(1).filter(Boolean);

            var data = [];
            for (let i = 0; i < data_raw.length; i++) {
                var row = data_raw[i].split(',');
                var cost_cl1 = row[2] || '';
                var name_cl1 = row[1] || '';
                if (allowed_costs.includes(cost_cl1)) {
                    if (!blacklisted_units.includes(name_cl1)) {
                        data.push(data_raw[i]);
                    }
                }
            }

            const unit1 = data[Math.floor(Math.random() * data.length)];
            const cols = unit1.split(',');
            const name = cols[1] || 'Unknown';
            const cost = cols[2] || '';
            const role = cols[3] || '';
            const traits = cols.slice(4).filter(s => s.trim() !== "");
            
            // filter rows that share no traits with constantTraits
            var data2 = [];
            let pos2
            if (!front.includes(role)) {
                pos2 = front;
            }else{
                pos2 = back;
            }

            for (let i = 0; i < data.length; i++) {
                var row2 = data[i].split(',');
                var traits_cl2 = row2.slice(4).filter(s => s.trim() !== "");
                var role_cl2 = row2[3] || '';
                if (traits_cl2.every(t => !traits.includes(t))) {
                    if (pos2.includes(role_cl2)) {
                        data2.push(data[i]);
                    }
                }
            }

            const unit2 = data2[Math.floor(Math.random() * data2.length)];
            const cols2 = unit2.split(',');
            const name2 = cols2[1] || 'Unknown';
            const cost2 = cols2[2] || '';
            const role2 = cols2[3] || '';
            const traits2 = cols2.slice(4).filter(s => s.trim() !== "");

            // display results
            const resultsDiv = document.getElementById('tft-results');
            if (resultsDiv) {
                // use the unit ID (column 0) for image filenames, lowercase for safety
                const id = cols[0] || '';
                const id2 = cols2[0] || '';

                resultsDiv.innerHTML = `
                    <div style="display:flex; justify-content:space-between;">
                        <div style="flex:1; text-align:center; margin-right:2rem;">
                            <p><strong>${name}</strong></p>
                            ${id ? `<img src="set16_thumbs/${id}.jpg" alt="${name}" />` : ''}
                        </div>
                        <div style="flex:1; text-align:center;">
                            <p><strong>${name2}</strong></p>
                            ${id2 ? `<img src="set16_thumbs/${id2}.jpg" alt="${name2}" />` : ''}
                        </div>
                    </div>
                `;
            }

        } catch (err) {
            console.error(err);
            alert('TFT Ultimate Bravery: could not load data. See console for details.');
        }
    });
});

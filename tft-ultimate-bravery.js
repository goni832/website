document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('tft-ultimate-bravery');
    if (!btn) return;

    btn.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            const front = ["Attack Assassin","Attack Fighter","Attack Tank","Hybrid Fighter","Magic Assassin","Magic Fighter","Magic Tank"]
            const back = ["Attack Caster","Attack Marksman","Attack Specialist","Magic Caster","Magic Marksman","Magic Specialist"]
            const allowed_costs = ["1","2","3","4"]
            const blacklisted_units = ["Nasus","Renekton"]

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
            alert(`${data_raw}`);

            const random = data[Math.floor(Math.random() * data.length)];
            const cols = random.split(',');
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

            const random2 = data2[Math.floor(Math.random() * data2.length)];
            const cols2 = random2.split(',');
            const name2 = cols2[1] || 'Unknown';
            const cost2 = cols2[2] || '';
            const role2 = cols2[3] || '';
            const traits2 = cols2.slice(4).filter(s => s.trim() !== "");

            // display results
            const resultsDiv = document.getElementById('tft-results');
            if (resultsDiv) {
                resultsDiv.innerHTML = `<p>Name: <strong>${name}</strong></p><p>Name 2: <strong>${name2}</strong></p>`;
            }

        } catch (err) {
            console.error(err);
            alert('TFT Ultimate Bravery: could not load data. See console for details.');
        }
    });
});

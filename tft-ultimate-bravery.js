document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('tft-ultimate-bravery');
    if (!btn) return;

    btn.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            const res = await fetch('tft16.csv');
            if (!res.ok) throw new Error('Failed to fetch CSV');
            const text = await res.text();
            const rows = text.trim().split('\n');
            if (rows.length <= 1) throw new Error('CSV empty');
            const data = rows.slice(1).filter(Boolean);
            const random = data[Math.floor(Math.random() * data.length)];
            const cols = random.split(',');
            const name = cols[0] || 'Unknown';
            const cost = cols[1] || '';
            const role = cols[2] || '';
            const traits = cols.slice(3);
            alert(`TFT Ultimate Bravery:\n\n${name} (Cost: ${cost})\nRole: ${role}\nTraits: ${traits}`);
            
            // filter rows that share no traits with constantTraits
            const data2 = data.filter(row => {
                const rowTraits = row.split(',').slice(3);
                return rowTraits.every(t => !traits.includes(t));
            });

        } catch (err) {
            console.error(err);
            alert('TFT Ultimate Bravery: could not load data. See console for details.');
        }
    });
});

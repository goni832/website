document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('submit');
   
    if (!btn) return;

    btn.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
            const comment = document.getElementById('comment');
            const name = document.getElementById('name');
            if( name.value != ""){
                alert(`${name.value}`);
            }

        } catch (err) {
            console.error(err);
            alert('Comments: cannot initialize.');
        }
    });
    
});

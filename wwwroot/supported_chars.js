fetch('char.tsv')
    .then(resp => resp.text())
    .then(data => {
        data.split('\n').forEach(l => {
            if (l === '') return;
            const v = l.split('\t');
            [...document.querySelectorAll(`td`)].filter(e => e.innerText === v[0])
                .forEach(v => {
                    v.setAttribute('style', 'background-color: lightgreen;');
                });
        })
    });
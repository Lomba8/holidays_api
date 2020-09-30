var scraper = require('table-scraper');
//import extractDate from 'extract-date';

var date_ob = new Date()
let anno_node = date_ob.getMonth() > 6 ? date_ob.getFullYear() : date_ob.getFullYear() - 1;
var giorno;
var mese;
var anno;
var date = [];

var link = `https://www.tuttitalia.it/scuole/calendario-scolastico-${anno_node}-${anno_node + 1}/veneto/`;

scraper
    .get(link)
    .then(function(tableData) {
        tableData = tableData.slice(1, tableData.length - 1)

        for (let idx = 0; idx < tableData.length; idx++) { // .slice() per togliere il primo lelemnto che è null & l'ulettimo che e di una altra tabella nella pagina 
            mese = tableData[idx][0]["0"].substring(0, 9).split(' ')[0] // 9 perche il mese piu lungo (Settembre) ha 9 lettere
                //console.log(mese)

            if (idx < 4) { anno = anno_node.toString() } else { anno = (anno_node + 1).toString() }

            //console.log(anno)

            for (let index = 0; index < tableData[idx].length; index++) {

                if (index == 0) { giorno = tableData[idx][index]["1"] } else { giorno = tableData[idx][index]["0"] }
                let data = (giorno + ' ' + mese + ' ' + anno)
                    //console.log(anno + ' ' + mese + ' ' + giorno)

                try {
                    // date.push(extractDate(data, { locale: 'it' })[0].date)
                } catch (error) {

                }

            }
        };

        date.push(date_ob.getMonth() > 6 ? `${date_ob.getFullYear() + 1}-05-21` : `${date_ob.getFullYear()}-05-21`) // Santo Patrono

        date.sort();


        date.shift() //per torgliere il giorno di inizio scuola
        date.pop() //per torgliere penultimo giorno della tabella (fine scuola superiore)
        date.pop().slice() //per torgliere ultimo giorno della tabella (fine scuola infanzia)

    });
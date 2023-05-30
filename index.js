const { exec } = require('child_process');

const oldPatrimonio = require('./Patrimonio Geral (1).json');
const newPatrimonio = require('./Patrimonio 2023-1.json');
let result = []

exec("[console]::beep(1000, 500)", {'shell':'powershell.exe'});

const compararListas = (list1, list2) => {

    list1.forEach(el => {
        let found = false

        list2.forEach(newEl => {

            //console.log("comparing "+el['Cd.Item']+" and 'No.Série' "+el['No.Série']+" with 'patrimônio' "+newEl['Patrimonio'])

            if ( (el['Cd.Item'] != null) && (String(el['Cd.Item']).includes(String(newEl['Patrimonio'])))) {
                found = true 
                console.log("found "+el['Cd.Item']+" and 'No.Série' "+el['No.Série']+" with 'patrimônio' "+newEl['Patrimonio'])
            } else if ( (el['No.Série'] != null) && (String(el['No.Série']).includes(String(newEl['Patrimonio'])))) {
                found = true
                console.log("found "+el['Cd.Item']+" and 'No.Série' "+el['No.Série']+" with 'patrimônio' "+newEl['Patrimonio'])
            }
        })

        if (!found) {
            result.push(el)
            console.log("found")
            console.log("not found "+el['Cd.Item']+" and 'No.Série' "+el['No.Série'])
        }
    })
}

compararListas(oldPatrimonio, newPatrimonio)
console.log(result)

const fs = require('fs');

const jsonData = JSON.stringify(result);

fs.writeFile("output.json", jsonData, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.")
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
})
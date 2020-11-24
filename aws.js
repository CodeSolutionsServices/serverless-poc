/**
 *  Introducir la cadena del CSV donde tiene el usuario, pass,... para que de la salida
 *  formateada y pueda ser legible por el usuario.
 */

const myArgs = process.argv.slice(2);
let credentials = myArgs[0];
let header = "User name,Password,Access key ID,Secret access key,Console login link";
credentials = credentials.split(',');
header = header.split(',');

header.forEach((item, index) => {
    console.log(`${item.toUpperCase()}`);
    console.log('******************************');
    console.log(`${credentials[index]}`);
    console.log('\n');
});

import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        "message" : "Type a URL: ",
        "name" : "URL",
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr-img.png'));

    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("⚠️  Prompt couldn't be rendered in the current terminal.");
    } else {
      console.error("❌ An unexpected error occurred:", error.message);
      // Optionally log full error stack for debugging
      // console.error(error.stack);
    }
  });
#!/usr/bin/env node


 const program = require('commander');
 const path = require('path');
 var inquirer = require('inquirer');
 var fs = require('fs');
 const chalk = require('chalk');
 const log = console.log;
 
 let database = () => require(path.join(__dirname, '../config/main.json'));
 let dir_module = (_name) => path.join(__dirname,`../module/${_name}`);


 program
 .version(`\n   ${chalk.blue("[MagicMirror]: ")} ${chalk.yellow("0.3.0 Version")} \n`, '-v, --version')

/**
 * Creat new Module
 */
 program
  .command('creat')
  .description('Creat a Module base on moduleName and moduleDisplayName')
  .action(function (modulename, cmd) {
    var questions =
     [{
          type: 'input',
          name: 'module_name',
          message: "What's your Module Name?",
          filter: function(val) {
            return val.toLowerCase();
          },
          validate: function(value) {
            //FIXME: cheack value module name must be uppercase and not include space
            if (!fs.existsSync(  dir_module(value)  ) ) 
                return true;
            else
                return 'Module name you chose, is exsist, Please chose another name for your Module.';
          }
        },
        {
            type: 'input',
            name: 'module_display_name',
            message: "What's your Module Display Name?"
          }
      ];
      
      inquirer.prompt(questions).then(answers => {

        let moduleName = answers.module_name;
        let dir = dir_module(moduleName);
        let conf = database();

        /**
         * Creat directory and put module base file in there
         */

         //FIXME: change to non sync version! is that necessary
         let Html_defualt = `
            <!--HTML ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Module Section-->
            <section class="module md_${moduleName}">
                <div class="md_${moduleName}">
                    <!-- Put Your Code Here -->
                </div>
            </section>
            <!--CSS ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Module Section-->
            <style>
                md_.${moduleName}{
                    position: relative;
                }
            </style>
        `;

        let Js_defualt = `
        $.fn.md_${moduleName} = function (options) {
            let defaults = { id: "" };
            let $settings = $.extend({}, defaults, options);
            if ($settings.id == "")
                throw new moduleError('ID is not defind', "${moduleName}", ln().end, ln().start);
            const $this = this;
            const $${moduleName}_module = modul_configList[$settings.id];

            //Put Your Module Code Here
            //If You Need More Info about Jquery Plugin You Can Visit link Below:
            //Tutorial Source:
            //          https://learn.jquery.com/plugins/
            //          https://learn.jquery.com/plugins/basic-plugin-creation/
            //          https://learn.jquery.com/plugins/advanced-plugin-concepts/
            //          https://learn.jquery.com/plugins/stateful-plugins-with-widget-factory/

        };// $.fn.md_${moduleName}

        $(moduleBase.position + " ." + moduleBase.id).md_${moduleName}({ id: moduleBase.id });
        `;

        fs.mkdirSync(dir);
        log(`\n${chalk.green("Magic Mirror Create a module process: ")}\n`);
        log(`${chalk.blue('1: ')}CModule   ${chalk.yellow(' Directory ')}`);

        fs.writeFileSync(`${dir}/md_${moduleName}.js`, Js_defualt, 'utf8');
        log(`${chalk.blue('2: ')}CModule   ${chalk.yellow(' Js File ')}`);

        fs.writeFileSync(`${dir}/md_${moduleName}.html`, Html_defualt , 'utf8');
        log(`${chalk.blue('3: ')}CModule   ${chalk.yellow(' HTML File ')}`);
      


        /**
         * Add new module to Database //config main.json
         */


         let newModule = {
             "name": moduleName,
             "displayName": answers.module_display_name,
             "setting":[],
             "display_src":{
                 "html" :`module/${moduleName}/md_${moduleName}.html`,
                 "js"   :`module/${moduleName}/md_${moduleName}.js`
             }
         }

         conf['modulee'].push(newModule)

         fs.writeFile(path.join(__dirname,'../config/main.json'), JSON.stringify(conf), (err) => {
            if(err) throw console.error('some thing happen to save data to database');
            //console.info(JSON.stringify(answers)); 
         });

         log(`${chalk.blue('4: ')}CModule   ${chalk.yellow(' Update Database ')}`);

         log(`${chalk.blue('5:')} ${chalk.magenta.bold('"'+moduleName+'"_Module') }  ${chalk.green.bold('Creat Succefully. ')}`);
        
       
      });


})// add new module


/**
 * remove module
 */
program
.command('remove module')
.description('Remove a Module base on list of modules')
.action(function (modulename, cmd) { 

    //list of all module we have
    let moduleExist = fs.readdirSync( path.join(__dirname,'../module/') )
   //modulePostion

    /**
     * Here we have to remove module frome two list 
     * one in modulee 
     * two in modulePosition
     */
    
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'module_name',
            message: 'Chose your Module for Remove?',
            choices:moduleExist
        },{
            type: 'confirm',
            name: 'confirm_Mremove',
            message: 'Are You sure, You Want Remove Module?',
            default: false
        } 
    ]).then(answers => {

        if(!answers.confirm_Mremove)
            return 'Remove Module Cansale.'

        let moduleName = answers.module_name;
        let dir = dir_module(moduleName);
        let conf = database();

        /**
         * Remove Module from modulee doc
         */
        conf["modulee"].forEach((element, index) => {
            if (element["name"] == moduleName) {
                conf["modulee"].splice(index, 1)
            }
        });
        log(`\n${chalk.green("Magic Mirror Remove a module process: ")}\n`);

        log(`${chalk.blue('1: ')}RModule From  ${chalk.yellow(' Module List ')}`);

        /**
         * Remove Module frome modulePosition
         */
        conf["modulePostion"].forEach((element, index) => {
            if (element["moduleName"] == moduleName) {
                conf["modulePostion"].splice(index, 1)
            }
        });
        log(`${chalk.blue('2: ')}RModule From  ${chalk.yellow(' Module Position ')}`);

        /**
         * Delate all file belong to module
         */
        rimraf( dir )
        log(`${chalk.blue('3: ')}RModule From  ${chalk.yellow(' Directory ')}`);
       

        /**
         * Save Changes in databse
         */
        fs.writeFile(path.join(__dirname,'../config/main.json'), JSON.stringify(conf), (err) => {
            if(err) throw console.error('some thing happen to save data to database');
        });

        log(`${chalk.blue('4: ')}RModule From  ${chalk.yellow(' DataBase ')}`);
        log(`${chalk.blue('5:')} ${chalk.magenta.bold('"'+moduleName+'"_Module') }  ${chalk.green.bold('Removeing Succefully Done. ')}`);
        //TODO: can we set smart contract for these?!
    
    });

})// Remove Module



/**
 * Add New Proprety to Module
 */
program
.command('aprop')
.description('Add a New Proprety to Module')
.action(function (modulename, cmd) {

    //list of all module we have
    let moduleExist = fs.readdirSync( path.join(__dirname,'../module/') )

    //FIXME:check for that property name they chose, because it must be uniq
        inquirer.prompt(
            [{
                type: 'list',
                name: 'module_name',
                message: 'Chose your Module for Add Proprety?',
                choices:moduleExist
            },{
                type: 'input',
                name: 'name',
                message: "Chose Proprety Name:"
            },{
                type: 'input',
                name: 'displayName',
                message: "Chose Proprety Display Name:"
            },{
                type: 'list',
                name: 'inputType',
                message: 'Chose Input Type:',
                choices: ['text', 'select', 'boolean', 'number']
            }
        ])
        .then(answers => {
            fn_finishme(answers);
            //console.log(JSON.stringify(answers, null, '  '));
        });

})//add prop




async function fn_finishme(_answer){

    let Input = _answer.inputType;
    let moduleName = _answer.module_name;
    let conf = database();
    let outPut = "";

    //get Defualt Value
    if(Input === 'text')
        outPut = _answer.value = await inputType_text();
    else if(Input === 'select')
        outPut = _answer.value = await inputType_select();
    else if(Input === 'boolean')
        outPut  = _answer.defualt = await inputType_boolean();
    else if(Input === 'number')
        outPut = _answer.value = await inputType_number();


    conf["modulee"].forEach((element, index) => {
        if (element["name"] == moduleName) {
            //Remove Module name form object
            delete _answer.module_name
            conf["modulee"][index].setting.push(_answer)
        }
    });

    log(`${chalk.blue('1: ')}AProp to  ${chalk.yellow(' ListConf ')}`);


     /**
     * Save Changes in databse
     */
    fs.writeFile(path.join(__dirname,'../config/main.json'), JSON.stringify(conf), (err) => {
        if(err) throw console.error('some thing happen to save data to database');
    });

    log(`${chalk.blue('4: ')}AProp to  ${chalk.yellow(' DataBase ')}`);

    log(`${chalk.blue('5:')} ${chalk.magenta.bold('"'+moduleName+'"_property') }  ${chalk.green.bold('Added Succefully. ')}`);
        

   

}

function inputType_text (){
  return  new Promise((resolve, reject) => {
    inquirer.prompt([
            {
                type: 'input_set',
                name: 'input_defualt_val',
                message: `What's Defualt Value of text input:`,
            }
        ])
        .then(answers => {
            resolve(answers.input_defualt_val)
        });
    });
}//inputType_text

function inputType_number (){
    return  new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input_set',
                name: 'input_defualt_val',
                message: `What's Defualt Value of number input:`,
            }
        ])
        .then(answers => {
            resolve( answers.input_defualt_val )
        });
    });
}//inputType_number

function inputType_boolean (){
    return  new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input_set',
                name: 'input_defualt_val',
                message: `What's Defualt Value of boolean input:`,
                choices: ['true', 'false']
            }
        ])
        .then(answers => {
            resolve( answers.input_defualt_val )
        });
    });
}//inputType_boolean

function inputType_select (){
    return  new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input_set',
                name: 'input_defualt_val',
                message: `What's Defualt Value of select input:(Multi Options Accepted by "," Separated)`,
            }
        ])
        .then(answers => {
            resolve(  answers.input_defualt_val.split(",") )
        });
    });
}//inputType_boolean


/**
 * Remove Prop
 */
program
.command('rprop')
.description('Remove a Proprety From Module')
.action(function (modulename, cmd) {

    //list of all module we have
    let moduleExist = fs.readdirSync( path.join(__dirname,'../module/') )

    const options1 = [
        {
            type: 'list',
            name: 'module_name',
            message: 'Chose your Module for Remove Proprety?',
            choices:moduleExist
        }

    ]


    inquirer.prompt(options1).then(answers => {
        //fn_finishme(answers);
        //console.log(JSON.stringify(answers, null, '  '));
        let moduleName = answers.module_name;
        let conf = database();
        let SettingName = [];

        conf["modulee"].forEach((element, index) => {
            if (element["name"] == moduleName) {
                //Remove Module name form object
                 conf["modulee"][index].setting.map(x => SettingName.push( x.name ))
            }
        });

        fn_removeProp(moduleName,SettingName)

    });


    

})

function fn_removeProp (_moduleName,_SettingName){
   
    const options2 = [
        {
            type: 'list',
            name: 'prpb_name',
            message: 'Chose your Porp to Remove?',
            choices:_SettingName
        },{
            type: 'confirm',
            name: 'confirm_Mremove',
            message: 'Are You sure, You Want Remove Module?',
            default: false
        } 
    ]

    inquirer.prompt(options2).then(answers => {
        if(!answers.confirm_Mremove)
            return 'Remove Proprety Cansale.'
        let conf = database();

        conf["modulee"].forEach((element, index) => {
            if (element["name"] == _moduleName) {
                conf["modulee"][index].setting.forEach((element, _index)=>{
                    if(element["name"] == answers.prpb_name ){
                        conf["modulee"][index].setting.splice(_index, 1)
                    }
                })
            }
        });
        log(`${chalk.blue('1: ')}RProp From  ${chalk.yellow(' Config ')}`);

           /**
         * Save Changes in databse
         */
        fs.writeFile(path.join(__dirname,'../config/main.json'), JSON.stringify(conf), (err) => {
            if(err) throw console.error('some thing happen to save data to database');
        });

        log(`${chalk.blue('2: ')}RProp From  ${chalk.yellow(' DataBase ')}`);

        log(`${chalk.blue('3:')} ${chalk.magenta.bold('"'+_moduleName+'"_property') }  ${chalk.green.bold('Remove Succefully. ')}`);
            


    })

}


program.parse(process.argv)


  /**
 * Remove directory recursively
 * @param {string} dir_path
 * @see https://stackoverflow.com/a/42505874/3027390
 */
function rimraf(dir_path) {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function(entry) {
            var entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}

//TODO: Creat a Calass for global acces for Database CRUD


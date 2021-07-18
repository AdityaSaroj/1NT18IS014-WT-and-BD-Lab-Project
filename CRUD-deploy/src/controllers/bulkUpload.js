const Fs = require('fs');
const http = require('http');
const https = require('https');
const Axios = require('axios');
const Path = require('path');
const readXlsxFile = require('read-excel-file/node');
exports.bulkUpload =(req,res)=>{
    const schema ={
        'Section': {
            prop:'section',
            type:String,
        },
        'Product ID':{
            prop:'productId',
            type:String,
            required:true
        },
        'Product Name':{
            prop:'productName',
            type:String
        },
        'Description':{
            prop:'desc',
            type:String,
        },
        'Brand':{
            prop:'brand',
            type:String
        },
        'Material':{
            prop:'material',
            type:String
        },
        'Color':{
            prop:'color',
            type:String
        },
        'Design':{
            prop:'design',
            type:String
        },
        'Application':{
            prop:'application',
            type:String
        },
        'Instruction':{
            prop:'instruction',
            type:String
        },
        'Image':{
            prop:'photo',
            type:String,
            parse(value){
               console.log(value);
            }
        }


    }
    readXlsxFile('test.xlsx', { schema }).then(( {rows, errors} ) => {
            console.log(rows);

     
      })
}
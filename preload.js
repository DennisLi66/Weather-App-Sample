const { contextBridge } = require('electron');
const yaml = require('js-yaml');
const fs = require('fs');

var API_KEY;
try {
    const doc = yaml.load(fs.readFileSync('conf.yaml'));
    API_KEY = doc.API_KEY;
  } catch (e) {
    console.log(e);
  }

contextBridge.exposeInMainWorld('fL', {
  API_KEY: API_KEY
})
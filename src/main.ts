import * as core from '@actions/core';
import url = require('url');
const https = require('https');

async function run() {
  try {
    const esquioUrl = core.getInput('esquio-url');
    const esquioApiKey = core.getInput('esquio-api-key');
    const productName = core.getInput('product-name');
    const featureName = core.getInput('feature-name');
    const toggleType = core.getInput('toggle-type');
    const parameterName = core.getInput('parameter-name');
    const parameterValue = core.getInput('value');
    const ringName = core.getInput('ring-name');

    await setToggleParameter(url.parse(esquioUrl), esquioApiKey, productName, featureName, toggleType, parameterName, parameterValue, ringName);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function setToggleParameter(esquioUrl: url.UrlWithStringQuery,
  esquioApiKey: string,
  productName: string,
  featureName: string,
  toggleType: string,
  parameterName: string,
  parameterValue: string,
  ringName: string | undefined) {

  const options = {
    hostname: esquioUrl.host,
    path: `/api/toggles/parameters`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': esquioApiKey,
      'x-api-version': '3.0'
    }
  }

  var postData = JSON.stringify({
    "ProductName": productName,
    "FeatureName": featureName,
    "ToggleType": toggleType,
    "Name": parameterName,
    "Value": parameterValue,
    "RingName": ringName
  });

  const req = https.request(options, (res: any) => {
    if (res.statusCode === 200) {
      console.log('Set toggle parameter succesful');
    }

    res.on('data', (data: any) => {
      if (res.statusCode != 200) {
        const responseData = JSON.parse(data);
        core.setFailed(`Error set toggle parameter ${responseData.detail} HttpCode: ${res.statusCode}`);
      }
    });
  });
  req.on('error', (error: any) => {
    core.setFailed(error);
  });

  req.write(postData);
  req.end();
}

run();

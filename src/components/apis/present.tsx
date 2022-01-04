import React from 'react';
import { Auth, API } from 'aws-amplify';
import {name as appName} from '../../../app.json';
import { Alert } from '@aws-amplify/ui-react';

const getList = async function() {
    //const apiName = appName;
    const apiName = 'APIGateway';
    const path = '/dev/presents/list-own'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
    };

    API.get(apiName, path, reqInfo)
    .then(response => {
      //console.log(response);
      alert(response.body);
    })
    .catch(err => {
      //console.log(err);
      alert(err);
    });

  };

  export default getList;
import React, { useState } from 'react';
import { Auth, API } from 'aws-amplify';

//ToDo: API実行処理＋プレゼントリストへ格納
const getPresents = async function() {
    //const apiName = appName;
    const apiName = 'APIGateway';
    const path = '/dev/presents/list-own'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
    };
    const [presents, setPresents] = useState([]);

    API.get(apiName, path, reqInfo)
    .then(response => {
      //console.log(JSON.parse(response.body).Items);
      //alert(response.body);
      //console.log(JSON.parse(response.body).Items)
      setPresents(JSON.parse(response.body).Items)
      //return presents;
    })
    .catch(err => {
      console.log(err);
      //alert(err);
      //return err
    });
    return presents
  };

  export default getPresents;
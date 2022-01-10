<<<<<<< HEAD
import React, { useState } from 'react';
import { Auth, API } from 'aws-amplify';

//ToDo: API実行処理＋プレゼントリストへ格納
const getPresents = async function() {
=======
//import React from 'react';
import { Auth, API } from 'aws-amplify';

const getList = async function() {
>>>>>>> 234f3c6f5883279b58f788674f35d7c7a87542ac
    //const apiName = appName;
    const apiName = 'APIGateway';
    const path = '/dev/presents/list-own'; 
    const reqInfo = { 
      headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      },
    };
<<<<<<< HEAD
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
=======

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
>>>>>>> 234f3c6f5883279b58f788674f35d7c7a87542ac

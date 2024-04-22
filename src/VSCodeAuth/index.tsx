/*
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */

import { Box, CssBaseline, Link, makeStyles, Button } from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import React from 'react';


const useStyles = makeStyles({
  logoImgFullWidth: {
    display: 'block',
    width: '20%',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

function generateRedirectUrl(state: string | null, oauthCode: string | null) {
  if (state) {
    try {
      const stateDecoded = atob(state);
      const stateObj = JSON.parse(stateDecoded);
      if (stateObj.callbackUri) {
        const decodedCBUri = decodeURIComponent(stateObj.callbackUri);
        const callbackURL = new URL(decodedCBUri);
        callbackURL.searchParams.append(
          'code',
          encodeURIComponent(oauthCode || '')
        );
        return callbackURL;
      }
      console.error('Callback URI not found in state');
    } catch (ex) {
      console.error('Error parsing state', ex);
    }
  }
  return undefined;
}

export default function VSCodeAuth() {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oauthCode = searchParams.get('code');
  const state = searchParams.get('state');
  console.log("OAuth Code: ", oauthCode);
  console.log("State: ", state);
  const vscodeURL = generateRedirectUrl(state, oauthCode);

  useEffect(() => {
    if (vscodeURL) {
      window.open(vscodeURL, '_self');
    }
    console.log("VS Code URL: ", vscodeURL);
  }, [vscodeURL]);
  if (!oauthCode || !state) {
    return (
      <Box
        pt="8%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        height={1}
        display="flex"
      >
        <CssBaseline />
        <h1>Invalid Request</h1>
        <p>Please provide a valid OAuth code and state.</p>
      </Box>
    );
  }else{
    return (
      <Box
        pt="8%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        height={1}
        display="flex"
      >
        <CssBaseline />
        <Box display="flex">
  
            <img
              className={classes.logoImgFullWidth}
              src="https://wso2.cachefly.net/wso2/sites/all/2023/images/micro-integrator-logo.webp"
              alt="Choreo Logo"
            />


        </Box>
        <Box
          pt="7%"
          display="flex"
          fontWeight="fontWeightBold"
          fontSize="h2.fontSize"
        >
          Success!
        </Box>
        <Box textAlign="center" display="flex" fontSize="subtitle1.fontSize">
          Authorization was successful. You will be redirected back to Visual
          Studio Code
        </Box>
        <Box pt={5} display="flex" fontSize="subtitle1.fontSize">
          Didn&apos;t open VS Code?
        </Box>
        <Box pt={2} display="flex">
        <Button
                style={{ backgroundColor: '#EE7A30', color: '#fff' }}
                variant="contained"
                onClick={() => {
                  if (vscodeURL) {
                    window.location.href = vscodeURL.toString();
                  }
                }}
              >
                Open Visual Studio Code 
        </Button>
        </Box>
      </Box>
    );
  }
  
}


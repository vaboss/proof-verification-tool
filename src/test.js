// @flow
/* eslint-disable no-console */

import {getProofType, verifyProof} from './index.js';
const fs = require('fs');

const testGetProofType = () => {
  const proofType_TLSNotary = getProofType('tlsnotary notarization file\n  /X]H_<Õ¥ïê');
  const proofType_Android = getProofType('AP¿lHTTPResponseY"{"error":[],"result":{');
  // $FlowFixMe
  console.log(`index.js/getProofType:  ${proofType_TLSNotary === 'proofType_TLSNotary' && proofType_Android === 'proofType_Android'}`); // eslint-disable-line no-console 
};

// we have to use literal path so browserify can put the file's content in the bundle
const proofs = [
  fs.readFileSync('./proof/android.proof'),
  fs.readFileSync('./proof/androidV2.proof'),
  fs.readFileSync('./proof/computation.proof'),
  fs.readFileSync('./proof/ledger.proof'),
  fs.readFileSync('./proof/proof.proof'),
  fs.readFileSync('./proof/tlsnV1.proof'),
  fs.readFileSync('./proof/tlsnV2.proof'),
  fs.readFileSync('./proof/tlsnV2b.proof'),
];

const paths = [
  './proof/android.proof',
  './proof/androidV2.proof',
  './proof/computation.proof',
  './proof/ledger.proof',
  './proof/proof.proof',
  './proof/tlsnV1.proof',
  './proof/tlsnV2.proof',
  './proof/tlsnV2b.proof',
];


const autoVerify = async () => {
  for (var h = 0; h < proofs.length; h++) {
    const parsedProof = new Uint8Array(proofs[h]);
    console.log('\x1b[32m', 'Proof file: ', paths[h], '\x1b[37m');
    try {
      const verifiedProof = await verifyProof(parsedProof);
      console.log('\x1b[33m', 'Main proof: ', '\x1b[37m', '\n ', verifiedProof.mainProof);
      console.log('\x1b[33m', 'Extension proof: ','\x1b[37m', '\n ', verifiedProof.extensionProof);
    } catch(e) {
      console.log('Error: ', e);
    }
  }
};

export const runTest = (() => {
  testGetProofType();
  // eslint-disable-next-line no-console
  autoVerify().then(() => console.log('finish')).catch(e => console.log(e));
})();

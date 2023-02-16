import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';
const { initializeApp, getApps, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
require('dotenv').config();

@singleton()
export default class FirebaseService {
  db: any;
  constructor() {
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          type: process.env.FBASE_TYPE,
          project_id: process.env.FBASE_PROJECTID,
          private_key_id: process.env.FBASE_P_KEYID,
          private_key: process.env.FBASE_P_KEY,
          client_email: process.env.FBASE_CLIENT_EMAIL,
          client_id: process.env.FBASE_CLIENT_ID,
          auth_uri: process.env.FBASE_AUTHURI,
          token_uri: process.env.FBASE_TOKENURI,
          auth_provider_x509_cert_url: process.env.FBASE_AUTHCERT,
          client_x509_cert_url: process.env.FBASE_CLIENTCERT,
        }),
      });
    }
    this.db = getFirestore();
  }

  async returnEventsbyProfile(netId: string, email: string): Promise<string[]> {
    const querySnapshot = await this.db
      .collection('profile_data')
      .where('net_id', '==', netId)
      .where('email', '==', email)
      .limit(1)
      .get();

    const events = [];

    if (querySnapshot.exists()) {
      querySnapshot.forEach((doc) => {
        events.push(doc.data().past_events);
      });
    }

    return events;
  }
}

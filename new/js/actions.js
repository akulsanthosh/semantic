'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow, BasicCard, Image, List, Suggestions } = require('actions-on-google');
const admin = require('firebase-admin');
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
admin.initializeApp({
    "type": "service_account",
    "project_id": "semantic-b4ee2",
    "private_key_id": "3277ffc4e37acac0b0767fd61543e9fd93fc02de",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+U0Z+WTSxW6vQ\nnWm7exwur66Jpelb6GvmmUZR1yfWtckjwV6fN8EtcH5ae+raJH4ApI4RevqKgkuR\njxEO/KXgCAJ/Upt3Ct5EuFYg37SCLBYvbbn7ydvLCAHHxSMEfMQv+2DJWZgHabJj\nW1bgGkYe82nCl2h18z2fUCSQDACl0wxe8k5itXfs3PzjprNB9MxRzw2K2pAoSIbe\na3HbgH31BBtOoszbMdl4U0/tado+7apCEI5pHRL+4h62QcgakmPeo3FeNn5/vNMF\njx/uCRHDXLvgGivNUfvovK/l6MI6pAirCy1Wk3Tfv9sNC9aEjJMyOg/gilvsWcoF\nslsphxkDAgMBAAECggEACG3avOTJgyNauCoIkT+SD3VDZyA8dhAUm0llhmFfh9BU\nQKujO6z19sO5LNu5GoEsPW4MRrTqHLFJlIBAEqhY1lO0fJwVe4+1KVj6o4kUzwER\n2HblGkQl4leP8J+H/f5il/droW9A3u8s8d6NOe6f9WX1ZKNdAoBL1d7wR5roem+L\nUkR7xSJpI5ryp5NXMYpInAPEP0jQr8ioF0aSLFEMxeH9qngW3SkVW3Ona/7UKAcE\nX4Bz8i3H0m9sTMbqKumRCeJM8NBxwbr4P0KdVU5OBVzjL47ctVT5YdsW3CTtv6ur\nsUfmODI3mxlNU+PlevWJPGfVvp+dLSBk82MoOdoMgQKBgQDqF66NMmSfEB0FOrLS\nDngmr1W396tJ6xwKWWsCKyOHekfeDRgTGUmIxryUv+j57MfInmKU134ZLTzHsALt\nPZY9kf1mgEsEaoGYR1AqjTz1EAjPLMRXBydkzy5RjljE2uX+bk+rQVxNfNBMeTsJ\npnzhHTSRbShPgFuV10WZUUcNgwKBgQDQIwgg1L+aG1HqS66H6MieMxao4AuZn4fI\nxjYQ+ONIgt7aecp299ioflf89i4WWyEKCIHhK4J8u4e6aG/mH7tIb+YMANtrEtR6\niRLZsL0ASQ4cM3D5I6+qNchXQ/TmWFc2CGC01V1GDViQuKnTzcl4q07GVlVo1YSR\nx9bDbnlugQKBgQCudoXdr3/0WCL4wb2B9cywMB53ZDshdPrJ78hjrljlYEntgN6/\nZSo7qLnlNn3gvgpLR1d7THsrMl7JCDG2NB8jtgkf+l9uZB4/qm5huC+FCLU4Ckot\n/iPq6sm/eJJJ7EZa8EWqAaVUDsCDLhrE33LUp1qFQ9A2KBiZvP2e/UcyFwKBgQDP\nKJ71dmsB6oE8jnk3IpVTCAxcpypEjAjs54N2nxIw4LkIgMHoaUUGZ0ISL8CtVaRr\nxQ3oXJLyrQApo7sEM78HGQDCH7REPSiokXfmncdv2kamAPlHr6Iu6nrtiGDfRzv+\nNpZyRg8hIzVsTbASdLc7WF3+gH1f62yYYGu8dl98gQKBgFjbgW9bPlxtLA/89xOu\nytrAzyJjQueHq2AIJwcUgSOvJVvSaT9tCPgfENBV9MfW7xBfBFW4/eoBSDwDslRZ\ngfwzVMCTfoRGqV2MXNKJBXx8OTLC0BxADR+nsrk1bIgTMZYIm9I81ul+ZKBQNJnL\no+sfpRjM+hTmX2t7V1Klo9wM\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-0kfdy@semantic-b4ee2.iam.gserviceaccount.com",
    "client_id": "101237457069643359155",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-0kfdy%40semantic-b4ee2.iam.gserviceaccount.com"
});
// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });
const db = admin.firestore();


const SELECTED_ITEM_RESPONSES = {
    'KOCHI_LAB': ['You selected kochi lab', 'kochi'],
    'BANGALORE_LAB': ['You selected bangalore lab', 'bangalore'],
    "all": ["all", "all"]
};

// //---------------------------Welcome Intent -----------------------------
// app.intent('Default Welcome Intent', (conv) => {
//   console.log("welcome");
//     const dialogflowAgentRef = db.collection('semantic').doc('display');
//     db.runTransaction(t => {
//         t.update(dialogflowAgentRef, { mode: 'welcome', location: '1,2' });
//         return Promise.resolve('Write complete');
//     }).then(doc => {
//     }).catch(err => {
//         console.log(`Error writing to Firestore: ${err}`);
//     });
// });

// //---------------End of welcome-----------------------------------------

//---------------------------Introduction Intent -----------------------------
app.intent('introduction', (conv, { location }) => {

    if (!location) {
        const option = conv.arguments.get('OPTION') || "all";
        location = SELECTED_ITEM_RESPONSES[option][1];
    }
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    if (location === "all") {
        conv.ask(`Alright! Please choose a lab to continue`);
        conv.ask(new List({
            title: 'Semantic Labs',
            items: {
                'KOCHI_LAB': {
                    synonyms: [
                        'kochi',
                        'kerala',
                    ],
                    title: 'Semantic Lab Kochi',
                    description: 'IOT Lab in Wipro Kochi',
                    image: new Image({
                        url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fkochi.jpg?alt=media&token=113f9adf-3213-4213-9ed2-18de0d7b21e2',
                        alt: 'Image alternate text',
                    }),
                },
                'BANGALORE_LAB': {
                    synonyms: [
                        'bangalore',
                        'bengaluru',
                        'karnataka',
                    ],
                    title: 'Semantic Lab Bangalore',
                    description: 'IOT Lab in Wipro Bangalore',
                    image: new Image({
                        url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fkochi.jpg?alt=media&token=113f9adf-3213-4213-9ed2-18de0d7b21e2',
                        alt: 'Google Home',
                    }),
                },
            },
        }));
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showMultiCard', location: '1,2' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
    } else {
        conv.ask('Welcome to ' + location + ' semantic lab. Here is your overview of all devices connected');
        conv.ask(new BasicCard({
            subtitle: `A state of art IOT lab`,
            title: `Welcome to ` + location + ` semantic lab`,
            image: new Image({
                url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Flab.jpg?alt=media&token=d2e17d42-cf1f-4b4d-a204-2a62137fc516',
                alt: 'lab image',
            }),
        }));
        if (location === 'kochi') location = "1";
        else location = "2";
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showMultiCard', location: location });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
    }
});
//---------------End of introduction-----------------------------------------

//---------------------------Graph Intent -----------------------------------
app.intent('graph', (conv, { sensor, color, time, graph }) => {
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    db.runTransaction(t => {
        t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '3', sensor: sensor, color: color, chart: graph });
        return Promise.resolve('Write complete');
    }).then(doc => {
    }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
    });
    const dialogflowAgentDoc = db.collection('semantic').doc('sensor').collection(sensor + "_001").doc('current');
    return dialogflowAgentDoc.get()
        .then(doc => {
            if (!doc.exists) {
                conv.ask('No data found in the database!');
            } else {
                if (sensor === "hum") {
                    conv.ask("The humidity is " + doc.data().value + " percent");
                    conv.ask(new Suggestions('Expand the graph'));
                    conv.ask(new BasicCard({
                        title: `Humidity : ` + doc.data().value + ` %`,
                        image: new Image({
                            url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fgraph-image.png?alt=media&token=f74ea8e0-9fad-4e61-ae92-20a4bb4e2111',
                            alt: 'humidity',
                        }),
                    }));
                }
                else {
                    conv.ask("The temperature is " + doc.data().value + " degree");
                    conv.ask(new Suggestions('Expand the graph'));
                    conv.ask(new BasicCard({
                        title: `Temperature : ` + doc.data().value + ` Deg`,
                        image: new Image({
                            url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2Fgraph-image.png?alt=media&token=f74ea8e0-9fad-4e61-ae92-20a4bb4e2111',
                            alt: 'temperature',
                        }),
                    }));
                }
            }
            return Promise.resolve('Read complete');
        }).catch(() => {
            conv.ask('Error reading entry from the Firestore database.');
            conv.ask('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
        });
});


//---------------End of Graph-------------------------------------------------

//---------------------------Graph Color Intent -----------------------------------
app.intent('graph_custom', (conv, { color, graph }) => {
    conv.ask("Changing graph properties");
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    db.runTransaction(t => {
        t.update(dialogflowAgentRef, { chart: graph, color: color });
        return Promise.resolve('Write complete');
    }).then(doc => {
    }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
    });
});

//---------------End of Graph Color -------------------------------------------------

//---------------------------Description Intent -----------------------------------
app.intent('description', (conv, { sensor, desc }) => {
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    if (desc === "connect") {
        conv.ask("Please watch this video to connect the sensor");
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { type: '4', sensor: sensor });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
    }
});

//---------------End of Description -------------------------------------------------

//---------------------------servo Intent -----------------------------------
app.intent('servo', (conv, { direction }) => {
    conv.ask("Changing direction to " + direction + " degree.");
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    db.runTransaction(t => {
        t.update(dialogflowAgentRef, { type: '5', direction: direction, sensor: 'servo' });
        return Promise.resolve('Write complete');
    }).then(doc => {
    }).catch(err => {
        console.log(`Error writing to Firestore: ${err}`);
    });
    conv.ask(new BasicCard({
        title: `Servo Direction : ` + direction + ` Deg`,
        image: new Image({
            url: 'https://firebasestorage.googleapis.com/v0/b/semantic-b4ee2.appspot.com/o/images%2F11965-01.jpg?alt=media&token=e36480d5-3b83-4aac-a261-251751a4ae16',
            alt: 'servo',
        }),
    }));
});

//---------------End of servo-------------------------------------------------



//---------------------------CLI Intent -----------------------------------
app.intent('cli', (conv, { cliAction }) => {
    const dialogflowAgentRef = db.collection('semantic').doc('display');
    if (!cliAction) {
        //Open CLI interface
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '0' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Here is your CLI interface');
    } else if (cliAction === "list") {
        //Show list of files
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '2' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Here is the list of items');
    } else if (cliAction === "upload") {
        //Show file upload dialog
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '1' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Please select a file');
    } else {
        //Show file upload dialog
        db.runTransaction(t => {
            t.update(dialogflowAgentRef, { mode: 'showSingleCard', type: '8' });
            return Promise.resolve('Write complete');
        }).then(doc => {
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
        });
        conv.ask('Please select a file');
    }
});


//---------------End of cli-------------------------------------------------

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
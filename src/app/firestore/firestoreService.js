import cuid from "cuid";
import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data= snapshot.data();
    //converting seconds tyoe of date to JS toDate()
    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    };
}

export function listenToEventsFromFirestore() {
    return db.collection("events").orderBy("date");
}

export function listenToEventFromFirestore(eventId) {
    return db.collection("events").doc(eventId);
}

export function addEventToFirestore(event) {
    return db.collection("events").add({
        ...event,
        hostedBy: "Mike",
        hostPhotoURL: "https://randomuser.me/api/portraits/men/21.jpg",
                                    //arrayUnion is a firestore method similar to "push"
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            name: "Mike",
            photoURL: "https://randomuser.me/api/portraits/men/21.jpg"
        })
    });
}

export function updateEventInFirestore(event) {
                                                //update methyod from firestore
    return db.collection("events").doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
    return db.collection("events").doc(eventId).delete();
}

export function cancelEventToggle(event) {
    return db.collection("events").doc(event.id).update({
        isCancelled: !event.isCancelled
    })
}

export function setUserProfileData(user) {
    return db.collection("users").doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  Timestamp,
  where,
  query,
  getDocFromCache,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

const firebaseConfig = {};
initializeApp(firebaseConfig);
const db = getFirestore();
function closeFormdel1() {
  document.getElementById("myForm3").style.display = "none";
}

function openFormdel1() {
  document.getElementById("myForm3").style.display = "block";
}
var closedel2 = document.getElementById("del2close");
closedel2.addEventListener("click", closeFormdel1);
const colref3 = collection(db, "Calender events");
const addcalForm = document.querySelector(".calform");
addcalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var adddate = document.getElementById("date");
  adddate = adddate.value.slice(0, 10);
  console.log(adddate);
  var docref = doc(db, "Calender events", adddate);
  setDoc(docref, {
    date: Timestamp.fromDate(new Date(document.getElementById("date").value)),
    event: document.getElementById("event").value.split(","),
  }).then(() => {
    window.location.reload();
  });
});

const delcal = document.querySelector(".delform");
delcal.addEventListener("submit", (e) => {
  e.preventDefault();
  openFormdel1();
  const delbut2 = document.querySelector(".delb2");
  delbut2.addEventListener("click", (e) => {
    e.preventDefault();
    var range1 = document.getElementById("range1");
    range1 = range1.value;
    var range2 = document.getElementById("range2");
    range2 = range2.value;

    getDocs(colref3).then((snapshot) => {
      snapshot.docs.forEach((userdoc) => {
        if (userdoc.id >= range1 && userdoc.id <= range2) {
          deluser(userdoc);
        }
      });
    });
  });
});

function deluser(userdoc) {
  const docRef = doc(db, "Calender events", userdoc.id);
  console.log("docref", docRef);
  deleteDoc(docRef).then(() => {
    window.location.reload();
  });
}

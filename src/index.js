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
  arrayUnion,
  arrayRemove,
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

function openFormadd() {
  document.getElementById("myForm1").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm1").style.display = "none";
}

var closeadd = document.getElementById("closeedit");
closeadd.addEventListener("click", closeForm);
function addnew() {
  openFormadd();
  var urlsche = [];
  var fileText = document.querySelector(".fileText");
  var uploadPercentage = document.querySelector(".uploadPercentage");
  var progress = document.querySelector(".progress");
  var percentVal;
  var fileItem;
  var fileName;
  var img = document.querySelector(".img");

  const getf = document.getElementById("fileInp");
  getf.addEventListener("change", (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      fileItem = e.target.files[i];
      fileName = fileItem.name;
      fileText.innerHTML = fileName;
      const metaData = {
        contentType: fileItem.type,
      };

      const uploadf = document.getElementById("upbut");
      uploadf.addEventListener("click", uploadImage());

      function uploadImage() {
        const storage1 = getStorage();
        let storageRef = sRef(storage1, "about/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, fileItem, metaData);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
            percentVal = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(percentVal);
            uploadPercentage.innerHTML = percentVal + "%";
            progress.style.width = percentVal + "%";
          },
          (error) => {
            console.log("Error is ", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              urlsche[i] = downloadURL;
            });
          }
        );
      }
    }
  });
  const colref1 = doc(db, "about images", "aboutimgs");
  const addabout = document.querySelector(".aboutform");
  addabout.addEventListener("submit", (e) => {
    console.log(urlsche);
    for (var i = 0; i < urlsche.length; i++) {
      e.preventDefault();
      var len = urlsche.length;
      updateDoc(colref1, {
        imgslink: arrayUnion(urlsche[i]),
      }).then(() => {
        window.location.reload();
      });
    }
  });
}

const addabout = document.querySelector(".addabout");
addabout.addEventListener("click", (e) => {
  e.preventDefault();
  addnew();
});

const colref = collection(db, "about images");

var boxin = document.getElementsByClassName("boxinside")[0];

try {
  getDocFromCache(colref).then((snapshot) => {
    snapshot.docs.forEach((userdoc) => {
      displaycard(userdoc.data(), userdoc);
    });
  });
} catch (e) {
  getDocs(colref).then((snapshot) => {
    snapshot.docs.forEach((userdoc) => {
      displaycard(userdoc.data(), userdoc);
    });
  });
}

function deluser(userdocd) {
  const colref2 = doc(db, "about images", "aboutimgs");
  for (var i = 0; i < userdocd.imgslink.length; i++) {
    updateDoc(colref2, {
      imgslink: arrayRemove(userdocd.imgslink[i]),
    }).then(() => {
      window.location.reload();
    });
  }
}

function displaycard(userdocd, userdoc) {
  var wrapper = document.createElement("div");
  wrapper.className = "card";

  userdocd.imgslink.map((e) => {
    var indiv = document.createElement("div");
    indiv.className = "indiv";
    var image = document.createElement("img");
    image.className = "aboutimg";
    image.src = e;
    indiv.appendChild(image);
    wrapper.appendChild(indiv);
  });

  const delbut = document.querySelector(".delbut");
  delbut.addEventListener("click", (e) => {
    e.preventDefault();
    deluser(userdocd);
  });
  boxin.appendChild(wrapper);
}

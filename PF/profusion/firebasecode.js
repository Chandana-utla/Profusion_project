
const firebaseConfig = {
    apiKey: "AIzaSyDHEcml3aP5X8H6iY3qNnjmoIYKE6WZ4Cc",  
    authDomain: "profusion-55ee5.firebaseapp.com", 
    projectId: "profusion-55ee5",  
    storageBucket: "profusion-55ee5.appspot.com",  
    messagingSenderId: "705597166854", 
    appId: "1:705597166854:web:f714caa1b9141a93353a87" 
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

function updateUserName() {
       const nameInput = document.getElementById('creatorName').value;

      const userNameDisplay = document.getElementById('userNameDisplay');

     userNameDisplay.textContent = nameInput || "User";
}

function autoExpand(field) {
     field.style.height = 'inherit';

     const computed = window.getComputedStyle(field);

     const height =
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = `${height}px`;
}

async function uploadContent() {
     const thoughtsInput = document.getElementById('creatorThoughts');
    const creatorNameInput = document.getElementById('creatorName');
    const creatorName = creatorNameInput.value.trim();
    const userThoughts = thoughtsInput.value.trim();
       if (!creatorName) {
        alert("Please enter your name!");
        return;
    }

   
    if (!userThoughts) {
        alert("Please write your thoughts or upload a file!");
        return;
    }

    const contentData = {
        creatorName,          
        thoughts: userThoughts, 
        timestamp: new Date().toISOString(), 
    };

    try {
       
        await db.collection("contents").add(contentData);

     
        creatorNameInput.value = ""; 
        thoughtsInput.value = "";
       
        thoughtsInput.style.height = "inherit";  

       
        alert("Content uploaded successfully!");

    } catch (error) {
       
        console.error("Error uploading content:", error.message);
        alert("Failed to upload content. Please try again.");
    }
}

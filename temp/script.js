// File Upload
// 
function ekUpload(){
   function Init() {
 
     console.log("Upload Initialised");
 
     var fileSelect    = document.getElementById('file-upload') 
     fileSelect.addEventListener('change', fileSelectHandler, false);
   }
 
 
   function fileSelectHandler(e) {
     var files = e.target.files || e.dataTransfer.files;
     parseFile(files[0])
   }
 

 
   function parseFile(file) {
 
     console.log(file.name);
     var imageName = file.name;
 
     var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
     if (isGood) {
       document.getElementById('start').classList.add("hidden");
       document.getElementById('response').classList.remove("hidden");
       document.getElementById('notimage').classList.add("hidden");
       // Thumbnail Preview
       document.getElementById('file-image').classList.remove("hidden");
       document.getElementById('file-image').src = URL.createObjectURL(file);
     }
     else {
       document.getElementById('file-image').classList.add("hidden");
       document.getElementById('notimage').classList.remove("hidden");
       document.getElementById('start').classList.remove("hidden");
       document.getElementById('response').classList.add("hidden");
       document.getElementById("file-upload-form").reset();
     }
   }
 
   if (window.File && window.FileList && window.FileReader) {
     Init();
   } else {
     document.getElementById('file-drag').style.display = 'none';
   }
 }
 ekUpload();
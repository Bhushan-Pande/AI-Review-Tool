$( document ).ready(function() {       
    window.location.href = "#firstSection";    
});



function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                             cell.innerHTML = cells[j];
                        }
                    }
                }
                var dvCSV = document.getElementById("dvCSV");
                var classes=document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);

            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

window.onbeforeunload = function() {
    return "Did you save your stuff?"
}

var cropfile='';
var cropfilename='';
var classfile='';
var classfilename='';
var outputtraincsv='';
var outputtraincsvname='';
var inputVal='';
var myFileCopy;






function fetchcrop(myFile){
    console.log("FETCHCROP fn called");
    myFileCopy=myFile;
    cropfile = myFile.files[0];  
    cropfilename = cropfile.name;
    console.log(cropfilename);
     $(function()
    {
        $('#fileUpload').on('change',function ()
        {
            var filePath = $(this).val();
            console.log(filePath);
        });
    });
}

function fetchclass(myFile){
     classfile = myFile.files[0];  
     classfilename = classfile.name;
     getcsv();  
}
function getInputValue(){
    inputVal = document.getElementById("myInput").value;
    
}

var trfile='';
var crpdir='';
var crpfile='';
var fetchinfo=[];
var urlprf='';
function fetchname(){

trfile = document.getElementById("train").value;
crpdir = document.getElementById("crpdirectory").value;
crpfile = document.getElementById("crpname").value;
urlprf =  document.getElementById("urlprf").value;

console.log("Entered url : ",urlprf);
fetchinfo.push(trfile,crpdir,crpfile,urlprf);

const endpoint1= "http://localhost:5000/executemypy";
fetch(endpoint1,{
mode: 'cors',
method:"POST",
body:fetchinfo.slice(-4),
    }).catch(console.error)

}


function getFilename(url){
    if (url) {
       var m = url.toString().match(/.*\/(.+?)\./);
       if (m && m.length > 1){
          return m[1];
       }
    }
    return "";
}


var formfiledelete=[];
var questionablecrop=[];

function questionablecropfunc()
{
  if(flag==1)  
    {
    var fullname=final[counter-1][6];
    
    var fname=getFilename(fullname);
    if(fullname.includes(".png") && !fname.includes(".png")){
        fname=fname + ".png";
    }
    document.getElementById(fname).style.display="none";    
    final[counter-1][10]="needchange";
    
    questionablecrop.push(cropfilename,inputVal,urlprf,final);
    
    const endpoint1= "http://localhost:5000/change";
    fetch(endpoint1,{
        mode: 'cors',
        method:"POST",
        body:questionablecrop.slice(-4),
    }).catch(console.error)

    final[counter-1][10]="movedd"
    link=final[counter-1][6]
    var res = link.split("/");
    var len=res.length
    var newpath = link.replace(res[len-2], "confusing");
    final[counter-1][6]=newpath
    console.log(final[counter-1][6])
    
    }
  else{
       
    var fullname=final[counter][6];

    var fname=getFilename(fullname);
    if(fullname.includes(".png") && !fname.includes(".png")){
        fname=fname + ".png";
    }
 
    document.getElementById(fname).style.display="none";
    final[counter][10]='needchange';

   
    questionablecrop.push(cropfilename,inputVal,urlprf,final);
    
  

    const endpoint= "http://localhost:5000/change";

    fetch(endpoint,{
        mode: 'cors',
        method:"POST",
        body:questionablecrop.slice(-4),
    })
    .catch(console.error)

    final[counter][10]="movedd"
    link=final[counter][6]
    var res = link.split("/");
    var len=res.length
    var newpath = link.replace(res[len-2], "confusing");
    final[counter][6]=newpath
    console.log(final[counter][6])
    

}

}
// ------------------------------------------------------------------------------------------------

function deletecrop()
{

if(flag==1)   
{
    document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + "Changed as" + rowsT;
    if (row[10] == "O") {
          document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + " changed as " + rowsT;
    } 
    else {
          if (row[10] == "OR") {
              
              document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + " changed as " + rowsT;
          } 
          else {
              document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + " changed as " + rowsT;
          }
    }

  var fullname=final[counter-1][6];
    
  var fname=getFilename(fullname);
    if(fullname.includes(".png") && !fname.includes(".png")){
        fname=fname + ".png";
    }
    
  document.getElementById(fname).style.display="none";

   var deletecropname=cropped_name;
   

   final[counter-1]='';

   

    var dropdown_content = document.getElementById("dropdown-content")

    var crop_update =document.getElementById("cropfile")


    const endpoint = "http://localhost:5000/";
  


    formfiledata.push(cropfilename,inputVal,urlprf,final)
  

    fetch(endpoint,{
        mode: 'cors',
        method:"POST",
        body:formfiledata.slice(-4),
    })
    .catch(console.error)


    const endpoint1 = "http://localhost:5000/delete";

    formfiledelete.push(deletecropname)
    

    fetch(endpoint1,{
        mode: 'cors',
        method:"POST",
        body:formfiledelete.slice(-1),
    })
    .catch(console.error)


}

else
{

    document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + "Changed as" + rowsT;
    if (row[10] == "O") {
          document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + " changed as " + rowsT;
    } 
    else {
          if (row[10] == "OR") {             
              document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + " changed as " + rowsT;
          } 
          else {
              document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + " changed as " + rowsT;
          }
    }

  var fullname=final[counter][6];
    
  var fname=getFilename(fullname);
    if(fullname.includes(".png") && !fname.includes(".png")){
        fname=fname + ".png";
    }
    
  document.getElementById(fname).style.display="none"; 

   var deletecropname=cropped_name;
   

   final[counter]='';

  

    var dropdown_content = document.getElementById("dropdown-content")
   
    var crop_update =document.getElementById("cropfile")
   

    const endpoint = "http://localhost:5000/";
    

    formfiledata.push(cropfilename,inputVal,urlprf,final)
    

    fetch(endpoint,{
        mode: 'cors',
        method:"POST",
        body:formfiledata.slice(-3),
    })
    .catch(console.error)


    const endpoint1 = "http://localhost:5000/delete";
    formfiledelete.push(deletecropname)
    
    fetch(endpoint1,{
        mode: 'cors',
        method:"POST",
        body:formfiledelete.slice(-1),
    })
    .catch(console.error)

}

}

// --------------------------------end of deletecrop()--------------------------



function loadAllImages(){
    $("#galleryDiv").empty();
 
    
    var fileextension = ".png";
    $.ajax({
  
    url: crop_name,
    success: function (data) {
        //List all .png file names in the page
        $(data).find("a:contains(" + fileextension + ")").each(function () {
            var filename = this.href.replace(window.location.host, "").replace("http://", "");
            var name=filename.substring(1);
          
            $("#galleryDiv").append("<div id='"+name+"' class=\"col-lg-4 col-md-4 col-6 gallery\"> <img class=\"img-fluid img-thumbnail\" onclick=\"imageClicked('" + crop_name + filename.substring(1) + "')\" src='" + crop_name + filename + "'></div>");
        });

        // $('img').ready(function() {
        //     $(this).addClass('img-thumbnail');
        // });

        $('img').click(function(){
            $(this).toggleClass('img-thumbnail1');
        });
      }

});  
}
var crop_name;

function getlinks()
{

var dir = $("input[name=linkpath]").val();
var res = dir.split("/");
var result =res[0]+"//" +res[1]+res[2]+"/";
urlprf=result

fetch(dir).then(function (response) {
  // The API call was successful!
  return response.text();
}).then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

         var ul = doc.querySelector('ul');
  
        $('#result').append(ul);
        $('li a').each(function(i){
            var old_href = $(this).attr('href');
            var new_href = dir+'/'+old_href;
            $(this).attr('href', new_href); 
        });


        $(ul).each(function() {
            var select = $(document.createElement('select')).insertBefore($(this).hide());
            $('>li a', this).each(function() {
                var a = $(this).click(function() {
                    if ($(this).attr('target')==='_blank') {
                         window.open(this.href);
                    }
                    else {
                        window.location.href = this.href;
                    }
                }),
                option = $(document.createElement('option')).appendTo(select).val(this.href).html($(this).html()).click(function() {
                    a.click();
                });
        
            });
        });  

    crop_name=$('select').val();

    loadAllImages();
    $('select').on('change', function() { 
        crop_name=$('select').val();  
        loadAllImages();
    });



}).catch(function (err) {
  console.warn('Something went wrong.', err);
});

  
}


// ------------------------------------------------------------------------------------

var counter =0;
var final=[];
var finalclass=[];
let final_new_crop=[];
let final_crop=[];
var abc=[];
var k=0;

async function getcsv() 
{
    const response=await fetch(cropfilename);
    
    const responseclass=await fetch(classfilename);
    const data=await response.text();
    const dataclass=await responseclass.text();
   
    const rows=data.split('\n');
    const rowsclass=dataclass.split('\n');
    // console.log(rows)
    
    rows.forEach(i=>{
        const row=i.split(',');
        final.push(row);
        x=x+1;
    });

    rowsclass.forEach(i=>{
        const rowclass=i.split(',');
        finalclass.push(rowclass);
    });
    abc = finalclass;

   

    abc.forEach(classInput);
    document.getElementById("classchange").innerHTML += `</form>`
    
    // ------------------------------Aayush Changes JS------------------------
    // document.getElementById("classchange").innerHTML += `</form>
    // </div>`;

    k=k+1;;
    

    let final_crop=final;
   
    var final_new;
    for(row of  final_crop)
    {
      
        final_new=row.slice(0,6);
        
        final_new_crop.push(final_new);
    }
    
}

// -----------------------------------------------------------------------------------

function classInput(item){
    document.getElementById("classchange").innerHTML +=

    `<br/><input class="form-check-input" type="checkbox" name="` +item[0]+`" value="`+item[0]+`">

    <button type="submit" 
        onclick="changeclass(this.value,counter)" class="btn btn-outline-secondary changeTo_btn"
        value="` + item[0] + `" >` + item[0] +
    `</button>`;   
}



var classList=[];    
var coffee;


function filterfunction() {
      classList=[];
      coffee = document.forms[2];  
      var class1 = new Set();      
      var i;      
      for (i = 0; i < coffee.length; i++) {
        if (coffee[i].checked) {
            class1 = coffee[i].value;    
            if (!classList.includes(class1))
                classList.push(class1);
                // alert("pushing into list : "+class1)
        }
      }
      document.getElementById("addClass").innerHTML ="";
      for (i = 0; i < classList.length; i++) {
        
        document.getElementById("addClass").innerHTML += 
             `<button type="submit" 
                onclick="changeclass(this.value,counter)" class="btn btn-outline-success changeTo_btn_filter"
                value="` + classList[i] + `" >` + classList[i] +
             `</button>`;
      }
}

var cropped_name='';

// --------------------------------imageClicked(path)--------------------------------------
function imageClicked(path){

     $(".img-thumbnail").removeClass("img-thumbnail1"); 
       
    counter = final.findIndex(f=> f[6] === path);
        
    var row=final[counter];
    counter=counter+1;   
    var real_image = row[0];
    complete_name='';
    var cropped_image = row[6];
    var imgh = row[7];
    var imgw = row[8];
      
    document.getElementById("img-cropped").src=cropped_image;
   
    x1 = Number(row[1])
    y1 = Number(row[2])
    x2 = Number(row[3])
    y2 = Number(row[4])    
    document.getElementById("img-complete").src=real_image;
    cropped_name = "";    

    //for complete_name
    for(let i=real_image.length-1;i>=0;i--){
      if(real_image[i] != "\\"){
        complete_name = complete_name.concat(real_image[i]);
      }
      else{
        break;
      }
    }
    //for cropped_name
    for(let i=cropped_image.length-1;i>=0;i--){
      if(cropped_image[i] != "\\"){
        cropped_name = cropped_name.concat(cropped_image[i]);
  
      }
      else{
        break;
      }
    }

    cropped_name = reverseString(cropped_name);
  
    complete_name = reverseString(complete_name);
    
    document.getElementById("complete-name").innerHTML = complete_name;

     // -----------------------------Aayush------------------------------
    document.getElementById("canvas").style = "background:url('"+complete_name+"')";

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    
    drawOnImage(x1,y1,x2,y2);

    console.log("Clicked Crop Name : ",cropped_name);
    
    var canvasImg=document.getElementById("canvasImg");
    let dataUrl = canvas.toDataURL();    
    canvasImg['src'] = dataUrl;

    var orgImg=document.getElementById("orgImg");  
    orgImg['src'] = complete_name;
    

    // -----------------------------Aayush------------------------------
    document.getElementById("cropped-name").innerHTML = cropped_name;
    
    rowsT=row[5];
    rowsA=row[9];
    rowsR=row[11];
    document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + "Changed as" + rowsT;
  }


// ------------------------------------testing -----------------------------------
// var click_count=0;
// var ctr_copy;
// if(click_count > 0){
//     document.getElementById(fname).style.border = "none";
// }
// ctr_copy = counter;
// var fullname=final[ctr_copy-1][6];    
// var fname=getFilename(fullname);
// if(fullname.includes(".png") && !fname.includes(".png")){
//     fname = fname + ".png";
// }
// document.getElementById(fname).style.border = "thick solid #0000FF";
// click_count += 1;
// ----------------------------------------------------------------------------



function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"] 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"] 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------



let rows=[];
let complete_name='';
let x1='';
let y1='';
let x2='';
let y2='';
let rowsT='';
rowsA='';
rowsR='';
var formfiledata=[];

function savebeforedata()
{  
  rows.push([complete_name, x1, y1,x2,y2,rowsT]);  
}
  
function saveannotatedata()
{  
  rows.push([complete_name, x1, y1,x2,y2,rowsA]);  
}


function savereclassifydata()
{   
  rows.push([complete_name, x1, y1,x2,y2,rowsR]); 
}

// --------------------------------------------------------------------------------------------

function changeclass(Classname,counter)
{
  alert("selected classname:"+ Classname);

  if(flag==0)
  {
  rowsT=Classname;
  document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + "Changed as" + rowsT;
     if (row[10] == "O") {
            document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + " changed as " + rowsT;
        } 
        else {
            if (row[10] == "OR") {                
                document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + " changed as " + rowsT;
            } else { 
                document.getElementById("class-name").innerHTML = "Annotated as " + final[counter][5] + " changed as " + rowsT;
        }
    }




    final[counter][5]=rowsT;
    final_new_crop[counter][5]=rowsT;
    var dropdown_content = document.getElementById("dropdown-content")
    var crop_update =document.getElementById("cropfile")    

    const endpoint = "http://localhost:5000/";  

    formfiledata.push(cropfilename,inputVal,urlprf,final)    
    fetch(endpoint,{
      mode: 'cors',
      method:"POST",
      body:formfiledata.slice(-4),
    })
    .catch(console.error)

     rows.push([complete_name, x1, y1,x2,y2,rowsT]);     
   }

   else{
        rowsT=Classname;
        document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + "Changed as" + rowsT;
        if (row[10] == "O") {
            document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + " changed as " + rowsT;
        } 
        else {
            if (row[10] == "OR") {
                
                document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + " changed as " + rowsT;
            } else { // 'N'
                document.getElementById("class-name").innerHTML = "Annotated as " + final[counter-1][5] + " changed as " + rowsT;
            }
        }
        final[counter-1][5]=rowsT;
        final_new_crop[counter-1][5]=rowsT;


        var dropdown_content = document.getElementById("dropdown-content")
      
        var crop_update =document.getElementById("cropfile")
       


        const endpoint = "http://localhost:5000/";
       
        
        formfiledata.push(cropfilename,inputVal,urlprf,final)
        
        fetch(endpoint,{
            mode: 'cors',
            method:"POST",
            body:formfiledata.slice(-4),
        })
        .catch(console.error)

        rows.push([complete_name, x1, y1,x2,y2,rowsT]);
    }
}

// -----------------------------------------------------------------------------------------

function downloadData(){
    let csvContent = "";
    
    final_new_crop.forEach(function(rowArray) {
        csvContent += rowArray.join(',');  
        csvContent += "\n";  
    });
    
    let csvContentclass = "";
   
    final.forEach(function(rowArrayclass) {
        csvContentclass += rowArrayclass.join(',');  
        csvContentclass += "\n";  
    });
    
   
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);  
    hiddenElement.target = '_blank';  
    
    var hiddenElementclass = document.createElement('a');  
    hiddenElementclass.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContentclass);  
    hiddenElementclass.target = '_blank';  
    
    hiddenElementclass.download = 'training_crop.csv';  
    hiddenElementclass.click();   
    hiddenElement.download = 'training.csv';  
    hiddenElement.click();  
}
// ---------------------------------------------------------------------------------------------

var answer=[];

function answerablefunc()
{

if(flag==1)  
    {    
    final[counter-1][10]="GG";
    answer.push(cropfilename,inputVal,urlprf,final);   

    const endpoint1= "http://localhost:5000/";
    fetch(endpoint1,{
        mode: 'cors',
        method:"POST",
        body:answer.slice(-4),
    })
    .catch(console.error) 

    }

else{    
    final[counter][10]='GG';   
    answer.push(cropfilename,inputVal,urlprf,final);
   
    const endpoint= "http://localhost:5000/";

    fetch(endpoint,{
        mode: 'cors',
        method:"POST",
        body:answer.slice(-4),
    })
    .catch(console.error)    
    }
}



function showprevimg(){
    if (counter > final.length || counter < 0) {
        counter = 0;
     }
    
     curr = counter;
     for(let i=curr; i>0; i--){
        var row_prev = final[i-1];
        var row = final[i];
        
        var curr_img = row[0];
        var prev_img = row_prev[0];
                
        if(curr_img != prev_img){
            counter=curr-1;
            break;
        }
        curr=curr-1;
    }   
     row = final[counter];
     console.log("imageprev")
     console.log(row[6]);
     var real_image = row[0];
     var cropped_image = row[6];
     var imgh = row[7];
     var imgw = row[8];
     complete_name='';    
     
     document.getElementById("img-cropped").src=cropped_image;
     
     x1 = Number(row[1])
     y1 = Number(row[2])
     x2 = Number(row[3])
     y2 = Number(row[4])
      
     document.getElementById("img-complete").src=real_image;
     cropped_name = "";
     //for complete_name
     for(let i=real_image.length-1;i>=0;i--){
         if(real_image[i] != "\\"){
             complete_name = complete_name.concat(real_image[i]);
         }
         else{
             break;
         }
     }
     //for cropped_name
     for(let i=cropped_image.length-1;i>=0;i--){
         if(cropped_image[i] != "\\"){
             cropped_name = cropped_name.concat(cropped_image[i]);
         }
         else{
             break;
         }
     }
     cropped_name = reverseString(cropped_name);
     complete_name = reverseString(complete_name);
     
     document.getElementById("complete-name").innerHTML = complete_name;
     document.getElementById("canvas").style = "background:url('"+complete_name+"')";
     var canvas = document.getElementById("canvas");
     var ctx = canvas.getContext("2d");
     ctx.canvas.width  = imgw;
     ctx.canvas.height = imgh;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.canvas.width  = imgw;
     ctx.canvas.height = imgh;     
        
     drawOnImage(x1,y1,x2,y2);

     var canvasImg=document.getElementById("canvasImg");
     let dataUrl = canvas.toDataURL();     
     canvasImg['src'] = dataUrl;

     var orgImg=document.getElementById("orgImg");    
     orgImg['src'] = complete_name;
     
     document.getElementById("cropped-name").innerHTML = cropped_name;
    
     rowsT=row[5];     
     rowsA=row[9];
     rowsR=row[11];
     document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " Changed as" + rowsT;
     if (row[10] == "O") {
         document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
     } 
     else {
         if (row[10] == "OR") {
             
             document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
         } else { 
             document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
         }
     }
  
     flag=0;
}


var x=0;
// var cropped_name='';
var flag=1;

var xft;
var yft;

function showPrev(){
	if (counter < 0) {
        counter = 0;
    }
    counter=counter-1;
    counter=counter-1;
    console.log("imgclicked prev")
    console.log(final[counter][6])

    var row = final[counter];
	var real_image = row[0];
    complete_name='';
	var cropped_image = row[6];
    var imgh = row[7];
    var imgw = row[8];

     xft = imgw/400;
     yft = imgh/400;

	document.getElementById("img-cropped").src=cropped_image;

    x1 = Number(row[1])
    y1 = Number(row[2])
    x2 = Number(row[3])
    y2 = Number(row[4])
	//console.log(cropped_image);

	document.getElementById("img-complete").src=real_image;
	cropped_name = "";
	//for complete_name
	for(let i=real_image.length-1;i>=0;i--){
		if(real_image[i] != "\\"){
			complete_name = complete_name.concat(real_image[i]);

		}
		else{
			break;
		}
	}
	//for cropped_name
	for(let i=cropped_image.length-1;i>=0;i--){
		if(cropped_image[i] != "\\"){
			cropped_name = cropped_name.concat(cropped_image[i]);

		}
		else{
			break;
		}
	}
    cropped_name = reverseString(cropped_name);
	complete_name = reverseString(complete_name);
   
	document.getElementById("complete-name").innerHTML = complete_name;
    document.getElementById("canvas").style = "background:url('"+complete_name+"')";
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    // console.log("Canvas HxW", imgh, imgw);
       
    drawOnImage(x1,y1,x2,y2);

    var canvasImg=document.getElementById("canvasImg");
    let dataUrl = canvas.toDataURL();
    
    canvasImg['src'] = dataUrl;

    var orgImg=document.getElementById("orgImg");

    orgImg['src'] = complete_name;
    
	document.getElementById("cropped-name").innerHTML = cropped_name;

	//document.getElementById('fname').value = row[5];

    rowsT=row[5];
    rowsA=row[9];
    rowsR=row[11];
    document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " Changed as" + rowsT;
    if (row[10] == "O") {
            document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
        } 
    else {
        if (row[10] == "OR") {
                
                document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
        } else { // 'N'
             document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
        }
    }

   flag=0
}

y=0
var curr=0;


function shownextimg()
{
    if (counter < 0) {
        counter = 0;
     }
    
     curr = counter;

     for(let i=curr;i<final.length-1;i++){

        var row_nxt = final[i+1];
        var row = final[i];
        
        var curr_img = row[0];
        var nxt_img = row_nxt[0];
                
        if(curr_img != nxt_img){
            counter=curr+1;
            break;
        }
        curr=curr+1;
    }
    // counter=counter-1;
    
   
     row = final[counter-1];
     console.log("nextimg")
     console.log(row[6])
     var real_image = row[0];
     var cropped_image = row[6];
     var imgh = row[7];
     var imgw = row[8];
     complete_name='';

     
     xft = imgw/400;
     yft = imgh/400;

   
     document.getElementById("img-cropped").src=cropped_image;
 
  
     x1 = Number(row[1])
     y1 = Number(row[2])
     x2 = Number(row[3])
     y2 = Number(row[4])
     //console.log(cropped_image);
 
     document.getElementById("img-complete").src=real_image;
     cropped_name = "";
     //for complete_name
     for(let i=real_image.length-1;i>=0;i--){
         if(real_image[i] != "\\"){
             complete_name = complete_name.concat(real_image[i]);
         }
         else{
             break;
         }
     }
     //for cropped_name
     for(let i=cropped_image.length-1;i>=0;i--){
         if(cropped_image[i] != "\\"){
             cropped_name = cropped_name.concat(cropped_image[i]);
         }
         else{
             break;
         }
     }
     cropped_name = reverseString(cropped_name);
     complete_name = reverseString(complete_name);
    
     document.getElementById("complete-name").innerHTML = complete_name;
     document.getElementById("canvas").style = "background:url('"+complete_name+"')";
     var canvas = document.getElementById("canvas");

     var ctx = canvas.getContext("2d");
     ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    
        
     drawOnImage(x1,y1,x2,y2);

     var canvasImg=document.getElementById("canvasImg");
     let dataUrl = canvas.toDataURL();
   
     canvasImg['src'] = dataUrl;
     canvasImg.style.height=imgh/2;

     var orgImg=document.getElementById("orgImg");
     
     orgImg['src'] = complete_name;
     orgImg.style.height=imgh/2;

     document.getElementById("cropped-name").innerHTML = cropped_name;
  
    
     rowsT=row[5];
     
     rowsA=row[9];
     rowsR=row[11];
     document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " Changed as" + rowsT;
     if (row[10] == "O") {
         document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
     } 
     else {
         if (row[10] == "OR") {          
             document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
         } else { 
             document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
         }
     }
 
 
     flag=1;
}




function showNext(){
    if (counter < 0) {
       counter = 0;
    }
    console.log("next",final[counter][6])
    var row = final[counter];
    var real_image = row[0];
    var cropped_image = row[6];
    var imgh = row[7];
    var imgw = row[8];
    complete_name='';
    //console.log(real_image, cropped_image);
    
    document.getElementById("img-cropped").src=cropped_image;

   
    x1 = Number(row[1])
    y1 = Number(row[2])
    x2 = Number(row[3])
    y2 = Number(row[4])
    //console.log(cropped_image);

    document.getElementById("img-complete").src=real_image;
    cropped_name = "";
    //for complete_name
    for(let i=real_image.length-1;i>=0;i--){
        if(real_image[i] != "\\"){
            complete_name = complete_name.concat(real_image[i]);
        }
        else{
            break;
        }
    }
    //for cropped_name
    for(let i=cropped_image.length-1;i>=0;i--){
        if(cropped_image[i] != "\\"){
            cropped_name = cropped_name.concat(cropped_image[i]);
        }
        else{
            break;
        }
    }
    cropped_name = reverseString(cropped_name);
    complete_name = reverseString(complete_name);
    
    document.getElementById("complete-name").innerHTML = complete_name;
    document.getElementById("canvas").style = "background:url('"+complete_name+"')";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width  = imgw;
    ctx.canvas.height = imgh;
   
       
    drawOnImage(x1,y1,x2,y2);

    var canvasImg=document.getElementById("canvasImg");
    let dataUrl = canvas.toDataURL();  
    canvasImg['src'] = dataUrl;

    var orgImg=document.getElementById("orgImg");     
    orgImg['src'] = complete_name;
     

    document.getElementById("cropped-name").innerHTML = cropped_name;
  
   
    rowsT=row[5];
    
    rowsA=row[9];
    rowsR=row[11];
    document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " Changed as" + rowsT;
    if (row[10] == "O") {
        document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
    } 
    else {
        if (row[10] == "OR") {
            
            document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
        } else { // 'N'
            document.getElementById("class-name").innerHTML = "Annotated as " + row[5] + " changed as " + rowsT;
        }
    }

    counter=counter+1;
    flag=1;
}
// ---------------------------------------draw annotation--------------------------


let clear=0;
var anno;
var coordinate=[];
let config;

function draw_func(){
    
    if(clear != 0){
        anno.clearAnnotations();
    }
    if (counter < 0) {
        counter = 0;
     }
     var row = final[counter];
     var real_image = row[0];
     var cropped_image = row[6];
     var imgh = row[7];
     var imgw = row[8];
     complete_name='';
      
     
     for(let i=real_image.length-1;i>=0;i--){
         if(real_image[i] != "\\"){
             complete_name = complete_name.concat(real_image[i]);
         }
         else{
             break;
         }
     }
     
     complete_name = reverseString(complete_name);     
    
     var drawOnImage=document.getElementById("drawOnImage");       
     drawOnImage['src'] = complete_name;
    
    config = {
        image: 'drawOnImage',
        readOnly: false
      };
    anno = Annotorious.init(config);
  
    clear++;      
}
let dx1;
let dy1;
let dx2;
let dy2;
let coords={};

function save_anno_func(){    
    var annotations = anno.getAnnotations();  
    
    annotations.forEach(obj => {
        console.log(obj)
        let val = obj.target.selector.value;
        let value = val.replace('xywh=pixel:','');
        let arr = value.split(',');
        dx1 = Math.trunc(arr[0]);
        dy1 = Math.trunc(arr[1]);
        dx2 = Math.trunc(arr[2]) + dx1;
        dy2 = Math.trunc(arr[3]) + dy1;
        coords = {
            dx1,dy1,dx2,dy2
        }
        console.log(coords);           
    });

    if(flag==1)  
    {
    
    final[counter-1][1]=Number(dx1);
    final[counter-1][2]=Number(dy1);
    final[counter-1][3]=Number(dx2);
    final[counter-1][4]=Number(dy2);

    coordinate.push(cropfilename,inputVal,urlprf,final);
    console.log(final[counter-1][6]);

    const endpoint1= "http://localhost:5000/";

    fetch(endpoint1,{
        mode: 'cors',
        method:"POST",
        body:coordinate.slice(-4),
    })
    .catch(console.error)
 
    }
  else{
    final[counter][1]=Number(dx1);
    final[counter][2]=Number(dy1);
    final[counter][3]=Number(dx2);
    final[counter][4]=Number(dy2);
    
    coordinate.push(cropfilename,inputVal,urlprf,final);
    console.log(final[counter][6]);

    const endpoint= "http://localhost:5000/";

    fetch(endpoint,{
        mode: 'cors',
        method:"POST",
        body:coordinate.slice(-4),
    })
    .catch(console.error)
    
    }
    alert("New annotation drawing saved.");        
    window.setTimeout(function(){
        window.location.href = "#firstSection";
    },200)

    anno.destroy(); 
    anno.removeAnnotation(config);
    // showNext();
    // showPrev();    
}

function clearAnn(){
    anno.clearAnnotations();
}

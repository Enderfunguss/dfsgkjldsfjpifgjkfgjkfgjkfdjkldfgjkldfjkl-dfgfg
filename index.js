let status = '';
let objects = [];
let audio = '';
let objName = '';

function preload(){

}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,500,500);

    if(status != ''){
        objectDetector.detect(video,gotResult);

        for(i=0; i < objects.length; i++){
            document.getElementById('harold').innerHTML = 'Status: detected all objects!';
            fill('#');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + '' + percent + '%',objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke('#');
            rect(objects[i].y,objects[i].x,objects[i].width,objects[i].height);   

            if(objects[i].label == objName){
                video.stop();
                document.getElementById('objFound').innerHTML = objName + ' found!';
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objName + 'found!');
                synth.speak(utterThis);
            } else {
                document.getElementById('objFound').innerHTML = objName + ' is being found OR it cannot be found!';
                
            }
        }

    }
}   

function modelLoaded(){
    console.log('model loaded!');
    status = true;
}

function gotResult(error,result){
    if(error){
        console.error(error);
    }
    console.log(result);
    objects = result;
}

function start(){
    objectDetector = ml5.objectDetector ('cocossd',modelLoaded);
    document.getElementById('harold').innerHTML = 'Status: started!';
    objName = document.getElementById('objName').value;
}




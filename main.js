//https://teachablemachine.withgoogle.com/models/Wt9jbxLF5/model.json

prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    imageFormat: 'png',
    pngQuality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SguJYFNqA//model.json', modelLoaded);

function modelLoaded() 
{
    console.log('Model Loaded!')
}

function speak()
{
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsao é " + prediction_1;
    speakData2 = "E a segunda previsao é " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2 ) ;
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult());
}

function gotResult(error, results)
{
    if (error) 
    {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Joia")
        {
            document.getElementById("updateEmoji").innerHTML = "👍";
        }
        if(results[0].label == "Hangloose")
        {
            document.getElementById("updateEmoji").innerHTML = "🤌";
        }
        if(results[0].label == "Paz")
        {
            document.getElementById("updateEmoji").innerHTML = "👌";
        }

        if(results[1].label == "Joia")
        {
            document.getElementById("updateEmoji").innerHTML = "👍";
        }
        if(results[1].label == "Hangloose")
        {
            document.getElementById("updateEmoji").innerHTML = "🤌";
        }
        if(results[1].label == "Paz")
        {
            document.getElementById("updateEmoji").innerHTML = "👌";
        }
    }   
}
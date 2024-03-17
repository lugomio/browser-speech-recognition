const transcriptOutput = document.querySelector(".transcript .output");
const toggleBtn = document.querySelector("#toggleRecognition");
const copyBtn = document.querySelector("#copy");
const lang = document.querySelector("#lang");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = lang.value;
recognition.interimResults = true;

let p = document.createElement('p');
transcriptOutput.appendChild(p);

function toggleRecognition(){
    if(!toggleBtn.classList.contains("active")){
        recognition.start();
    } else{
        recognition.stop();
    }
    toggleBtn.classList.toggle("active");
}

function output(e){
    p.textContent = e.results[0][0].transcript;
    
    if(e.results[0].isFinal){
        p = document.createElement('p');
        transcriptOutput.appendChild(p);
    }
}

function copyToClipboard(){
    navigator.clipboard.writeText(transcriptOutput.textContent);
}

function error(e){
    alert(`Ocorreu um erro, pfvr verifique as permissões de uso do microfone.\nError: ${e.error}.`)
    console.error(e.error);
    recognition.stop();
    toggleBtn.classList.remove("active");
}

function keepRecognition(){
    if(toggleBtn.classList.contains("active")){
        recognition.start();
    } else{
        recognition.stop();
    }
}

toggleBtn.addEventListener('click', toggleRecognition);
copyBtn.addEventListener('click', copyToClipboard);
recognition.addEventListener('result', output);
recognition.addEventListener('end', keepRecognition);
recognition.addEventListener('error', error);
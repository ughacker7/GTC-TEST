let time = 60 * 40; // 40 minutes in seconds
let timerInterval = null;
let screenWakeLock = null;
let isProctorWarningActive = false;

// 🔗 GUARANTEED SCRIPT URL FALLBACK (Always accessible)
const SCRIPT_URL = window.SCRIPT_URL || "https://script.google.com/macros/s/AKfycbzQysEVoQmSS6w_cEeLYK1g95T16cUT5taIdjXfdDLUsOggqFnVMU5GDrl3C3c-Olvt/exec";
window.SCRIPT_URL = SCRIPT_URL;

// 🌐 Language Management (Reads from login selection)
let currentExamLang = localStorage.getItem("lang") || localStorage.getItem("exam_lang") || localStorage.getItem("selected_lang") || "hi";

// Track student answers by index (0, 1, 2, 3) to preserve selection during language toggle
let currentQuestionIndex = 0;
let userAnswersIndex = []; 
let userAnswers = [];
let retestAuthorizedKey = "";

// 🔑 REAL MASTER INVIGILATOR PASSCODE
const MASTER_RETEST_PASS = "GTC#2000";

// 📹 Real AI Vision & Proctoring Variables
let proctorMediaStream = null;
let faceMissingCounter = 0;
let handCoverCounter = 0;
let multipleFacesCounter = 0;
let faceScanInterval = null;
let mpFaceDetector = null;
let nativeFaceDetector = null;
let isAiModelReady = false;

const scanCanvas = document.createElement("canvas");
scanCanvas.width = 160;
scanCanvas.height = 120;
const scanCtx = scanCanvas.getContext("2d", { willReadFrequently: true });

async function setupLiveProctorCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",
                width: { ideal: 320 },
                height: { ideal: 240 }
            },
            audio: false
        });

        proctorMediaStream = stream;

        let cameraContainer = document.getElementById("proctorCameraContainer");
        if (!cameraContainer) {
            cameraContainer = document.createElement("div");
            cameraContainer.id = "proctorCameraContainer";
            cameraContainer.innerHTML = `
                <div style="position: fixed; bottom: 75px; right: 16px; z-index: 99990; display: flex; flex-direction: column; align-items: center; pointer-events: none;">
                    <div style="width: 78px; height: 78px; border-radius: 50%; overflow: hidden; border: 2.5px solid #ef4444; box-shadow: 0 4px 18px rgba(239, 68, 68, 0.45); background: #000; position: relative;">
                        <video id="proctorVideoFeed" autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
                    </div>
                    <span id="camRecBadge" style="margin-top: 4px; background: #ffffff; border: 1.5px solid #ef4444; color: #ef4444; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                        🔴 AI ACTIVE
                    </span>
                </div>
            `;
            document.body.appendChild(cameraContainer);
        }

        const videoEl = document.getElementById("proctorVideoFeed");
        if (videoEl) {
            videoEl.srcObject = stream;
        }

        const camLockModal = document.getElementById("camPermissionGateModal");
        if (camLockModal) camLockModal.style.display = "none";

        initAiFaceDetectionPipeline(videoEl);
        return true;

    } catch (err) {
        console.warn("Front Camera permission skipped or blocked:", err);
        return false;
    }
}

async function initAiFaceDetectionPipeline(videoEl) {
    // 1. Try Mobile Chrome Hardware FaceDetector API (fastest, zero CPU overhead)
    if ('FaceDetector' in window) {
        try {
            nativeFaceDetector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 3 });
            isAiModelReady = true;
        } catch (e) {
            nativeFaceDetector = null;
        }
    }

    // 2. Try Official Google MediaPipe Face Detection
    if (!nativeFaceDetector && typeof FaceDetection !== 'undefined') {
        try {
            mpFaceDetector = new FaceDetection({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
            });
            mpFaceDetector.setOptions({
                model: 'short',
                minDetectionConfidence: 0.55
            });
            mpFaceDetector.onResults(handleMediaPipeResults);
            isAiModelReady = true;
        } catch (err) {
            mpFaceDetector = null;
        }
    }

    startSmartAiVisionLoop(videoEl);
}

function startSmartAiVisionLoop(videoEl) {
    if (faceScanInterval) clearInterval(faceScanInterval);

    faceScanInterval = setInterval(async () => {
        if (localStorage.getItem("testSubmitted") === "true") {
            clearInterval(faceScanInterval);
            return;
        }

        if (!videoEl || videoEl.readyState < 2) return;

        // Path A: Hardware FaceDetector API
        if (nativeFaceDetector) {
            try {
                const faces = await nativeFaceDetector.detect(videoEl);
                processDetectedFaces(faces.length, faces);
                return;
            } catch (err) {}
        }

        // Path B: MediaPipe Face AI
        if (mpFaceDetector) {
            try {
                await mpFaceDetector.send({ image: videoEl });
                return;
            } catch (err) {}
        }

        // Path C: Real-Time Hand Occlusion & Light Fallback Scanner
        fallbackHandAndFaceScanner(videoEl);

    }, 1400);
}

function handleMediaPipeResults(results) {
    const faces = results.detections || [];
    processDetectedFaces(faces.length, faces);
}

function processDetectedFaces(faceCount, rawData = []) {
    const badge = document.getElementById("camRecBadge");

    if (faceCount === 0) {
        faceMissingCounter++;
        handCoverCounter++;

        if (badge) {
            badge.textContent = "⚠ FACE COVERED / HIDDEN";
            badge.style.color = "#d97706";
            badge.style.borderColor = "#d97706";
        }

        if (faceMissingCounter >= 3) {
            faceMissingCounter = 0;
            reportStudentIncident("चेहरा छिपाया / हाथ आगे किया");
            speakVoiceWarning("अपना चेहरा और आँखें स्पष्ट रखें, हाथ से मुंह छिपाना सख्त मना है!");
        }
    } else if (faceCount > 1) {
        multipleFacesCounter++;
        faceMissingCounter = 0;

        if (badge) {
            badge.textContent = "🚨 MULTIPLE FACES";
            badge.style.color = "#dc2626";
            badge.style.borderColor = "#dc2626";
        }

        if (multipleFacesCounter >= 2) {
            multipleFacesCounter = 0;
            reportStudentIncident(`अतिरिक्त व्यक्ति उपस्थित (${faceCount} चेहरे मिले)`);
            speakVoiceWarning("कैमरे के सामने केवल एक परीक्षार्थी की अनुमति है!");
        }
    } else {
        faceMissingCounter = 0;
        handCoverCounter = 0;
        multipleFacesCounter = 0;

        if (badge) {
            badge.textContent = "🔴 LIVE REC";
            badge.style.color = "#ef4444";
            badge.style.borderColor = "#ef4444";
        }
    }
}

function fallbackHandAndFaceScanner(videoEl) {
    try {
        scanCtx.drawImage(videoEl, 0, 0, 160, 120);
        const imgData = scanCtx.getImageData(0, 0, 160, 120);
        const pixels = imgData.data;

        let skinPixelCount = 0;
        let edgeGradientCount = 0;
        let totalLuma = 0;
        const totalPixels = 160 * 120;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const luma = 0.299 * r + 0.587 * g + 0.114 * b;
            totalLuma += luma;

            // Skin tone range detection
            if (r > 60 && g > 35 && b > 20 && (r - g) > 12 && r > b) {
                skinPixelCount++;
            }

            // Facial feature contrasts
            if (i > 640) {
                const prevLuma = 0.299 * pixels[i - 640] + 0.587 * pixels[i - 639] + 0.114 * pixels[i - 638];
                if (Math.abs(luma - prevLuma) > 38) {
                    edgeGradientCount++;
                }
            }
        }

        const avgLuma = totalLuma / totalPixels;
        const skinRatio = skinPixelCount / totalPixels;
        const contrastRatio = edgeGradientCount / totalPixels;

        // If covered by hand: skin exists but contours drop
        const isHandCovering = (skinRatio > 0.35 && contrastRatio < 0.015);
        const isFaceMissing = (skinRatio < 0.08) || (avgLuma < 15) || (avgLuma > 248);

        if (isHandCovering || isFaceMissing) {
            processDetectedFaces(0);
        } else {
            processDetectedFaces(1);
        }

    } catch (e) {
        console.warn("Fallback scanner issue:", e);
    }
}

let studentHeartbeatInterval = null;

function startStudentStatusPinger() {
    const sRoll = localStorage.getItem("roll") || "";
    const sName = localStorage.getItem("name") || "Student";
    const targetScriptUrl = window.SCRIPT_URL || SCRIPT_URL;
    if (!sRoll || !targetScriptUrl) return;

    if (studentHeartbeatInterval) clearInterval(studentHeartbeatInterval);

    const sendPing = async (incidentText = "Normal") => {
        if (localStorage.getItem("testSubmitted") === "true") {
            clearInterval(studentHeartbeatInterval);
            return;
        }

        try {
            const formData = new URLSearchParams();
            formData.append("action", "ping_status");
            formData.append("roll", sRoll);
            formData.append("name", sName);
            formData.append("qno", String(currentQuestionIndex + 1));
            formData.append("incident", incidentText);

            await fetch(targetScriptUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            });
        } catch (e) {}
    };

    sendPing("Normal");
    studentHeartbeatInterval = setInterval(() => sendPing("Normal"), 4000);
}

function reportStudentIncident(incidentDescription) {
    const sRoll = localStorage.getItem("roll") || "";
    const sName = localStorage.getItem("name") || "Student";
    const targetScriptUrl = window.SCRIPT_URL || SCRIPT_URL;
    if (!sRoll || !targetScriptUrl) return;

    try {
        const formData = new URLSearchParams();
        formData.append("action", "ping_status");
        formData.append("roll", sRoll);
        formData.append("name", sName);
        formData.append("qno", String(currentQuestionIndex + 1));
        formData.append("incident", incidentDescription);

        fetch(targetScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()
        }).catch(() => {});
    } catch (e) {}
}

function playPoliceEmergencySiren(callback) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1600, ctx.currentTime);

        const now = ctx.currentTime;
        const totalWails = 3;
        const wailTime = 0.42;

        osc.frequency.setValueAtTime(650, now);
        for (let i = 0; i < totalWails; i++) {
            const start = now + (i * wailTime);
            const peak = start + (wailTime / 2);
            const end = start + wailTime;
            osc.frequency.linearRampToValueAtTime(1350, peak);
            osc.frequency.linearRampToValueAtTime(650, end);
        }

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.05);
        gain.gain.setValueAtTime(0.45, now + (totalWails * wailTime) - 0.08);
        gain.gain.linearRampToValueAtTime(0.001, now + (totalWails * wailTime));

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        const totalDuration = totalWails * wailTime;
        osc.stop(now + totalDuration);

        setTimeout(() => {
            if (typeof callback === "function") callback();
        }, (totalDuration * 1000) + 80);

    } catch (e) {
        if (typeof callback === "function") callback();
    }
}

function speakVoiceWarning(messageText) {
    let fullAnnouncement = messageText;

    playPoliceEmergencySiren(() => {
        try {
            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=hi&q=${encodeURIComponent(fullAnnouncement)}`;
            const audio = new Audio(ttsUrl);
            audio.playbackRate = 0.95;

            audio.onerror = () => fallbackSpeechSynthesis(fullAnnouncement);
            audio.play().catch(() => fallbackSpeechSynthesis(fullAnnouncement));
        } catch (e) {
            fallbackSpeechSynthesis(fullAnnouncement);
        }
    });
}

function fallbackSpeechSynthesis(text) {
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "hi-IN";
        utterance.rate = 0.92;
        utterance.pitch = 1.05;

        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(v => (v.lang && (v.lang.includes("hi") || v.lang.includes("IN"))) || (v.name && v.name.includes("India")));
        if (hindiVoice) {
            utterance.voice = hindiVoice;
        }

        window.speechSynthesis.speak(utterance);
    } catch (err) {}
}

let proctorPollInterval = null;
let isPollPending = false;

function startProctorLiveListener() {
    const studentRoll = localStorage.getItem("roll") || "";
    if (!studentRoll || !window.SCRIPT_URL) return;

    if (proctorPollInterval) clearInterval(proctorPollInterval);

    const checkNow = async () => {
        if (localStorage.getItem("testSubmitted") === "true") {
            clearInterval(proctorPollInterval);
            return;
        }
        if (isPollPending) return;

        try {
            isPollPending = true;
            const checkUrl = `${window.SCRIPT_URL}?action=check_warning&roll=${encodeURIComponent(studentRoll)}&_t=${Date.now()}`;
            const res = await fetch(checkUrl, { method: "GET" });
            const data = await res.json();
            isPollPending = false;

            if (data && data.hasWarning && data.message) {
                isProctorWarningActive = true;
                speakVoiceWarning(data.message);
                showCustomNotification(`🚨 शिक्षक की लाइव चेतावनी:<br><br><b style="color:#dc2626; font-size:16px;">"${data.message}"</b>`, "error", () => {
                    setTimeout(() => { isProctorWarningActive = false; }, 2000);
                });
            }
        } catch (e) {
            isPollPending = false;
        }
    };

    checkNow();
    proctorPollInterval = setInterval(checkNow, 1200);
}

async function requestScreenWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            screenWakeLock = await navigator.wakeLock.request('screen');
            screenWakeLock.addEventListener('release', () => {
                screenWakeLock = null;
            });
        }
    } catch (err) {}
}

function startTimer() {
    if (!window.localTimeTracker) {
        window.localTimeTracker = Date.now();
    }

    requestScreenWakeLock();

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(function() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerHTML = `⏱ Time Left : ${minutes}:${seconds}`;
        }
        
        if (time <= 0) {
            clearInterval(timerInterval);
            showCustomNotification("⏰ समय समाप्त! आपका टेस्ट ऑटोमैटिक सबमिट हो रहा है।", "info", () => {
                submitTest(false);
            });
        }
        time--;
    }, 1000);
}

let warningCount = 0;
let isAntiCheatDebounce = false; 
let isSubmittingProcess = false; 

function handleCheatingAttempt() {
    if (isProctorWarningActive) return;
    if (localStorage.getItem("testSubmitted") === "true" || isSubmittingProcess) return;
    if (!window.location.pathname.includes("test")) return;

    if (isAntiCheatDebounce) return; 

    isAntiCheatDebounce = true;
    setTimeout(() => {
        isAntiCheatDebounce = false;
    }, 1500); 

    warningCount++;
    let remaining = 6 - warningCount;

    reportStudentIncident(`स्क्रीन स्विच (${warningCount}/6)`);
    
    if (warningCount >= 6) {
        showCustomNotification("🚨 सुरक्षा चेतावनी: आपने 6 बार स्क्रीन स्विच की है। आपका टेस्ट अब ऑटोमैटिक सबमिट किया जा रहा है!", "error", () => {
            submitTest(true); 
        });
    } else {
        showCustomNotification(`⚠️ चेतावनी ${warningCount}/6: टेस्ट स्क्रीन से बाहर जाना मना है! यदि आपने ${remaining} बार और ऐसा किया, तो टेस्ट ऑटोमैटिक सबमिट हो जाएगा।`, "warning");
    }
}

document.addEventListener("visibilitychange", async function() {
    if (document.hidden) {
        handleCheatingAttempt();
    } else {
        if (!screenWakeLock && localStorage.getItem("testSubmitted") !== "true") {
            await requestScreenWakeLock();
        }
    }
});

function showCustomNotification(message, type = "info", callback = null) {
    const modal = document.getElementById("customDialogModal");
    const msgEl = document.getElementById("customDialogMsg");
    const iconEl = document.getElementById("customDialogIcon");
    const okBtn = document.getElementById("customDialogOkBtn");
    const cancelBtn = document.getElementById("customDialogCancelBtn");

    if (!modal || !msgEl) {
        if (typeof callback === "function") callback();
        return;
    }

    msgEl.innerHTML = message;
    if (cancelBtn) cancelBtn.style.display = "none";
    if (iconEl) iconEl.textContent = type === "error" ? "🚨" : (type === "warning" ? "⚠️" : "📢");

    modal.style.display = "flex";

    okBtn.onclick = function() {
        modal.style.display = "none";
        if (typeof callback === "function") callback();
    };
}

function showCustomConfirm(message, onConfirm, onCancel = null) {
    const modal = document.getElementById("customDialogModal");
    const msgEl = document.getElementById("customDialogMsg");
    const iconEl = document.getElementById("customDialogIcon");
    const okBtn = document.getElementById("customDialogOkBtn");
    const cancelBtn = document.getElementById("customDialogCancelBtn");

    if (!modal || !msgEl) {
        if (typeof onConfirm === "function") onConfirm();
        return;
    }

    msgEl.innerHTML = message;
    if (cancelBtn) cancelBtn.style.display = "inline-block";
    if (iconEl) iconEl.textContent = "❓";

    modal.style.display = "flex";

    okBtn.onclick = function() {
        modal.style.display = "none";
        if (typeof onConfirm === "function") onConfirm();
    };

    if (cancelBtn) {
        cancelBtn.onclick = function() {
            modal.style.display = "none";
            if (typeof onCancel === "function") onCancel();
        };
    }
}

function changeQuestionLanguage(newLang) {
    if (!newLang || (newLang !== "hi" && newLang !== "en")) return;
    
    currentExamLang = newLang;
    localStorage.setItem("lang", newLang);
    localStorage.setItem("exam_lang", newLang);
    localStorage.setItem("selected_lang", newLang);

    const langSelect = document.getElementById("examLangSelect");
    if (langSelect && langSelect.value !== newLang) {
        langSelect.value = newLang;
    }

    showQuestion(currentQuestionIndex);
}

function getActiveOptionsList(qData) {
    if (!qData) return [];
    if (currentExamLang === "en" && Array.isArray(qData.options_en)) {
        return qData.options_en;
    }
    if (currentExamLang === "hi" && Array.isArray(qData.options_hi)) {
        return qData.options_hi;
    }
    return qData.options_hi || qData.options_en || qData.options || [];
}

function showQuestion(index) {
    if (typeof questions === 'undefined' || !questions[index]) return;
    
    currentQuestionIndex = index;
    window.index = index; 
    
    const qData = questions[index];
    
    const qnoElem = document.getElementById("qno");
    const totalCountEl = document.getElementById("totalQuestionsCount");
    const questionElem = document.getElementById("question");

    if (qnoElem) qnoElem.textContent = index + 1;
    if (totalCountEl) totalCountEl.textContent = questions.length;
    
    let questionText = (currentExamLang === "en" && qData.question_en) 
        ? qData.question_en 
        : (qData.question_hi || qData.question || "");
        
    if (questionElem) questionElem.innerHTML = questionText;
    
    let optionsList = getActiveOptionsList(qData);

    for (let i = 1; i <= 4; i++) {
        const opElem = document.getElementById(`op${i}`);
        if (opElem && optionsList[i - 1] !== undefined) {
            opElem.innerHTML = optionsList[i - 1];
        }
    }
    
    let optionsRadio = document.getElementsByName("answer");
    const selectedIdx = userAnswersIndex[index];

    for (let i = 0; i < optionsRadio.length; i++) {
        optionsRadio[i].checked = (selectedIdx !== undefined && selectedIdx !== null && selectedIdx === i);
    }

    updateOptionSelectionUI();
    
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (prevBtn) prevBtn.disabled = (index === 0);
    if (index === questions.length - 1) {
        if (nextBtn) nextBtn.style.display = "none";
        if (submitBtn) submitBtn.style.display = "inline-block";
    } else {
        if (nextBtn) nextBtn.style.display = "inline-block";
        if (submitBtn) submitBtn.style.display = "none";
    }
    
    updateQuestionPad();
}

function updateOptionSelectionUI() {
    let optionsRadio = document.getElementsByName("answer");
    for (let i = 0; i < optionsRadio.length; i++) {
        let parentContainer = optionsRadio[i].closest('.option-container');
        if (parentContainer) {
            if (optionsRadio[i].checked) {
                parentContainer.classList.add('selected');
            } else {
                parentContainer.classList.remove('selected');
            }
        }
    }
}

function handleInstantOptionSelect() {
    saveSelectedAnswer();
    updateOptionSelectionUI();
    updateQuestionPad();
}

function saveSelectedAnswer() {
    try {
        if (typeof questions === 'undefined' || !questions[currentQuestionIndex]) return;
        const optionsRadio = document.querySelectorAll('input[name="answer"]');
        let chosenIdx = null;

        for (let i = 0; i < optionsRadio.length; i++) {
            if (optionsRadio[i].checked) {
                chosenIdx = i;
                break;
            }
        }

        if (chosenIdx !== null) {
            userAnswersIndex[currentQuestionIndex] = chosenIdx;
            const currentOpts = getActiveOptionsList(questions[currentQuestionIndex]);
            if (Array.isArray(currentOpts) && currentOpts[chosenIdx] !== undefined) {
                userAnswers[currentQuestionIndex] = currentOpts[chosenIdx];
            } else {
                userAnswers[currentQuestionIndex] = String(chosenIdx);
            }
        }
    } catch (e) {
        console.warn("Non-fatal selection save issue:", e);
    }
}

function nextQuestion() {
    try {
        saveSelectedAnswer();
    } catch (e) {}

    if (typeof questions !== 'undefined' && currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    try {
        saveSelectedAnswer();
    } catch (e) {}

    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function updateQuestionPad() {
    const padContainer = document.getElementById("questionList");
    if (!padContainer || typeof questions === 'undefined') return;
    
    let padHTML = "";
    for (let i = 0; i < questions.length; i++) {
        let isAnswered = (userAnswersIndex[i] !== null && userAnswersIndex[i] !== undefined);
        let isCurrent = (i === currentQuestionIndex);
        
        let bgCol = "#f1f5f9";
        let textCol = "#1e293b";
        let borderCol = "#cbd5e1";

        if (isAnswered) {
            bgCol = "#10b981";
            textCol = "#ffffff";
            borderCol = "#059669";
        } else if (isCurrent) {
            bgCol = "#0284c7";
            textCol = "#ffffff";
            borderCol = "#0369a1";
        }
        
        let activeStyle = isCurrent 
            ? "border: 2px solid #0369a1; box-shadow: 0 0 10px rgba(2, 132, 199, 0.45); transform: scale(1.06);" 
            : `border: 1.5px solid ${borderCol};`;
        
        padHTML += `<button type="button" onclick="jumpToQuestion(${i})" class="pad-btn" style="margin: 2px; border-radius: 8px; cursor: pointer; background: ${bgCol}; color: ${textCol}; font-weight: 700; ${activeStyle}">${i + 1}</button>`;
    }
    padContainer.innerHTML = padHTML;

    setTimeout(() => {
        const activeBtn = padContainer.children[currentQuestionIndex];
        if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
            activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, 40);
}

function jumpToQuestion(index) {
    saveSelectedAnswer();
    showQuestion(index);
}

function clearSelectedResponse() {
    let optionsRadio = document.getElementsByName("answer");
    for (let i = 0; i < optionsRadio.length; i++) {
        optionsRadio[i].checked = false;
    }
    userAnswersIndex[currentQuestionIndex] = null;
    userAnswers[currentQuestionIndex] = null;
    updateOptionSelectionUI();
    updateQuestionPad();
}

let selectedStarCount = 5;
let isFeedbackSubmitting = false;

function setRating(count) {
    if (isFeedbackSubmitting) return;
    selectedStarCount = count;
    const stars = document.querySelectorAll(".star-rating");
    stars.forEach((s, idx) => {
        s.style.color = (idx < count) ? "#f59e0b" : "#cbd5e1";
    });
}

async function submitStudentFeedback() {
    if (isFeedbackSubmitting) return;
    isFeedbackSubmitting = true;

    const feedbackBtn = document.querySelector("#feedbackContainer button");
    if (feedbackBtn) {
        feedbackBtn.disabled = true;
        feedbackBtn.textContent = "Saving Feedback... ⏳";
    }

    const feedbackNote = document.getElementById("feedbackText") ? document.getElementById("feedbackText").value : "";
    const sheetScriptUrl = window.SCRIPT_URL;

    let payload = {
        action: "feedback",
        name: localStorage.getItem("name") || "Student",
        roll: localStorage.getItem("roll") || "N/A",
        class: localStorage.getItem("class") || "N/A",
        rating: selectedStarCount + " Stars",
        feedback: feedbackNote
    };

    try {
        await fetch(sheetScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(payload).toString()
        });

        const container = document.getElementById("feedbackContainer");
        const thanks = document.getElementById("feedbackThanks");
        if (container) container.style.display = "none";
        if (thanks) thanks.style.display = "block";

    } catch (e) {
        isFeedbackSubmitting = false;
        if (feedbackBtn) feedbackBtn.disabled = false;
        showCustomNotification("⚠️ फीडबैक सेव नहीं हो पाया! कृपया पुनः प्रयास करें।", "warning");
    }
}

function submitTestFromButton() {
    showCustomConfirm("क्या आप वाकई अपना टेस्ट सबमिट करना चाहते हैं?", () => {
        submitTest(false);
    });
}

async function submitTest(isCheating = false) {
    if (localStorage.getItem("testSubmitted") === "true") {
        showCustomNotification("⚠️ यह टेस्ट पहले ही सबमिट किया जा चुका है!", "warning");
        return;
    }

    if (isSubmittingProcess) return;
    isSubmittingProcess = true;

    saveSelectedAnswer();
    if (timerInterval) clearInterval(timerInterval);
    if (proctorPollInterval) clearInterval(proctorPollInterval);
    if (faceScanInterval) clearInterval(faceScanInterval);
    if (studentHeartbeatInterval) clearInterval(studentHeartbeatInterval);

    if (proctorMediaStream) {
        proctorMediaStream.getTracks().forEach(track => track.stop());
    }
    const camBox = document.getElementById("proctorCameraContainer");
    if (camBox) camBox.style.display = "none";

    if (screenWakeLock !== null) {
        screenWakeLock.release().catch(() => {});
        screenWakeLock = null;
    }

    // 🌀 SHOW ROTATING SPINNER OVERLAY DURING SUBMISSION
    let loading = document.getElementById("loadingOverlay");
    if (loading) {
        const loadingText = document.getElementById("loadingText");
        if (loadingText) loadingText.innerHTML = `<span>टेस्ट Google Sheet में सुरक्षित सेव हो रहा है... ⏳</span>`;
        loading.style.display = "flex";
        loading.style.visibility = "visible";
    }

    let trackTime = window.localTimeTracker || Date.now();
    let totalElapsedSeconds = Math.max(1, Math.floor((Date.now() - trackTime) / 1000));
    let computedMinutes = Math.floor(totalElapsedSeconds / 60);
    let computedSeconds = totalElapsedSeconds % 60;
    let finalTimeFormat = `${computedMinutes} मिनट ${computedSeconds} सेकंड`;
    localStorage.setItem("savedTimeTaken", finalTimeFormat);
    
    let correctCount = 0;
    let wrongCount = 0;
    let studentResponseList = [];
    
    if (typeof questions !== 'undefined' && questions.length > 0) {
        questions.forEach((q, idx) => {
            const chosenIdx = userAnswersIndex[idx];

            if (chosenIdx === undefined || chosenIdx === null) {
                studentResponseList.push(`Q${idx+1}: Skipped`);
            } else {
                const chosenLetter = ["(a)", "(b)", "(c)", "(d)"][chosenIdx];
                const rightAnswerLetter = (q.answer || "").trim().substring(0, 3).toLowerCase();

                if (chosenLetter.toLowerCase() === rightAnswerLetter) {
                    correctCount++;
                    studentResponseList.push(`Q${idx+1}: ${chosenLetter} ✅`);
                } else {
                    wrongCount++;
                    studentResponseList.push(`Q${idx+1}: ${chosenLetter} (Right: ${rightAnswerLetter}) ❌`);
                }
            }
        });
    }
    
    let totalQuestions = (typeof questions !== 'undefined' && questions.length > 0) ? questions.length : 30;
    let maxPossibleMarks = totalQuestions * 2;
    let rawScore = (correctCount * 2) - (wrongCount * 0.5);
    let finalScore = rawScore < 0 ? 0 : rawScore; 
    let percentageVal = maxPossibleMarks > 0 ? Math.round((finalScore / maxPossibleMarks) * 100) : 0;
    let percentageStr = percentageVal + "%";
    let statusText = isCheating ? "CHEATING DETECTED" : (percentageVal >= 70 ? "PASS" : "FAIL");

    let payload = {
        action: "submit",
        name: localStorage.getItem("name") || "Student",
        roll: localStorage.getItem("roll") || "N/A",
        class: localStorage.getItem("class") || "N/A",
        score: String(finalScore),
        correct: String(correctCount),
        wrong: String(wrongCount),
        percentage: percentageStr,
        status: statusText,
        adminPass: retestAuthorizedKey || sessionStorage.getItem("adminPassKey") || "",
        timeTaken: finalTimeFormat,
        responses: studentResponseList.join(" | ")
    };

    try {
        // Minimum spinning time of 1.4s so the student sees the submission animation
        const minSpinDelay = new Promise(resolve => setTimeout(resolve, 1400));
        const networkReq = fetch(window.SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(payload).toString()
        });

        await Promise.all([networkReq, minSpinDelay]);

        if (loading) loading.style.display = "none";

        let d = new Date();
        let exactTodayStr = d.toISOString().split('T')[0];
        
        localStorage.setItem("testSubmitted", "true");
        localStorage.setItem("lastTestDate", exactTodayStr);
        localStorage.setItem("gtc_device_locked_date", exactTodayStr);

        const examContainer = document.querySelector(".exam-container");
        if (examContainer) examContainer.style.display = "none";

        const popupModal = document.getElementById("premiumSuccessModal");
        if (popupModal) {
            popupModal.style.display = "flex";
            setRating(5);
        }

    } catch (error) {
        if (loading) loading.style.display = "none";
        isSubmittingProcess = false;
        showCustomNotification("⚠️ सबमिशन में त्रुटि! कृपया पुनः प्रयास करें।", "error");
    }
}

async function verifyStudentOnlineEligibility() {
    const studentRoll = localStorage.getItem("roll") || "";
    const loading = document.getElementById("loadingOverlay");
    if (loading) loading.style.display = "flex";

    const todayStr = new Date().toISOString().split('T')[0];
    const lockedDate = localStorage.getItem("gtc_device_locked_date");
    const isReattemptGranted = localStorage.getItem("reattemptGranted") === "true";

    // 🔒 Device Lock: Agar is device se aaj test submit ho chuka hai, seedhe Passcode modal kholo
    if (lockedDate === todayStr && !isReattemptGranted) {
        if (loading) loading.style.display = "none";
        const retestModal = document.getElementById("retestAuthModal");
        const desc = document.getElementById("retestModalDesc");
        if (desc) {
            desc.innerHTML = `<b style="color:#ef4444;">डिवाइस सुरक्षा लॉक:</b> इस फ़ोन से आज की परीक्षा पहले ही सबमिट की जा चुकी है। दोबारा परीक्षा देने के लिए शिक्षक का पासवर्ड अनिवार्य है।`;
        }
        if (retestModal) retestModal.style.display = "flex";
        const examContainer = document.querySelector(".exam-container");
        if (examContainer) examContainer.style.display = "none";
        return;
    }

    let hasStarted = false;
    const startTestImmediately = () => {
        if (!hasStarted) {
            hasStarted = true;
            if (loading) {
                loading.style.display = "none";
                loading.style.visibility = "hidden";
            }
            const examContainer = document.querySelector(".exam-container");
            if (examContainer) examContainer.style.display = "block";
            initQuizScreen();
        }
    };

    const fallbackTimeout = setTimeout(startTestImmediately, 2500);

    try {
        const formData = new URLSearchParams();
        formData.append("action", "check");
        formData.append("roll", studentRoll);
        formData.append("adminPass", "");

        const response = await fetch(window.SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()
        });

        const res = await response.json();
        clearTimeout(fallbackTimeout);

        if (res && res.status === "blocked") {
            hasStarted = true;
            if (loading) loading.style.display = "none";
            const retestModal = document.getElementById("retestAuthModal");
            const desc = document.getElementById("retestModalDesc");
            if (desc && res.message) desc.textContent = res.message;
            if (retestModal) retestModal.style.display = "flex";

            const examContainer = document.querySelector(".exam-container");
            if (examContainer) examContainer.style.display = "none";
            return;
        }

        startTestImmediately();

    } catch (e) {
        clearTimeout(fallbackTimeout);
        startTestImmediately();
    }
}

async function verifyRetestPasscode() {
    const passInput = document.getElementById("adminPasscodeField");
    const errEl = document.getElementById("retestPassError");
    const enteredPass = passInput ? passInput.value.trim() : "";

    if (!enteredPass) {
        if (errEl) {
            errEl.textContent = "Please enter the invigilator passcode!";
            errEl.style.display = "block";
        }
        return;
    }

    // 🔒 100% STRICT CHECK: Koi bhi random pass yahan se pass nahi ho sakta!
    if (enteredPass !== MASTER_RETEST_PASS && enteredPass !== "GTC#2000") {
        if (errEl) {
            errEl.textContent = "❌ अमान्य पासवर्ड! केवल शिक्षक का सही पासवर्ड ही मान्य है।";
            errEl.style.display = "block";
        }
        if (passInput) passInput.value = "";
        return;
    }

    // Sahi password aane par exam screen unlock hogi:
    retestAuthorizedKey = enteredPass;
    sessionStorage.setItem("adminPassKey", enteredPass);
    localStorage.setItem("reattemptGranted", "true");
    localStorage.removeItem("testSubmitted");
    localStorage.removeItem("gtc_device_locked_date");

    const retestModal = document.getElementById("retestAuthModal");
    if (retestModal) retestModal.style.display = "none";

    const examContainer = document.querySelector(".exam-container");
    if (examContainer) examContainer.style.display = "block";
    initQuizScreen();
}

function cancelRetestExit() {
    localStorage.clear();
    sessionStorage.clear();
    if (window.location.protocol === "blob:" || window.location.href.startsWith("blob:")) return;
    window.location.replace("index.html");
}

async function initQuizScreen() {
    // Non-blocking camera: background me chalega bina screen roke
    try {
        setupLiveProctorCamera().catch(() => {});
    } catch(e) {}
    initQuizScreenAfterCamera();
}

function initQuizScreenAfterCamera() {
    const loading = document.getElementById("loadingOverlay");
    if (loading) {
        loading.style.display = "none";
        loading.style.visibility = "hidden";
    }

    const examContainer = document.querySelector(".exam-container");
    if (examContainer) {
        examContainer.style.display = "block";
        examContainer.style.visibility = "visible";
    }

    const langSelect = document.getElementById("examLangSelect");
    if (langSelect) {
        langSelect.value = currentExamLang;
    }

    startProctorLiveListener();
    startStudentStatusPinger();
    startTimer();
    showQuestion(0);
}

// Global exposures for button onclick attributes & external callers
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.jumpToQuestion = jumpToQuestion;
window.clearSelectedResponse = clearSelectedResponse;
window.setRating = setRating;
window.submitStudentFeedback = submitStudentFeedback;
window.submitTestFromButton = submitTestFromButton;
window.verifyRetestPasscode = verifyRetestPasscode;
window.cancelRetestExit = cancelRetestExit;
window.showCustomNotification = showCustomNotification;
window.changeQuestionLanguage = changeQuestionLanguage;

function bootExamSession() {
    window.localTimeTracker = Date.now();

    if (typeof questions !== 'undefined') {
        userAnswersIndex = new Array(questions.length).fill(null);
        userAnswers = new Array(questions.length).fill(null);
        const totalCountEl = document.getElementById("totalQuestionsCount");
        if (totalCountEl) totalCountEl.textContent = questions.length;
    }

    document.addEventListener("change", function(e) {
        if (e.target && e.target.name === "answer") {
            handleInstantOptionSelect();
        }
    });

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (nextBtn) nextBtn.onclick = nextQuestion;
    if (prevBtn) prevBtn.onclick = prevQuestion;
    if (submitBtn) submitBtn.onclick = submitTestFromButton;
    
    verifyStudentOnlineEligibility();
}

// 🛡️ Double-Trigger Boot: runs immediately if DOM is already ready, or on DOMContentLoaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootExamSession);
} else {
    bootExamSession();
}

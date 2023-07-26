const paragraphs = [
    "Welcome to SwiftType, the ultimate typing speed game that will test and improve your typing skills! Are you ready to put your fingers to the test and see how fast you can type? With SwiftType, you'll embark on an exciting journey to enhance your typing accuracy, speed, and overall performance. Whether you're a seasoned typist looking to push your limits or a beginner aiming to boost your typing prowess, this web-based game is designed to cater to all skill levels. Get ready to challenge yourself and compete with others as you race against the clock to achieve the fastest typing speeds.",
    "The rules of SwiftType are simple and straightforward. A random series of words, phrases, and sentences will appear on your screen. Your goal is to type each displayed text as quickly and accurately as possible before the timer runs out. Be cautious, though, as any mistakes you make will result in a time penalty, so accuracy is just as crucial as speed. SwiftType offers a variety of difficulty levels, allowing you to start at your comfort zone and progressively increase the challenge as you improve. As you play, you'll receive real-time feedback on your words per minute (WPM) and accuracy, enabling you to track your progress and set new personal bests.",
    "Compete and connect with friends and players from around the world on the SwiftType leaderboard. Compare your typing speed and accuracy scores to see how you stack up against others in the community. Can you make it to the top of the global rankings? Additionally, SwiftType offers exciting daily, weekly, and monthly challenges, where you can earn rewards and special badges for achieving outstanding typing accomplishments. Keep an eye on the leaderboard and strive to claim your spot as the fastest typist on SwiftType!",
    "SwiftType doesn't limit itself to just improving your typing skills. To keep you engaged and motivated, the game features a range of captivating themes and backgrounds, customizable avatars, and typing sound effects. Choose your preferred theme to immerse yourself in a unique typing experience, and unlock new themes as you level up. Personalize your avatar with different accessories and clothing, and collect rare items through special in-game events. The delightful sound effects will keep you entertained and add an extra layer of enjoyment to your typing sessions.",
    "So, what are you waiting for? Dive into the world of SwiftType and begin your typing adventure today! Sharpen your typing abilities, break records, and become a master typist. Whether you're looking to enhance your productivity or simply enjoy a fun and challenging typing game, SwiftType is the perfect choice. Prepare your fingers, get set, and type your way to victory! Experience the thrill of swift typing and witness your progress with every keystroke. Start your journey now and let SwiftType revolutionize the way you type!"
]

const pg = document.getElementById("pg");
const userInput = document.querySelector('.textinput')
const resetBtn = document.querySelector('.containerin button')

const totalTime = document.querySelector('.time .txt2');
const totalWpm = document.querySelector('.wpm .txt2');
const totalMistakes = document.querySelector('.mistake .txt2');
const totalCpm = document.querySelector('.cpm .txt2');

// Timer
let timer;
let maxTime = 120;
let timeRemaining = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

const setParagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    pg.innerText = "";
    paragraphs[randIndex].split("").forEach(char => {
        // console.log(char)
        pg.innerHTML += `<span>${char}</span>`
    })

    pg.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener("keydown", () => userInput.focus());
    pg.addEventListener("click", () => userInput.focus());

    totalMistakes.innerText = 0;
    totalCpm.innerText = 0;
    totalWpm.innerText = 0;
    totalTime.innerText = timeRemaining;

}

const startTyping = () => {

    let characters = pg.querySelectorAll('span');
    console.log(characters)
    let typedChar = userInput.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeRemaining > 0) {

        if (!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("incorrect", "correct");
            }
        }

        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            }
            else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        // remove highlight from previous characters and add to current character
        characters.forEach(char => {
            char.classList.remove("active");
        })
        characters[charIndex].classList.add("active");

        // wpm
        let wpm = Math.round(
            ((charIndex - mistakes) / 5)
            / (maxTime - timeRemaining) * 60
        )
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
        totalWpm.innerText = wpm;
        totalMistakes.innerText = mistakes;
        totalCpm.innerText = charIndex - mistakes;
    }

    else {
        clearInterval(timer);
        isTyping = false;
    }

}

const startTimer = () => {
    if (timeRemaining > 0) {
        timeRemaining--;
        totalTime.innerText = timeRemaining;
        let wpm = Math.round(
            ((charIndex - mistakes) / 5)
            / (maxTime - timeRemaining) * 60
        )
        totalWpm.innerHTML = wpm;
    }
    else {
        clearInterval(timer);
        isTyping = false;
    }
}

const resetGame = () => {
    setParagraph();

    clearInterval(timer)
    timeRemaining = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = 0;
    userInput.value = "";
    totalTime.innerText = timeRemaining;
    totalCpm.innerText = 0;
    totalWpm.innerText = 0;
    totalMistakes.innerText = 0;
}

setParagraph(); // function for showing paragraph as soon as the game starts
resetBtn.addEventListener('click', resetGame);
userInput.addEventListener('input', startTyping);
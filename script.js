// ! Text to Display
const sentences = [
  "Let me start by apologizing...",
  "I'm sorry if this comes off as creepy. But really, you started it.",
  "Your work has inspired so much of my own.",
  "Plus I pass by your offices all the time. It looks cool in there. ",
  "No, I'm not stalking you.",
  // "I'm stalking the <img:assets/mschf-board-nobg.png> skaters.",
  "I'm stalking the skaters.",
  "...gd I wish I could skate.",
  "What I'm trying to say is:",
  "you project a desirable workplace, but list no jobs!",
  "So, in lieu of applying, I, Josh Strupp, am simulating an interview.",
  "Cuz if you got to know me, I think there's a 2-10% chance you'd hire me.",
];

// ! Final Section (after chat)
const finalSentences = [
  "Yes. One more thing. I've prepared a song...",
  "Jk.",
  "Fr last thing: finding a job is hard — ",
  "the odds of getting an interview are roughly 1 in 3,841.",
  "Robo-rejectors dash hopes by the millions without explanation.",
  "So if you can't win on merit or network… how do you stand out?",
  "This website, perhaps. A tailored job application.",
  "If it gets me an interview, I can claim it works —",
  "then release the template for anyone to use.",
  "1:1 instead of 1:3,841.",
  "Regardless, I'd love to be in touch —",
  "for PT/FT/contract CD, copy, data, or ux design/dev roles.",
  "Thank you for the simulated opportunity!",
  "Check out the ole portfolio, or reach out any time.",
];

// ! Names to highlight (New York residents)
const nyNames = [
  "Lukas Bentel",
  "Kevin Wiesner",
  "Alexander An",
  "Jaymart Yabo",
  "Ed L",
  "Andrew Deitchman",
  "Craig von Wiederhold",
  "Piers Helmore",
  "Julia Hayes",
  "Karen Wong",
  "James Kernan",
  "Arya Tabatabai",
  "Emma Howard",
  "Jake Krowicki",
  "JC Li",
  "Robert Stinchcomb",
  "jesse lane",
  "Hope Harrison",
  "Josh Rollin",
  "Stephen T.",
  "John Belcaster",
];

// ! Chat Messages
const chatMessages = [
  {
    sender: "mschf",
    text: "They say getting a job is all about who you know.",
    side: "left",
  },
  {
    sender: "mschf",
    text: "You got any references here?",
    side: "left",
  },
  {
    sender: "js",
    text: "That I know personally? No.",
    side: "right",
  },
  {
    sender: "mschf",
    text: "*checks phone, visibly bored*",
    side: "left",
  },
  {
    sender: "js",
    text: "But I did my research — we have a lot in common!",
    side: "right",
  },
  {
    sender: "js",
    text: "I wrote a script to scrape LinkedIn. It retrieved ~80 MSCHF employees and their information.",
    side: "right",
  },
  {
    sender: "js",
    type: "video",
    content: "assets/mschfhax.mp4",
    side: "right",
  },
];

// Second chat messages (placeholder for now)
const secondChatMessages = [
  {
    sender: "mschf",
    text: "uhhhhhhhhhhhhhhhhhhhhhhh wut",
    side: "left",
  },
  {
    sender: "js",
    text: "I live in NYC. Many of you live in NYC.",
    side: "right",
  },
  {
    sender: "js",
    text: "We share skills, experience and — in the case of Johnny Thaw — a pornhub handle.",
    side: "right",
  },
  {
    sender: "js",
    text: "And some of us, for worse or for worse, are LinkedIn power users. If you have more than 1,000 connections, you're never alone.",
    side: "right",
  },
  {
    sender: "mschf",
    text: "Right. Okay. Moving on. Let's talk about your work. Got any projects we might find interesting?",
    side: "left",
  },
  {
    sender: "js",
    text: "A handful — like this bootleg New York Times game.",
    side: "right",
  },
  {
    sender: "js",
    text: "Or this stunty reminder that Ted Cruz should stay the f*** away from anyone with a uterus.",
    side: "right",
  },
  {
    sender: "js",
    text: "And this Tinder-style game to identify fake news. I'm sorry to say, it won't help you hook up in airplane bathrooms...",
    side: "right",
  },
  {
    sender: "mschf",
    text: "Well, this has been sufficiently weird. But thank you. Anything else before we call it?",
    side: "left",
  },
];

// Merge the two chat sets into a single ordered feed and set up grid trigger helpers
chatMessages.push(...secondChatMessages);
const PLACEHOLDER_TRIGGER_TEXT =
  "I wrote a script to scrape LinkedIn. It retrieved ~80 MSCHF employees and their information.";
const HIGHLIGHT_TRIGGER_TEXT = "I live in NYC. Many of you live in NYC.";
const SKILLS_TRIGGER_TEXT =
  "We share skills, experience and — in the case of Johnny Thaw — a pornhub handle.";
const LINKEDIN_TRIGGER_TEXT =
  "And some of us, for worse or for worse, are LinkedIn power users. If you have more than 1,000 connections, you're never alone.";
const VIDEO_TRIGGER_TEXT = "A handful — like this bootleg New York Times game.";
const SECOND_VIDEO_TRIGGER_TEXT =
  "Or this stunty reminder that Ted Cruz should stay the f*** away from anyone with a uterus.";
const THIRD_VIDEO_TRIGGER_TEXT =
  "And this Tinder-style game to identify fake news. I'm sorry to say, it won't help you hook up in airplane bathrooms...";
const placeholderIndex = chatMessages.findIndex(
  (msg) => msg.text === PLACEHOLDER_TRIGGER_TEXT
);
const highlightIndex = chatMessages.findIndex(
  (msg) => msg.text === HIGHLIGHT_TRIGGER_TEXT
);
const skillsIndex = chatMessages.findIndex(
  (msg) => msg.text === SKILLS_TRIGGER_TEXT
);
const linkedinIndex = chatMessages.findIndex(
  (msg) => msg.text === LINKEDIN_TRIGGER_TEXT
);
const videoIndex = chatMessages.findIndex(
  (msg) => msg.text === VIDEO_TRIGGER_TEXT
);
const secondVideoIndex = chatMessages.findIndex(
  (msg) => msg.text === SECOND_VIDEO_TRIGGER_TEXT
);
const thirdVideoIndex = chatMessages.findIndex(
  (msg) => msg.text === THIRD_VIDEO_TRIGGER_TEXT
);
let gridShown = false;
let highlightShown = false;
let skillsHighlightShown = false;
let linkedinHighlightShown = false;
let videoShown = false;
let secondVideoShown = false;
let thirdVideoShown = false;
let profileElements = []; // Store profile elements for highlighting

function hideProfileGrid() {
  const grid = document.getElementById("profile-grid");
  if (grid) {
    grid.style.display = "none";
  }
  // Reset highlighting when grid is hidden
  highlightShown = false;
  skillsHighlightShown = false;
  linkedinHighlightShown = false;
  videoShown = false;
  secondVideoShown = false;
  thirdVideoShown = false;
  unhighlightNYProfiles();
  unhighlightSkills();
  unhighlightLinkedInProfiles();
  hideVideoContainer();
  hideSecondVideoContainer();
  hideThirdVideoContainer();
  hideTemplateVideo();
  hideFastGifs();
}

// Function to highlight NY profiles
function highlightNYProfiles() {
  if (highlightShown) return;

  profileElements.forEach((profileData) => {
    const { element, name } = profileData;
    // Check if this profile's name matches any NY name (case-insensitive)
    const isNYResident = nyNames.some(
      (nyName) => name && name.toLowerCase().includes(nyName.toLowerCase())
    );

    if (isNYResident) {
      element.classList.add("ny-highlight");
    }
  });

  highlightShown = true;
}

// Function to remove highlighting
function unhighlightNYProfiles() {
  profileElements.forEach((profileData) => {
    profileData.element.classList.remove("ny-highlight");
  });
  highlightShown = false;
}

// Function to highlight skills profiles
function highlightSkills() {
  if (skillsHighlightShown) return;

  profileElements.forEach((profileData) => {
    const { element, name } = profileData;
    // Check if this profile's name matches any skills name (case-insensitive)
    const isSkillsMatch = skillsNames.some(
      (skillsName) =>
        name && name.toLowerCase().includes(skillsName.toLowerCase())
    );

    if (isSkillsMatch) {
      element.classList.add("skills-highlight");
    }
  });

  skillsHighlightShown = true;
}

// Function to remove skills highlighting
function unhighlightSkills() {
  profileElements.forEach((profileData) => {
    profileData.element.classList.remove("skills-highlight");
  });
  skillsHighlightShown = false;
}

// Function to highlight LinkedIn power user profiles
function highlightLinkedInProfiles() {
  if (linkedinHighlightShown) return;

  profileElements.forEach((profileData) => {
    const { element, name } = profileData;
    // Check if this profile's name matches any LinkedIn power user name (case-insensitive)
    const isLinkedInPowerUser = linkedinNames.some(
      (linkedinName) =>
        name && name.toLowerCase().includes(linkedinName.toLowerCase())
    );

    if (isLinkedInPowerUser) {
      element.classList.add("linkedin-highlight");
    }
  });

  linkedinHighlightShown = true;
}

// Function to remove LinkedIn highlighting
function unhighlightLinkedInProfiles() {
  profileElements.forEach((profileData) => {
    profileData.element.classList.remove("linkedin-highlight");
  });
  linkedinHighlightShown = false;
}

// Function to show video container and hide profile grid
function showVideoContainer() {
  if (videoShown) return;

  // Hide the profile grid
  const grid = document.getElementById("profile-grid");
  if (grid) {
    grid.style.display = "none";
  }

  // Show the video container
  let videoContainer = document.getElementById("headlines-video-container");
  if (!videoContainer) {
    // Create the video container if it doesn't exist
    videoContainer = document.createElement("div");
    videoContainer.id = "headlines-video-container";
    videoContainer.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 50vw;
      height: 100vh;
      z-index: 1000;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const video = document.createElement("video");
    video.src = "assets/headlines-grab.mp4";
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);
  } else {
    videoContainer.style.display = "flex";
  }

  videoShown = true;
}

// Function to hide video container
function hideVideoContainer() {
  const videoContainer = document.getElementById("headlines-video-container");
  if (videoContainer) {
    videoContainer.style.display = "none";
  }
  videoShown = false;
}

// Function to show second video container
function showSecondVideoContainer() {
  if (secondVideoShown) return;

  // Hide the first video container
  hideVideoContainer();

  // Show the second video container
  let secondVideoContainer = document.getElementById("c4c-video-container");
  if (!secondVideoContainer) {
    // Create the second video container if it doesn't exist
    secondVideoContainer = document.createElement("div");
    secondVideoContainer.id = "c4c-video-container";
    secondVideoContainer.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 50vw;
      height: 100vh;
      z-index: 1000;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const video = document.createElement("video");
    video.src = "assets/captchaheader.mp4";
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    secondVideoContainer.appendChild(video);
    document.body.appendChild(secondVideoContainer);
  } else {
    secondVideoContainer.style.display = "flex";
  }

  secondVideoShown = true;
}

// Function to hide second video container
function hideSecondVideoContainer() {
  const secondVideoContainer = document.getElementById("c4c-video-container");
  if (secondVideoContainer) {
    secondVideoContainer.style.display = "none";
  }
  secondVideoShown = false;
}

// Function to show third video container
function showThirdVideoContainer() {
  if (thirdVideoShown) return;

  // Hide the second video container
  hideSecondVideoContainer();

  // Show the third video container
  let thirdVideoContainer = document.getElementById(
    "fake-news-video-container"
  );
  if (!thirdVideoContainer) {
    // Create the third video container if it doesn't exist
    thirdVideoContainer = document.createElement("div");
    thirdVideoContainer.id = "fake-news-video-container";
    thirdVideoContainer.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 50vw;
      height: 100vh;
      z-index: 1000;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const video = document.createElement("video");
    video.src = "assets/fake-news-clip.mp4";
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    thirdVideoContainer.appendChild(video);
    document.body.appendChild(thirdVideoContainer);
  } else {
    thirdVideoContainer.style.display = "flex";
  }

  thirdVideoShown = true;
}

// Function to hide third video container
function hideThirdVideoContainer() {
  const thirdVideoContainer = document.getElementById(
    "fake-news-video-container"
  );
  if (thirdVideoContainer) {
    thirdVideoContainer.style.display = "none";
  }
  thirdVideoShown = false;
}

// Helper to always keep the latest chat content in view
function ensureChatInView() {
  if (chatContainer) {
    console.log(
      "ensureChatInView called - scrollHeight:",
      chatContainer.scrollHeight,
      "scrollTop before:",
      chatContainer.scrollTop
    );
    chatContainer.scrollTop = chatContainer.scrollHeight;
    console.log("scrollTop after:", chatContainer.scrollTop);
  } else {
    console.log("ensureChatInView called but chatContainer is null");
  }
}

// ! Chat Variables
let chatMode = false;
let currentChatIndex = 0;
let chatContainer = null;
let chatMessagesContainer = null;

// ! Final Section Variables
let finalMode = false;
let currentFinalIndex = 0;

// ! Setup and Variables
const typedText = document.getElementById("typed-text");
let currentSentenceIndex = 0;
let i = 0;
let isTyping = false;
// Get all GIF elements
let gifs = [
  document.getElementById("gif-1"),
  document.getElementById("gif-2"),
  document.getElementById("gif-3"),
  document.getElementById("gif-4"),
  document.getElementById("gif-5"),
  document.getElementById("gif-6"),
];
let passbyVideo = document.getElementById("passby-video");
let skaterVideo = document.getElementById("skater-video");
let templateVideo = document.getElementById("template-video");
// Get fast GIF elements
let fastGifs = [
  document.getElementById("fast-gif-1"),
  document.getElementById("fast-gif-2"),
  document.getElementById("fast-gif-3"),
];
chatContainer = document.getElementById("chat-container");
chatMessagesContainer = document.getElementById("chat-messages");
let bounceInterval = null;

// Create bounce states for each GIF
let gifBounceStates = gifs.map((gif, index) => ({
  element: gif,
  x: Math.random() * (window.innerWidth - 150),
  y: Math.random() * (window.innerHeight - 150),
  dx: Math.random() > 0.5 ? 1 : -1,
  dy: Math.random() > 0.5 ? 1 : -1,
  speed: 1.0 + Math.random() * 1.0, // random speed between 1.0 and 2.0
  width: 150,
  height: 150,
}));

let passbyBounceState = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
  speed: 1.5, // slightly different speed for variety
  width: 200,
  height: 112, // will update after video loads
};

let skaterBounceState = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
  speed: 1.7, // slightly different speed for variety
  width: 200,
  height: 112, // will update after video loads
};

let templateBounceState = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
  speed: 1.8, // slightly different speed for variety
  width: 400,
  height: 225, // will update after video loads
};

// Create fast bounce states for the 1:1 GIFs
let fastGifBounceStates = fastGifs.map((gif, index) => ({
  element: gif,
  x: Math.random() * (window.innerWidth - 120),
  y: Math.random() * (window.innerHeight - 120),
  dx: Math.random() > 0.5 ? 1 : -1,
  dy: Math.random() > 0.5 ? 1 : -1,
  speed: 3.0 + Math.random() * 2.0, // much faster: 3.0 to 5.0
  width: 120,
  height: 120,
}));

// ! Main Typing Functions
function type() {
  if (i < sentences[currentSentenceIndex].length) {
    const currentText = sentences[currentSentenceIndex];

    // Check if we're at the start of an image tag
    if (currentText.substring(i).startsWith("<img:")) {
      // Find the end of the image tag
      const endIndex = currentText.indexOf(">", i);
      if (endIndex !== -1) {
        // Extract the image path
        const imagePath = currentText.substring(i + 5, endIndex); // +5 to skip '<img:'

        // Create and insert the image element
        const img = document.createElement("img");
        img.src = imagePath;
        img.style.cssText =
          "height: 10em; width: auto; vertical-align: middle; margin: 0 2px;";
        img.alt = "skateboard";
        typedText.appendChild(img);

        // Skip past the entire image tag
        i = endIndex + 1;

        // Continue typing after a brief pause
        setTimeout(type, 100);
        return;
      }
    }

    // Normal character typing
    const textNode = document.createTextNode(
      sentences[currentSentenceIndex][i++]
    );
    typedText.appendChild(textNode);

    // Check if we just typed a period followed by a space (sentence ending)
    const justTyped = currentText[i - 1];
    const nextChar = currentText[i];

    if (justTyped === "." && nextChar === " ") {
      // Add a longer pause for sentence breaks
      setTimeout(type, 250);
    } else {
      // Normal typing speed
      setTimeout(type, 40);
    }
  } else {
    isTyping = false;
  }
}

function startTyping() {
  if (isTyping) return;
  isTyping = true;
  typedText.innerHTML = "";
  i = 0;
  type();
  // Show GIFs for work sentence, passby video only for office sentence, skater video only for skater sentence
  if (currentSentenceIndex === 2) {
    showBouncingGifs();
    // Hide videos if they were showing
    hidePassbyScreensaver();
    hideSkaterScreensaver();
  } else if (currentSentenceIndex === 3) {
    // Hide GIFs, show only passby video
    hideBouncingGifs();
    if (passbyVideo.style.display !== "block") {
      showPassbyScreensaver();
    }
    hideSkaterScreensaver();
  } else if (currentSentenceIndex === 5) {
    // Hide GIFs, show only skater video
    hideBouncingGifs();
    if (skaterVideo.style.display !== "block") {
      showSkaterScreensaver();
    }
    hidePassbyScreensaver();
  } else {
    hideBouncingGifs();
    hidePassbyScreensaver();
    hideSkaterScreensaver();
  }
}

// ! Moving Between Sentences
function nextSentence() {
  if (isTyping) return; // Prevent advancing while typing
  if (currentSentenceIndex < sentences.length - 1) {
    currentSentenceIndex++;
    startTyping();
  } else {
    // Transition to chat mode after the last sentence
    transitionToChat();
  }
}

function previousSentence() {
  if (isTyping) return; // Prevent going back while typing
  if (currentSentenceIndex > 0) {
    currentSentenceIndex--;
    startTyping();
  }
}

// ! Keyboard Controls
document.addEventListener("keydown", function (event) {
  if (chatMode) {
    // Handle chat mode keyboard controls
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "Enter":
        event.preventDefault();
        nextChatMessage();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "Backspace":
        event.preventDefault();
        previousChatMessage();
        break;
    }
  } else if (finalMode) {
    // Handle final mode keyboard controls
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "Enter":
        event.preventDefault();
        nextFinalSentence();
        break;
      case "ArrowUp":
      case "ArrowLeft":
      case "Backspace":
        event.preventDefault();
        previousFinalSentence();
        break;
    }
  } else {
    // Handle terminal mode keyboard controls
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "Enter":
        event.preventDefault();
        nextSentence();
        break;
      case "ArrowUp":
      case "ArrowLeft":
      case "Backspace":
        event.preventDefault();
        previousSentence();
        break;
    }
  }
});

// ! Temporary Debug Dropdown
// Create debug dropdown for sentence navigation
function createDebugDropdown() {
  const debugContainer = document.createElement("div");
  debugContainer.id = "debug-container";
  debugContainer.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 5px;
    z-index: 9999;
    font-family: monospace;
    font-size: 12px;
    // display: none; /* Hide debug dropdown by default */
  `;

  const label = document.createElement("label");
  label.textContent = "DEBUG - Jump to sentence: ";
  label.style.color = "#00ff00";
  label.style.marginRight = "5px";

  const dropdown = document.createElement("select");
  dropdown.id = "sentence-dropdown";
  dropdown.style.cssText = `
    background: #333;
    color: #00ff00;
    border: 1px solid #00ff00;
    padding: 2px;
    font-family: monospace;
    font-size: 12px;
  `;

  // Add options for each sentence
  sentences.forEach((sentence, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${index}: ${sentence.substring(0, 30)}...`;
    dropdown.appendChild(option);
  });

  // Add chat option
  const chatOption = document.createElement("option");
  chatOption.value = "chat";
  chatOption.textContent = "CHAT: Jump to chat section";
  dropdown.appendChild(chatOption);

  // Add options for each chat message so we can jump directly to them
  chatMessages.forEach((message, index) => {
    const option = document.createElement("option");
    option.value = `chat-${index}`;
    const preview = message.text ? message.text.substring(0, 30) : "[video]";
    option.textContent = `CHAT ${index}: ${preview}...`;
    dropdown.appendChild(option);
  });

  // Add options for final section
  finalSentences.forEach((sentence, index) => {
    const option = document.createElement("option");
    option.value = `final-${index}`;
    option.textContent = `FINAL ${index}: ${sentence.substring(0, 30)}...`;
    dropdown.appendChild(option);
  });

  // Set initial value
  dropdown.value = finalMode
    ? `final-${currentFinalIndex}`
    : chatMode
    ? `chat-${currentChatIndex}`
    : currentSentenceIndex;

  // Add event listener
  dropdown.addEventListener("change", function (event) {
    const selectedValue = event.target.value;

    if (selectedValue === "chat") {
      // Jump to beginning of chat
      transitionToChat();
    } else if (selectedValue.startsWith("chat-")) {
      // Jump to specific chat message
      const chatIdx = parseInt(selectedValue.split("-")[1]);
      jumpToChatIndex(chatIdx);
    } else if (selectedValue.startsWith("final-")) {
      // Jump to specific final message
      const finalIdx = parseInt(selectedValue.split("-")[1]);
      jumpToFinalIndex(finalIdx);
    } else {
      const newIndex = parseInt(selectedValue);
      if (newIndex >= 0 && newIndex < sentences.length) {
        // Reset to terminal mode if in chat or final mode
        if (chatMode) {
          chatMode = false;
          document.body.classList.remove("chat-active");
          if (chatContainer) {
            chatContainer.classList.remove("active");
          }
          if (chatMessagesContainer) {
            chatMessagesContainer.innerHTML = "";
          }
          currentChatIndex = 0;
        }
        if (finalMode) {
          finalMode = false;
          currentFinalIndex = 0;
        }
        currentSentenceIndex = newIndex;
        startTyping();
      }
    }
  });

  debugContainer.appendChild(label);
  debugContainer.appendChild(dropdown);
  document.body.appendChild(debugContainer);

  return dropdown;
}

// Initialize debug dropdown
const debugDropdown = createDebugDropdown();

// Utility to jump to a specific final index
function jumpToFinalIndex(targetIndex) {
  if (
    typeof targetIndex !== "number" ||
    targetIndex < 0 ||
    targetIndex >= finalSentences.length
  ) {
    return;
  }

  // Enter final mode and reset other states
  document.body.classList.remove("chat-active");
  hideBouncingGifs();
  hidePassbyScreensaver();
  hideProfileGrid();

  if (chatContainer) {
    chatContainer.classList.remove("active");
  }
  if (chatMessagesContainer) {
    chatMessagesContainer.innerHTML = "";
  }

  chatMode = false;
  finalMode = true;
  isTyping = false;
  currentFinalIndex = targetIndex;

  // Display the target sentence immediately
  typedText.innerHTML = "";
  if (finalSentences[targetIndex].includes("<img:")) {
    // Handle images in final sentences
    let content = finalSentences[targetIndex];
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = content.replace(
      /<img:([^>]+)>/g,
      '<img src="$1" style="height: 10em; width: auto; vertical-align: middle; margin: 0 2px;" alt="image">'
    );
    while (tempDiv.firstChild) {
      typedText.appendChild(tempDiv.firstChild);
    }
  } else {
    typedText.textContent = finalSentences[targetIndex];
  }

  if (debugDropdown) {
    debugDropdown.value = `final-${currentFinalIndex}`;
  }
}

// Update dropdown when sentences change via keyboard
const originalNextSentence = nextSentence;
const originalPreviousSentence = previousSentence;

nextSentence = function () {
  originalNextSentence();
  if (debugDropdown) {
    debugDropdown.value = finalMode
      ? `final-${currentFinalIndex}`
      : chatMode
      ? `chat-${currentChatIndex}`
      : currentSentenceIndex;
  }
};

previousSentence = function () {
  originalPreviousSentence();
  if (debugDropdown) {
    debugDropdown.value = finalMode
      ? `final-${currentFinalIndex}`
      : chatMode
      ? `chat-${currentChatIndex}`
      : currentSentenceIndex;
  }
};

function showBouncingGifs() {
  gifs.forEach((gif, index) => {
    if (!gif) return;
    gif.style.display = "block";

    // Reinitialize random position and direction for each show
    gifBounceStates[index].x = Math.random() * (window.innerWidth - 150);
    gifBounceStates[index].y = Math.random() * (window.innerHeight - 150);
    gifBounceStates[index].dx = Math.random() > 0.5 ? 1 : -1;
    gifBounceStates[index].dy = Math.random() > 0.5 ? 1 : -1;

    // Set initial position
    gif.style.left = gifBounceStates[index].x + "px";
    gif.style.top = gifBounceStates[index].y + "px";
  });

  if (!bounceInterval) {
    bounceInterval = setInterval(moveElements, 16); // ~60fps
  }
}

function hideBouncingGifs() {
  gifs.forEach((gif) => {
    if (gif) {
      gif.style.display = "none";
    }
  });

  // Only clear interval if all videos and fast GIFs are also hidden
  const passbyVisible = passbyVideo && passbyVideo.style.display === "block";
  const skaterVisible = skaterVideo && skaterVideo.style.display === "block";
  const templateVisible =
    templateVideo && templateVideo.style.display === "block";
  const fastGifsVisible = fastGifs.some(
    (gif) => gif && gif.style.display === "block"
  );
  if (
    bounceInterval &&
    !passbyVisible &&
    !skaterVisible &&
    !templateVisible &&
    !fastGifsVisible
  ) {
    clearInterval(bounceInterval);
    bounceInterval = null;
  }
}

function showPassbyScreensaver() {
  if (!passbyVideo) return;
  passbyVideo.style.display = "block";
  passbyVideo.currentTime = 0;
  passbyVideo.play();
  // Get video dimensions
  passbyBounceState.width = passbyVideo.offsetWidth;
  passbyBounceState.height = passbyVideo.offsetHeight;
  // Start in a random position (different from first video)
  passbyBounceState.x =
    Math.random() * (window.innerWidth - passbyBounceState.width);
  passbyBounceState.y =
    Math.random() * (window.innerHeight - passbyBounceState.height);
  passbyBounceState.dx = Math.random() > 0.5 ? 1 : -1;
  passbyBounceState.dy = Math.random() > 0.5 ? 1 : -1;
  if (!bounceInterval) {
    bounceInterval = setInterval(moveElements, 16); // ~60fps
  }
}

function hidePassbyScreensaver() {
  if (!passbyVideo) return;
  passbyVideo.pause();
  passbyVideo.style.display = "none";
  // Check if any GIFs, skater video, or template video are still showing before clearing interval
  const anyGifsVisible = gifs.some(
    (gif) => gif && gif.style.display === "block"
  );
  const skaterVisible = skaterVideo && skaterVideo.style.display === "block";
  const templateVisible =
    templateVideo && templateVideo.style.display === "block";
  if (bounceInterval && !anyGifsVisible && !skaterVisible && !templateVisible) {
    clearInterval(bounceInterval);
    bounceInterval = null;
  }
}

function showSkaterScreensaver() {
  if (!skaterVideo) return;
  skaterVideo.style.display = "block";
  skaterVideo.currentTime = 0;
  skaterVideo.play();
  // Get video dimensions
  skaterBounceState.width = skaterVideo.offsetWidth;
  skaterBounceState.height = skaterVideo.offsetHeight;
  // Start in a random position (different from other videos)
  skaterBounceState.x =
    Math.random() * (window.innerWidth - skaterBounceState.width);
  skaterBounceState.y =
    Math.random() * (window.innerHeight - skaterBounceState.height);
  skaterBounceState.dx = Math.random() > 0.5 ? 1 : -1;
  skaterBounceState.dy = Math.random() > 0.5 ? 1 : -1;
  if (!bounceInterval) {
    bounceInterval = setInterval(moveElements, 16); // ~60fps
  }
}

function hideSkaterScreensaver() {
  if (!skaterVideo) return;
  skaterVideo.pause();
  skaterVideo.style.display = "none";
  // Check if any GIFs, passby video, or template video are still showing before clearing interval
  const anyGifsVisible = gifs.some(
    (gif) => gif && gif.style.display === "block"
  );
  const passbyVisible = passbyVideo && passbyVideo.style.display === "block";
  const templateVisible =
    templateVideo && templateVideo.style.display === "block";
  if (bounceInterval && !anyGifsVisible && !passbyVisible && !templateVisible) {
    clearInterval(bounceInterval);
    bounceInterval = null;
  }
}

function showTemplateVideo() {
  if (!templateVideo) return;
  templateVideo.style.display = "block";
  templateVideo.currentTime = 0;
  templateVideo.play();
  templateVideo.style.zIndex = "1500"; // bring above other content
  // Get video dimensions
  templateBounceState.width = templateVideo.offsetWidth;
  templateBounceState.height = templateVideo.offsetHeight;
  // Start in a random position
  templateBounceState.x =
    Math.random() * (window.innerWidth - templateBounceState.width);
  templateBounceState.y =
    Math.random() * (window.innerHeight - templateBounceState.height);
  templateBounceState.dx = Math.random() > 0.5 ? 1 : -1;
  templateBounceState.dy = Math.random() > 0.5 ? 1 : -1;
  if (!bounceInterval) {
    bounceInterval = setInterval(moveElements, 16); // ~60fps
  }
}

function hideTemplateVideo() {
  if (!templateVideo) return;
  templateVideo.pause();
  templateVideo.style.display = "none";
  // Check if any GIFs, passby video, or skater video are still showing before clearing interval
  const anyGifsVisible = gifs.some(
    (gif) => gif && gif.style.display === "block"
  );
  const passbyVisible = passbyVideo && passbyVideo.style.display === "block";
  const skaterVisible = skaterVideo && skaterVideo.style.display === "block";
  const fastGifsVisible = fastGifs.some(
    (gif) => gif && gif.style.display === "block"
  );
  if (
    bounceInterval &&
    !anyGifsVisible &&
    !passbyVisible &&
    !skaterVisible &&
    !fastGifsVisible
  ) {
    clearInterval(bounceInterval);
    bounceInterval = null;
  }
}

function showFastGifs() {
  fastGifs.forEach((gif, index) => {
    if (!gif) return;
    gif.style.display = "block";

    // Reinitialize random position and direction for each show
    fastGifBounceStates[index].x = Math.random() * (window.innerWidth - 120);
    fastGifBounceStates[index].y = Math.random() * (window.innerHeight - 120);
    fastGifBounceStates[index].dx = Math.random() > 0.5 ? 1 : -1;
    fastGifBounceStates[index].dy = Math.random() > 0.5 ? 1 : -1;

    // Set initial position
    gif.style.left = fastGifBounceStates[index].x + "px";
    gif.style.top = fastGifBounceStates[index].y + "px";
  });

  if (!bounceInterval) {
    bounceInterval = setInterval(moveElements, 16); // ~60fps
  }
}

function hideFastGifs() {
  fastGifs.forEach((gif) => {
    if (gif) {
      gif.style.display = "none";
    }
  });

  // Check if other elements are still visible before clearing interval
  const anyGifsVisible = gifs.some(
    (gif) => gif && gif.style.display === "block"
  );
  const passbyVisible = passbyVideo && passbyVideo.style.display === "block";
  const skaterVisible = skaterVideo && skaterVideo.style.display === "block";
  const templateVisible =
    templateVideo && templateVideo.style.display === "block";
  if (
    bounceInterval &&
    !anyGifsVisible &&
    !passbyVisible &&
    !skaterVisible &&
    !templateVisible
  ) {
    clearInterval(bounceInterval);
    bounceInterval = null;
  }
}

function moveElements() {
  // Move all GIFs
  gifBounceStates.forEach((state, index) => {
    const gif = state.element;
    if (gif && gif.style.display === "block") {
      // Bounce off edges
      if (
        state.x + state.dx * state.speed < 0 ||
        state.x + state.width + state.dx * state.speed > window.innerWidth
      ) {
        state.dx *= -1;
      }
      if (
        state.y + state.dy * state.speed < 0 ||
        state.y + state.height + state.dy * state.speed > window.innerHeight
      ) {
        state.dy *= -1;
      }
      state.x += state.dx * state.speed;
      state.y += state.dy * state.speed;
      gif.style.left = state.x + "px";
      gif.style.top = state.y + "px";
    }
  });

  // Move passby video
  if (passbyVideo && passbyVideo.style.display === "block") {
    // Bounce off edges
    if (
      passbyBounceState.x + passbyBounceState.dx * passbyBounceState.speed <
        0 ||
      passbyBounceState.x +
        passbyBounceState.width +
        passbyBounceState.dx * passbyBounceState.speed >
        window.innerWidth
    ) {
      passbyBounceState.dx *= -1;
    }
    if (
      passbyBounceState.y + passbyBounceState.dy * passbyBounceState.speed <
        0 ||
      passbyBounceState.y +
        passbyBounceState.height +
        passbyBounceState.dy * passbyBounceState.speed >
        window.innerHeight
    ) {
      passbyBounceState.dy *= -1;
    }
    passbyBounceState.x += passbyBounceState.dx * passbyBounceState.speed;
    passbyBounceState.y += passbyBounceState.dy * passbyBounceState.speed;
    passbyVideo.style.left = passbyBounceState.x + "px";
    passbyVideo.style.top = passbyBounceState.y + "px";
  }

  // Move skater video
  if (skaterVideo && skaterVideo.style.display === "block") {
    // Bounce off edges
    if (
      skaterBounceState.x + skaterBounceState.dx * skaterBounceState.speed <
        0 ||
      skaterBounceState.x +
        skaterBounceState.width +
        skaterBounceState.dx * skaterBounceState.speed >
        window.innerWidth
    ) {
      skaterBounceState.dx *= -1;
    }
    if (
      skaterBounceState.y + skaterBounceState.dy * skaterBounceState.speed <
        0 ||
      skaterBounceState.y +
        skaterBounceState.height +
        skaterBounceState.dy * skaterBounceState.speed >
        window.innerHeight
    ) {
      skaterBounceState.dy *= -1;
    }
    skaterBounceState.x += skaterBounceState.dx * skaterBounceState.speed;
    skaterBounceState.y += skaterBounceState.dy * skaterBounceState.speed;
    skaterVideo.style.left = skaterBounceState.x + "px";
    skaterVideo.style.top = skaterBounceState.y + "px";
  }

  // Move template video
  if (templateVideo && templateVideo.style.display === "block") {
    // Bounce off edges
    if (
      templateBounceState.x +
        templateBounceState.dx * templateBounceState.speed <
        0 ||
      templateBounceState.x +
        templateBounceState.width +
        templateBounceState.dx * templateBounceState.speed >
        window.innerWidth
    ) {
      templateBounceState.dx *= -1;
    }
    if (
      templateBounceState.y +
        templateBounceState.dy * templateBounceState.speed <
        0 ||
      templateBounceState.y +
        templateBounceState.height +
        templateBounceState.dy * templateBounceState.speed >
        window.innerHeight
    ) {
      templateBounceState.dy *= -1;
    }
    templateBounceState.x += templateBounceState.dx * templateBounceState.speed;
    templateBounceState.y += templateBounceState.dy * templateBounceState.speed;
    templateVideo.style.left = templateBounceState.x + "px";
    templateVideo.style.top = templateBounceState.y + "px";
  }

  // Move fast GIFs
  fastGifBounceStates.forEach((state, index) => {
    const gif = state.element;
    if (gif && gif.style.display === "block") {
      // Bounce off edges
      if (
        state.x + state.dx * state.speed < 0 ||
        state.x + state.width + state.dx * state.speed > window.innerWidth
      ) {
        state.dx *= -1;
      }
      if (
        state.y + state.dy * state.speed < 0 ||
        state.y + state.height + state.dy * state.speed > window.innerHeight
      ) {
        state.dy *= -1;
      }
      state.x += state.dx * state.speed;
      state.y += state.dy * state.speed;
      gif.style.left = state.x + "px";
      gif.style.top = state.y + "px";
    }
  });
}

// ! Chat Functions
function transitionToChat() {
  // Hide all terminal elements
  document.body.classList.add("chat-active");
  hideBouncingGifs();
  hidePassbyScreensaver();
  hideSkaterScreensaver();
  hideTemplateVideo();
  hideFastGifs();
  hideProfileGrid();
  gridShown = false;

  // Show chat container
  if (chatContainer) {
    chatContainer.classList.add("active");
  }

  chatMode = true;
  currentChatIndex = 0;

  // Update debug dropdown
  if (debugDropdown) {
    debugDropdown.value = `chat-${currentChatIndex}`;
  }

  // Start first chat message
  setTimeout(() => {
    startChatMessage();
  }, 500);
}

function createChatMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${message.side}`;

  const iconDiv = document.createElement("div");
  iconDiv.className = `chat-icon ${message.sender}`;

  if (message.sender === "mschf") {
    const img = document.createElement("img");
    img.src = "assets/mschf_icon.png";
    img.alt = "MSCHF";
    iconDiv.appendChild(img);
  } else if (message.sender === "js") {
    const img = document.createElement("img");
    img.src = "assets/js-icon-2.png";
    img.alt = "JS";
    iconDiv.appendChild(img);
  }

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "chat-bubble";

  if (message.type === "video") {
    const videoElement = document.createElement("video");
    videoElement.className = "chat-video";
    videoElement.src = message.content;
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.muted = true; // Required for autoplay in most browsers
    videoElement.style.display = "none"; // Initially hidden
    videoElement.id = `chat-video-${currentChatIndex}`;
    bubbleDiv.appendChild(videoElement);
  } else {
    const textP = document.createElement("p");
    textP.className = "chat-text";
    textP.id = `chat-text-${currentChatIndex}`;
    bubbleDiv.appendChild(textP);
  }
  // No cursor for chat messages
  messageDiv.appendChild(iconDiv);
  messageDiv.appendChild(bubbleDiv);

  return messageDiv;
}

function startChatMessage() {
  if (currentChatIndex >= chatMessages.length) return;

  const message = chatMessages[currentChatIndex];
  console.log(
    "startChatMessage - index:",
    currentChatIndex,
    "message:",
    message
  );
  const messageElement = createChatMessage(message);

  if (chatMessagesContainer) {
    chatMessagesContainer.appendChild(messageElement);
    console.log("Message appended, calling ensureChatInView");
    // Always keep the latest message in view
    ensureChatInView();
  }

  // Trigger the grid when the placeholder message is reached
  if (!gridShown && message.text === PLACEHOLDER_TRIGGER_TEXT) {
    console.log("Triggering profile grid for placeholder message");
    loadProfileGrid();
    gridShown = true;
  }

  // Trigger NY highlighting when the highlight message is reached
  if (!highlightShown && message.text === HIGHLIGHT_TRIGGER_TEXT) {
    console.log("Triggering NY profile highlighting");
    highlightNYProfiles();
  }

  // Trigger skills highlighting when the skills message is reached
  if (!skillsHighlightShown && message.text === SKILLS_TRIGGER_TEXT) {
    console.log("Triggering skills highlighting");
    highlightSkills();
  }

  // Trigger LinkedIn highlighting when the LinkedIn message is reached
  if (!linkedinHighlightShown && message.text === LINKEDIN_TRIGGER_TEXT) {
    console.log("Triggering LinkedIn profile highlighting");
    highlightLinkedInProfiles();
  }

  // Trigger video container when the video message is reached
  if (!videoShown && message.text === VIDEO_TRIGGER_TEXT) {
    console.log("Triggering video container");
    showVideoContainer();
  }

  // Trigger second video container when the second video message is reached
  if (!secondVideoShown && message.text === SECOND_VIDEO_TRIGGER_TEXT) {
    console.log("Triggering second video container");
    showSecondVideoContainer();
  }

  // Trigger third video container when the third video message is reached
  if (!thirdVideoShown && message.text === THIRD_VIDEO_TRIGGER_TEXT) {
    console.log("Triggering third video container");
    showThirdVideoContainer();
  }

  // Start typing the message or show video
  if (message.type === "video") {
    console.log("Showing video for message index:", currentChatIndex);
    showChatVideo(currentChatIndex);
  } else {
    console.log("Starting to type message:", message.text);
    typeChatMessage(message.text, currentChatIndex);
  }
}

function typeChatMessage(text, messageIndex) {
  const textElement = document.getElementById(`chat-text-${messageIndex}`);

  if (!textElement) {
    console.log(
      "typeChatMessage - textElement not found for index:",
      messageIndex
    );
    return;
  }

  // Apply NY highlighting class if this is the highlight trigger text
  if (text === HIGHLIGHT_TRIGGER_TEXT) {
    textElement.classList.add("ny-highlight-text");
  }

  // Apply skills highlighting class if this is the skills trigger text
  if (text === SKILLS_TRIGGER_TEXT) {
    textElement.classList.add("skills-highlight-text");
  }

  // Apply LinkedIn highlighting class if this is the LinkedIn trigger text
  if (text === LINKEDIN_TRIGGER_TEXT) {
    textElement.classList.add("linkedin-highlight-text");
  }

  // Check if the message contains HTML tags
  const containsHTML = text.includes("<");

  let charIndex = 0;
  isTyping = true;
  console.log("Starting to type message:", text);

  function typeChar() {
    if (charIndex < text.length) {
      if (containsHTML) {
        // For HTML content, we need to type character by character but handle HTML tags
        let currentChar = text[charIndex];

        // If we hit an opening HTML tag, find the closing tag and add the whole tag at once
        if (currentChar === "<") {
          let tagEnd = text.indexOf(">", charIndex);
          if (tagEnd !== -1) {
            // Add all characters up to and including the closing >
            let currentHTML = textElement.innerHTML;
            let tagContent = text.substring(charIndex, tagEnd + 1);
            textElement.innerHTML = currentHTML + tagContent;
            charIndex = tagEnd + 1;
          } else {
            // If no closing >, just add the character
            textElement.innerHTML += currentChar;
            charIndex++;
          }
        } else {
          // Regular character, add it
          textElement.innerHTML += currentChar;
          charIndex++;
        }
      } else {
        textElement.textContent += text[charIndex];
        charIndex++;
      }
      ensureChatInView();
      setTimeout(typeChar, 40);
    } else {
      console.log("Finished typing message:", text);
      isTyping = false;
      ensureChatInView();
    }
  }

  typeChar();
}

function showChatVideo(messageIndex) {
  const videoElement = document.getElementById(`chat-video-${messageIndex}`);
  if (videoElement) {
    console.log("Showing video element for index:", messageIndex);
    videoElement.style.display = "block";
    isTyping = false; // Video shows immediately, no typing animation
    ensureChatInView();
  } else {
    console.log("Video element not found for index:", messageIndex);
  }
}

function nextChatMessage() {
  if (isTyping) {
    console.log("nextChatMessage blocked - still typing");
    return;
  }

  console.log(
    "nextChatMessage - current index:",
    currentChatIndex,
    "total messages:",
    chatMessages.length
  );
  if (currentChatIndex < chatMessages.length - 1) {
    currentChatIndex++;
    console.log("Advancing to message index:", currentChatIndex);
    startChatMessage();
    if (debugDropdown) {
      debugDropdown.value = `chat-${currentChatIndex}`;
    }
  } else {
    // Transition to final section after the last chat message
    transitionToFinal();
  }
}

// Build and reveal the profile grid using the CSV file
function loadProfileGrid() {
  const grid = document.getElementById("profile-grid");
  if (!grid) return;

  // Avoid loading twice
  if (grid.dataset.loaded === "true") {
    grid.style.display = "grid";
    return;
  }

  // Reset profile elements array
  profileElements = [];

  // Array of filler images to use when profile images are missing
  const fillerImages = [
    "assets/prof-pic-fillers/1.png",
    "assets/prof-pic-fillers/2.png",
    "assets/prof-pic-fillers/3.png",
    "assets/prof-pic-fillers/4.png",
    "assets/prof-pic-fillers/5.png",
  ];

  // Function to get a random filler image
  function getRandomFillerImage() {
    return fillerImages[Math.floor(Math.random() * fillerImages.length)];
  }

  fetch("mschf_profiles_detailed_full-wjosh.csv")
    .then((response) => response.text())
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          results.data.forEach((row) => {
            const url = row.image_url && row.image_url.trim();

            // Always create a profile item, even if image_url is missing
            const item = document.createElement("div");
            item.className = "profile-item";

            const img = document.createElement("img");
            img.loading = "lazy";

            // Use original image if available, otherwise use a random filler
            if (url) {
              img.src = url;
              // Add error handler to fall back to filler image if original fails to load
              img.onerror = function () {
                this.src = getRandomFillerImage();
                this.onerror = null; // Prevent infinite loop if filler also fails
              };
            } else {
              img.src = getRandomFillerImage();
            }

            // Build tooltip content with required fields
            const tooltipParts = [];
            if (row.name) tooltipParts.push(row.name);
            if (row.title) tooltipParts.push(row.title);
            if (row.location) tooltipParts.push(row.location);
            if (row.followers) tooltipParts.push(row.followers);

            const tooltip = document.createElement("div");
            tooltip.className = "profile-tooltip";
            tooltip.innerText = tooltipParts.join("\n");

            // Add hover event listeners to position tooltip dynamically
            item.addEventListener("mouseenter", function () {
              const rect = item.getBoundingClientRect();
              const tooltipHeight = 80; // Approximate tooltip height
              const topSpace = rect.top;

              // If there's not enough space above (less than tooltip height + buffer)
              if (topSpace < tooltipHeight + 20) {
                tooltip.classList.remove("tooltip-above");
              } else {
                tooltip.classList.add("tooltip-above");
              }
            });

            item.appendChild(img);
            item.appendChild(tooltip);
            grid.appendChild(item);

            // Store profile data for highlighting
            profileElements.push({ element: item, name: row.name });
          });
          grid.dataset.loaded = "true";
          grid.style.display = "grid";
        },
      });
    })
    .catch((err) => {
      console.error("Failed to load profile grid:", err);
    });
}

function previousChatMessage() {
  // If we are not on the first chat message, simply remove the last rendered message and decrement.
  if (currentChatIndex > 0) {
    if (chatMessagesContainer && chatMessagesContainer.lastChild) {
      chatMessagesContainer.removeChild(chatMessagesContainer.lastChild);
    }
    currentChatIndex--;

    // Hide the grid if we've moved before its trigger message
    if (gridShown && currentChatIndex < placeholderIndex) {
      hideProfileGrid();
      gridShown = false;
    }

    // Hide highlighting if we've moved before its trigger message
    if (highlightShown && currentChatIndex < highlightIndex) {
      unhighlightNYProfiles();
    }

    // Hide skills highlighting if we've moved before its trigger message
    if (skillsHighlightShown && currentChatIndex < skillsIndex) {
      unhighlightSkills();
    }

    // Hide LinkedIn highlighting if we've moved before its trigger message
    if (linkedinHighlightShown && currentChatIndex < linkedinIndex) {
      unhighlightLinkedInProfiles();
    }

    // Hide third video container if we've moved before its trigger message
    if (thirdVideoShown && currentChatIndex < thirdVideoIndex) {
      hideThirdVideoContainer();
      // Show second video again if we're still after its trigger message
      if (currentChatIndex >= secondVideoIndex) {
        showSecondVideoContainer();
      }
    }

    // Hide second video container if we've moved before its trigger message
    if (secondVideoShown && currentChatIndex < secondVideoIndex) {
      hideSecondVideoContainer();
      // Show first video again if we're still after its trigger message
      if (currentChatIndex >= videoIndex) {
        showVideoContainer();
      }
    }

    // Hide video container if we've moved before its trigger message
    if (videoShown && currentChatIndex < videoIndex) {
      hideVideoContainer();
      // Show profile grid again if we're still after its trigger message
      if (currentChatIndex >= placeholderIndex) {
        const grid = document.getElementById("profile-grid");
        if (grid && grid.dataset.loaded === "true") {
          grid.style.display = "grid";
        }
      }
    }

    // Update debug dropdown selection if present
    if (debugDropdown) {
      debugDropdown.value = `chat-${currentChatIndex}`;
    }
  } else {
    // We are on the very first message – exit chat mode back to the last sentence.
    chatMode = false;
    document.body.classList.remove("chat-active");
    if (chatContainer) {
      chatContainer.classList.remove("active");
    }
    if (chatMessagesContainer) {
      chatMessagesContainer.innerHTML = "";
    }

    // Reset chat indices so a fresh chat will start next time we enter.
    currentChatIndex = 0;

    hideProfileGrid();
    gridShown = false;

    // Jump to the final sentence and display it.
    currentSentenceIndex = sentences.length - 1;
    startTyping();

    // Reflect change in debug dropdown
    if (debugDropdown) {
      debugDropdown.value = currentSentenceIndex;
    }
  }
}

// Utility to instantly render the chat up to a given index and jump there
function jumpToChatIndex(targetIndex) {
  if (
    typeof targetIndex !== "number" ||
    targetIndex < 0 ||
    targetIndex >= chatMessages.length
  ) {
    return;
  }

  // Enter chat mode and reset state
  document.body.classList.add("chat-active");
  hideBouncingGifs();
  hidePassbyScreensaver();
  hideProfileGrid();

  gridShown = false;
  highlightShown = false;
  skillsHighlightShown = false;
  linkedinHighlightShown = false;
  videoShown = false;
  secondVideoShown = false;
  thirdVideoShown = false;
  unhighlightNYProfiles();
  unhighlightSkills();
  unhighlightLinkedInProfiles();
  hideVideoContainer();
  hideSecondVideoContainer();
  hideThirdVideoContainer();

  // Show chat container
  if (chatContainer) {
    chatContainer.classList.add("active");
  }

  chatMode = true;
  isTyping = false;

  // Clear existing messages
  if (chatMessagesContainer) {
    chatMessagesContainer.innerHTML = "";
  }

  // Render messages up to the requested index
  for (let idx = 0; idx <= targetIndex; idx++) {
    currentChatIndex = idx;
    const message = chatMessages[idx];
    const msgEl = createChatMessage(message);
    if (chatMessagesContainer) {
      chatMessagesContainer.appendChild(msgEl);
    }

    // Trigger grid/highlight side-effects just like progressive playback
    if (!gridShown && message.text === PLACEHOLDER_TRIGGER_TEXT) {
      loadProfileGrid();
      gridShown = true;
    }
    if (!highlightShown && message.text === HIGHLIGHT_TRIGGER_TEXT) {
      highlightNYProfiles();
    }
    if (!skillsHighlightShown && message.text === SKILLS_TRIGGER_TEXT) {
      highlightSkills();
    }
    if (!linkedinHighlightShown && message.text === LINKEDIN_TRIGGER_TEXT) {
      highlightLinkedInProfiles();
    }
    if (!videoShown && message.text === VIDEO_TRIGGER_TEXT) {
      showVideoContainer();
    }
    if (!secondVideoShown && message.text === SECOND_VIDEO_TRIGGER_TEXT) {
      showSecondVideoContainer();
    }
    if (!thirdVideoShown && message.text === THIRD_VIDEO_TRIGGER_TEXT) {
      showThirdVideoContainer();
    }

    // Populate content instantly (skip typing)
    if (message.type === "video") {
      showChatVideo(idx);
    } else {
      const textEl = document.getElementById(`chat-text-${idx}`);
      if (textEl) {
        // Check if the message contains HTML tags
        if (message.text.includes("<")) {
          textEl.innerHTML = message.text;
        } else {
          textEl.textContent = message.text;
        }
      }
    }
  }

  // Ensure the latest message is visible
  ensureChatInView();

  // Finalise state
  currentChatIndex = targetIndex;

  if (debugDropdown) {
    debugDropdown.value = `chat-${currentChatIndex}`;
  }
}

// ! Final Section Functions
function transitionToFinal() {
  // Hide chat elements and show terminal elements
  document.body.classList.remove("chat-active");
  hideBouncingGifs();
  hidePassbyScreensaver();
  hideSkaterScreensaver();
  hideTemplateVideo();
  hideFastGifs();
  hideProfileGrid();

  if (chatContainer) {
    chatContainer.classList.remove("active");
  }

  // Clear the terminal text immediately to avoid showing old content
  typedText.innerHTML = "";

  chatMode = false;
  finalMode = true;
  currentFinalIndex = 0;

  // Update debug dropdown
  if (debugDropdown) {
    debugDropdown.value = `final-${currentFinalIndex}`;
  }

  // Start first final sentence
  setTimeout(() => {
    startFinalTyping();
  }, 500);
}

function startFinalTyping() {
  if (isTyping) return;
  isTyping = true;
  typedText.innerHTML = "";
  i = 0;
  // Hide CTA until we know we're on the last sentence and finished typing
  hideFinalCTA();
  // Show template video if on the "template" sentence (index 8)
  if (currentFinalIndex === 8) {
    showTemplateVideo();
  } else {
    hideTemplateVideo();
  }
  // Show fast GIFs if on the "1:1 instead of 1:3,841." sentence (index 9)
  if (currentFinalIndex === 9) {
    showFastGifs();
  } else {
    hideFastGifs();
  }
  typeFinal();
}

function typeFinal() {
  if (i < finalSentences[currentFinalIndex].length) {
    const currentText = finalSentences[currentFinalIndex];

    // Check if we're at the start of an image tag
    if (currentText.substring(i).startsWith("<img:")) {
      // Find the end of the image tag
      const endIndex = currentText.indexOf(">", i);
      if (endIndex !== -1) {
        // Extract the image path
        const imagePath = currentText.substring(i + 5, endIndex); // +5 to skip '<img:'

        // Create and insert the image element
        const img = document.createElement("img");
        img.src = imagePath;
        img.style.cssText =
          "height: 10em; width: auto; vertical-align: middle; margin: 0 2px;";
        img.alt = "image";
        typedText.appendChild(img);

        // Skip past the entire image tag
        i = endIndex + 1;

        // Continue typing after a brief pause
        setTimeout(typeFinal, 100);
        return;
      }
    }

    // Handle generic HTML tags (e.g., <a>, <br/>) so they render correctly
    if (currentText[i] === "<") {
      const tagEnd = currentText.indexOf(">", i);
      if (tagEnd !== -1) {
        // Append the whole tag at once using innerHTML so the browser parses it
        typedText.innerHTML =
          typedText.innerHTML + currentText.substring(i, tagEnd + 1);
        i = tagEnd + 1;
        setTimeout(typeFinal, 40);
        return;
      }
    }

    // Normal character typing (non-HTML)
    const textNode = document.createTextNode(currentText[i++]);
    typedText.appendChild(textNode);

    // Check if we just typed a period followed by a space (sentence ending)
    const justTyped = currentText[i - 1];
    const nextChar = currentText[i];

    if (justTyped === "." && nextChar === " ") {
      setTimeout(typeFinal, 250); // Longer pause at sentence breaks
    } else {
      setTimeout(typeFinal, 40);
    }
  } else {
    isTyping = false;

    // If we're on the last final sentence, reveal CTA links
    if (currentFinalIndex === finalSentences.length - 1) {
      showFinalCTA();
    } else {
      hideFinalCTA();
    }
  }
}

function nextFinalSentence() {
  if (isTyping) return; // Prevent advancing while typing
  if (currentFinalIndex < finalSentences.length - 1) {
    currentFinalIndex++;
    startFinalTyping();
    if (debugDropdown) {
      debugDropdown.value = `final-${currentFinalIndex}`;
    }
  }
  // Could add more logic here for what happens after final sentences
}

function previousFinalSentence() {
  if (isTyping) return; // Prevent going back while typing
  if (currentFinalIndex > 0) {
    currentFinalIndex--;
    startFinalTyping();
    if (debugDropdown) {
      debugDropdown.value = `final-${currentFinalIndex}`;
    }
  } else {
    // Return to chat mode at the last message
    finalMode = false;
    hideFinalCTA();
    chatMode = true;
    document.body.classList.add("chat-active");

    if (chatContainer) {
      chatContainer.classList.add("active");
    }

    // Restore the chat at the last message
    currentChatIndex = chatMessages.length - 1;
    if (debugDropdown) {
      debugDropdown.value = `chat-${currentChatIndex}`;
    }
  }
}

// ! Start the Animation
startTyping();

// ! Names to highlight (skills and experience matches)
const skillsNames = [
  "Nathan Trumbull",
  "Yianni Sines",
  "Tyler Wibert",
  "Sandro Espinosa Galindo",
  "Jonny Thaw",
  "Jenny Benevento",
];

// ! Names to highlight (LinkedIn power users)
const linkedinNames = [
  "Mark Bietz",
  "Jesper Larsson",
  "Dwight Zähringer",
  "Christina Bull",
  "Daniel High",
  "Jonathan Farrugia",
  "Olzhas Yergaliyev",
  "jesse lane",
  "Niek Dekker r",
];

// ! Final CTA (Portfolio & Email)
function showFinalCTA() {
  // Avoid duplicating
  let cta = document.getElementById("final-cta-container");
  if (!cta) {
    cta = document.createElement("div");
    cta.id = "final-cta-container";
    cta.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1500;
      display: flex;
      flex-direction: column;
      gap: 10em;
      font-family: monospace;
      text-align: center;
    `;

    const portfolioLink = document.createElement("a");
    portfolioLink.href = "https://www.joshstrupp.com/";
    portfolioLink.target = "_blank";
    portfolioLink.textContent = "Portfolio";
    portfolioLink.style.cssText =
      "color:#006400;text-decoration:underline; font-size:2em; font-weight:bold;";

    const emailLink = document.createElement("a");
    emailLink.href = "mailto:howdy@joshstrupp.com";
    emailLink.textContent = "howdy@joshstrupp.com";
    emailLink.style.cssText =
      "color:#006400;text-decoration:underline; font-size:2em; font-weight:bold;";

    cta.appendChild(portfolioLink);
    cta.appendChild(emailLink);
    document.body.appendChild(cta);
  }
  cta.style.display = "flex";
}

function hideFinalCTA() {
  const cta = document.getElementById("final-cta-container");
  if (cta) {
    cta.style.display = "none";
  }
}

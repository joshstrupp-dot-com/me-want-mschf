// ! Text to Display
const sentences = [
  "Let me start by apologizing...",
  "I'm sorry if this comes off as creepy. But really, you started it.",
  "Your work has inspired so much of my own.",
  "Plus I pass by your offices all the time. It looks cool in there.",
  "No, I'm not stalking you.",
  "I'm stalking the <img:assets/mschf-board-nobg.png> skaters.",
  "...gd I wish I could skate.",
  "What I'm trying to say is:",
  "you project a desirable workplace, but list no jobs!",
  "So, in lieu of applying, I'm simulating an interview.",
  "Cuz if you got to know me, I think there's a 2-10% chance you'd hire me.",
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
    text: "But I feel like I know everyone here already.",
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
    text: "*checks watch, visibly unsettled*",
    side: "left",
  },
  {
    sender: "js",
    text: "Many of us share a fondness for overpriced coffee and underresourced trash departments.",
    side: "right",
  },
  {
    sender: "js",
    text: "Some of us share the same skills and experience. And, in the case of Johnny Thaw, the same Pornhub handle.",
    side: "right",
  },
  {
    sender: "js",
    text: "And some of us, for worse or for worse, are LinkedIn power users. If you have more than 1,000 connections, you're never alone.",
    side: "right",
  },
  {
    sender: "mschf",
    text: "Uhhh... k. Let's talk about your work. Got any projects we might find interesting?",
    side: "left",
  },
  {
    sender: "js",
    text: "A handful",
    side: "right",
  },
];

// Merge the two chat sets into a single ordered feed and set up grid trigger helpers
chatMessages.push(...secondChatMessages);
const PLACEHOLDER_TRIGGER_TEXT =
  "I wrote a script to scrape LinkedIn. It retrieved ~80 MSCHF employees and their information.";
const HIGHLIGHT_TRIGGER_TEXT =
  "Many of us share a fondness for overpriced coffee and underresourced trash departments.";
const SKILLS_TRIGGER_TEXT =
  "Some of us share the same skills and experience. And, in the case of Johnny Thaw, the same Pornhub handle.";
const LINKEDIN_TRIGGER_TEXT =
  "And some of us, for worse or for worse, are LinkedIn power users. If you have more than 1,000 connections, you're never alone.";
const VIDEO_TRIGGER_TEXT = "A handful";
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
let gridShown = false;
let highlightShown = false;
let skillsHighlightShown = false;
let linkedinHighlightShown = false;
let videoShown = false;
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
  unhighlightNYProfiles();
  unhighlightSkills();
  unhighlightLinkedInProfiles();
  hideVideoContainer();
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

// ! Setup and Variables
const typedText = document.getElementById("typed-text");
let currentSentenceIndex = 0;
let i = 0;
let isTyping = false;
let video = document.getElementById("screensaver-video");
let passbyVideo = document.getElementById("passby-video");
chatContainer = document.getElementById("chat-container");
chatMessagesContainer = document.getElementById("chat-messages");
let bounceInterval = null;
let bounceState = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
  speed: 1.2, // pixels per frame
  width: 200,
  height: 112, // will update after video loads
};
let passbyBounceState = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
  speed: 1.5, // slightly different speed for variety
  width: 200,
  height: 112, // will update after video loads
};

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
  // Show screensaver if on third or fourth sentence
  if (currentSentenceIndex === 2) {
    if (video.style.display !== "block") {
      showScreensaver();
    }
    // Hide passby video if it was showing
    hidePassbyScreensaver();
  } else if (currentSentenceIndex === 3) {
    // Keep first video bouncing, show second video
    if (video.style.display !== "block") {
      showScreensaver();
    }
    if (passbyVideo.style.display !== "block") {
      showPassbyScreensaver();
    }
  } else {
    hideScreensaver();
    hidePassbyScreensaver();
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

  // Set initial value
  dropdown.value = chatMode ? `chat-${currentChatIndex}` : currentSentenceIndex;

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
    } else {
      const newIndex = parseInt(selectedValue);
      if (newIndex >= 0 && newIndex < sentences.length) {
        // Reset to terminal mode if in chat mode
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

// Update dropdown when sentences change via keyboard
const originalNextSentence = nextSentence;
const originalPreviousSentence = previousSentence;

nextSentence = function () {
  originalNextSentence();
  if (debugDropdown) {
    debugDropdown.value = chatMode
      ? `chat-${currentChatIndex}`
      : currentSentenceIndex;
  }
};

previousSentence = function () {
  originalPreviousSentence();
  if (debugDropdown) {
    debugDropdown.value = chatMode
      ? `chat-${currentChatIndex}`
      : currentSentenceIndex;
  }
};

function showScreensaver() {
  if (!video) return;
  video.style.display = "block";
  video.currentTime = 0;
  video.play();
  // Get video dimensions
  bounceState.width = video.offsetWidth;
  bounceState.height = video.offsetHeight;
  // Start in a random position
  bounceState.x = Math.random() * (window.innerWidth - bounceState.width);
  bounceState.y = Math.random() * (window.innerHeight - bounceState.height);
  bounceState.dx = Math.random() > 0.5 ? 1 : -1;
  bounceState.dy = Math.random() > 0.5 ? 1 : -1;
  moveVideo();
  if (!bounceInterval) {
    bounceInterval = setInterval(moveVideo, 16); // ~60fps
  }
}

function hideScreensaver() {
  if (!video) return;
  video.pause();
  video.style.display = "none";
  if (bounceInterval && passbyVideo.style.display === "none") {
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
    bounceInterval = setInterval(moveVideo, 16); // ~60fps
  }
}

function hidePassbyScreensaver() {
  if (!passbyVideo) return;
  passbyVideo.pause();
  passbyVideo.style.display = "none";
  if (bounceInterval && video.style.display === "none") {
    clearInterval(bounceInterval);
    bounceInterval = null;
  }
}

function moveVideo() {
  // Move first video (asteroids)
  if (video.style.display === "block") {
    // Bounce off edges
    if (
      bounceState.x + bounceState.dx * bounceState.speed < 0 ||
      bounceState.x + bounceState.width + bounceState.dx * bounceState.speed >
        window.innerWidth
    ) {
      bounceState.dx *= -1;
    }
    if (
      bounceState.y + bounceState.dy * bounceState.speed < 0 ||
      bounceState.y + bounceState.height + bounceState.dy * bounceState.speed >
        window.innerHeight
    ) {
      bounceState.dy *= -1;
    }
    bounceState.x += bounceState.dx * bounceState.speed;
    bounceState.y += bounceState.dy * bounceState.speed;
    video.style.left = bounceState.x + "px";
    video.style.top = bounceState.y + "px";
  }

  // Move second video (passby)
  if (passbyVideo.style.display === "block") {
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
}

// ! Chat Functions
function transitionToChat() {
  // Hide all terminal elements
  document.body.classList.add("chat-active");
  hideScreensaver();
  hidePassbyScreensaver();
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
    iconDiv.textContent = "JS";
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

  let charIndex = 0;
  isTyping = true;
  console.log("Starting to type message:", text);

  function typeChar() {
    if (charIndex < text.length) {
      textElement.textContent += text[charIndex];
      charIndex++;
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
    console.log("Already at last message");
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

  fetch("mschf_profiles_detailed_full-wjosh.csv")
    .then((response) => response.text())
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          results.data.forEach((row) => {
            const url = row.image_url && row.image_url.trim();
            if (url) {
              const item = document.createElement("div");
              item.className = "profile-item";

              const img = document.createElement("img");
              img.src = url;
              img.loading = "lazy";

              // Build tooltip content with required fields
              const tooltipParts = [];
              if (row.name) tooltipParts.push(row.name);
              if (row.title) tooltipParts.push(row.title);
              if (row.location) tooltipParts.push(row.location);
              if (row.followers) tooltipParts.push(row.followers);

              const tooltip = document.createElement("div");
              tooltip.className = "profile-tooltip";
              tooltip.innerText = tooltipParts.join("\n");

              item.appendChild(img);
              item.appendChild(tooltip);
              grid.appendChild(item);

              // Store profile data for highlighting
              profileElements.push({ element: item, name: row.name });
            }
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
  hideScreensaver();
  hidePassbyScreensaver();
  hideProfileGrid();

  gridShown = false;
  highlightShown = false;
  skillsHighlightShown = false;
  linkedinHighlightShown = false;
  videoShown = false;
  unhighlightNYProfiles();
  unhighlightSkills();
  unhighlightLinkedInProfiles();
  hideVideoContainer();

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

    // Populate content instantly (skip typing)
    if (message.type === "video") {
      showChatVideo(idx);
    } else {
      const textEl = document.getElementById(`chat-text-${idx}`);
      if (textEl) textEl.textContent = message.text;
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

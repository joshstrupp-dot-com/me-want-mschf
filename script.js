// ! Text to Display
const sentences = [
  "Let me start by apologizing...",
  "I'm sorry if this comes off as creepy. But really, you started it.",
  "Your work has inspired so much of my own.",
  "Plus I pass by your offices all the time. It looks cool in there.",
  "No, I'm not stalking you.",
  "I'm stalking the skaters.",
  "...gd I wish I could skate.",
  "What I'm trying to say is:",
  "you project a desirable workplace, but list no jobs!",
  "So, in lieu of applying, I'm simulating an interview.",
  "Cuz if you got to know me, I think there's a 2-10% chance you'd hire me.",
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
    sender: "js",
    text: "placeholder text",
    side: "right",
  },
];

// Flag to indicate whether we've transitioned to the second chat yet
let secondChatLoaded = false;

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
let skateboardContainer = document.getElementById("skateboard-container");
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
    typedText.textContent += sentences[currentSentenceIndex][i++];

    // Check if we just typed a period followed by a space (sentence ending)
    const currentText = sentences[currentSentenceIndex];
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
  typedText.textContent = "";
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
    hideSkateboardAnimation();
  } else if (currentSentenceIndex === 6) {
    // Show skateboard animation on the skating sentence
    hideScreensaver();
    hidePassbyScreensaver();
    showSkateboardAnimation();
  } else {
    hideScreensaver();
    hidePassbyScreensaver();
    hideSkateboardAnimation();
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

  // Set initial value
  dropdown.value = chatMode ? "chat" : currentSentenceIndex;

  // Add event listener
  dropdown.addEventListener("change", function (event) {
    const selectedValue = event.target.value;

    if (selectedValue === "chat") {
      // Jump to chat section
      transitionToChat();
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
    debugDropdown.value = chatMode ? "chat" : currentSentenceIndex;
  }
};

previousSentence = function () {
  originalPreviousSentence();
  if (debugDropdown) {
    debugDropdown.value = chatMode ? "chat" : currentSentenceIndex;
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

// ! Skateboard Animation Functions
function showSkateboardAnimation() {
  if (!skateboardContainer) return;

  // Reset position and show
  skateboardContainer.style.display = "block";
  skateboardContainer.classList.remove("skateboard-animate");

  // Force a reflow to ensure the reset takes effect
  skateboardContainer.offsetHeight;

  // Start the animation
  skateboardContainer.classList.add("skateboard-animate");

  // Hide after animation completes
  setTimeout(() => {
    hideSkateboardAnimation();
  }, 4000);
}

function hideSkateboardAnimation() {
  if (!skateboardContainer) return;
  skateboardContainer.style.display = "none";
  skateboardContainer.classList.remove("skateboard-animate");
}

// ! Chat Functions
function transitionToChat() {
  // Hide all terminal elements
  document.body.classList.add("chat-active");
  hideScreensaver();
  hidePassbyScreensaver();
  hideSkateboardAnimation();

  // Show chat container
  if (chatContainer) {
    chatContainer.classList.add("active");
  }

  chatMode = true;
  currentChatIndex = 0;

  // Update debug dropdown
  if (debugDropdown) {
    debugDropdown.value = "chat";
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
  const messageElement = createChatMessage(message);

  if (chatMessagesContainer) {
    chatMessagesContainer.appendChild(messageElement);
  }

  // Start typing the message or show video
  if (message.type === "video") {
    showChatVideo(currentChatIndex);
  } else {
    typeChatMessage(message.text, currentChatIndex);
  }
}

function typeChatMessage(text, messageIndex) {
  const textElement = document.getElementById(`chat-text-${messageIndex}`);

  if (!textElement) return;

  let charIndex = 0;
  isTyping = true;

  function typeChar() {
    if (charIndex < text.length) {
      textElement.textContent += text[charIndex];
      charIndex++;
      setTimeout(typeChar, 40);
    } else {
      isTyping = false;
    }
  }

  typeChar();
}

function showChatVideo(messageIndex) {
  const videoElement = document.getElementById(`chat-video-${messageIndex}`);
  if (videoElement) {
    videoElement.style.display = "block";
    isTyping = false; // Video shows immediately, no typing animation
  }
}

function nextChatMessage() {
  if (isTyping) return;

  // Advance within the current chat set if possible
  if (currentChatIndex < chatMessages.length - 1) {
    currentChatIndex++;
    startChatMessage();
  } else {
    // We've reached the end of the first chat set, load the second chat once
    if (!secondChatLoaded) {
      secondChatLoaded = true;
      startSecondChat();
    }
  }
}

// Replace the existing chat messages with the second set and start over
function startSecondChat() {
  // Clear the existing chat UI
  if (chatMessagesContainer) {
    chatMessagesContainer.innerHTML = "";
  }

  // Mutate the original chatMessages array so existing functions continue to work
  chatMessages.length = 0;
  secondChatMessages.forEach((msg) => chatMessages.push(msg));

  currentChatIndex = 0;

  // Show the first message of the new chat set
  startChatMessage();

  // Trigger the profile grid
  loadProfileGrid();
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

// Navigate backward in chat. If already at the first message, return to the last sentence screen.
function previousChatMessage() {
  // If we are not on the first chat message, simply remove the last rendered message and decrement.
  if (currentChatIndex > 0) {
    if (chatMessagesContainer && chatMessagesContainer.lastChild) {
      chatMessagesContainer.removeChild(chatMessagesContainer.lastChild);
    }
    currentChatIndex--;
    // Update debug dropdown selection if present
    if (debugDropdown) {
      debugDropdown.value = "chat";
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
    secondChatLoaded = false;

    // Jump to the final sentence and display it.
    currentSentenceIndex = sentences.length - 1;
    startTyping();

    // Reflect change in debug dropdown
    if (debugDropdown) {
      debugDropdown.value = currentSentenceIndex;
    }
  }
}

// ! Start the Animation
startTyping();

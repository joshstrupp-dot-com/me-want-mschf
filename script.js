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

// Merge the two chat sets into a single ordered feed and set up grid trigger helpers
chatMessages.push(...secondChatMessages);
const PLACEHOLDER_TRIGGER_TEXT = "placeholder text";
const placeholderIndex = chatMessages.findIndex(
  (msg) => msg.text === PLACEHOLDER_TRIGGER_TEXT
);
let gridShown = false;
function hideProfileGrid() {
  const grid = document.getElementById("profile-grid");
  if (grid) {
    grid.style.display = "none";
  }
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

// ! Start the Animation
startTyping();

// دیکشنری آیکون‌های SVG
const svgIcons = {
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>`,
};

const consoleBody = document.getElementById("consoleBody");
const commandInput = document.getElementById("commandInput");

let commandHistory = [];
let historyIndex = -1;

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

function appendLog(type, message, isUser = false) {
  const logLine = document.createElement("div");
  logLine.className = `log-line log-${type}`;

  const timeSpan = `<span class="log-time">${getCurrentTime()}</span>`;
  const contentHtml = `
            <div class="log-content" ${isUser ? 'dir="ltr"' : ""}>
                <span class="log-icon">${svgIcons[type]}</span>
                <span class="log-text"></span>
            </div>
        `;

  logLine.innerHTML = timeSpan + contentHtml;
  consoleBody.appendChild(logLine);

  const textSpan = logLine.querySelector(".log-text");

  // اگر متنی پاس داده شده بود مستقیما قرار دهد
  if (message) {
    textSpan.textContent = message;
  }

  consoleBody.scrollTop = consoleBody.scrollHeight;
  return textSpan;
}

function typeEffect(element, text, speed = 20) {
  let i = 0;
  element.innerHTML = '<span class="typing-indicator"></span>';
  const indicator = element.querySelector(".typing-indicator");

  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (i < text.length) {
        const char = document.createTextNode(text.charAt(i));
        element.insertBefore(char, indicator);
        i++;
        consoleBody.scrollTop = consoleBody.scrollHeight;
      } else {
        clearInterval(timer);
        indicator.remove();
        resolve();
      }
    }, speed);
  });
}

function clearConsole() {
  consoleBody.innerHTML = "";
  appendLog("info", "کنسول پاکسازی شد.");
}

async function processCommand(cmd) {
  const command = cmd.trim().toLowerCase();
  if (!command) return;

  commandHistory.push(cmd);
  historyIndex = commandHistory.length;

  appendLog("user", cmd, true);
  commandInput.value = "";

  await new Promise((r) => setTimeout(r, 400));

  let responseText, type;

  switch (command) {
    case "help":
      type = "info";
      responseText = "دستورات در دسترس: help, clear, user sync, restart server";
      break;
    case "clear":
      clearConsole();
      return;
    case "user sync":
      type = "success";
      responseText =
        "کاربرها با موفقیت با دیتابیس اصلی همگام‌سازی شدند (۸۹۲ کاربر).";
      break;
    case "restart server":
      type = "warning";
      responseText = "در حال راه اندازی مجدد... لطفا منتظر بمانید.";
      break;
    case "sudo rm -rf /":
      type = "error";
      responseText =
        "خطا دسترسی: شما مجوز کافی برای اجرای این دستور را ندارید!";
      break;
    default:
      type = "error";
      responseText = `دستور نامعتبر است: "${command}". برای راهنمایی help را تایپ کنید.`;
  }

  const responseLogText = appendLog(type, "");
  await typeEffect(responseLogText, responseText);
}

commandInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    processCommand(this.value);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      this.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      this.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      this.value = "";
    }
  }
});

// چاپ پیام اتصال در بدو ورود
appendLog("info", "سیستم مدیریت متصل شد. آماده دریافت دستورات...");

// اسکریپت منوی همبرگری
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// بستن منو در صورت کلیک در فضای خالی (اختیاری اما کاربردی)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

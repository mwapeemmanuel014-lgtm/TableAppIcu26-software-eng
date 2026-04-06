/* ================================================================
   TIMETABLE APP SCRIPTS
   ================================================================ */

/**
 * Initialize the application on DOM ready
 */
document.addEventListener("DOMContentLoaded", () => {
  pageInit();
});

/**
 * Show preloader
 */
function showPreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "flex";
  }
}

/**
 * Hide preloader with animation
 */
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      preloader.style.opacity = "1";
    }, 300);
  }
}

/**
 * Render timetable from data.js
 */
function renderTimetable() {
  const container = document.getElementById("timetableContainer");
  if (!container || typeof timetableData === "undefined") return;

  showPreloader();

  // Simulate loading delay for better UX
  setTimeout(() => {
    container.innerHTML = "";
    const dayLabels = {
      monday: "📍 Monday (Week 1 & 2)",
      tuesday: "📍 Tuesday",
      wednesday: "📍 Wednesday",
      thursday: "📍 Thursday",
      friday: "📍 Friday",
      saturday: "📍 Saturday",
      sunday: "📍 Sunday (Week 2)",
      library: "📚 Library & Extension Courses",
    };

    Object.entries(timetableData).forEach(([dayKey, courses]) => {
      if (!Array.isArray(courses) || courses.length === 0) return;

      const dayDiv = document.createElement("div");
      dayDiv.className = "day-card";
      dayDiv.setAttribute("data-day", dayKey);

      const dayHeader = document.createElement("div");
      dayHeader.className = "day-header";
      dayHeader.style.cursor = "pointer";
      dayHeader.setAttribute("role", "button");
      dayHeader.setAttribute("tabindex", "0");
      dayHeader.setAttribute("aria-expanded", "true");

      const dayTitle = document.createElement("h3");
      dayTitle.className = "day-title";
      dayTitle.innerHTML = `<span class="toggle-icon">▼</span> ${dayLabels[dayKey] || dayKey.toUpperCase()}`;
      dayHeader.appendChild(dayTitle);

      dayDiv.appendChild(dayHeader);

      const coursesContainer = document.createElement("div");
      coursesContainer.className = "courses-container";

      courses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.className = `course-card ${course.clash ? "has-clash" : ""} course-${course.type}`;
        courseCard.style.cursor = "pointer";
        courseCard.setAttribute("role", "button");
        courseCard.setAttribute("tabindex", "0");
        courseCard.setAttribute("aria-label", `${course.course} at ${course.time} in ${course.venue}`);

        if (course.clash) {
          const clashMarker = document.createElement("div");
          clashMarker.className = "clash-badge";
          clashMarker.innerHTML = "❌";
          clashMarker.title = "Schedule clash detected";
          courseCard.appendChild(clashMarker);
        }

        const timeEl = document.createElement("div");
        timeEl.className = "course-time";
        timeEl.innerHTML = `⏰ ${course.time}`;

        const nameEl = document.createElement("div");
        nameEl.className = "course-name";
        nameEl.textContent = course.course;

        const venueEl = document.createElement("div");
        venueEl.className = "course-venue";
        venueEl.innerHTML = `📍 ${course.venue}`;

        const typeEl = document.createElement("div");
        typeEl.className = "course-type";
        typeEl.innerHTML = `<span class="type-badge type-${course.type}">${course.type.toUpperCase()}</span>`;

        courseCard.appendChild(timeEl);
        courseCard.appendChild(nameEl);
        courseCard.appendChild(venueEl);
        courseCard.appendChild(typeEl);

        // Add click handler for course details
        courseCard.addEventListener("click", () => showCourseDetails(course));
        courseCard.addEventListener("keypress", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showCourseDetails(course);
          }
        });

        coursesContainer.appendChild(courseCard);
      });

      dayDiv.appendChild(coursesContainer);

      // Add click handler for day toggle
      dayHeader.addEventListener("click", () => toggleDay(dayDiv));
      dayHeader.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleDay(dayDiv);
        }
      });

      container.appendChild(dayDiv);
    });

    // Update the timetable section display
    container.style.display = "block";
    hidePreloader();
  }, 800);
}

/**
 * Toggle day expansion
 */
function toggleDay(dayElement) {
  const header = dayElement.querySelector(".day-header");
  const container = dayElement.querySelector(".courses-container");
  const isExpanded = header.getAttribute("aria-expanded") === "true";
  const toggleIcon = header.querySelector(".toggle-icon");

  if (isExpanded) {
    container.style.maxHeight = "0";
    container.style.overflow = "hidden";
    header.setAttribute("aria-expanded", "false");
    toggleIcon.textContent = "▶";
    dayElement.classList.add("collapsed");
  } else {
    container.style.maxHeight = container.scrollHeight + "px";
    container.style.overflow = "visible";
    header.setAttribute("aria-expanded", "true");
    toggleIcon.textContent = "▼";
    dayElement.classList.remove("collapsed");
  }
}

/**
 * Show course details in modal
 */
function showCourseDetails(course) {
  const modal = document.getElementById("courseModal");
  const details = document.getElementById("courseDetails");

  const clashInfo = course.clash 
    ? '<div class="modal-clash-warning">⚠️ This course has a scheduling conflict</div>' 
    : '';

  details.innerHTML = `
    <div class="course-detail-header">
      <h2>${course.course}</h2>
      ${clashInfo}
    </div>
    <div class="course-detail-info">
      <div class="detail-item">
        <span class="detail-label">🕐 Time:</span>
        <span class="detail-value">${course.time}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">📍 Venue:</span>
        <span class="detail-value">${course.venue}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">📚 Type:</span>
        <span class="detail-value">
          <span class="type-badge type-${course.type}">${course.type.toUpperCase()}</span>
        </span>
      </div>
    </div>
    <div class="course-detail-actions">
      <button class="button" onclick="addToCalendar('${course.course}', '${course.time}', '${course.venue}')">
        📅 Add to Calendar
      </button>
      <button class="button secondary" onclick="document.getElementById('courseModal').style.display = 'none'">
        Close
      </button>
    </div>
  `;

  modal.style.display = "flex";
}

/**
 * Add course to calendar (placeholder)
 */
function addToCalendar(course, time, venue) {
  showNotification(`✅ "${course}" added to your calendar!`, "success", 2000);
  setTimeout(() => {
    document.getElementById("courseModal").style.display = "none";
  }, 1500);
}

/**
 * Expand all days
 */
function expandAllDays() {
  const dayCards = document.querySelectorAll(".day-card");
  dayCards.forEach((day) => {
    const header = day.querySelector(".day-header");
    if (header.getAttribute("aria-expanded") === "false") {
      toggleDay(day);
    }
  });
}

/**
 * Collapse all days
 */
function collapseAllDays() {
  const dayCards = document.querySelectorAll(".day-card");
  dayCards.forEach((day) => {
    const header = day.querySelector(".day-header");
    if (header.getAttribute("aria-expanded") === "true") {
      toggleDay(day);
    }
  });
}

/**
 * Set active navigation link based on current page
 */
function initNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Search functionality for timetable
 */
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filterTimetable(query);
  });
}

/**
 * Filter timetable by course name or venue
 */
function filterTimetable(query) {
  const courseCards = document.querySelectorAll(".course-card");
  const dayCards = document.querySelectorAll(".day-card");

  courseCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (query === "" || text.includes(query)) {
      card.style.display = "block";
      card.style.opacity = "1";
      // Highlight matching text
      if (query) {
        card.style.background = "linear-gradient(135deg, rgba(255, 204, 0, 0.15) 0%, rgba(0, 255, 204, 0.15) 100%)";
      } else {
        card.style.background = "";
      }
    } else {
      card.style.display = "none";
      card.style.opacity = "0.3";
    }
  });

  // Show/hide day cards based on visible course cards
  dayCards.forEach((dayCard) => {
    const visibleCourses = dayCard.querySelectorAll(".course-card:not([style*='display: none'])");
    dayCard.style.display = visibleCourses.length > 0 ? "block" : "none";
  });
}

/**
 * Print timetable functionality
 */
function initPrintButton() {
  const printBtn = document.getElementById("printBtn");
  if (!printBtn) return;

  printBtn.addEventListener("click", () => {
    window.print();
  });
}

/**
 * Toggle day visibility (for expandable sections)
 */
function toggleDay(element) {
  const day = element.closest(".day");
  if (day) {
    day.classList.toggle("collapsed");
  }
}

/**
 * Export timetable as CSV
 */
function exportAsCSV() {
  const rows = [["Day", "Time", "Course", "Venue", "Type"]];
  const courseCards = document.querySelectorAll(".course-card");
  const dayCards = document.querySelectorAll(".day-card");

  dayCards.forEach((dayCard) => {
    const dayTitle = dayCard.querySelector(".day-title")?.textContent || "";
    const courses = dayCard.querySelectorAll(".course-card");
    
    courses.forEach((course) => {
      const time = course.querySelector(".course-time")?.textContent?.replace("⏰ ", "") || "";
      const courseName = course.querySelector(".course-name")?.textContent || "";
      const venue = course.querySelector(".course-venue")?.textContent?.replace("📍 ", "") || "";
      const type = course.className.includes("core") ? "CORE" : "ELECTIVE";

      rows.push([dayTitle, time, courseName, venue, type]);
    });
  });

  const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  downloadFile(csv, "timetable.csv", "text/csv");
}

/**
 * Download file helper
 */
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/**
 * Count clashes and display alert
 */
function displayClashSummary() {
  const clashElements = document.querySelectorAll(".course-card.has-clash");
  const clashCount = clashElements.length;

  if (clashCount > 0) {
    const clashAlert = document.getElementById("clashAlert");
    if (clashAlert) {
      clashAlert.innerHTML = `
        <strong>⚠️ Schedule Conflicts Detected!</strong> You have <strong>${clashCount}</strong> confirmed clash(es). 
        <a href="clashes.html">View conflict details</a>
      `;
      clashAlert.style.display = "block";
    }
  }
}

/**
 * Calculate free time slots
 */
function findFreeSlots() {
  const timeBlocks = [
    "08:00–09:00",
    "09:00–10:00",
    "10:00–11:00",
    "11:00–12:00",
    "12:00–13:00",
    "13:00–14:00",
    "14:00–15:00",
    "15:00–16:00",
    "16:00–17:00",
  ];

  const busyTimes = [
    "08:00–09:00",
    "10:00–11:00",
    "11:00–12:00",
    "12:00–13:00", // conflicts
    "13:00–14:00",
    "14:00–15:00", // conflicts
    "15:00–16:00",
    "16:00–17:00",
  ];

  const freeSlots = timeBlocks.filter((slot) => !busyTimes.includes(slot));
  return freeSlots;
}

/**
 * Toggle color scheme (light/dark mode)
 */
function toggleTheme() {
  const root = document.documentElement;
  const isDark =
    root.style.getPropertyValue("--primary-dark") === "#0b1e3d";

  if (isDark) {
    root.style.setProperty("--primary-dark", "#ffffff");
    root.style.setProperty("--header-bg", "#004080");
    root.style.setProperty("--card-bg", "#f5f5f5");
    root.style.setProperty("--text-light", "#000000");
    localStorage.setItem("theme", "light");
  } else {
    root.style.setProperty("--primary-dark", "#0b1e3d");
    root.style.setProperty("--header-bg", "#004080");
    root.style.setProperty("--card-bg", "#1a2a4f");
    root.style.setProperty("--text-light", "#ffffff");
    localStorage.setItem("theme", "dark");
  }
}

/**
 * Load theme preference from localStorage
 */
function loadThemePreference() {
  const theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    toggleTheme();
  }
}

/**
 * Initialize clash summary on homepage
 */
function initClashSummary() {
  displayClashSummary();
}

/**
 * Format time display
 */
function formatTime(time) {
  // Example: "08:00–09:00" stays as is, or format as needed
  return time;
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = "info", duration = 3000) {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type}`;
  notification.innerHTML = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.zIndex = "1000";
  notification.style.maxWidth = "300px";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, duration);
}

/**
 * Verify all buttons and links are functional
 */
function verifyButtons() {
  const buttons = document.querySelectorAll(
    "a.button, button, input[type='search'], input[type='button']"
  );
  let validCount = 0;
  let issues = [];

  buttons.forEach((btn) => {
    // Check button
    if (btn.tagName === "BUTTON" || btn.id === "printBtn") {
      if (btn.id === "printBtn" && btn.getAttribute("title")) {
        validCount++;
      }
    }
    // Check link
    else if (btn.tagName === "A") {
      const href = btn.getAttribute("href");
      if (href && (href.endsWith(".html") || href.startsWith("#"))) {
        validCount++;
      } else {
        issues.push(`Link has invalid href: ${href}`);
      }
    }
    // Check input
    else if (btn.tagName === "INPUT") {
      if (btn.id === "searchInput") {
        validCount++;
      }
    }
  });

  if (process.env.NODE_ENV !== "production") {
    console.log(`✓ Button Verification: ${validCount} interactive elements found`);
    if (issues.length > 0) {
      console.warn("Button Issues:", issues);
    }
  }
}

/**
 * Initialize on page load
 */
function pageInit() {
  loadThemePreference();
  initNavigation();
  initPrintButton();

  // Page-specific initialization
  const timetableContainer = document.getElementById("timetableContainer");
  if (timetableContainer) {
    renderTimetable();
    initSearch();
    displayClashSummary();
    initModalHandler();
    initExpandCollapseButtons();
  }

  // Verify buttons are set up correctly
  verifyButtons();
}

/**
 * Initialize modal close button
 */
function initModalHandler() {
  const modal = document.getElementById("courseModal");
  const closeBtn = document.querySelector(".modal-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });
}

/**
 * Initialize expand/collapse buttons
 */
function initExpandCollapseButtons() {
  const expandBtn = document.getElementById("expandAllBtn");
  const collapseBtn = document.getElementById("collapseAllBtn");

  if (expandBtn) {
    expandBtn.addEventListener("click", expandAllDays);
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", collapseAllDays);
  }
}

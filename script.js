const courses = [
    {
        id: 1,
        title: "Introduction to Programming",
        videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
        progress: 0
    },
    {
        id: 2,
        title: "Advanced JavaScript",
        videoSrc: "https://www.w3schools.com/html/movie.mp4",
        progress: 0
    },
    {
        id: 3,
        title: "Web Development Basics",
        videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        progress: 0
    }
];

const courseListElement = document.getElementById("course-list");
const progressInfoElement = document.getElementById("progress-info");
const videoPlayer = document.getElementById("course-video");

let currentCourseId = null;

function renderCourseList() {
    courseListElement.innerHTML = "";
    courses.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course.title;
        li.dataset.id = course.id;
        if (course.id === currentCourseId) {
            li.classList.add("active");
        }
        li.addEventListener("click", () => {
            selectCourse(course.id);
        });
        courseListElement.appendChild(li);
    });
}

function selectCourse(courseId) {
    currentCourseId = courseId;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    renderCourseList();
    videoPlayer.src = course.videoSrc;
    updateProgressInfo(course.progress);

    // Load saved progress from localStorage if available
    const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
    if (savedProgress) {
        course.progress = parseFloat(savedProgress);
    }
}

function updateProgressInfo(progress) {
    progressInfoElement.textContent = `Progress: ${(progress * 100).toFixed(1)}%`;
}

videoPlayer.addEventListener("timeupdate", () => {
    if (!currentCourseId) return;
    const course = courses.find(c => c.id === currentCourseId);
    if (!course) return;

    const progress = videoPlayer.currentTime / videoPlayer.duration;
    course.progress = progress;
    updateProgressInfo(progress);

    // Save progress to localStorage
    localStorage.setItem(`course-progress-${currentCourseId}`, progress);
});

// Initialize
renderCourseList();

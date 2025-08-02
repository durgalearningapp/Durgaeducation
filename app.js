// Replace with your actual Sheet.best API URL
const sheetUrl = 'https://api.sheetbest.com/sheets/e3f77f13-28d2-40b2-ac5c-e8164eb18f43';

fetch(sheetUrl)
  .then(response => response.json())
  .then(data => {
    const subject = document.body.getAttribute('data-subject');

    // ✅ Load videos
    const videoSection = document.querySelector('#videos .card');
    videoSection.innerHTML = '';

    const filteredVideos = data.filter(item => item.subject === subject && item.type === "video");
    filteredVideos.forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${video.title}</h3>
        <a href="${video.content_or_url}" target="_blank">
  🎬 Watch "${video.title}" on YouTube
</a>
        <hr>
      `;
      videoSection.appendChild(div);
    });

    // ✅ Load notes
    const notesSection = document.querySelector('#notes .card');
    notesSection.innerHTML = '';

    const filteredNotes = data.filter(item => item.subject === subject && item.type === "note");
    filteredNotes.forEach(note => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content_or_url}</p>
        <hr>
      `;
      notesSection.appendChild(div);
    });

    // ✅ Load quizzes
    const quizSection = document.querySelector('#quiz .card');
    quizSection.innerHTML = '';

    const filteredQuizzes = data.filter(item => item.subject === subject && item.type === "quiz");
    filteredQuizzes.forEach((quiz, index) => {
      const div = document.createElement('div');
      div.classList.add("quiz-block");

      div.innerHTML = `
        <p><strong>Q${index + 1}: ${quiz.title}</strong></p>
        <p>${quiz.content_or_url}</p>
        <label><input type="radio" name="q${index}" value="${quiz.option1}"> ${quiz.option1}</label><br>
        <label><input type="radio" name="q${index}" value="${quiz.option2}"> ${quiz.option2}</label><br>
        <label><input type="radio" name="q${index}" value="${quiz.option3}"> ${quiz.option3}</label><br>
        <label><input type="radio" name="q${index}" value="${quiz.option4}"> ${quiz.option4}</label><br>
        <button onclick="checkAnswer(${index}, '${quiz.answer.replace(/'/g, "\\'")}')">Submit</button>
        <p id="result${index}" class="quiz-result"></p>
        <hr>
      `;

      quizSection.appendChild(div);
    });
  });

// ✅ Check and show correct answer
function checkAnswer(index, correctAnswer) {
  const radios = document.getElementsByName(`q${index}`);
  let selected = "";

  radios.forEach(radio => {
    if (radio.checked) selected = radio.value;
  });

  const result = document.getElementById(`result${index}`);

  if (selected === "") {
    result.innerHTML = "❗ Please select an answer.";
    result.style.color = "orange";
  } else if (selected === correctAnswer) {
    result.innerHTML = "✅ Correct!";
    result.style.color = "green";
  } else {
    result.innerHTML = `❌ Wrong. Correct answer: <strong>${correctAnswer}</strong>`;
    result.style.color = "red";
  }
}
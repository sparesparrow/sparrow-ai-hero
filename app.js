// app.js - minimal javascript to start gonzo style UI

const app = document.getElementById('app');

// Basic mood intro
app.innerHTML = `
  <h1>SPARROW AI HERO</h1>
  <p>Mythical Czech AI Developer fighting the digital surveillance state with code and madness.</p>
  <button id="storyButton">Start the Gonzo Journey</button>
  <section id="storySection" style="margin-top: 20px; font-family: monospace; white-space: pre-line;"></section>
`;

const storyText = `\
Holy shit, where do I begin? This ain’t your average portfolio. This is a digital revolution, a manifesto coded from the heart of Czech cyberpunk.

Meet SPARROW, the mad AI developer who turned his back on Big Tech's surveillance.

Ready to dive?

`; 

const btn = document.getElementById('storyButton');
const storySection = document.getElementById('storySection');

btn.onclick = () => {
  storySection.textContent = storyText;
  btn.style.display = 'none';
};
require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
  window.editor = monaco.editor.create(document.getElementById('editor'), {
    value: 'console.log("Bienvenue dans ton Web IDE !");',
    language: 'javascript',
    theme: 'vs-dark',
  });
});

let currentLang = 'js';
const selectLang = document.getElementById('language');
selectLang.addEventListener('change', e => {
  currentLang = e.target.value;
  const saved = localStorage.getItem(`code_${currentLang}`);
  if (saved) editor.setValue(saved);
  loadFromServer(currentLang);
});

document.getElementById('run').addEventListener('click', async () => {
  const code = editor.getValue();
  const res = await fetch('/run', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ language: currentLang, code })
  });
  const output = await res.text();
  document.getElementById('output').innerText = output;
});

// Autosave local + serveur
setInterval(() => {
  const code = editor.getValue();
  localStorage.setItem(`code_${currentLang}`, code);
  saveToServer(currentLang, code);
}, 10000);

async function saveToServer(language, code) {
  try {
    await fetch('/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ language, code })
    });
  } catch {}
}

async function loadFromServer(language) {
  try {
    const res = await fetch(`/load/${language}`);
    if (res.ok) {
      const data = await res.json();
      editor.setValue(data.code);
    }
  } catch {}
}

// IA Gemini
document.getElementById('askAi').addEventListener('click', async () => {
  const prompt = document.getElementById('aiPrompt').value;
  document.getElementById('aiResponse').innerText = '⏳ Réponse en cours...';
  try {
    const res = await fetch('/ai', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Aucune réponse.';
    document.getElementById('aiResponse').innerText = text;
  } catch {
    document.getElementById('aiResponse').innerText = 'Erreur IA';
  }
});

document.getElementById("workflow-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const prompt = document.getElementById("prompt").value;
  const action = document.getElementById("action").value;

  const response = await fetch("http://localhost:5000/run-workflow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, action }),
  });

  const data = await response.json();
  document.getElementById("result").textContent = JSON.stringify(data, null, 2);
});
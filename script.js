const cards = document.querySelectorAll(".card");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    cards.forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? "left" : "right");
        observer.observe(card);
    });
} else {
    cards.forEach(card => card.classList.add("show"));
}

document.querySelectorAll(".person-audio audio").forEach((audio) => {
    const source = audio.querySelector("source");
    const audioPath = source?.getAttribute("src");

    if (!audioPath) {
        showAudioFallback(audio);
        return;
    }

    fetch(audioPath, { method: "HEAD" })
        .then(response => {
            if (!response.ok) {
                showAudioFallback(audio);
            }
        })
        .catch(() => showAudioFallback(audio));
});

function showAudioFallback(audio) {
    const wrapper = audio.closest(".person-audio");
    if (!wrapper || wrapper.querySelector(".audio-fallback")) {
        return;
    }

    audio.remove();

    const fallback = document.createElement("p");
    fallback.className = "audio-fallback";
    fallback.textContent = "Hanganyag hamarosan.";
    wrapper.appendChild(fallback);
}

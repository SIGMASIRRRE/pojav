function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
}

function loadSection(section) {
  fetch('tiers.json')
    .then(res => res.json())
    .then(data => {
      const content = document.getElementById('content');
      content.innerHTML = `<h2>${section.toUpperCase()}</h2>`;

      if (section === 'overall') {
        const players = data[section];
        players.sort((a, b) => b.points - a.points);
        content.innerHTML += '<div class="tier-container">';
        players.forEach((p, i) => {
          const pos = ['first', 'second', 'third', 'fourth', 'fifth'][i] || 'other';
          content.innerHTML += `<div class="rank ${pos}"><span>${i + 1}.</span> ${p.name} - ${p.points} pts</div>`;
        });
        content.innerHTML += '</div>';
      } else {
        const tiers = data[section];
        content.innerHTML += '<div class="tier-container">';
        Object.keys(tiers).forEach(t => {
          content.innerHTML += `<div class="tier"><h3>Tier ${t}</h3><p>${tiers[t].join('<br>')}</p></div>`;
        });
        content.innerHTML += '</div>';
      }
    });
}
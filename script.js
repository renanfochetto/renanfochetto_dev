const sections = document.querySelectorAll( 'section, footer');
const root = document.documentElement;
const cardDescriptions = document.querySelectorAll('.card-description');

const sectionColors = {
  tools: "#ffb347",
  process: "#fe6bb6",
  projects: "#c08cf0",
  footer: "#57fffc"
};


window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    const nextSection = sections[index + 1];
    const id = section.id;
    const nextId = nextSection ? nextSection.id : null;

    const currentColor = sectionColors[id] || "#f4d03f";
    const nextColor = nextId ? sectionColors[nextId] : currentColor;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const progress = (scrollY - sectionTop) / sectionHeight;
      const blendedColor = interpolateColor(currentColor, nextColor, progress);
      root.style.setProperty('--section-color', blendedColor);

      cardDescriptions.forEach(card => {
        card.style.color = blendedColor;
      });
    }
  });
});

function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `rgb(${r}, ${g}, ${b})`;
}


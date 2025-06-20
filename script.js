// Description: This script dynamically changes the background color of sections and card
//  based on scroll position.

const sections = document.querySelectorAll( 'section, footer');
const root = document.documentElement;
const cardDescriptions = document.querySelectorAll('.card-description');

const sectionColors = {
  tools: "#ffb347",
  process: "#fe6bb6",
  projects: "#4ae4fe",
  footer: "#4ae4fe"
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


//Description: Mudança conteúdo dos cards de projetos

const projects = [
  {
    nome: "SpaceApp",
    imagem: "assets/images/space_app.avif",
    descricao:"Estilização de componentes avançados em React com Styled Components, implementação de componentes para exibição de imagens, legendas e estilos personalizados.",
    repositorio: "https://github.com/renanfochetto/react-styled-components",
    deploy: "https://react-space-app-rnn.vercel.app/"
  },
  {
    nome: "Fungi Finders",
    imagem: "assets/images/fungi_finders.avif",
    descricao:"CSS avançado, recursos de organização de código, criação de componentes reutilizáveis, classes utilitárias e desenvolvimento de Design System. ",
    repositorio: "https://github.com/renanfochetto/fungi_finders",
    deploy: "https://fungi-finders-rnn.vercel.app/"
  },
  {
    nome: "Aluroni",
    imagem: "assets/images/aluroni.avif",
    descricao:"Performance e Otimização de Aplicações em React. Virtual DOM e Reconciliation, Memoização e Imutabilidade, diferenças entre Memo e UseMemo e React Dev Tools.",
    repositorio: "https://github.com/renanfochetto/react-performance-advanced",
    deploy: "https://react-performance-aluroni.vercel.app/"
  },
  {
    nome: "Trato Tech",
    imagem: "assets/images/trato_tech.avif",
    descricao:"Redux e Gerenciamento de Estados. Conceitualização e utilização do Redux Toolkit, mudança de estados, conceitos de Mutabilidade X Imutabilidade e utilização do Immer para estados imutáveis.",
    repositorio: "https://github.com/renanfochetto/react-redux-immer",
    deploy: "https://trato-tech-immer-main.vercel.app/"
  },
]

const galleryItems = document.querySelectorAll('.project-gallery div');
const title = document.querySelector('.card-title h5');
const image = document.querySelector('.card-image img');
const description = document.querySelector('.card-description p');
const links = document.querySelectorAll('.card-links a');

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const project = projects[index];

    if(!project) return;

    title.textContent = project.nome;
    image.src = project.imagem;
    description.textContent = project.descricao;
    links[0].href = project.repositorio;
    links[1].href = project.deploy;
  });
});

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    galleryItems.forEach(item => item.classList.remove('active'));
    item.classList.add('active');

    const project = projects[index];
  })
})

function gerarSequenciaAleatoria(tamanho) {
  const indices = Array.from({ length: tamanho }, (_, i) => i);
  for(let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}


function atualizarProjeto(index) {
  const card = document.querySelector('.project-card');
  card.classList.add('fade-out');
  card.classList.remove('fade-in');

  setTimeout(() => {
    // atualiza conteúdo normalmente
    const projeto = projects[index];
    if (!projeto) return;

    document.querySelector('.card-title h5').textContent = projeto.nome;
    const imagem = document.querySelector('.card-image img');
    imagem.src = projeto.imagem;
    imagem.alt = projeto.nome;
    document.querySelector('.card-description p').textContent = projeto.descricao;

    const links = document.querySelectorAll('.card-links a');
    links[0].href = projeto.repositorio;
    links[1].href = projeto.deploy;

    // ativa nova imagem na galeria
    const galleryItems = document.querySelectorAll('.project-gallery div');
    galleryItems.forEach((el, i) =>
      el.classList.toggle('active', i === index)
    );

    card.classList.add('fade-in');
  }, 300);
}

let ordemAtual = gerarSequenciaAleatoria(projects.length);
let indiceAtual = 0;

function iniciarTrocaAutomatica() {
  atualizarProjeto(ordemAtual[indiceAtual]);
  indiceAtual++;

  if(indiceAtual >= ordemAtual.length) {
    ordemAtual = gerarSequenciaAleatoria(projects.length);
    indiceAtual = 0;
  }

  setTimeout(iniciarTrocaAutomatica, 5000); // Troca a cada 5 segundos
}

document.addEventListener('DOMContentLoaded', iniciarTrocaAutomatica);

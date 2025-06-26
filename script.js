//Inicio do Bloco de Código
const initPortfolio = () => {

  //Variáveis para Seleção de Elementos
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  // Seleção de Elementos do DOM
  const root = document.documentElement;
  const sections = $$('section, footer');
  const cardDescriptions = $$('.card-description');

  // Cores das Seções
  const sectionColors = {
    tools: "#ffb347",
    process: "#fe6bb6",
    projects: "#4ae4fe",
    footer: "#4ae4fe"
  };

  // Funções para Manipulação de Cores e Scroll
  const getScrollProgress = (top, height, scrollY) =>
    Math.min(1, Math.max(0, (scrollY - top) / height));

  // Função para Obter a Cor da Seção
  const getColor = (id) => sectionColors[id] || "#f4d03f";

  // Função para Interpolar Cores
  const interpolateColor = (c1, c2, factor) =>
    ['r', 'g', 'b']
      .map((_, i) => {
        const shift = 16 - i * 8;
        const v1 = (parseInt(c1.slice(1), 16) >> shift) & 0xff;
        const v2 = (parseInt(c2.slice(1), 16) >> shift) & 0xff;
        return Math.round(v1 + factor * (v2 - v1));
      })
      .reduce((rgb, val, i) => `${rgb}${i ? ',' : ''}${val}`, 'rgb(') + ')';

  // Função para Aplicar a Cor no Root e nos Elementos de Descrição
  const applyColor = (color) => {
    root.style.setProperty('--section-color', color);
    cardDescriptions.forEach((el) => el.style.color = color);
  };

  // Função para Manipular o Scroll e Aplicar Cores
  const handleScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach((section, index) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const bottom = top + height;

      if (scrollY >= top && scrollY < bottom) {
        const nextSection = sections[index + 1];
        const id = section.id;
        const nextId = nextSection?.id;

        const colorNow = getColor(id);
        const colorNext = getColor(nextId);
        const blend = interpolateColor(colorNow, colorNext, getScrollProgress(top, height, scrollY));

        applyColor(blend);
      }
    });
  };

  // Lista de Projetos
  const projects = [
    {
      nome: "SpaceApp",
      imagem: "assets/images/space_app.avif",
      alt: "Imagem do Site SpaceApp",
      descricao:"Development of modern interfaces using Styled Components, crafting visually striking and functional elements.",
      repositorio: "https://github.com/renanfochetto/react-styled-components",
      deploy: "https://react-space-app-rnn.vercel.app/"
    },
    {
      nome: "Fungi Finders",
      imagem: "assets/images/fungi_finders.avif",
      alt: "Imagem do Site Fungi Finders",
      descricao:"Mastery of advanced styling, smart code organization, and development of reusable components that ensure consistency, and personality.",
      repositorio: "https://github.com/renanfochetto/fungi_finders",
      deploy: "https://fungi-finders-rnn.vercel.app/"
    },
    {
      nome: "Aluroni",
      imagem: "assets/images/aluroni.avif",
      alt: "Imagem do Site Aluroni",
      descricao:"Experience focused on performance and efficiency with React. Implements optimizations that reduce response times and enhance interface fluidity.",
      repositorio: "https://github.com/renanfochetto/react-performance-advanced",
      deploy: "https://react-performance-aluroni.vercel.app/"
    },
    {
      nome: "Trato Tech",
      imagem: "assets/images/trato_tech.avif",
      alt: "Imagem do Site Trato Tech",
      descricao:"Skilled in efficiently managing state using Redux and Redux Toolkit, ensuring applications remain organized and predictable.",
      repositorio: "https://github.com/renanfochetto/react-redux-immer",
      deploy: "https://trato-tech-immer-main.vercel.app/"
    }
    ];

  // Funções para Atualizar o DOM com os Projetos
  const updateDOMWithProject = (project) => {
    $('.card-title h5').textContent = project.nome;
    const img = $('.card-image img');
    img.src = project.imagem;
    img.alt = project.alt;
    $('.card-description p').textContent = project.descricao;
    const [repoLink, deployLink] = $$('.card-links a');
    repoLink.href = project.repositorio;
    deployLink.href = project.deploy;
  };

  // Função para Definir o Card Ativo na Galeria
  const setActiveGalleryCard = (index) => {
    $$('.project-gallery div').forEach((el, i) =>
      el.classList.toggle('active', i === index)
    );
  };

  // Função para Atualizar o Card do Projeto
  const updateProjectCard = (index) => {
    const card = $('.project-card');
    const project = projects[index];
    if (!project) return;

    card.classList.remove('fade-in');
    card.classList.add('fade-out');

    setTimeout(() => {
      updateDOMWithProject(project);
      setActiveGalleryCard(index);
      card.classList.add('fade-in');
    }, 300);
  };

  // Função para Gerar uma Sequência Aleatória de Projetos
  const generateRandomSequence = (length) =>
    Array.from({ length }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

  let sequence = generateRandomSequence(projects.length);
  let currentIndex = 0;
  let autoPaused = false;

  const nextProject = () => {
    updateProjectCard(sequence[currentIndex]);
    currentIndex = (currentIndex + 1) % sequence.length;
  };

  const autoRotate = () => {
    if (!autoPaused) nextProject();
    setTimeout(autoRotate, 5000);
  };

  // Inicialização do Portfólio
  $('.project-card').addEventListener('mouseenter', () => autoPaused = true);
  $('.project-card').addEventListener('mouseleave', () => autoPaused = false);
  window.addEventListener('scroll', handleScroll);

  $$('.project-gallery div').forEach((item, index) =>
    item.addEventListener('click', () => {
      updateProjectCard(index);
      currentIndex = sequence.indexOf(index);
    })
  );

  autoRotate();
};

// Evento de Carregamento do DOM
document.addEventListener('DOMContentLoaded', initPortfolio);

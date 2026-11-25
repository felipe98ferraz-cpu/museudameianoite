import { markReveal, trackFunnel } from "./funnel.js";

if (location.hash === "#colecao") {
  location.replace("https://museu-da-meia-noite.fabulousash4.chatgpt.site/colecao" + location.search);
}

(() => {
  "use strict";

  const paintingAsset = { src: "assets/arnolfini.webp", width: 1404, height: 1920 };
  const clues = [
    {
      id: "lustre", name: "A vela acesa", x: 44, y: 7,
      crop: [490, 71, 948, 385],
      alt: "Lustre de latão visto por inteiro, incluindo as extremidades das velas.",
      question: "Mesmo com a luz do dia entrando pela janela, o que o lustre tem de estranho?",
      options: ["Há uma chama em cada braço", "Só uma vela está acesa", "O lustre está sem velas"], answer: 1,
      hint: "Compare o alto dos braços do lustre. Procure a chama mais à esquerda.",
      explanation: "Uma única vela arde num quarto iluminado pela janela. A National Gallery identifica também uma vela apagada. Van Eyck pintou até a luz da janela refletida no latão."
    },
    {
      id: "inscricao", name: "A inscrição", x: 55.6, y: 21.6,
      crop: [574, 371, 800, 461],
      alt: "Letras caligráficas escuras e uma data na parede.",
      question: "Que frase faz a assinatura soar como o registro de uma visita?",
      options: ["Jan van Eyck esteve aqui", "Jan van Eyck pintou isto", "Jan van Eyck mora aqui"], answer: 0,
      hint: "Em latim, «fuit hic» indica que alguém esteve neste lugar.",
      explanation: "Van Eyck escreveu «Jan van Eyck esteve aqui. 1434». A frase convida a procurar sua possível presença na cena, uma questão que volta na pista do espelho."
    },
    {
      id: "laranjas", name: "As laranjas", x: 8, y: 53.4,
      crop: [42, 783, 225, 1070],
      alt: "Frutas junto à janela, uma no peitoril e outras no móvel abaixo.",
      question: "Que pequeno luxo Van Eyck espalhou entre o peitoril e o móvel abaixo?",
      options: ["Maçãs", "Pêssegos", "Laranjas"], answer: 2,
      hint: "Compare a fruta isolada no peitoril com as que estão agrupadas embaixo. Repare na casca.",
      explanation: "São laranjas. Na época, custavam caro. A maneira casual como aparecem nos dois lugares faz delas um sinal discreto da riqueza do casal."
    },
    {
      id: "vestido", name: "O vestido verde", x: 70.5, y: 40.3,
      crop: [868, 575, 1186, 995],
      alt: "Mão livre da mulher sobre a cintura, entre a manga azul e as dobras verdes.",
      question: "Que gesto cria o volume do vestido à frente do corpo?",
      options: ["Ela segura um lenço", "Ela reúne as dobras do vestido", "Ela aperta um cinto"], answer: 1,
      hint: "Siga as dobras verdes até o ponto onde os dedos tocam o tecido.",
      explanation: "Ela ergue um punhado do próprio vestido, que tem tecido suficiente para se acumular no chão. Segundo a National Gallery, esse volume acompanha a moda da época."
    },
    {
      id: "janela", name: "O jardim pela fresta", x: 8, y: 27,
      crop: [65, 405, 157, 614],
      alt: "Uma faixa estreita do jardim entre a madeira da janela e a alvenaria.",
      question: "Que detalhe do lado de fora Van Eyck deixou visível pela fresta da janela?",
      options: ["Um galho com folhas e frutos", "O telhado da casa vizinha", "Uma fileira de tijolos no jardim"], answer: 0,
      hint: "Procure as pequenas formas verdes e vermelhas na abertura, junto à madeira.",
      explanation: "Pela fresta, vemos parte de uma cerejeira com frutos. A abertura estreita basta para Van Eyck sugerir um jardim além das paredes do quarto."
    },
    {
      id: "maos", name: "As mãos", x: 56, y: 42,
      crop: [296, 526, 884, 866],
      alt: "As duas mãos de Arnolfini, uma perto do peito e a outra ao lado da mão da mulher.",
      question: "Além de oferecer a mão esquerda à mulher, que gesto Arnolfini faz com a direita?",
      options: ["Ergue a mão", "Apoia a mão no móvel", "Puxa a manga do casaco"], answer: 0,
      hint: "Compare a mão próxima ao peito com aquela que encontra a da mulher.",
      explanation: "Ele ergue a direita, como numa saudação. O gesto também já foi associado a uma cerimônia. A pintura deixa em aberto o que motiva o gesto."
    },
    {
      id: "contas", name: "As contas de âmbar", x: 40, y: 28.6,
      crop: [551, 461, 635, 657],
      alt: "Cordão de contas de âmbar com fios verdes, pendurado na parede.",
      question: "Além de refletir na superfície das contas, o que a luz faz no âmbar?",
      options: ["Fica apenas nas pontas verdes", "Atravessa as contas e ilumina parte do interior", "Aparece só na parede atrás do cordão"], answer: 1,
      hint: "Procure um ponto claro numa borda e um pequeno crescente luminoso do lado oposto de cada conta.",
      explanation: "A luz aparece num ponto da superfície e atravessa o âmbar, deixando um crescente claro do outro lado. O efeito dá transparência às contas usadas para acompanhar as orações."
    },
    {
      id: "tamancos", name: "Os tamancos", x: 13, y: 89,
      crop: [0, 1610, 252, 1889],
      alt: "Dois calçados de madeira sobre as tábuas, um de lado e outro voltado para a frente.",
      question: "Que vestígio nos tamancos sugere que eles foram usados na rua?",
      options: ["Rachaduras no piso", "Tiras de metal brilhante", "Respingos de lama na madeira"], answer: 2,
      hint: "Compare as manchas escuras com as áreas claras da madeira, sobretudo no tamanco mais perto.",
      explanation: "Há marcas de lama nos calçados de madeira. Eles eram usados por cima dos sapatos para protegê-los ao sair. Exames sob a pintura indicam que Van Eyck os acrescentou depois do primeiro esboço."
    },
    {
      id: "cama", name: "A cama vermelha", x: 92, y: 22,
      crop: [1055, 125, 1404, 925],
      alt: "Dossel, cortina e parte da cama coberta de tecido vermelho.",
      question: "O que a cama com dossel podia comunicar a quem entrava na sala de recepção?",
      options: ["A riqueza da casa", "O ofício de pintor do morador", "Que o cômodo era uma hospedaria"], answer: 0,
      hint: "Repare na quantidade de tecido vermelho e na posição de destaque do móvel.",
      explanation: "A National Gallery interpreta o espaço como uma sala de recepção. A cama, um dos móveis mais caros da casa, ficava à vista das visitas e demonstrava a prosperidade dos moradores."
    },
    {
      id: "espelho", name: "O espelho", x: 52, y: 30,
      crop: [590, 461, 834, 690],
      alt: "Espelho convexo com pequenas cenas religiosas ao redor do reflexo.",
      question: "Além do casal, quantas figuras aparecem no reflexo?",
      options: ["Três", "Uma", "Duas"], answer: 2,
      hint: "Olhe para o centro do espelho. Na porta, há uma figura em vermelho e outra em azul.",
      explanation: "O espelho reflete o casal de costas e duas figuras na porta, do lado de onde observamos a cena. A inscrição no alto sugere que uma delas poderia ser Van Eyck, mas a identidade das figuras permanece em aberto."
    }
  ];

  const galleryCatalogue = "https://www.nationalgallery.org.uk/paintings/catalogues/campbell-1998/the-arnolfini-portrait";
  const memorialArticle = "https://go.gale.com/ps/i.do?id=GALE%7CA109131988&v=2.1&it=r&p=AONE";
  const discoveries = {
    lustre: {
      seal: "hypothesis", title: "Um pavio que já se apagou",
      text: "Do lado de Giovanni, a chama ainda arde. Do lado da mulher, resta uma vela consumida. Na leitura memorial de Margaret Koster, as duas velas marcam a distância entre quem permaneceu vivo e quem já morreu.",
      source: memorialArticle, credit: "Margaret Koster, Apollo"
    },
    inscricao: {
      seal: "fact", title: "A data que veio depois da notícia",
      text: "Na parede, Van Eyck escreveu 1434. Em 26 de fevereiro de 1433, a mãe de Costanza Trenta já mencionava em carta que a filha estava morta. Foi esse intervalo que levou pesquisadores a perguntar se a mulher poderia ter sido retratada depois de morta.",
      source: galleryCatalogue, credit: "Catálogo da National Gallery"
    },
    laranjas: {
      seal: "consensus", title: "O luxo que o espelho devolve",
      text: "A laranja do peitoril e as três do móvel reaparecem no espelho. Essas frutas caras são lidas como sinais de riqueza. Van Eyck as espalhou pela sala com a naturalidade de quem podia dar-se ao luxo de deixá-las ali.",
      source: galleryCatalogue, credit: "Catálogo da National Gallery"
    },
    vestido: {
      seal: "fact", title: "O olhar que Van Eyck baixou",
      text: "No desenho sob a tinta, a mulher levantava os olhos na direção do homem. No quadro acabado, ela baixa o rosto. O infravermelho recupera um olhar que desapareceu da cena.",
      source: galleryCatalogue, credit: "Catálogo da National Gallery"
    },
    janela: {
      seal: "fact", title: "Os frutos do lado de fora",
      text: "Pela fresta junto ao homem, aparece uma cerejeira carregada de frutos. Do outro lado do quadro, atrás da mulher, o tecido vermelho da cama ocupa quase toda a altura. Compare a abertura para o jardim com o interior fechado pelas cortinas.",
      source: galleryCatalogue, credit: "Catálogo da National Gallery"
    },
    maos: {
      seal: "hypothesis", title: "O monstro acima das mãos",
      text: "Pouco acima das mãos unidas, um rosto grotesco espreita no braço do banco. Margaret Koster lê o entalhe como uma ameaça à união do casal. Volte às mãos e siga o olhar para cima.",
      source: memorialArticle, credit: "Margaret Koster, Apollo"
    },
    contas: {
      seal: "fact", title: "As contas que surgiram na penumbra",
      text: "O cordão de oração não estava no primeiro desenho. Van Eyck o acrescentou junto ao espelho e pintou até os reflexos das contas na parede.",
      source: galleryCatalogue, credit: "Catálogo da National Gallery"
    },
    tamancos: {
      seal: "fact", title: "Dois pares, dois lugares",
      text: "Os tamancos enlameados ficam em primeiro plano. Um segundo par, vermelho, aparece mais ao fundo, perto da cama. Procure os dois pares para perceber como Van Eyck conduz o olhar da entrada ao interior.",
      source: galleryCatalogue, credit: "Catálogo da National Gallery"
    },
    cama: {
      seal: "hypothesis", title: "A santa e o dragão junto ao leito",
      text: "Junto às cortinas, no alto do espaldar da cadeira, uma figura reza ao lado de um dragão. Koster a lê como Santa Margarida, invocada no parto, e relaciona o entalhe à hipótese memorial. O documento que registra a morte de Costanza não informa a causa.",
      source: memorialArticle, credit: "Margaret Koster, Apollo"
    },
    espelho: {
      seal: "hypothesis", title: "O espelho entre os vivos e os mortos",
      text: "À esquerda do espelho, do lado de Giovanni, os medalhões mostram Cristo ainda vivo. À direita, do lado da mulher, aparecem cenas da morte e da Ressurreição. A Crucificação ocupa o alto do eixo. Margaret Koster vê nessa divisão um eco das duas velas e propõe que Van Eyck tenha retratado Giovanni ao lado da memória de Costanza Trenta.",
      source: memorialArticle, credit: "Margaret Koster, Apollo"
    }
  };
  const sealLabels = { fact: "Fato", consensus: "Consenso comum", hypothesis: "Hipótese" };

  const storageKey = "museu-arnolfini-v2";
  const previousStorageKey = "museu-arnolfini-v1";
  const previousClueOrder = ["lustre", "inscricao", "laranjas", "vestido", "cachorro", "espelho"];
  const maxScore = clues.length * 100;
  const stage = document.querySelector("#obra-arnolfini");
  const pins = document.querySelector("#case-pins");
  const dossier = document.querySelector("#case-dossier");
  const openDossier = document.querySelector("#open-dossier");
  const study = document.querySelector("#study-dialog");
  const openStudy = document.querySelector("#open-study");
  const studyReading = study.querySelector(".study-reading");
  const panel = document.querySelector("#dossier-body");
  const dossierScroll = dossier.querySelector(".dossier-scroll");
  const start = document.querySelector("#start-case");
  const reset = document.querySelector("#reset-case");
  const count = document.querySelector("#case-count");
  const points = document.querySelector("#case-score");
  const progress = document.querySelector("#case-progress");
  const fullscreen = document.querySelector("#fullscreen-button");
  const fullscreenLabel = document.querySelector("#fullscreen-label");

  let selected = null;
  let records = readProgress();
  let expanded = false;
  let galleryScroll = 0;

  function readProgress() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved) {
        const previous = JSON.parse(localStorage.getItem(previousStorageKey));
        saved = Object.fromEntries(previousClueOrder.map((id, index) => [id, previous?.[index]]));
      }
    } catch {
      saved = null;
    }
    return clues.map(clue => {
      const record = saved?.[clue.id];
      const wrong = Array.isArray(record?.wrong)
        ? [...new Set(record.wrong.filter(option => Number.isInteger(option) && option >= 0 && option < clue.options.length && option !== clue.answer))]
        : [];
      return { solved: record?.solved === true, hint: record?.hint === true, wrong };
    });
  }

  function saveProgress() {
    try {
      const byClue = Object.fromEntries(clues.map((clue, index) => [clue.id, records[index]]));
      localStorage.setItem(storageKey, JSON.stringify(byClue));
    } catch {
      // Play still works when the browser blocks local storage.
    }
  }

  function clueStatus(index) {
    if (index === clues.length - 1 && records.slice(0, -1).some(record => !record.solved)) return "locked";
    if (records[index].solved) return "complete";
    return "open";
  }

  function score(record) {
    if (!record.solved) return 0;
    return record.hint || record.wrong.length ? 60 : 100;
  }

  function make(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function button(label, className, handler) {
    const control = make("button", className, label);
    control.type = "button";
    control.addEventListener("click", handler);
    return control;
  }

  function heading(text) {
    const title = make("h3", "case-question-title", text);
    title.tabIndex = -1;
    return title;
  }

  const frame = stage.querySelector(".case-frame");
  const narrow = matchMedia("(max-width: 899px)");
  let activePanel = null;
  let returnFocus = null;

  function showPanel(dialog) {
    if (activePanel !== dialog) {
      const origin = activePanel?.contains(document.activeElement) ? returnFocus : document.activeElement;
      if (activePanel) activePanel.close();
      returnFocus = origin;
      activePanel = dialog;
    }
    stage.dataset.panel = dialog.id;
    if (!dialog.open) {
      if (dialog === dossier && narrow.matches) dialog.showModal();
      else dialog.show();
    }
    if (dialog === study && narrow.matches) frame.scrollIntoView({ block: "start", behavior: "instant" });
  }

  narrow.addEventListener("change", () => {
    if (activePanel !== dossier) return;
    const focused = document.activeElement;
    dossier.close();
    showPanel(dossier);
    if (dossier.contains(focused)) focused.focus();
  });

  function closePanel() {
    if (!activePanel) return;
    const dialog = activePanel;
    activePanel = null;
    dialog.close();
    delete stage.dataset.panel;
    returnFocus?.focus({ preventScroll: true });
    returnFocus = null;
  }

  for (const dialog of [dossier, study]) {
    dialog.addEventListener("submit", event => {
      event.preventDefault();
      closePanel();
    });
  }
  stage.querySelector(".collection-nav").addEventListener("click", () => {
    returnFocus = null;
    closePanel();
  });

  function showDossier() {
    render();
    showPanel(dossier);
    dossier.scrollTop = 0;
    dossierScroll.scrollTop = 0;
    (panel.querySelector("h3") ?? panel.querySelector("button"))?.focus({ preventScroll: true });
  }

  function openClue(index) {
    trackFunnel("investigation_started");
    if (index === clues.length - 1 && clueStatus(index) !== "locked") trackFunnel("mirror_reached");
    selected = index;
    showDossier();
  }

  function openList() {
    selected = null;
    showDossier();
  }

  const pinButtons = clues.map((clue, index) => {
    const control = button("", "case-pin", () => openClue(index));
    control.append(make("span", "", String(index + 1)));
    control.style.setProperty("--pin-x", clue.x + "%");
    control.style.setProperty("--pin-y", clue.y + "%");
    control.setAttribute("aria-controls", "case-dossier");
    control.setAttribute("aria-haspopup", "dialog");
    return control;
  });
  pins.append(...pinButtons);

  const segments = clues.map(() => make("span"));
  progress.append(...segments);
  progress.style.setProperty("--clue-count", clues.length);
  progress.setAttribute("aria-valuemax", String(clues.length));

  const stateLabels = { open: "Investigar", complete: "Resolvida", locked: "Bloqueada" };

  function renderStatus() {
    const completed = records.filter(record => record.solved).length;
    const total = records.reduce((sum, record) => sum + score(record), 0);
    count.textContent = completed + " de " + clues.length + " resolvidas";
    points.textContent = total + " pts";
    progress.setAttribute("aria-valuenow", String(completed));
    for (const [index, segment] of segments.entries()) segment.classList.toggle("filled", index < completed);
    const started = records.some(record => record.solved || record.hint || record.wrong.length);
    reset.hidden = !started;
    for (const [index, control] of pinButtons.entries()) {
      const status = clueStatus(index);
      control.dataset.state = status;
      control.setAttribute("aria-label", "Pista " + (index + 1) + ", " + clues[index].name + ", " + stateLabels[status]);
      control.setAttribute("aria-pressed", String(selected === index));
    }
  }

  function renderList() {
    const list = make("ol", "case-list");
    clues.forEach((clue, index) => {
      const item = make("li");
      const status = clueStatus(index);
      const control = button("", "", () => openClue(index));
      control.dataset.state = status;
      control.append(
        make("span", "clue-number", String(index + 1).padStart(2, "0")),
        make("span", "", clue.name),
        make("span", "clue-state", stateLabels[status])
      );
      item.append(control);
      list.append(item);
    });
    panel.append(list);
  }

  function clueDetail(clue) {
    const [left, top, right, bottom] = clue.crop;
    const width = right - left;
    const height = bottom - top;
    const detail = make("div", "case-detail");
    detail.style.aspectRatio = width + " / " + height;
    detail.style.maxWidth = (285 * width / height) + "px";
    const image = make("img");
    image.src = paintingAsset.src;
    image.width = paintingAsset.width;
    image.height = paintingAsset.height;
    image.alt = clue.alt;
    image.style.width = (100 * paintingAsset.width / width) + "%";
    image.style.left = (-100 * left / width) + "%";
    image.style.top = (-100 * top / height) + "%";
    detail.append(image);
    return detail;
  }

  function renderDiscovery(clue) {
    const discovery = discoveries[clue.id];
    const section = make("aside", "clue-discovery");
    section.dataset.paper = String(2 + clues.indexOf(clue) % 5);
    const title = make("h4", "", discovery.title);
    title.tabIndex = -1;
    const seal = make("span", "investigator-seal", sealLabels[discovery.seal]);
    seal.dataset.seal = discovery.seal;
    const credit = make("a", "discovery-source", discovery.credit);
    credit.href = discovery.source;
    credit.target = "_blank";
    credit.rel = "noopener";
    section.append(seal, title, make("p", "", discovery.text), credit);
    return section;
  }

  function renderSummary() {
    const total = records.reduce((sum, record) => sum + score(record), 0);
    const mirror = clues.at(-1);
    const actions = make("div", "case-actions");
    const nextWork = make("a", "case-primary case-link", "Escolher a próxima obra");
    nextWork.href = "https://museu-da-meia-noite.fabulousash4.chatgpt.site/colecao";
    actions.append(nextWork, button("Rever as pistas", "case-text-button", openList));
    panel.append(
      make("p", "case-kicker", clues.length + " pistas resolvidas · " + total + " de " + maxScore + " pontos"),
      heading("O espelho revela dois visitantes"),
      clueDetail(mirror),
      make("p", "case-summary", mirror.explanation),
      renderDiscovery(mirror),
      make("h4", "case-continuation-title", "O espelho era só o começo."),
      make("p", "case-summary", "Depois de investigar O Casal Arnolfini, siga para outras nove obras. Em cada uma, um detalhe muda o que você vê na cena inteira."),
      actions
    );
  }

  function renderClue(index) {
    const clue = clues[index];
    const record = records[index];
    panel.append(make("p", "case-kicker", "Pista " + (index + 1) + " de " + clues.length + " · " + clue.name));

    const actions = make("div", "case-actions");
    actions.append(button("Caderno de pistas", "case-text-button", openList));
    if (clueStatus(index) === "locked") {
      panel.append(heading("O espelho está bloqueado"), make("p", "case-summary", "Resolva as outras " + (clues.length - 1) + " pistas para abrir a última."), actions);
      return;
    }

    panel.append(heading(clue.question), clueDetail(clue));

    const feedback = make("div", "case-feedback");
    feedback.setAttribute("role", "status");

    if (record.solved) {
      const result = make("p");
      result.append(make("strong", "", "Pista resolvida · +" + score(record) + " pts"));
      feedback.append(result, make("p", "", clue.explanation));
      const next = records.findIndex(entry => !entry.solved);
      actions.prepend(button(next === -1 ? "Ver resultado" : "Próxima pista", "case-primary", () => openClue(next === -1 ? "summary" : next)));
      panel.append(feedback, renderDiscovery(clue), actions);
      return;
    }

    const options = make("ol", "case-options");
    const optionButtons = clue.options.map((option, optionIndex) => {
      const item = make("li");
      const answer = button(option, "", () => {
        if (optionIndex === clue.answer) {
          record.solved = true;
          if (index === clues.length - 1) markReveal();
          saveProgress();
          render();
          panel.querySelector(".clue-discovery h4").focus();
          return;
        }
        record.wrong.push(optionIndex);
        answer.disabled = true;
        answer.textContent = option + " · incorreta";
        note.textContent = "Resposta incorreta. Observe o detalhe e tente outra opção.";
        saveProgress();
        renderStatus();
        optionButtons.find(control => !control.disabled)?.focus({ preventScroll: true });
      });
      answer.disabled = record.wrong.includes(optionIndex);
      if (answer.disabled) answer.textContent += " · incorreta";
      item.append(answer);
      options.append(item);
      return answer;
    });

    const note = make("p", "", record.wrong.length ? "Observe o detalhe e tente outra opção." : "");
    const hint = make("p", "", clue.hint);
    hint.hidden = !record.hint;
    feedback.append(note, hint);
    const hintButton = button("Pedir dica", "case-text-button", () => {
      record.hint = true;
      hint.hidden = false;
      hintButton.hidden = true;
      saveProgress();
      renderStatus();
      optionButtons.find(control => !control.disabled)?.focus({ preventScroll: true });
    });
    hintButton.hidden = record.hint;
    actions.prepend(hintButton);
    panel.append(options, feedback, actions);
  }

  function render() {
    renderStatus();
    panel.replaceChildren();
    if (selected === null) renderList();
    else if (selected === "summary") renderSummary();
    else renderClue(selected);
  }

  start.addEventListener("click", () => setPinsVisible(pins.hidden));

  function setPinsVisible(visible) {
    pins.hidden = !visible;
    start.setAttribute("aria-expanded", String(visible));
    start.textContent = visible ? "Ocultar pistas" : "Mostrar pistas";
    if (visible) {
      trackFunnel("investigation_started");
      const next = records.findIndex(record => !record.solved);
      pinButtons[Math.max(0, next)].focus();
    }
  }

  openDossier.addEventListener("click", openList);
  openStudy.addEventListener("click", () => {
    showPanel(study);
    studyReading.scrollTop = 0;
    study.querySelector(".study-close").focus({ preventScroll: true });
  });

  reset.addEventListener("click", () => {
    records = clues.map(() => ({ solved: false, hint: false, wrong: [] }));
    saveProgress();
    openList();
  });

  function syncFullscreen() {
    const active = expanded || document.fullscreenElement === stage;
    fullscreen.setAttribute("aria-pressed", String(active));
    fullscreenLabel.textContent = active ? "Sair da tela cheia" : "Tela cheia";
  }

  function closeExpanded() {
    expanded = false;
    stage.classList.remove("is-expanded");
    window.scrollTo({ top: galleryScroll, behavior: "instant" });
    syncFullscreen();
  }

  fullscreen.addEventListener("click", async () => {
    if (document.fullscreenElement === stage) {
      await document.exitFullscreen();
    } else if (expanded) {
      closeExpanded();
    } else {
      if (document.fullscreenEnabled && stage.requestFullscreen) {
        try {
          await stage.requestFullscreen();
          return;
        } catch {
          // Embedded browsers can forbid native fullscreen.
        }
      }
      galleryScroll = window.scrollY;
      expanded = true;
      stage.classList.add("is-expanded");
      stage.scrollTop = 0;
      syncFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", syncFullscreen);
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (activePanel?.open) {
      event.preventDefault();
      closePanel();
      return;
    }
    if (expanded) {
      closeExpanded();
      fullscreen.focus();
    }
  });

  render();
  if (location.hash === "#investigar") {
    setPinsVisible(true);
    frame.scrollIntoView({ block: "start" });
  }
})();

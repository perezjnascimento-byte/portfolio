const fs = require('fs');

const map = {
  "Abertura do SRE Trade Show": { categories: ["Audiovisual"], subcategories: ["Edição de Vídeo"] },
  "Animação - Informativo Parlamentar": { categories: ["Audiovisual", "Motion Graphics"], subcategories: ["Infográfico Animado", "Motion Design", "Animação 2D", "Edição de Vídeo"] },
  "Assassinato no Expresso do Oriente | Book Cover Design": { categories: ["Design"], subcategories: ["Editorial", "Book Cover Design", "Direção de Arte", "Manipulação de Imagem"] },
  "Assinatura de e-mail animada - Agência de publicidade": { categories: ["Design", "Motion Graphics"], subcategories: ["Identidade Visual", "Motion Design", "Animação", "Comunicação Digital"] },
  "Campanha OOH - Caipira BBQ": { categories: ["Design"], subcategories: ["Out-of-Home", "Campanha Publicitária", "Direção de Arte"] },
  "Email Marketing - Agência de Publicidade OOH": { categories: ["Design"], subcategories: ["Marketing Digital", "Email Marketing", "Diagramação", "Direção de Arte"] },
  "Embaixadora Estácio": { categories: ["Design"], subcategories: ["Retoque Digital", "Manipulação de Imagem", "Inteligência Artificial", "Look Development", "Composição Digital"] },
  "Eu na FJU Night": { categories: ["Audiovisual"], subcategories: ["Edição de Vídeo", "Storytelling", "Sound Design", "VFX", "Motion Tracking", "Tipografia 3D"] },
  "Fazenda Bella Vista (Trabalho Acadêmico)": { categories: ["Design"], subcategories: ["Rebranding", "Identidade Visual", "Design de Embalagem", "Direção de Arte"] },
  "Game Of Thrones - Poster Design": { categories: ["Design"], subcategories: ["Poster Design", "Manipulação de Imagem", "Direção de Arte"] },
  "Gelateria Piemonte: Campanha Busdoor Rio": { categories: ["Design"], subcategories: ["Out-of-Home", "Busdoor", "Campanha Publicitária", "Direção de Arte"] },
  "Graphic material Design - Saúde Ocupacional Freguesia": { categories: ["Design"], subcategories: ["Sinalização", "Comunicação Interna", "Identidade Visual", "Material Gráfico"] },
  "História da Filosofia | Book Cover Design": { categories: ["Design"], subcategories: ["Editorial", "Book Cover Design", "Tipografia", "Direção de Arte"] },
  "Itabus Ações 2021": { categories: ["Design"], subcategories: ["Out-of-Home", "Envelopamento", "Ativação de Marca", "Campanha Publicitária"] },
  "Logo Poloni": { categories: ["Design"], subcategories: ["Identidade Visual", "Logo Design"] },
  "M3GAN 2.0: Concept de Ativação Imersiva (Bus Wrap)": { categories: ["Design"], subcategories: ["Concept Art", "Out-of-Home", "Envelopamento", "Ativação de Marca", "Simulação 3D", "Experiência de Marca"] },
  "Mamma Jamma - Trabalho Acadêmico": { categories: ["Design"], subcategories: ["Direção de Arte", "Campanha Publicitária", "Design Editorial", "Manipulação de Imagem"] },
  "Marco e Maria Gabriela": { categories: ["Fotografia", "Audiovisual"], subcategories: ["Fotografia de Casamento", "Direção de Fotografia", "Documentário de Casamento", "Roteiro", "Montagem", "Edição de Vídeo"] },
  "Motion Graphics - Elementos Visuais Itabus Publicidade": { categories: ["Motion Graphics", "Design", "Audiovisual"], subcategories: ["Motion Graphics", "Identidade Visual Animada", "Animação", "Branding"] },
  "Nós voz": { categories: ["Design"], subcategories: ["Identidade Visual", "Branding", "Logo Design"] },
  "Oficial Concursos - Identidade Visual": { categories: ["Design"], subcategories: ["Identidade Visual", "Branding", "Logo Design"] },
  "Oh, Boy! | Rebranding": { categories: ["Design"], subcategories: ["Rebranding", "Branding", "Estratégia de Marca", "Identidade Visual", "Direção de Arte"] },
  "Por Trás do Traço": { categories: ["Audiovisual"], subcategories: ["Documentário", "Direção de Arte", "Roteiro", "Captação de Vídeo", "Edição de Vídeo", "Montagem"] },
  "Pre wedding Jaque e Matheus": { categories: ["Fotografia"], subcategories: ["Ensaio Fotográfico", "Fotografia de Casamento", "Direção de Fotografia", "Edição de Imagem"] },
  "Projeto Envelopado Stanley + Barbie": { categories: ["Design"], subcategories: ["Out-of-Home", "Envelopamento", "Concept Art", "Simulação 3D", "Experiência de Marca"] },
  "Redesenho Logo ICAB": { categories: ["Design"], subcategories: ["Identidade Visual", "Rebranding", "Logo Design"] },
  "Rio Musical - Identidade e Ebook": { categories: ["Design"], subcategories: ["Identidade Visual", "Branding", "Editorial", "Ebook", "Diagramação"] },
  "Smurfs | Ativação Imersiva": { categories: ["Design"], subcategories: ["Concept Art", "Out-of-Home", "Envelopamento", "Ativação de Marca", "Simulação 3D", "Experiência Imersiva"] },
  "Social Media - Agência de Publicidade OOH": { categories: ["Design"], subcategories: ["Social Media", "Marketing Digital", "Direção de Arte"] },
  "Social Media | Parlamentar": { categories: ["Design"], subcategories: ["Social Media", "Marketing Digital", "Comunicação Política", "Direção de Arte"] },
  "Star Wars: O Império Contra-Ataca - Title Sequence": { categories: ["Audiovisual", "Motion Graphics"], subcategories: ["Title Sequence", "Motion Graphics", "Videografismo", "Animação", "Pós-Produção"] },
  "Super Mario Galaxy | Ativação": { categories: ["Design"], subcategories: ["Concept Art", "Out-of-Home", "Envelopamento", "Simulação 3D"] },
  "Torcida do Brasil": { categories: ["Design"], subcategories: ["Ilustração", "Arte Digital", "Out-of-Home", "Envelopamento"] },
  "Toy Story 5 | Mídia OOH": { categories: ["Design"], subcategories: ["Concept Art", "Out-of-Home", "Simulação 3D", "Campanha Publicitária", "Experiência de Marca"] },
  "Vinícius - SDN 2018": { categories: ["Audiovisual"], subcategories: ["Edição de Vídeo", "Montagem", "Sound Design", "Storytelling", "Pós-Produção"] },
  "Visual Identity | Casamento - Perez & Milena": { categories: ["Design"], subcategories: ["Identidade Visual", "Branding", "Direção de Arte", "Design para Eventos"] }
};

let content = fs.readFileSync('src/data/projectsData.ts', 'utf8');

let missing = [];
let replaced = 0;

for (const title in map) {
  const data = map[title];
  const catsStr = JSON.stringify(data.categories);
  const subcatsStr = JSON.stringify(data.subcategories);
  
  // Replace EXACTLY the category field inside the object that has this title.
  // We match "title": "ExactTitle", anything not }, and then "category": "..."
  // This uses a non-greedy match.
  const titleRegex = new RegExp(`("title":\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?)"category":\\s*".*?",`);
  
  if (titleRegex.test(content)) {
    content = content.replace(titleRegex, `$1"categories": ${catsStr},\n    "subcategories": ${subcatsStr},`);
    replaced++;
  } else {
    missing.push(title);
  }
}

// Ensure the 37th project (Identidade Visual Perez Jesus) also gets converted so the compiler doesn't complain
const perezTitle = "Identidade Visual Perez Jesus";
const perezRegex = new RegExp(`("title":\\s*"${perezTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?)"category":\\s*".*?",`);
if (perezRegex.test(content)) {
    content = content.replace(perezRegex, `$1"categories": ["Design"],\n    "subcategories": ["Identidade Visual"],`);
    replaced++;
}

fs.writeFileSync('src/data/projectsData.ts', content);

console.log(`Replaced: ${replaced}`);
console.log("Missing matches:", missing);

import mongoose, { Schema } from 'mongoose';

export interface IContentData {
  _id: string;
  hero: {
    tagline: string;
    subtitle: string;
  };
  bio: {
    mainParagraph: string;
    education: string;
    practice: string;
  };
  therapy: {
    gestalt: string;
    psicoterapia: string;
  };
  services: string[];
  contact: {
    whatsapp: string;
    email: string;
    instagram: string;
  };
  images: Map<string, string>;
}

export const DEFAULT_CONTENT = {
  _id: 'site-content',
  hero: {
    tagline: 'LUGAR DE SER\nQUEM SE É',
    subtitle: 'Atendimento presencial em Florianópolis e online para o mundo.',
  },
  bio: {
    mainParagraph:
      'Sou Psicóloga e Gestalt-terapeuta, com meu trabalho busco auxiliar os pacientes a enfrentarem seus desafios e descobrirem novas formas de enfrentamento, ampliando as possibilidades de uma vida com maior qualidade e bem estar, compreendendo melhor o mundo dentro e fora de si.',
    education:
      'Psicóloga (CRP 12/17275), graduada em 2018 pela Universidade do Sul de Santa Catarina (UNISUL), especialização em Psicologia Clínica Gestáltica em andamento pelo Instituto Granzotto de Psicologia Clínica.',
    practice:
      'Trabalho com atendimentos individuais, a partir dos 16 anos. Atendo presencialmente em Florianópolis - SC e na modalidade online para brasileiros residentes no Brasil ou em outros lugares do mundo.',
  },
  therapy: {
    gestalt:
      'Desenvolvida pelos teóricos Fritz Perls, Laura Perls e Paul Goodman entre 1940 e 1950, a Gestalt-terapia é um modelo psicoterápico com enfase no aqui-e-agora, ou seja, como o momento presente afeta o indíviduo e o quais as possibilidades para lidar com esse momento. Na gestalt-terapia o foco não está na "origem do problema" e sim, na criação de novos meios para lidar com o que acontece no agora. Para a gestalt-terapia somos seres em constante construção, ou seja, é nessa construção que juntos podemos descobrir novas formas de estar no mundo.',
    psicoterapia:
      '"Psicoterapia é lugar de ser quem se é, é no encontro entre clínico e consulente que será possível experimentar novas formas de estar no mundo e de olhar para suas formas antigas. Sendo este, lugar para "dizer tudo, ou do deixar-se dizer mais além ou mais aquém do que já é sabido, como se assim pudéssemos transcender as posições escolásticas que adotamos sobre nós mesmos e sobre os outros" (Müller e Granzotto, pg 07).',
  },
  services: [
    'Ansiedade',
    'Problemas de autoestima',
    'Depressão',
    'Dificuldades de relacionamento',
    'Problemas de saúde comportamental',
  ],
  contact: {
    whatsapp: '554891507605',
    email: 'psi.marieliros@gmail.com',
    instagram: 'psi.marieliros',
  },
  images: new Map<string, string>(),
};

const contentSchema = new Schema<IContentData>(
  {
    _id: { type: String },
    hero: {
      tagline: { type: String, default: DEFAULT_CONTENT.hero.tagline },
      subtitle: { type: String, default: DEFAULT_CONTENT.hero.subtitle },
    },
    bio: {
      mainParagraph: { type: String, default: DEFAULT_CONTENT.bio.mainParagraph },
      education: { type: String, default: DEFAULT_CONTENT.bio.education },
      practice: { type: String, default: DEFAULT_CONTENT.bio.practice },
    },
    therapy: {
      gestalt: { type: String, default: DEFAULT_CONTENT.therapy.gestalt },
      psicoterapia: { type: String, default: DEFAULT_CONTENT.therapy.psicoterapia },
    },
    services: { type: [String], default: DEFAULT_CONTENT.services },
    contact: {
      whatsapp: { type: String, default: DEFAULT_CONTENT.contact.whatsapp },
      email: { type: String, default: DEFAULT_CONTENT.contact.email },
      instagram: { type: String, default: DEFAULT_CONTENT.contact.instagram },
    },
    images: { type: Map, of: String, default: new Map() },
  },
  { timestamps: true },
);

export const ContentModel =
  (mongoose.models.Content as mongoose.Model<IContentData>) || mongoose.model<IContentData>('Content', contentSchema);

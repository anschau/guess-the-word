import { defineMessages } from 'react-intl'

const screenId = 'aboutScreen'

export default defineMessages({
  back: { id: `${screenId}.back`, defaultMessage: 'Voltar' },
  logo: { id: `${screenId}.logo`, defaultMessage: 'Guess the Word' },
  title: {
    id: `${screenId}.title`,
    defaultMessage: 'Uma brincadeira entre amigos que virou aplicativo.',
  },
  description: {
    id: `${screenId}.description`,
    defaultMessage:
      'O jogo nasceu da ideia de adivinhar palavras usando dicas em inglês, para treinar conversação e ficar mais familiarizado com o idioma.',
  },
  author: {
    id: `${screenId}.author`,
    defaultMessage: 'Criado por Lucas Anschau',
  },
  project: {
    id: `${screenId}.project`,
    defaultMessage: 'Projeto gratuito, sem intuito comercial e com código aberto.',
  },
  github: { id: `${screenId}.github`, defaultMessage: 'Ver código no GitHub' },
  linkErrorTitle: {
    id: `${screenId}.linkErrorTitle`,
    defaultMessage: 'Não foi possível abrir o GitHub',
  },
  linkErrorText: {
    id: `${screenId}.linkErrorText`,
    defaultMessage: 'Tente novamente em instantes.',
  },
})

import { defineMessages } from 'react-intl'

const screenId = 'mainScreen'

export default defineMessages({
  logo: {
    id: `${screenId}.logo`,
    defaultMessage: 'Guess the Word',
  },
  tagline: {
    id: `${screenId}.tagline`,
    defaultMessage: 'Aprenda inglês\njogando com amigos',
  },
  play: {
    id: `${screenId}.play`,
    defaultMessage: 'Jogar',
  },
  instructions: {
    id: `${screenId}.instructions`,
    defaultMessage: 'Instruções',
  },
  config: {
    id: `${screenId}.config`,
    defaultMessage: 'Configurações',
  },
  about: {
    id: `${screenId}.about`,
    defaultMessage: 'Sobre',
  },
  footer: {
    id: `${screenId}.footer`,
    defaultMessage:
      'Um celular, amigos\nreunidos e inglês\nna ponta da língua.',
  },
  back: {
    id: `${screenId}.back`,
    defaultMessage: 'Voltar',
  },
  playTitle: {
    id: `${screenId}.playTitle`,
    defaultMessage: 'Vamos jogar?',
  },
  playText: {
    id: `${screenId}.playText`,
    defaultMessage:
      'A partida ainda está em preparação. Em breve, você poderá reunir os amigos e começar a jogar por aqui!',
  },
  instructionsText: {
    id: `${screenId}.instructionsText`,
    defaultMessage:
      'Um celular, amigos reunidos e inglês na ponta da língua! A proposta é aprender inglês tentando adivinhar palavras juntos. As regras da partida estarão disponíveis em breve.',
  },
  aboutTitle: {
    id: `${screenId}.aboutTitle`,
    defaultMessage: 'Sobre o jogo',
  },
  aboutText: {
    id: `${screenId}.aboutText`,
    defaultMessage:
      'Guess the Word é um jogo para aprender inglês com amigos. Transforme o tempo juntos em uma oportunidade de descobrir novas palavras!',
  },
})

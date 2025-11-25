export interface State {
  uf: string;
  name: string;
  cities: string[];
}

export const BRAZILIAN_STATES: State[] = [
  {
    uf: 'SP',
    name: 'São Paulo',
    cities: ['São Paulo', 'Campinas', 'Santos', 'São José dos Campos', 'Ribeirão Preto', 'Sorocaba', 'Osasco', 'Santo André', 'São Bernardo do Campo', 'Guarulhos']
  },
  {
    uf: 'RJ',
    name: 'Rio de Janeiro',
    cities: ['Rio de Janeiro', 'Niterói', 'Duque de Caxias', 'Nova Iguaçu', 'São Gonçalo', 'Petrópolis', 'Volta Redonda', 'Campos dos Goytacazes']
  },
  {
    uf: 'MG',
    name: 'Minas Gerais',
    cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba']
  },
  {
    uf: 'BA',
    name: 'Bahia',
    cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Lauro de Freitas', 'Ilhéus']
  },
  {
    uf: 'PR',
    name: 'Paraná',
    cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo']
  },
  {
    uf: 'RS',
    name: 'Rio Grande do Sul',
    cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo']
  },
  {
    uf: 'PE',
    name: 'Pernambuco',
    cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe']
  },
  {
    uf: 'CE',
    name: 'Ceará',
    cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape']
  },
  {
    uf: 'SC',
    name: 'Santa Catarina',
    cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Jaraguá do Sul']
  },
  {
    uf: 'GO',
    name: 'Goiás',
    cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade']
  },
  {
    uf: 'PB',
    name: 'Paraíba',
    cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras', 'Guarabira']
  },
  {
    uf: 'AM',
    name: 'Amazonas',
    cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé', 'Tabatinga', 'Maués']
  },
  {
    uf: 'ES',
    name: 'Espírito Santo',
    cities: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'São Mateus', 'Colatina']
  },
  {
    uf: 'MA',
    name: 'Maranhão',
    cities: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia']
  },
  {
    uf: 'PA',
    name: 'Pará',
    cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal', 'Parauapebas', 'Itaituba', 'Cametá']
  },
  {
    uf: 'MT',
    name: 'Mato Grosso',
    cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde']
  },
  {
    uf: 'MS',
    name: 'Mato Grosso do Sul',
    cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Aquidauana', 'Nova Andradina', 'Sidrolândia']
  },
  {
    uf: 'DF',
    name: 'Distrito Federal',
    cities: ['Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Planaltina', 'Águas Claras', 'Gama', 'Santa Maria']
  },
  {
    uf: 'RN',
    name: 'Rio Grande do Norte',
    cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim', 'Caicó', 'Açu']
  },
  {
    uf: 'AL',
    name: 'Alagoas',
    cities: ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'União dos Palmares', 'Penedo', 'Delmiro Gouveia', 'São Miguel dos Campos']
  },
  {
    uf: 'PI',
    name: 'Piauí',
    cities: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior', 'Barras', 'Altos']
  },
  {
    uf: 'SE',
    name: 'Sergipe',
    cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Simão Dias']
  },
  {
    uf: 'TO',
    name: 'Tocantins',
    cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Miracema do Tocantins']
  },
  {
    uf: 'RO',
    name: 'Rondônia',
    cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura', 'Jaru', 'Guajará-Mirim']
  },
  {
    uf: 'AC',
    name: 'Acre',
    cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Brasiléia', 'Plácido de Castro', 'Senador Guiomard']
  },
  {
    uf: 'AP',
    name: 'Amapá',
    cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão', 'Porto Grande', 'Tartarugalzinho', 'Pedra Branca do Amapari']
  },
  {
    uf: 'RR',
    name: 'Roraima',
    cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí', 'Bonfim', 'Cantá', 'São João da Baliza']
  }
];

export function getStateByUF(uf: string): State | undefined {
  return BRAZILIAN_STATES.find(state => state.uf === uf);
}

export function getCitiesByState(uf: string): string[] {
  const state = getStateByUF(uf);
  return state ? state.cities : [];
}

export function getAllCities(): string[] {
  return BRAZILIAN_STATES.flatMap(state => state.cities);
}

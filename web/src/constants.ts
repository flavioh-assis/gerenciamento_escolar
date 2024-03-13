export const States = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MG',
  'MA',
  'MS',
  'MT',
  'PA',
  'PB',
  'PE',
  'PI',
  'PR',
  'RJ',
  'RN',
  'RO',
  'RR',
  'RS',
  'SP',
  'SC',
  'SE',
  'TO',
  'Ext.',
];

export const buildSelectOption = (value: string, label?: string) => {
  return { value: value, label: label ?? value };
};

const EMPTY_SELECT_OPTION = buildSelectOption('', '-----');

enum Disability {
  AUTISM = 'Autismo',
  INTELLECTUAL = 'Intelectual',
  MULTIPLE = 'Múltipla',
  WHEELCHAIR = 'Cadeirante',
}

const Disabilities = [
  Disability.AUTISM,
  Disability.INTELLECTUAL,
  Disability.MULTIPLE,
  Disability.WHEELCHAIR,
];

const buildDisabilityOptions = () => {
  return Disabilities.sort().map(x => buildSelectOption(x));
};

enum Grade {
  FIRST = '1º',
  SECOND = '2º',
  THIRD = '3º',
  FORTH = '4º',
  FIFTH = '5º',
}

const Grades = [Grade.FIRST, Grade.SECOND, Grade.THIRD, Grade.FORTH, Grade.FIFTH];

const buildGradeOptions = () => {
  return Grades.map(x => buildSelectOption(x));
};

enum Group {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

const GROUPS = [Group.A, Group.B, Group.C, Group.D];

const buildGroupOptions = () => {
  return GROUPS.map(x => buildSelectOption(x));
};

enum Period {
  MORNING = 'Manhã',
  AFTERNOON = 'Tarde',
}

export const SearchOptions = {
  DISABITIES: [
    EMPTY_SELECT_OPTION,
    buildSelectOption('Qualquer', 'Qualquer Tipo'),
    ...buildDisabilityOptions(),
  ],
  GRADES: [EMPTY_SELECT_OPTION, ...buildGradeOptions()],
  GROUPS: [EMPTY_SELECT_OPTION, ...buildGroupOptions()],
  PERIODS: [
    EMPTY_SELECT_OPTION,
    buildSelectOption(Period.MORNING),
    buildSelectOption(Period.AFTERNOON),
  ],
};

export const EnrollOptions = {
  DISABITIES: [buildSelectOption('', 'Não Possui'), ...buildDisabilityOptions()],
};

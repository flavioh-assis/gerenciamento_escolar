export type Class = Fields & { id: number };

export type Fields = {
  grade: string;
  group: string;
  period: Period | '';
  classroom: string;
  teacher: string;
};

export type Period = 'Manhã' | 'Tarde';

export type FormStudentValues = {
  nome: string;
  ra: string;
  nasc_cidade: string;
  nasc_uf: string;
  nacionalidade: string;
  nasc_data: string;
  nee: string;
  pai: string;
  mae: string;
  responsavel: string;
  proc_escola: string;
  proc_cidade: string;
  proc_ano: string;
  ano_desejado: string;
  turma: string;
};

export type SearchStudentResult = {
  id: number;
  num_chamada: number;
  nome: string;
  ra: string;
  nee: string;
  nasc_data: string;
  ano: string;
  turma: string;
  professor: string;
  situacao: string;
  periodo: string;
};
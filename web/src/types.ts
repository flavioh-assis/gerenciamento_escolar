export type Class = Fields & { id: number };

export type Fields = {
  grade: string;
  group: string;
  period: Period | '';
  classroom: string;
  teacher: string;
};

export type Period = 'Manhã' | 'Tarde';

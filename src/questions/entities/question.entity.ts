import { Question } from '@prisma/client';

export class Questions implements Question {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

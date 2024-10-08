import { User } from '../../user/entities/user.entity';
import { Questions } from '../../questions/entities/question.entity';
import { Answer } from '@prisma/client';

export class Answers implements Answer {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Questions;
}

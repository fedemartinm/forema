// @flow
import type { User } from './User';

export type Opinion = {
  opinionId: string,
  parentId: ?string,
  forumId: string,
  discussionId: string,
  userId: string,
  user: ?User,
  likes: string[],
  dislikes: string[],
  date: Date,
  content: Object,
};

export interface OpinionCatalog {
  getAllOpinions(discussionId: string): Promise<Opinion[]>;
  createOpinion(opinion: Opinion): Promise<Opinion>;
  updateOpinion(opinion: Opinion): Promise<Opinion>;
  deleteOpinion(opinionId: string): Promise<boolean>;
}

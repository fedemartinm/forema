import type { Discussion } from './Discussion';
// @flow
import type { Forum } from './Forum';
import type { User } from './User';

export type Opinion = {
  opinionId: string | undefined,
  parentId: string | undefined,
  parentOpinion: Opinion | undefined,
  forumId: string,
  forum: Forum,
  discussionId: string,
  discussion: Discussion,
  userId: string,
  user: User,
  likes: string[],
  dislikes: string[],
  date: Date,
  content: Object,
};

export interface OpinionCatalog {
  getAllOpinions(discussionId: string): Promise<Opinion[]>;
  createOpinion(
    parentId: string | undefined,
    forumId: string,
    discussionId: string,
    userId: string,
    content: Object
  ): Promise<Opinion>;
  updateOpinion(opinion: Opinion): Promise<Opinion>;
  deleteOpinion(opinionId: string): Promise<Boolean>;
}

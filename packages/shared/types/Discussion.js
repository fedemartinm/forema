// @flow
import type { Forum } from './Forum';
import type { User } from './User';

export type Discussion = {
  discussionId: string,
  forumId: string,
  forum: ?Forum,
  discussionSlug: string,
  userId: string,
  user: ?User,
  date: Date,
  title: string,
  content: Object,
  likes: string[],
  dislikes: string[],
  tags: string[],
  pinned: boolean,
  open: boolean,
};

export interface DiscussionCatalog {
  getDiscussions(
    forumId: string,
    pinned: ?boolean,
    sortingMethod: 'date' | 'popularity'
  ): Promise<Discussion[]>;

  getDiscussion(
    discussionSlug: ?string,
    discussionId: ?string
  ): Promise<Discussion[]>;

  createDiscussion(discussion: Discussion): Promise<Discussion>;
  updateDiscussion(discussion: Discussion): Promise<Discussion>;
  deleteDiscussion(discussionId: string): Promise<boolean>;
  vote(discussionId: string, userId: string, vote: Number): Promise<Discussion>;
}

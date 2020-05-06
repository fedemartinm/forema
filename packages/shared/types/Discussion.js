// @flow
import type { Forum } from './Forum';
import type { User } from './User';

export type Discussion = {
  discussionId: string | undefined,
  forumId: string,
  forum: Forum,
  discussionSlug: string,
  userId: string,
  user: User,
  date: Date,
  title: string,
  content: Object,
  likes: string[],
  dislikes: string[],
  tags: string[],
  pinned: Boolean,
  open: Boolean,
};

export interface DiscussionCatalog {
  getDiscussions(
    forumId: string,
    pinned: ?Boolean,
    sorting_method: 'date' | 'popularity'
  ): Promise<Discussion[]>;

  getDiscussion(
    discussionSlug: string | undefined,
    discussionId: string | undefined
  ): Promise<Discussion[]>;

  createDiscussion(discussion: Discussion): Promise<Discussion>;
  updateDiscussion(discussion: Discussion): Promise<Discussion>;
  deleteDiscussion(discussionId: string): Promise<Boolean>;
  vote(discussionId: string, userId: string, vote: Number): Promise<Discussion>;
}

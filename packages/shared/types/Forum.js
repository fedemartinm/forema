// @flow
export type Forum = {
  forumId: string,
  forumSlug: string,
  forumName: string,
  forumDescription: string,
  forumCover: ?string,
  forumType: 'public' | 'protected' | 'readonly',
};

export interface ForumCatalog {
  getAllForums(): Promise<Forum[]>;
  createForum(forum: Forum): Promise<Forum>;
  updateForum(forum: Forum): Promise<Forum>;
  deleteForum(forumId: string): Promise<boolean>;
}

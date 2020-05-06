// @flow
export type Overview = {
  forums: Number,
  discussions: Number,
  opinions: Number,
  users: Number,
};

export type DiscussionOverview = {
  discussionId: string,
  discussionSlug: string,
  opinions: Number,
};

export type UserOverview = {
  userId: string,
  likes: Number,
  dislikes: Number,
  opinions: Number,
  discussions: DiscussionOverview[],
};

export interface OverviewCatalg {
  getOverview(): Promise<Overview>;
  getDiscussionOverview(discussionId: string): Promise<DiscussionOverview>;
  getUserOverview(userId: string): Promise<UserOverview>;
}

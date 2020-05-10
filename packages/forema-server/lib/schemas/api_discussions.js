export default [
  {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'api_discussions#discussions',
    type: 'object',
    required: ['forumId', 'pinned', 'sortingMethod'],
    properties: {
      forumId: {
        type: 'string',
      },
      pinned: {
        type: 'string',
        pattern: '^(?:true|false)$',
      },
      sortingMethod: {
        type: 'string',
        pattern: '^(?:date|popularity)$',
      },
    },
  },
  {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'api_discussions#vote',
    type: 'object',
    required: ['discussionId', 'userId', 'vote'],
    properties: {
      discussionId: {
        type: 'string',
      },
      userId: {
        type: 'string',
      },
      vote: {
        type: ['string', 'number'],
        pattern: '^[\\-0-9]*$',
      },
    },
  },
];

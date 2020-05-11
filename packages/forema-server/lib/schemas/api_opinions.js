export default [
  {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'api_opinions#vote',
    type: 'object',
    required: ['opinionId', 'userId', 'vote'],
    properties: {
      opinionId: {
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

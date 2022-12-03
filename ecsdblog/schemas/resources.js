export default {
  name: 'resources',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Website Name',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Website URL (example: https://www.google.com/)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
};

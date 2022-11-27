export default {
  name: 'student',
  title: 'Student',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'string',
    },
    {
      name: 'dislikes',
      title: 'Dislikes',
      type: 'string',
    },
    {
      name: 'interesting_fact',
      title: 'Interesting Fact',
      type: 'string',
    },
    {
      name: 'audio',
      title: 'Audio File',
      type: 'file',
    },
    {
      name: 'isActive',
      title: 'Currently in the class?',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};

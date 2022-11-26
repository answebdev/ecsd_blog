export default {
  name: 'landing',
  title: 'Landing Page',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Instructor',
      type: 'string',
    },
    {
      name: 'header',
      title: 'Header',
      type: 'string',
    },
    {
      name: 'sub_header',
      title: 'Sub-Header',
      type: 'string',
    },
    {
      name: 'image_01',
      title: 'Image 1',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'image_02',
      title: 'Image 2',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'image_03',
      title: 'Image 3',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'image_04',
      title: 'Image 4',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'image_05',
      title: 'Image 5',
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

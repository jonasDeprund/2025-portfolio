import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Lien externe',
      type: 'url',
    }),
    defineField({
      name: 'isLarge',
      title: 'Afficher en grand',
      type: 'boolean',
    }),
    defineField({
      name: 'imageDefault',
      title: 'Image par défaut',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageHovered',
      title: 'Image au survol',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
})

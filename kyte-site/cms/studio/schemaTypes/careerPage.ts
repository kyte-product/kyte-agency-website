import {defineField, defineType} from 'sanity'

export const careerPage = defineType({
  name: 'careerPage',
  title: 'Careers page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Internal title', type: 'string', initialValue: 'Careers page', validation: rule => rule.required()}),
    defineField({name: 'heroPortraitOne', title: 'First hero portrait', type: 'editorialImage', description: 'Portrait shown within the first headline line. Replace the temporary Kyte team image here.', validation: rule => rule.required()}),
    defineField({name: 'heroPortraitTwo', title: 'Second hero portrait', type: 'editorialImage', description: 'Portrait shown within the second headline line. Replace the temporary Kyte team image here.', validation: rule => rule.required()}),
  ],
  preview: {select: {title: 'title', media: 'heroPortraitOne'}},
})

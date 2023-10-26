# autobahn

This is a relatively quick implementation for the API https://autobahn.api.bund.dev

It wasn't intended for productive purposes but as a quick demonstration of my current skill levels.

ℹ️ This code is public domain (https://creativecommons.org/publicdomain/zero/1.0/). Feel free to copy whatever snippets or configurations you want.

## Choice of project

I wanted to mostly demonstrate my front end skills. So I was looking up an openly accessible API which the german government thankfully delivered. I won't use it as an actual tool since I don't even own a car.

## Design Choices

### TypeScript

There are three reasons (in that order)

- I wanted to expand my skillset beyond JS
- A lot of job postings are asking for it
- I miss strong typing from my Java days

The standards for the syntax (types vs interfaces, folder structure, types.d.ts, ...) will vary from project to project. The ones I chose seem the best option for me. In the end having a consistent structure is the most important decision of a project whatever the choice is.

### [Mantine](https://mantine.dev/)

I have worked almost exclusively with Material UI 4 (MUI) before. From what I found on the internet it seems to be a pain to make work with TypeScript. Since I want to spend my time with actual coding I looked up a component library with a strong support for TypeScript. Mantine fits the bill, delivers most needed components prepacked and is, as far as I can see, flexible enough to be extended as needed.

#### CSS Module vs Layout Components

Mantine doesn't seem to have best standards since its adaptability is one of it's biggest features. I used components for layout as far as possible and used css modules for everything not delivered from those components.

### [Jotai](https://jotai.org/)

I worked with Redux in my previous job. However it seems overkill for most tasks. Jotai seemed like the best alternative to me.

### Language (German)

The app is currently localized only in German. Since the API currently delivers all data exclusively in German adding interface localizations for other languages didn't make much sense. However the interface has the localization system already implemented and English and other languages can easily be added later.

### Colors

The colors of the icons were picked for a contrast to fit the [WebAIM standards](https://webaim.org/resources/contrastchecker/) as far as possible:
- Dark theme: Contrast Ratio >=7:1 (AAA Normal Text)
- Light theme: Contrast Ratio >=4.5 /1 (AA Normal Text)

**☠️☠️☠️ Never wait with the actual localization till you need another language. I have seen this in a previous project I worked on and it was a pain to find every locale that needed translation.**

## Todos ##

I will probably add these later

- Automated testing
- Full accessability (aria-labels, ...)
- Using local storage for the selected values in the form

## Suggestions ##

Please send me a quick message if you have a suggestion on how to improve my code. I would appreciate the new learning opportunity.

## Background

Alasdair Gray (1934-2019) was a Scottish writer whose work wittily and movingly disrupted the expectations we often bring to literature, such as those around the division between author and content, the stability and authority of the narrative voice, and the materiality of books and what they describe.

I liked the idea of a simple game that played with some of these concepts, working with and against the familiar patterns of games in a way analogous to how Gray works with prose. By creating an extension, using the (Plasmo framework)[https://www.plasmo.com/docs], there was an opportunity to show how websites, which can appear as something stable and remote, handed over to the user, are in fact operating in a domain where power is contested between client and server. This is demonstrated by allowing the player to respond to and disturb the appearance of the site they choose. 

The simplicity of the game also highlights some of the tropes that continue to structure many games, even as they have achieved increasing higher complexity in many other directions: tropes wherein user choice is generally superficial, and all narrative tends towards a resolution by violence alone. 

Of course, plenty of games have challenged these tropes with greater coherence and severity than this one. But the haphazard, still (as of writing) somewhat glitchy character of this game doesn’t seem inappropriate to an author whose work can treat extensive effort with irony as well as admiration, and professionalism with distrust.

And as the Index of Plagiarisms in Lanark taxonomises, catalogues and (at least in one case) invents the sources that go into any piece of work, it seems appropriate that the game be open source, allowing others to come along and copy, meddle and improve as they please. 

### Image sources:

- Player: cover of [1982, Janine (1984)](https://en.wikipedia.org/wiki/1982,_Janine)
- Antagonist: [an illustration from a draft of Lanark (1981), found in a post from University of Glasgow’s Special Collections](https://www.gla.ac.uk/myglasgow/library/files/special/exhibns/month/may2002.html)
- Icon: [Self-portrait by Gray](https://thealasdairgrayarchive.org/timeline/)

## Plasmo boilerplate on starting up

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

## Screenshots

| | | |
| --- | --- | --- |
| ![Screenshot 2024-10-01 at 14 11 23](https://github.com/user-attachments/assets/376699d0-c965-4610-8add-d58d578b4f48) | ![Screenshot 2024-10-01 at 14 07 11](https://github.com/user-attachments/assets/2a716362-72ef-40e8-b90e-889a101446f3) | ![Screenshot 2024-10-01 at 14 10 48](https://github.com/user-attachments/assets/e551b72b-c8db-4aa4-a4fa-dfe7281416b9) |



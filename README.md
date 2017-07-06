🔺  
🔺🔺

# ALttP Map Tracker

A map-based learning tool for [The Legend of Zelda: A Link to the Past: VT Randomizer](http://vt.alttp.run/).

 * View a map of all items and their prerequisites
 * Track items as you pick them up
 * Map dynamically updates to show which items you have met the prerequisites for
 * Track the item locations you've visited directly on the map
 * Has a timer, too, which is kinda cool

![Preview](http://i.imgur.com/4KMm89k.png)

[Try it out](http://alttp.teamthebestteam.org/) but keep in mind that I've marked it as being in beta so I have an excuse for the bugs and design oversights.

If you like the app (or just like the *idea* of the app), **please** help me improve it by sharing your suggestions, bug reports, and feedback with me either by filing issues or reaching out to me on the [ALttP Randomizer Discord](https://discord.gg/YYEW4Gt) where my name is `easymac`. Or email me or something, I guess.

### TODO

There are a lot of additions I intend to make to this project, some of which are quite fundamental. I don't imagine I'll see any contributors but if you're interested shoot me a message and I'll help in any way I can.

**Planned upgrades sorted both by how important I think they are and how much I want to do them:**

 * Add blue warps and flute locations to the map
 * Add additional maps of each dungeon and its contents:
   * *Add overworld markers for the dungeons that show the number of items as well as the prerequisites for both entry and completion. Also allow users to mark Turtle Rock and Misery Mire medallion requirements and integrate that into the logic.*
   * *Since item requisites change based on where small keys are located, the question of how or if useful information beyond item locations can be provided needs to be answered.*
 * Store the Redux store in local storage and add a New Game button so games can be resumed
 * Redesign the markers' prerequisite lists (for obvious reasons)
 * Make optimizations to the Google Maps component as framerates seem to be suffering due to the number of overlays (which currently is less than 60)
 * Revise and improve the Tracker component
 * Mobile support

This is probably not the exact order in which things will happen. If anything here, or anything else seems appealing to you, let me know and there's a good chance I'll move it up the list.

### Some other details:

* Built with [react-slingshot](https://github.com/coryhouse/react-slingshot), a React + Redux boilerplate with babel, hot reloading, testing, and linting (because I hate setting this stuff up myself).

* Getting this running locally is easy enough:
`npm install`, `npm start -s`; however, the necessary images aren't in this repository so probably don't do that. Contact me and I'll get you a tarball. 

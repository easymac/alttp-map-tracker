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

### TODO:

There are a lot of additions I intend to make to this project, some of which are quite fundamental. I don't imagine I'll see any contributors but if you're interested shoot me a message and I'll help in any way I can.

**Planned upgrades sorted both by how important I think they are and how much I want to do them:**

 * Add blue warps and flute locations to the map
 * Add additional maps of each dungeon and its contents:
   * *Add overworld markers for the dungeons that show the number of items as well as the prerequisites for both entry and completion. Also allow users to mark Turtle Rock and Misery Mire medallion requirements and integrate that into the logic.*
   * *Since item requisites change based on where small keys are located, the question of how or if useful information beyond item locations can be provided needs to be answered.*
 * Store item icons in a sprite sheet maintained by this repository instead of individual .png files.
 * Store the Redux store in local storage and add a New Game button so games can be resumed
 * Redesign the markers' prerequisite lists (for obvious reasons)
 * Make optimizations to the Google Maps component as framerates seem to be suffering due to the number of overlays (which currently is less than 60)
 * Revise and improve the Tracker component
 * Mobile support

This is probably not the exact order in which things will happen. If anything here, or anything else seems appealing to you, let me know and there's a good chance I'll move it up the list.

### Running the project locally:

Requires a recent version of Node (6.0+).

Clone the repository:
```
git clone https://github.com/easymac/alttp-map-tracker.git
```

Install the dependencies:
```
npm install
```

Run the app:
```
npm start -s
```

You *might* notice that the app is missing all of the images! These are served separately. The app looks for them at `localhost:8080`.

I highly recommend using [http-server](https://www.npmjs.com/package/http-server) for development purposes. All it takes is to install (`npm install -g http-server`) then run with `http-server` from the path with the images.

You can configure the URL within `webpack.config.dev.js`, but please try to remember to not commit these changes. For example, you could set it to `http://alttp.teamthebestteam.org` and the images will be fetched from the live server so you won't have to download them at all.

**If you get errors related to node-gyp while installing dependencies**, this might be because you don't have Python 2.7 and a C++ compiler toolchain. For more details, visit https://github.com/nodejs/node-gyp#installation.

### Some other details:

* Built with [react-slingshot](https://github.com/coryhouse/react-slingshot), a React + Redux boilerplate with babel, hot reloading, testing, and linting (because I hate setting this stuff up myself).

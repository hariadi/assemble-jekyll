# Assemble Jekyll [v0.1.3]
[![Build Status](https://travis-ci.org/hariadi/assemble-jekyll.png)](https://travis-ci.org/hariadi/assemble-jekyll)

> [Assemble Jekyll][assemble-jekyll] is a [Yeoman][yeoman] generator template for Jekyll that use [Assemble][assemble] as a Grunt plugin that makes it dead simple to build modular sites and components from reusable **templates** and **data**.

***What? you build static page with Jekyll? We build Jekyll for you***

**Table of Contents**

- [Assemble Jekyll [v0.1.3]](#assemble-jekyll-v013)
	- [Getting started](#getting-started)
	- [Assemble](#the-assemble-task)
	- [Contributing](#contributing)
	- [Release History](#release-history)

## Getting started
* Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
* Install the generator: `npm install generator-assemble`
* **[Download this project][download]** and unzip it into a `app/templates` OR
    `git submodule add https://github.com/hariadi/assemble-jekyll.git app/templates`
* Create new project:
    `mkdir your.github.com && cd your.github.com`
* In the `your.github.com` folder, Run: 
    `yo assemble`
* Run `npm install` to install [Assemble][assemble], [Grunt](http://gruntjs.com/) and any other dependencies.
* Once the dependencies are installed you may run `grunt assemble` to build the example project.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile][gruntfile], as well as install and use Grunt plugins. 


## Assemble
Visit [Assemble][assemble] documentation 


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Use [Assemble][assemble] to build and maintain your gh-pages, blog or documentation. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
* 2013-05-01    v0.2.0    Add Grunt contrib task: `jshint`, `uglifyjs`, `less`, `concat`, `copy` sample configuration. Also Bootstrap v3.0
* 2013-04-24    v0.1.3    Add assemble-example-basic as Jekyll template. 
* 2013-04-23    v0.1.1    Travis, Jekyll skeleton. 
* 2013-04-23    v0.1.0    First commit. 

[yeoman]: http://yeoman.io/
[download]: https://github.com/hariadi/assemble-jekyll/archive/master.zip
[assemble]: https://github.com/assemble/assemble/
[assemble-examples]: https://github.com/assemble/assemble-examples
[assemble-jekyll]: https://github.com/hariadi/assemble-jekyll
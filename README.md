# Proceedings

2023-02-14: Copied from lawrennd/proceedings.

*Proceedings* is a theme for producing conference proceedings under Jekyll. It is based on the Jekyll Minima theme. 


### Includes

Refers to snippets of code within the `_includes` directory that can be inserted in multiple layouts (and another include-file as well) within the same theme-gem.

  - `disqus_comments.html` &mdash; Code to markup disqus comment box.
  - `footer.html` &mdash; Defines the site's footer section.
  - `google-analytics.html` &mdash; Inserts Google Analytics module (active only in production environment).
  - `head.html` &mdash; Code-block that defines the `<head></head>` in *default* layout.
  - `custom-head.html` &mdash; Placeholder to allow users to add more metadata to `<head />`.
  - `header.html` &mdash; Defines the site's main header section. By default, pages with a defined `title` attribute will have links displayed here.
  - `social.html` &mdash; Renders social-media icons based on the `minima:social_links` data in the config file.


### Sass

Refers to `.scss` files within the `_sass` directory that define the theme's styles.

  - `minima/skins/classic.scss` &mdash; The "classic" skin of the theme. *Used by default.*
  - `minima/initialize.scss` &mdash; A component that defines the theme's *skin-agnostic* variable defaults and sass partials.
    It imports the following components (in the following order):
    - `minima/custom-variables.scss` &mdash; A hook that allows overriding variable defaults and mixins. (*Note: Cannot override styles*)
    - `minima/_base.scss` &mdash; Sass partial for resets and defines base styles for various HTML elements.
    - `minima/_layout.scss` &mdash; Sass partial that defines the visual style for various layouts.
    - `minima/custom-styles.scss` &mdash; A hook that allows overriding styles defined above. (*Note: Cannot override variables*)

Refer the [skins](#skins) section for more details.


### Assets

Refers to various asset files within the `assets` directory.

  - `assets/css/style.scss` &mdash; Imports sass files from within the `_sass` directory and gets processed into the theme's
    stylesheet: `assets/css/styles.css`.
  - `assets/minima-social-icons.svg` &mdash; A composite SVG file comprised of *symbols* related to various social-media icons.
    This file is used as-is without any processing. Refer [section on social networks](#social-networks) for its usage.


### Plugins

Minima comes with [`jekyll-seo-tag`](https://github.com/jekyll/jekyll-seo-tag) plugin preinstalled to make sure your website gets the most useful meta tags. See [usage](https://github.com/jekyll/jekyll-seo-tag#usage) to know how to set it up.


## Usage

Have the following line in your config file:

```yaml
theme: minima
```


### Customizing templates

To override the default structure and style of minima, simply create the concerned directory at the root of your site, copy the file you wish to customize to that directory, and then edit the file.
e.g., to override the [`_includes/head.html `](_includes/head.html) file to specify a custom style path, create an `_includes` directory, copy `_includes/head.html` from minima gem folder to `<yoursite>/_includes` and start editing that file.

The site's default CSS has now moved to a new place within the gem itself, [`assets/css/style.scss`](assets/css/style.scss).

In Minima 3.0, if you only need to customize the colors of the theme, refer to the subsequent section on skins. To have your
*CSS overrides* in sync with upstream changes released in future versions, you can collect all your overrides for the Sass
variables and mixins inside a sass file placed at `_sass/minima/custom-variables.scss` and all other overrides inside a sass file
placed at path `_sass/minima/custom.scss`.

You need not maintain entire partial(s) at the site's source just to override a few styles. However, your stylesheet's primary
source (`assets/css/style.scss`) should contain the following:

  - Front matter dashes at the very beginning (can be empty).
  - Directive to import a skin.
  - Directive to import the base styles (automatically loads overrides when available).

Therefore, your `assets/css/style.scss` should contain the following at minimum:

```sass
---
---

@import "minima/skins/{{ site.minima.skin | default: 'classic' }}";
@import "minima/initialize";
```

#### Skins

Minima 3.0 supports defining and switching between multiple color-palettes (or *skins*).

```
.
├── minima.scss
└── minima
    └── _syntax-highlighting.scss
```


A skin is a Sass file placed in the directory `_sass/minima/skins` and it defines the variable defaults related to the "color"
aspect of the theme. It also embeds the Sass rules related to syntax-highlighting since that is primarily related to color and
has to be adjusted in harmony with the current skin.

The default color palette for Minima is defined within `_sass/minima/skins/classic.scss`. To switch to another available skin,
simply declare it in the site's config file. For example, to activate `_sass/minima/skins/dark.scss` as the skin, the setting
would be:

```yaml
minima:
  skin: dark
```

As part of the migration to support skins, some existing Sass variables have been retired and some **have been redefined** as
summarized in the following table:

Minima 2.0      | Minima 3.0
--------------- | ----------
`$brand-color`  | `$link-base-color`
`$grey-*`       | `$brand-*`
`$orange-color` | *has been removed*

##### Available skins

- classic
- dark
- solarized
- solarized-dark

### Customize navigation links

This allows you to set which pages you want to appear in the navigation area and configure order of the links.

For instance, to only link to the `about` and the `portfolio` page, add the following to your `_config.yml`:

```yaml
header_pages:
  - about.md
  - portfolio.md
```


### Change default date format

You can change the default date format by specifying `site.minima.date_format`
in `_config.yml`.

```
# Minima date format
# refer to http://shopify.github.io/liquid/filters/date/ if you want to customize this
minima:
  date_format: "%b %-d, %Y"
```


### Extending the `<head />`

You can *add* custom metadata to the `<head />` of your layouts by creating a file `_includes/custom-head.html` in your source directory. For example, to add favicons:

1. Head over to [https://realfavicongenerator.net/](https://realfavicongenerator.net/) to add your own favicons.
2. [Customize](#customization) default `_includes/custom-head.html` in your source directory and insert the given code snippet.


### Enabling comments (via Disqus)

Optionally, if you have a Disqus account, you can tell Jekyll to use it to show a comments section below each post.

To enable it, add the following lines to your Jekyll site:

```yaml
  disqus:
    shortname: my_disqus_shortname
```

You can find out more about Disqus' shortnames [here](https://help.disqus.com/installation/whats-a-shortname).

Comments are enabled by default and will only appear in production, i.e., `JEKYLL_ENV=production`

If you don't want to display comments for a particular post you can disable them by adding `comments: false` to that post's YAML Front Matter.

:warning: `url`, e.g. `https://example.com`, must be set in you config file for Disqus to work.

### Author Metadata

From `Minima-3.0` onwards, `site.author` is expected to be a mapping of attributes instead of a simple scalar value:

```yaml
author:
  name: John Smith
  email: "john.smith@foobar.com"
```

To migrate existing metadata, update your config file and any reference to the object in your layouts and includes as summarized below:

Minima 2.x    | Minima 3.0
------------- | -------------------
`site.author` | `site.author.name`
`site.email`  | `site.author.email`


### Social networks

You can add links to the accounts you have on other sites, with respective icon, by adding one or more of the following options in your config.
From `Minima-3.0` onwards, the usernames are to be nested under `minima.social_links`, with the keys being simply the social-network's name:

```yaml
minima:
  social_links:
    twitter: jekyllrb
    github: jekyll
    stackoverflow: "11111"
    dribbble: jekyll
    facebook: jekyll
    flickr: jekyll
    instagram: jekyll
    linkedin: jekyll
    pinterest: jekyll
    telegram: jekyll
    microdotblog: jekyll
    keybase: jekyll

    mastodon:
     - username: jekyll
       instance: example.com
     - username: jekyll2
       instance: example.com

    gitlab:
     - username: jekyll
       instance: example.com
     - username: jekyll2
       instance: example.com

    youtube: jekyll
    youtube_channel: UC8CXR0-3I70i1tfPg1PAE1g
    youtube_channel_name: CloudCannon
```


### Enabling Google Analytics

To enable Google Analytics, add the following lines to your Jekyll site:

```yaml
  google_analytics: UA-NNNNNNNN-N
```

Google Analytics will only appear in production, i.e., `JEKYLL_ENV=production`

### Enabling Excerpts on the Home Page

To display post-excerpts on the Home Page, simply add the following to your `_config.yml`:

```yaml
show_excerpts: true
```


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jekyll/minima. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `script/bootstrap`.

To test your theme, run `script/server` (or `bundle exec jekyll serve`) and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme and the contents. As you make modifications, your site will regenerate and you should see the changes in the browser after a refresh.

## License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

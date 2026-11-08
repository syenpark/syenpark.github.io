# Customised [Minima](https://github.com/jekyll/minima)

*Minima is a one-size-fits-all Jekyll theme for writers*. It's Jekyll's default (and first) theme.  

## 0. Running locally

### Requirements

- Ruby 4.0.9 (see `.ruby-version`). Install that one with Homebrew:

  ```sh
  brew install ruby
  ```

  Then open a new terminal and check that `which ruby` prints `/opt/homebrew/bin/ruby`.

### Run

```sh
bundle install              # first time, or after the Gemfile changes
bundle exec jekyll serve    # serves the site at http://localhost:4000
```

Useful options:

- `bundle exec jekyll serve --livereload` refreshes the browser when you save a file.
- `bundle exec jekyll serve --drafts` also shows posts in `_drafts/`.
- `bundle exec jekyll build` only builds the site into `_site/`.

Changes to `_config.yml` don't reload on their own. Stop the server with Ctrl+C and start it again.

### Troubleshooting

- `Could not find 'bundler' (4.x) required by your Gemfile.lock`: your terminal is using the macOS Ruby. Open a new terminal (or run `exec zsh -l`), and check `which ruby` again.

### Deploy

Pushing to `master` builds and publishes the site through GitHub Actions (`.github/workflows/pages.yml`). In the repo settings, Pages must be set to deploy from **GitHub Actions**.

## 1. Added features

### 1.1 Category

To add a new category and list of its posts, you need to creat a new html in /categories/[New category].html manually. -> This will be improved next time.

### 1.2 Alolia

jekyll-algolia is included in this project for search, so that **your updates like adding new post are reflected only when you apply your updates to algolia**.

~~### 1.3 Pagination 
Currently, it is not available.~~  

### 1.4 Centering images in post 

This is from [this post](https://thornelabs.net/posts/centering-images-with-jekyll-and-markdown.html) and my iternal CSS is defined on default.html

### 1.5 PDF embedding

PDF embedding is from [this post](https://jamesonzimmer.com/simple-pdf-embed-for-jekyll/)

### 1.6 Youtube embedding

This is from [this post](https://github.com/nathancy/jekyll-embed-video#embed-youtube). 

### 1.7 __Collapsible markdown__

[This post](https://gist.github.com/joyrexus/16041f2426450e73f5df9391f7f7ae5f) helps me.

## 2. License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

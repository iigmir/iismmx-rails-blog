# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
css_assets = [ %w( mylinks.css ) , %w( articles.css ) , %w( article_tags.css ) , %w( categories.css ) ]
js_assets = [ %w( mylinks.js ) , %w( articles.js ) , %w( article_form.js ) , %w( article_tags.js ) , %w( categories.js ) , %w( simplemde.min.js ) ]

Rails.application.config.assets.precompile += css_assets
Rails.application.config.assets.precompile += js_assets
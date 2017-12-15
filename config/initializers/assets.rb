# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += [ %w( mylinks.css ) , %w( articles.css ) , %w( article_tags.css ) ]
Rails.application.config.assets.precompile += [ %w( mylinks.js ) , %w( articles.js ) , %w( article_tags.js ) ]
Rails.application.config.assets.precompile += %w( ckeditor/* ckeditor/lang/*  )
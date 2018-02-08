atom_feed({'xml:lang' => 'zh-TW'}) do |feed|
    feed.title("露比的銳思")
    feed.subtitle("立志寫出連露比也看得懂的東西")
    feed.updated(@articles[0].created_at) if @articles.length > 0
    feed.author do |author|
        author.name("iismmx")
        author.email("roc120j@gmail.com")
    end
    @articles.each do |article|
        feed.entry(article) do |entry|
            summary = article.context.slice(0...150) + "..."
            web_url = articles_url(article.id)
            # Feed info
            entry.title article.title
            entry.summary summary
            entry.url web_url
            entry.published article.created_at
            entry.updated article.updated_at
            entry.author do |author|
                author.name("iismmx")
            end
        end
    end
end
class PostHtmlProcessor < ActionView::Template::Handlers::ERB
  def call(template)
    data = super.to_str
    content = IO.popen(["node", "bin/posthtml.js"], 'rt+') do |process|
      process.write(data.to_s)
      process.close_write
      process.read
    end

    Rails.logger.error content
    ActionView::OutputBuffer.new(content)
  end
end

ActionView::Template.register_template_handler(:web, PostHtmlProcessor)

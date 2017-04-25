FROM ruby:2.3

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install -y nodejs

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY . .

EXPOSE 3000
ENTRYPOINT ["rails"]
CMD ["server", "-b", "0.0.0.0"]

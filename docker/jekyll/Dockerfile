FROM ruby:2.7.7

WORKDIR /app

COPY \
  Gemfile \
  Gemfile.lock \
  /app/
RUN bundle install --jobs=4 --path=/bundle

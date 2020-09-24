---
layout: default
title: code blog
avatar: /img/avatar-code.jpg
category: codeblog
---

<div class="posts">

  {% assign post_count=0 %}

  {% for post in site.posts %}
    {% if post.categories contains 'codeblog' %}
      {% capture post_count %} {{ post_count | plus: 1 }} {% endcapture %}
      <article class="post">

        <h3>{{ post.date | date: '%B %d, %Y' }}</h3>
        <h1>{{ post.title }}</h1>
        <div class="entry">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}

  {% if post_count == 0 %}
    <p>Welcome to my empty code blog! This is the place where I'll be sharing all things software and hardware dev-related in addition to linking notable technical articles and inspirations I've recently digested. Stay tuned for my first post.</p>
  {% endif %}

</div>

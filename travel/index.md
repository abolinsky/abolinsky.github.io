---
layout: default
title: travel blog
avatar: /img/avatar-travel.png
category: travelblog
---

<div class="posts">
  {% site.posts.size == 0 %}
    <p>Beginning July 16, 2017 I will be traveling solo for 48 days in Hong Kong, Japan, and Thailand. I will try to document my experiences in this blog as they unfold, so stay tuned!<p>
  {% endif %}

  {% for post in site.posts %}
    {% if post.categories contains 'travelblog' %}
      <article class="post">

        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

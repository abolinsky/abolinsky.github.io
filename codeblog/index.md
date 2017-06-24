---
layout: default
title: code blog
avatar: /img/avatar-code.png
category: codeblog
date: 2017-06-24
---

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'codeblog' %}
      <article class="post">

        <h5>{{ page.date | date: "%-d %B %Y" }}</h5>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>

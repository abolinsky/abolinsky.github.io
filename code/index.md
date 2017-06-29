---
layout: default
title: code blog
avatar: /img/avatar-code.png
category: codeblog
date: 2017-06-24
---

<div class="posts">
  {% site.posts == null %}
    <p>Welcome to my empty code blog! This is the place where I'll be sharing all things software and hardware dev-related in addition to linking notable technical articles and inspirations I've recently digested. Stay tuned for my first post.<p>
  {% endif %}

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

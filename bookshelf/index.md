---
layout: default
title: bookshelf
avatar: /img/avatar-code.png
category: bookblog
---

<div class="posts">
  
  {% assign post_count=0 %}

  {% for post in site.posts %}
    {% if post.categories contains 'bookblog' %}
      {% capture post_count %} {{ post_count | plus: 1 }} {% endcapture %}
      <article class="post">

        <h3 class="no-bottom-margin">{{ post.date | date: '%Y-%m-%d' }}</h3>
        <h1 class="no-bottom-margin">{{ post.title }}</h1>
        <div class="entry">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
        <br><br>
      </article>
    {% endif %}
  {% endfor %}

</div>

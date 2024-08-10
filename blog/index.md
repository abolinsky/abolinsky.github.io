---
layout: default
title: blog
avatar: /img/avatar-travel.png
category: allblog
---

<div class="posts">
  
  {% assign post_count=0 %}

  {% for post in site.posts %}
    {% if post.categories contains 'allblog' %}
      {% capture post_count %} {{ post_count | plus: 1 }} {% endcapture %}
      <article class="post">

        <h4 class="no-bottom-margin">{{ post.date | date: '%Y-%m-%d' }}</h4>
        <h1 class="no-bottom-margin">{{ post.title }}</h1>
        <div class="entry">
          {{ post.excerpt | strip_html | truncate: 32 }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
        <br><br>
      </article>
    {% endif %}
  {% endfor %}

</div>

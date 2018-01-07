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

        <h3 class="no-bottom-margin">{{ post.date | date: '%Y %B %d' }}</h3>
        <h1 class="no-bottom-margin">{{ post.title }}</h1>
        <div class="entry">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
        <br><br>
      </article>
    {% endif %}
  {% endfor %}

  {% if post_count == 0 %}
    <p>Beginning July 16, 2017 I will be traveling solo for 48 days in Hong Kong, Japan, and Thailand. I will try to document my experiences in this blog as they unfold, so stay tuned!</p>
  {% endif %}

</div>

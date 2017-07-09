---
layout: default
title: travel blog
avatar: /img/avatar-travel.png
category: travelblog
---

<div class="posts">
  
  {% assign post_count=0 %}

  {% for post in site.posts %}
    {% if post.categories contains 'travelblog' %}
      {% capture post_count %} {{ post_count | plus: 1 }} {% endcapture %}
      <article class="post">

        <h3>{{ post.date }}</h3>
        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}

  {% if post_count == 0 %}
    <p>Beginning July 16, 2017 I will be traveling solo for 48 days in Hong Kong, Japan, and Thailand. I will try to document my experiences in this blog as they unfold, so stay tuned!</p>
  {% endif %}

</div>

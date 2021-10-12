---
layout: default
title: bookshelf
avatar: /img/avatar-code.png
category: bookblog
---

<div class="books">
  
  {% assign book_count=0 %}

  {% for book in site.books %}
    {% if book.categories contains 'bookblog' %}
      {% capture book_count %} {{ book_count | plus: 1 }} {% endcapture %}
      <article class="book">

        <h3 class="no-bottom-margin">{{ book.date | date: '%Y-%m-%d' }}</h3>
        <h1 class="no-bottom-margin">{{ book.title }}</h1>
        <div class="entry">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>

        <a href="{{ site.baseurl }}{{ book.url }}" class="read-more">Read More</a>
        <br><br>
      </article>
    {% endif %}
  {% endfor %}

</div>

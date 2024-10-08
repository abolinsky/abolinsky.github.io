---
layout: default
title: bookshelf
category: bookblog
avatar: /assets/img/avatar-code.png
---

<div class="posts">
  <article class="post">
    {% assign sorted_books = site.data.bookshelf.books | sort: "date" | reverse %}
    {% assign current_year = "" %}
    {% assign current_month = "" %}

    {% for book in sorted_books %}
      {% assign book_year = book.date | date: "%Y" %}
      {% assign book_month = book.date | date: "%B" %}

      {% if book_year != current_year %}
        {% if current_year != "" %}</div>{% endif %}
        <h3 class="year-header">
          <span class="year">{{ book_year }}</span>
        </h3>
        {% assign current_year = book_year %}
        {% assign current_month = "" %}
      {% endif %}

      {% if book.status == "reading" %}
        {% if current_month != "Currently Reading" %}
          {% if current_month != "" %}</div>{% endif %}
          <h4 class="no-bottom-margin"><em>Currently Reading</em></h4>
          <div>
          {% assign current_month = "Currently Reading" %}
        {% endif %}
      {% elsif book_month != current_month %}
        {% if current_month != "" %}</div>{% endif %}
        <h4 class="no-bottom-margin">{{ book_month }}</h4>
        <div>
        {% assign current_month = book_month %}
      {% endif %}

      <h2 class="no-bottom-margin">
        {% if book.url %}
          <a href="{{ book.url }}">{{ book.title }}</a>
        {% else %}
          {{ book.title }}
        {% endif %}
      </h2>
      <br>
    {% endfor %}
    {% if current_month != "" %}</div>{% endif %}
  </article>
</div>

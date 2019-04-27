---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true

author: __author__

subject: __subject__
subject_version: __version__
level: __level__

tags:
- __tags__

image_credit:
  name: __name__
  link: __link__

resources:
- name: header
  src: header.jpg
---


---
type: post
avatar: /img/virtual-circular-buffer.png
date: 
title: Virtual Circular Buffers
---

### What?
If you've been coding for a reasonable amount of time, you have probably heard of a data structure called a circular buffer. It's essentially a first-in-first-out (FIFO) queue commonly used for buffering data. The idea is that you have a power of two-sized array, a read pointer, and a write pointer. At the start, the circular buffer is empty, with the read and write pointers both pointing to the start of the buffer. When you want to write data into the buffer, you write data to the address pointed to by the write pointer, then increment the write pointer however many bytes you just wrote. When you go to read data out of the buffer, you read data at the address pointed to by the read pointer, then increment the read pointer however many bytes you just read. You know the buffer is empty when the read and write pointers both point to the same place. And you cannot advance the write pointer past the read pointer, otherwise data will be overwritten.
